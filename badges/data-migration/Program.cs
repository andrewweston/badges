using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using System;
using System.Linq;

namespace data_migration
{
    class Program
    {
        private const string TABLE = "badges";
        private static Table _client;

        private static void RenameType(string oldType, string newType)
        {
            Console.WriteLine($"Renaming {oldType} to {newType}");

            var search = _client.Query(oldType, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                var doc = new Document();
                r.Keys.ToList().ForEach(k => doc[k] = r[k]);
                doc["type"] = newType;
                _client.PutItem(doc);
                _client.DeleteItem(r);
            });
        }

        private static void DeleteType(string type)
        {
            Console.WriteLine($"Deleting {type}");

            var search = _client.Query(type, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                _client.DeleteItem(r);
            });
        }

        private static void RenameProperty(string Type, string oldName, string newName)
        {
            Console.WriteLine($"Renaming {Type}.{oldName} to {Type}.{newName}");

            var search = _client.Query(Type, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                r[newName] = r[oldName];
                r[oldName] = null;
                _client.UpdateItem(r);
            });
        }

        private static void DeleteProperty(string Type, string name)
        {
            Console.WriteLine($"Deleting {Type}.{name}");

            var search = _client.Query(Type, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                r[name] = null;
                _client.UpdateItem(r);
            });
        }

        private static void InitProperty(string Type, string Name, string from = null, dynamic value = null, Func<Document, object> expression = null)
        {
            var wording = from != null ? "from {Type}.{fromName}" : "";
            Console.WriteLine($"Initializinf {Type}.{Name} {wording}");

            var search = _client.Query(Type, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                r[Name] = from == null && expression == null ? value : expression == null ? r[from] : expression(r);
                _client.UpdateItem(r);
            });
        }

        private static void RefactorProperty(string Type, string oldName, string oldType, string newName)
        {
            Console.WriteLine($"Refactoring {Type}.{oldName} from {oldType}.{newName}");

            var search = _client.Query(Type, new Expression()).GetRemaining();
            var data = _client.Query(oldType, new Expression()).GetRemaining();

            search.ForEach(r =>
            {
                r[newName] = data.Find(d => d["id"].AsString() == r[oldName].AsString())[newName];
                r[oldName] = null;
                _client.UpdateItem(r);
            });
        }

        static void Main(string[] args)
        {
            // Press Ctrl+F5 (or go to Debug > Start Without Debugging) to run your app.
            var db = new AmazonDynamoDBClient(new AmazonDynamoDBConfig());
            _client = Table.LoadTable(db, TABLE);

            InitProperty("OCCUPATION_COMPETENCY", "factor", null, 0); //, r => r["isCore"].AsBoolean() ? "required" : "desired");
            //RenameProperty("OCCUPATION_COMPETENCY", "categpry", "category");

            Console.WriteLine("All updates completed");
            Console.ReadKey();

            // Go to http://aka.ms/dotnet-get-started-console to continue learning how to build a console app! 
        }
    }
}
