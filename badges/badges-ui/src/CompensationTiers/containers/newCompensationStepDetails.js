import {connect} from  'react-redux';
import actions from '../actions';
import {createCompensationStep, getCompensationSteps} from '../api';
import NewCompensationStepDetails from '../views/newCompensationStepDetails';

const mapStateToProps = (state) => ({
    factor: state.compensationTiers.compensationSteps.list.length + 1
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.compensationSteps.toggleShowNew()),
    onCreate: compensationStep => createCompensationStep(compensationStep)
        .then(() => {
            //the new compensation step might have been put in the middle of the list - request the full list
            getCompensationSteps().then(data => dispatch(actions.compensationSteps.setList(data)));
            //dispatch(actions.compensationSteps.appendList(data));
            dispatch(actions.compensationSteps.toggleShowNew());
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCompensationStepDetails);
