import actions from '../actions';
import {getOccupation} from '../api';
import list from '../../reusable/containers/list';
import OccupationList from '../views/occupationList';

const emptyArray = [];

const extraProps = state => ({
    competencies: state.competencies.list || emptyArray
});

export default list({
    View: OccupationList,
    stateName: 'occupations',
    actions,
    getAPI: getOccupation,
    extraProps
});
