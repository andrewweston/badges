export const setEntityOccupations = (id, ids, stages) => ({
    type: 'ENTITY_OCCUPATION_SET',
    id, ids, stages
});

export const setAllEntityOccupations = data => ({
    type: 'ENTITY_OCCUPATION_SET_ALL',
    data
});

export const toggleEditor = () => ({
    type: 'ENITY_OCCUPATION_TOGGLE_EDITOR'
});

export const evaluate = (occupationId, targetStageId) => ({
    type: 'ENTITY_OCCUPATION_EVALUATE',
    occupationId, targetStageId
});

export const setEvaluation = (userId, evaluation) => ({
    type: 'ENTITY_OCCUPATION_SET_EVALUATION',
    userId, evaluation
});

export const setTargetStageId = (stageId) => ({
    type: 'ENTITY_SET_TARGET_STAGE_ID',
    stageId
});