import reducers, {defaultState} from '../reusable/reducers';

export const prefix = 'OCCUPATION_';

const filterFields = ['name'];

export default (state = {...defaultState, detailsTab: 0}, action) => {
    if (action.type.substring(0,prefix.length) === prefix) {
        const type = action.type.substring(prefix.length);

        switch (type) {
            case 'SHOW_DETAILS_TAB':
                return {...state, detailsTab: action.tab};
            case 'TOGGLE_NEW':
            case 'SET_DETAILS': {
                const a = {...action, type};
                const newState = reducers(state, a, filterFields);
                if (state.showId) {
                    return newState;
                }
                else {
                    //Reset the dialog to show the first tab
                    //unless it was alread showing another occupation before this action.
                    //That exception allows us to keep the same tab open
                    //when we scroll between occupations or update the dialog with stage/map data.
                    return {...newState, detailsTab: 0};
                }
            }
            default: {
                const a = {...action, type};
                return reducers(state, a, filterFields);
            }
        }
    }
    else {
        return state;
    }
};
