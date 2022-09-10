import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {connectRouter} from 'connected-react-router';
import page from './page/reducers';
import proficiencies from './Proficiencies/reducers';
import competencies from './Competencies/reducers';
import compensationTiers from './CompensationTiers/reducers';
import occupations from './Occupations/reducers';
import occupationStages from './OccupationStages/reducers';
import entities from './Entities/reducers';
import my from './My/reducers';
import entityOccupations from './EntityOccupations/reducers';

const reducer = history => combineReducers({
    router: connectRouter(history),
    form,
    page,
    proficiencies,
    competencies,
    compensationTiers,
    occupations,
    occupationStages,
    entities,
    my,
    entityOccupations
});

export default history => (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        const {routing} = state;
        return reducer(history)({routing}, action);
    }
    return reducer(history)(state, action);
};
