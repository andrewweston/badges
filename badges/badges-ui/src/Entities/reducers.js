import reducers, {defaultState} from '../reusable/reducers';

export const prefix = 'PERSON_';

const filterFields = ['name','email'];

export default (state = {...defaultState}, action) => {
    if (action.type.substring(0,prefix.length) === prefix) {
        const type = action.type.substring(prefix.length);
        const a = {...action, type};
        return reducers(state, a, filterFields);
    }
    else {
        return state;
    }
};
