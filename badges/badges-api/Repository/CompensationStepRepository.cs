using badges_api.Mappers;
using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Repository
{
    public class CompensationStepRepository: Repository
    {
        public const string TYPE = "COMPENSATION_STEP";
        
        public IEnumerable<CompensationStep> Get()
        {
            return base.Get(TYPE).Select(r => CompensationStepMapper.ToObject(r)).ToList();
        }

        public CompensationStep Update(CompensationStep compensationStep)
        {
            //get the current compensation step
            var doc = base.Get(TYPE, compensationStep.id);

            //if the factor has changed we need to update others. We need to do it before we moved this step
            var oldFactor = doc[CompensationStepMapper.factor].AsInt();
            var newFactor = compensationStep.factor;
            if (oldFactor != newFactor)
            {
                //if there is a change in factor - reorder other compensation steps
                Get(TYPE)
                    .OrderBy(x => x[CompensationStepMapper.factor].AsInt())
                    .Select((step, i) => new {
                        step,
                        newFactor =  i < oldFactor && i < newFactor || i > oldFactor && i > newFactor
                            ? i
                            : i == oldFactor
                                ? newFactor
                                : newFactor > oldFactor
                                    ? i - 1
                                    : i + 1
                    })
                    .Where(x => 
                        x.step[CompensationStepMapper.factor].AsInt() != x.newFactor && 
                        x.step[CompensationStepMapper.id].AsString() != compensationStep.id //we will update the passed step later
                    ) 
                    .ToList()
                    .ForEach(x => {
                        x.step[CompensationStepMapper.factor] = x.newFactor;
                        _client.UpdateItem(x.step);
                    });
            }

            //update with the new values from the UI, including factor
            CompensationStepMapper.SetData(compensationStep, doc);
            _client.UpdateItem(doc);


            return CompensationStepMapper.ToObject(doc);
        }

        public override void Delete(string id)
        {
            var doc = base.Get(TYPE, id);

            //delete anything that references this compensation step
            var dependancies = getReferencedItems(CompensationStepMapper.compensationStepId, id);
            dependancies.ToList().ForEach(d => Repositories[d[Mapper.type]].First().Delete(d[Mapper.id]));

            _client.DeleteItem(doc);

            //we might need to move other items too
            Get(TYPE)
                .OrderBy(x => x[CompensationStepMapper.factor].AsInt())
                .Select((step, i) => new {
                    step,
                    newFactor = i
                })
                .Where(x =>
                    x.step[CompensationStepMapper.factor].AsInt() != x.newFactor
                )
                .ToList()
                .ForEach(x => {
                    x.step[CompensationStepMapper.factor] = x.newFactor;
                    _client.UpdateItem(x.step);
                });
        }

        public CompensationStep Create(CompensationStep compensationStep)
        {
            var doc = NewRecord(TYPE);
            CompensationStepMapper.SetData(compensationStep, doc);

            //we might need to move other items too
            Get(TYPE)
                .OrderBy(x => x[CompensationStepMapper.factor].AsInt())
                .Select((step, i) => new {
                    step,
                    newFactor = i < doc[CompensationStepMapper.factor].AsInt()
                            ? i
                            : i + 1
                })
                .Where(x =>
                    x.step[CompensationStepMapper.factor].AsInt() != x.newFactor
                )
                .ToList()
                .ForEach(x => {
                    x.step[CompensationStepMapper.factor] = x.newFactor;
                    _client.UpdateItem(x.step);
                });

            //add the new item
            _client.PutItem(doc);
            return CompensationStepMapper.ToObject(doc);
        }

    }
}