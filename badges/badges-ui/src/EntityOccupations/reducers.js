export default (state = { evaluations: {} }, action) => {
    switch (action.type) {
        case 'ENTITY_OCCUPATION_SET':
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.id]: action.ids
                },
                stages: {
                    ...state.stages,
                    [action.id]: action.stages
                },
                evaluateOccupationId: null
            };
        case 'ENTITY_OCCUPATION_SET_ALL':
            return {
                ...state,
                list: Object.keys(action.data).reduce((r, i) => ({ ...r, [i]: action.data[i].occupationIds }), {}),
                stages: Object.keys(action.data).reduce((r, i) => ({ ...r, [i]: action.data[i].stages }), {})
            }
        case 'ENITY_OCCUPATION_TOGGLE_EDITOR':
            return {
                ...state,
                showEditor: !state.showEditor
            };
        case 'ENTITY_OCCUPATION_EVALUATE':
            return {
                ...state,
                evaluateOccupationId: action.occupationId,
                targetStageId: action.targetStageId
            };
        case 'ENTITY_OCCUPATION_SET_EVALUATION':
            return {
                ...state,
                evaluations: {
                    ...state.evaluations, 
                    [action.userId]: action.evaluation
                }
            };
        case 'ENTITY_SET_TARGET_STAGE_ID':
            return {
                ...state,
                targetStageId: action.stageId
            };
        default:
            return state;
    }
};
