using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using badges_api.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace badges_api.Repository
{
    public abstract class Repository
    {
        public static ILookup<string, Repository> Repositories = new Dictionary<string, Repository>
        {
            { BehaviourRepository.TYPE, new BehaviourRepository() },
            { CompensationStepRepository.TYPE, new CompensationStepRepository()}, //no refs
            { CompensationTierRepository.TYPE, new CompensationTierRepository()}, //no refs
            { CompensationTierStepRepository.TYPE, new CompensationTierStepRepository()},
            { CompetencyRepository.TYPE, new CompetencyRepository() }, //no refs
            { EntityCompetencyRepository.TYPE, new EntityCompetencyRepository() },
            { EntityOccupationRepository.TYPE, new EntityOccupationRepository() },
            { EntityRepository.TYPE, new EntityRepository() }, //no refs
            { OccupationCompetencyRepository.TYPE, new OccupationCompetencyRepository()},
            { OccupationRepository.TYPE, new OccupationRepository()}, //no refs
            { OccupationStageRepository.TYPE, new OccupationStageRepository()},
            { ProficiencyMapRepository.TYPE, new ProficiencyMapRepository() },
            { ProficiencyRepository.TYPE, new ProficiencyRepository() }, //no refs
        }.ToLookup(g => g.Key, g => g.Value);

        private const string TABLE = "badges";
        protected Table _client;

        private static Table CreateTable(AmazonDynamoDBClient db)
        {
            try
            {
                var schema = new List<KeySchemaElement>();
                schema.Add(new KeySchemaElement
                {
                    AttributeName = Mapper.type,
                    KeyType = KeyType.HASH
                });
                schema.Add(new KeySchemaElement
                {
                    AttributeName = Mapper.id,
                    KeyType = KeyType.RANGE
                });
                var attributes = new List<AttributeDefinition>();
                attributes.Add(new AttributeDefinition
                {
                    AttributeName = Mapper.type,
                    AttributeType = ScalarAttributeType.S
                });
                attributes.Add(new AttributeDefinition
                {
                    AttributeName = Mapper.id,
                    AttributeType = ScalarAttributeType.S
                });
                var response = db.CreateTable(TABLE, schema, attributes, new ProvisionedThroughput(1, 1));
                switch (response.HttpStatusCode)
                {
                    case System.Net.HttpStatusCode.OK:
                    case System.Net.HttpStatusCode.Accepted:
                    case System.Net.HttpStatusCode.Created:
                    case System.Net.HttpStatusCode.NoContent:
                        //table created - exist 
                        break;
                    case System.Net.HttpStatusCode.Conflict:
                        //table created by someone else - check on status
                        break;
                    default:
                        throw new ApplicationException(response.HttpStatusCode.ToString());
                }
            }
            catch (Exception ex)
            {
                 
                throw new ApplicationException("Failed to create 'badges' table in db", ex);
            }

            return GetTable(db);
        }

        private static Table GetTable(AmazonDynamoDBClient db)
        {
            try
            {
                return Table.LoadTable(db, TABLE);
            }
            catch (Exception ex)
            {
                //the table does not exist - create
                return null;
            }
        }

        public Repository()
        {
            try
            {
                var db = new AmazonDynamoDBClient(new AmazonDynamoDBConfig());
                //get badges storage
                _client = GetTable(db);
                if (_client == null)
                {
                    //the table does not exist - create
                    _client = CreateTable(db);
                }

                //make sure it is initialised
                while (true)
                {
                    var request = db.DescribeTable(TABLE);
                    if (request.Table.TableStatus != TableStatus.ACTIVE)
                    {
                        Task.Delay(1000).Wait();
                    }
                    else
                    {
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to create DynamoDB client", ex);
            }
        }

        protected Document NewRecord(string recordType, string id = null)
        {
            var doc = new Document();
            doc[Mapper.type] = recordType;
            doc[Mapper.id] = string.IsNullOrEmpty(id) ? Guid.NewGuid().ToString() : id;

            return doc;
        }

        protected IEnumerable<Document> getReferencedItems(string fkName, string fkValue)
        {
            //we cannot search without partition key - so get all registered partition keys and search for them
            return Repositories.SelectMany(r => getReferencedItemsOfType(r.Key, fkName, fkValue)).ToList();
        }

        protected IEnumerable<Document> getReferencedItemsOfType(string type, string fkName, string fkValue)
        {
            var search = _client.Query(type, new QueryFilter(fkName, QueryOperator.Equal, fkValue));
            return search.GetRemaining();
        }


        protected IEnumerable<Document> Get(string type)
        {
            var search = _client.Query(type, new Expression());
            return search.GetRemaining();
        }

        protected Document Get(string type, string id)
        {
            var doc = _client.GetItem(type, id);
            if (doc == null)
            {
                throw new ApplicationException(string.Format("{0}#{1} does not exist", type, id));
            }
            return doc;
        }


        public abstract void Delete(string id);
    }
}