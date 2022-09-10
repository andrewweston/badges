import reducers, {defaultState} from '../reusable/reducers';

export const prefix = 'PFOFICIENCY_';

const filterFields = ['name','description'];

export default (state = {...defaultState, orderBy: 'factor'}, action) => {
    if (action.type.substring(0,prefix.length) === prefix) {
        const type = action.type.substring(prefix.length);
        switch (action.type) {
            default:
                return reducers(state, {...action, type}, filterFields);
        }
    }
    else {
        return state;
    }
};
