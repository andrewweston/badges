import actions from '../actions';
import {updateOccupation, deleteOccupation, getOccupation} from '../api';
import details from '../../reusable/containers/details';
import OccupationDetails from '../views/occupationDetails';

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.show()),
    onShowOccupation: occupation => {
        getOccupation(occupation.id).then(data => dispatch(actions.show(data)));
        dispatch(actions.show(occupation));
    },
    onUpdate: (occupation) => updateOccupation(occupation.id, occupation)
        .then(data => dispatch(actions.show(data))),
    onToggleDeleteDialog: () => dispatch(actions.toggleDeleteDialog()) ,
    onDelete: (occupation, showOnDelete) => deleteOccupation(occupation)
        .then(() => {
            dispatch(actions.toggleDeleteDialog());
            if (showOnDelete) {
                dispatch(actions.show());
            }
            else {
                dispatch(actions.show(showOnDelete));
            }
            dispatch(actions.remove(occupation));
        })
});

export default details({
    View: OccupationDetails,
    stateName: 'occupations',
    mapDispatchToProps
});
