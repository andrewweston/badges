import actions from '../actions';
import {getPerson} from '../api';
import list from '../../reusable/containers/list';
import EntityList from '../views/entityList';

const extraProps = state => ({
    entityOccupations: state.entityOccupations.list,
    entityStages: state.entityOccupations.stages,
    occupations: state.occupations.list,
    compensationTiers: state.compensationTiers.list
})

export default list({
    View: EntityList,
    stateName: 'entities',
    actions,
    getAPI: getPerson,
    extraProps
});
