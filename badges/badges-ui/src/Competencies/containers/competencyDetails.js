import actions from '../actions';
import {updateCompetency, deleteCompetency, getTags} from '../api';
import details from '../../reusable/containers/details';
import CompetencyDetails from '../views/competencyDetails';

const extraProps = state => ({
    tags: state.competencies.tags
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.show()),
    onShowCompetency: competency => dispatch(actions.show(competency)),
    onUpdate: competency => updateCompetency(competency.id, competency)
        .then(data => {
            dispatch(actions.show(data));
            return getTags();
        })
        .then(data => dispatch(actions.tags.setList(data))),
    onToggleDeleteDialog: () => dispatch(actions.toggleDeleteDialog()) ,
    onDelete: (competency, showOnDelete) => deleteCompetency(competency)
        .then(() => {
            dispatch(actions.toggleDeleteDialog());
            if (showOnDelete < 0) {
                dispatch(actions.show());
            }
            else {
                dispatch(actions.show(showOnDelete));
            }
            dispatch(actions.remove(competency));
        })
});

export default details({
    View: CompetencyDetails,
    stateName: 'competencies',
    mapDispatchToProps,
    extraProps
});
