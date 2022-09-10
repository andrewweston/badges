export default (state = {}, action) => {
    switch (action.type) {
        case 'OCCUPATION_STAGE_TOGGLE_SELECTOR':
            return {...state, compensationSelector: action.stageId && {id: action.stageId, value: action.compensationTierId}};
        default:
            return state;
    }
};