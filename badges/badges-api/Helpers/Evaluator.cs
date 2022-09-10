using badges_api.Models;
using System.Collections.Generic;
using System.Linq;

namespace badges_api.Helpers
{
    public class Evaluator
    {
        public static string getStage(
            IEnumerable<Badge> badges,
            IEnumerable<Proficiency> proficiencies,  
            IEnumerable<ProficiencyMap> map, 
            Occupation occupation,
            IEnumerable<OccupationCompetency> competencies,
            IEnumerable<OccupationStage> stages
        ) {
            //1. order proficiencies
            var proficiencyFactorOffset = proficiencies.Select(p => p.factor).DefaultIfEmpty(0).Min();
            var proficiencyFactorLookup = proficiencies.ToLookup(p => p.id, p => p.factor + 1 - proficiencyFactorOffset);
            //2. get list of competencies with achieved proficiency factor
            var achievement = competencies.ToLookup(c => c.competencyId, c => badges
                .Where(b => b.competencyId == c.competencyId)
                .Select(b => proficiencyFactorLookup[b.proficiencyId].SingleOrDefault())
                .SingleOrDefault() //zero means no badge - below the lowest proficiency with calculated factor 1
            );
            //3. order stages
            var stageFactorOffset = stages.Select(p => p.factor).DefaultIfEmpty(0).Min();
            var stageFactorLookup = stages.ToLookup(s => s.id, s => s.factor + 1 - stageFactorOffset);
            //4. convert proficiency map to achieved/non-achieved view
            var boolMap = map.Select(m => new
            {
                factor = stageFactorLookup[m.occupationStageId].SingleOrDefault(),
                m.occupationStageId,
                m.competencyId,
                achieved = proficiencyFactorLookup[m.proficiencyId].SingleOrDefault() <= achievement[m.competencyId].SingleOrDefault()
            }).ToList();
            //5. add ommited values to the map - the stage with no requirement is achieved when the previous stage is achieved
            var stagesMap = stages.Select(s => new {
                s.id,
                map = competencies.Select(c => new {
                    c.competencyId,
                    c.category,
                    achieved = boolMap
                        .Where(m => m.occupationStageId == s.id && m.competencyId == c.competencyId)
                        .Select(m => m.achieved)
                        .DefaultIfEmpty(boolMap
                            .Where(x => x.competencyId == c.competencyId && x.factor < stageFactorLookup[s.id].SingleOrDefault())
                            .OrderBy(x => x.factor)
                            .Select(x => x.achieved)
                            .DefaultIfEmpty(true)
                            .LastOrDefault()
                        )
                        .SingleOrDefault()
                }).ToList()
            }).ToList();
            //6. calculate whether each of the stages is achieved
            var stagesAchieved = stagesMap
                .Where(s => s.map.Count(c => c.category == Mappers.OccupationCompetencyMapper.Category.required && !c.achieved) == 0 && s.map.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required && c.achieved) >= occupation.optionsCount)
                .Select(s => s.id)
                .ToList();
            //7. get the max achieved stage
            var stage = stagesAchieved.OrderBy(s => stageFactorLookup[s].SingleOrDefault()).LastOrDefault();
            //8. if no stage is achieved check if all competencies have been marked
            if (stage == null)
            {
                if (competencies.Count(c => c.category == Mappers.OccupationCompetencyMapper.Category.required && badges.Count(b => b.competencyId == c.competencyId) == 0) > 0) {
                    //some core competencies are not marked - not evaluted
                    stage = "Not Evaluated";
                }
                else if (competencies.Count(c => c.category != Mappers.OccupationCompetencyMapper.Category.required && badges.Count(b => b.competencyId == c.competencyId) > 0) < occupation.optionsCount)
                {
                    //not enough options are marked - not evaluted
                    stage = "Not Evaluated";
                }
                else
                {
                    //evaluation complete but too low - not qualified
                    stage = "Not Qualified";
                }
            }
            //9. return the max achieved stage
            return stage;
        }
    }
}