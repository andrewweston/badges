import actions from '../actions';
import list from '../../reusable/containers/list';
import CompetencyList from '../views/competencyList';

const extraProps = state => ({
    occupations: state.occupations.list,
    tags: state.competencies.tags
});

export default list({
    View: CompetencyList,
    stateName: 'competencies',
    actions,
    extraProps
});
