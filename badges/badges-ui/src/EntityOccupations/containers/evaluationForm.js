import {connect} from  'react-redux';
import {setTargetStageId} from '../actions';
import EvaluationForm from '../views/evaluationForm';

const emptyArray = [];

const mapStateToProps = (state, ownProps) => ({
    occupation: (state.occupations.list || emptyArray).find(x => x.id === ownProps.evaluateOccupationId),
    competencies: state.competencies.list || emptyArray,
    proficiencies: state.proficiencies.list || emptyArray,
    targetStageId: state.entityOccupations.targetStageId, 
    evaluation: state.entityOccupations.evaluations[ownProps.userId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onStageSelected: (stageId) => dispatch(setTargetStageId(stageId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluationForm);