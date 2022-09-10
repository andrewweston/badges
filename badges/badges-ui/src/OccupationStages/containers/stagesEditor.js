import {connect} from 'react-redux';
import {toggleSelector} from '../actions';
import StagesEditor from '../views/stagesEditor';

const emptyArray = [];

const mapStateToProps = (state) => ({
    compensationSelector: state.occupationStages.compensationSelector,
    compensationTiers: state.compensationTiers.list || emptyArray,
});

const mapDispatchToProps = (dispatch) => ({
    onToggleCompensationSelector: (stageId, compensationTierId) => dispatch(toggleSelector(stageId, compensationTierId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StagesEditor);
