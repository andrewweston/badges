import actions from '../actions';
import {updateCompensationTier, deleteCompensationTier} from '../api';
import details from '../../reusable/containers/details';
import CompensationTierDetails from '../views/compensationTierDetails';

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.show()),
    onShowCompensationTier: compensationTier => dispatch(actions.show(compensationTier)),
    onUpdate: compensationTier => updateCompensationTier(compensationTier.id, compensationTier)
        .then(data => dispatch(actions.show(data))),
    onToggleDeleteDialog: () => dispatch(actions.toggleDeleteDialog()) ,
    onDelete: (compensationTier, showOnDelete) => deleteCompensationTier(compensationTier)
        .then(() => {
            dispatch(actions.toggleDeleteDialog());
            if (showOnDelete) {
                dispatch(actions.show());
            }
            else {
                dispatch(actions.show(showOnDelete));
            }
            dispatch(actions.remove(compensationTier));
        })
});

export default details({
    View: CompensationTierDetails,
    stateName: 'compensationTiers',
    mapDispatchToProps
});
