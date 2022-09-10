import actions from '../actions';
import {updateCompensationStep, deleteCompensationStep, getCompensationSteps} from '../api';
import details from '../../reusable/containers/details';
import CompensationStepDetails from '../views/compensationStepDetails';

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.compensationSteps.show()),
    onShowCompensationStep: compensationStep => dispatch(actions.compensationSteps.show(compensationStep)),
    onUpdate: compensationStep => updateCompensationStep(compensationStep.id, compensationStep)
        .then(data => {
            dispatch(actions.compensationSteps.show(data));
            //the change might have reordered stels - request the full list
            getCompensationSteps().then(list => dispatch(actions.compensationSteps.setList(list)));
        }),
    onToggleDeleteDialog: () => dispatch(actions.compensationSteps.toggleDeleteDialog()) ,
    onDelete: (compensationStep, showOnDelete) => deleteCompensationStep(compensationStep)
        .then(() => {
            dispatch(actions.compensationSteps.toggleDeleteDialog());
            if (showOnDelete) {
                dispatch(actions.compensationSteps.show());
            }
            else {
                dispatch(actions.compensationSteps.show(showOnDelete));
            }
            dispatch(actions.compensationSteps.remove(compensationStep));
            //the change might have reordered stels - request the full list
            getCompensationSteps().then(list => dispatch(actions.compensationSteps.setList(list)));
        })
});

export default details({
    View: CompensationStepDetails,
    stateName: 'compensationTiers.compensationSteps',
    mapDispatchToProps
});
