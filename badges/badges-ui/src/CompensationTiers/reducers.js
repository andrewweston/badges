import reducers,  {defaultState} from '../reusable/reducers';

export const prefix = 'COMPENSATION_TIER_';
export const compensationStep = 'COMPENSATION_STEP_';

const filterFields = ['name'];

export default (state = {
    ...defaultState,  orderBy: 'factor',
    compensationSteps: {...defaultState, orderBy: 'factor'}
}, action) => {
    if (action.type.substring(0,prefix.length) === prefix) {
        const type = action.type.substring(prefix.length);
        switch (type) {
            default:
                return reducers(state, {...action, type}, filterFields);
        }
    }
    else if (action.type.substring(0,compensationStep.length) === compensationStep) {
        const type = action.type.substring(compensationStep.length);
        switch (type) {
            default:
                return {...state, compensationSteps: reducers(state.compensationSteps, {...action, type}, filterFields)};
        }
    }
    else {
        return state;
    }
};
