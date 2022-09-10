import actions from '../actions';
import list from '../../reusable/containers/list';
import CompetenciesEditor from '../views/competenciesEditor';

const emptyObject = {};

const extraProps = (state) => ({
    showSelector: state.competencies.showSelector,
    addSelection: state.competencies.selection || emptyObject
});

const extraHandlers = (dispatch) => ({
    onToggleSelector: show => dispatch(actions.toggleSelector(show)),
    onToggleSelection: (id, selected) => dispatch(actions.toggleSelection(id, selected))
});

export default list({
    View: CompetenciesEditor,
    stateName: 'competencies',
    actions,
    extraProps,
    extraHandlers
});
