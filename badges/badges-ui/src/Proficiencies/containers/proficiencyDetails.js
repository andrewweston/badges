import actions from '../actions';
import {updateProficiency, deleteProficiency} from '../api';
import details from '../../reusable/containers/details';
import ProficiencyDetails from '../views/proficiencyDetails';

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.show()),
    onShowProficiency: proficiency => dispatch(actions.show(proficiency)),
    onUpdate: proficiency => updateProficiency(proficiency.id, proficiency)
        .then(data => dispatch(actions.show(data))),
    onToggleDeleteDialog: () => dispatch(actions.toggleDeleteDialog()) ,
    onDelete: (proficiency, showOnDelete) => deleteProficiency(proficiency)
        .then(() => {
            dispatch(actions.toggleDeleteDialog());
            if (showOnDelete < 0) {
                dispatch(actions.show());
            }
            else {
                dispatch(actions.show(showOnDelete));
            }
            dispatch(actions.remove(proficiency));
        })
});

export default details({
    View: ProficiencyDetails,
    stateName: 'proficiencies',
    mapDispatchToProps
});
