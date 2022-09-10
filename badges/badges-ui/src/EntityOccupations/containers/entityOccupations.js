import lifecycle from 'react-pure-lifecycle';
import {connect} from  'react-redux';
import {loadOnMount} from '../../reusable/lifecycleMethods';
import {getCompetencies, setCompetencyList} from '../../Competencies';
import {getProficiencies, setProficiencyList} from '../../Proficiencies';
import {getOccupations, getOccupation, setOccupationList, setOccupationDetails} from '../../Occupations';
import {
    getEntityOccupations, 
    getMyOccupations, 
    saveMyOccupations, 
    saveEntityOccupations, 
    saveMyEvaluation, 
    saveEntityEvaluation,
    getMyEvaluation,
    getEntityEvaluation
} from '../api';
import {setEntityOccupations, toggleEditor, evaluate, setEvaluation} from '../actions';
import EntityOccupations from '../views/entityOccupations';

const emptyArray = [];
const emptyObject = {};

const mapStateToProps = (state, ownProps) => ({
    entityOccupations: state.entityOccupations.list && state.entityOccupations.list[ownProps.userId] || emptyArray,
    entityStages: state.entityOccupations.stages && state.entityOccupations.stages[ownProps.userId] || emptyObject,
    showEditor: state.entityOccupations.showEditor,
    evaluateOccupationId: state.entityOccupations.evaluateOccupationId,
    occupations: state.occupations.list || emptyArray,
    compensationTiers: state.compensationTiers.list
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad: () => (ownProps.my ? getMyOccupations() : getEntityOccupations(ownProps.userId))
            .then(data => dispatch(setEntityOccupations(ownProps.userId, data.occupationIds, data.stages))),
    onToggleEditor: () => dispatch(toggleEditor()),
    onUpdate: (selection) => (ownProps.my ? saveMyOccupations(selection) : saveEntityOccupations(ownProps.userId, selection))
        .then(data => {
            dispatch(setEntityOccupations(ownProps.userId, data.occupationIds, data.stages));
            dispatch(toggleEditor());
        }),
    onEvaluate: (occupationId, targetStageId) => occupationId
        ? Promise.all([
            (ownProps.my ? getMyEvaluation() : getEntityEvaluation(ownProps.userId))
                .then(data => dispatch(setEvaluation(
                    ownProps.userId, 
                    (data || []).reduce((r,i) => ({...r,[i.competencyId]: i.proficiencyId}), {})
                ))),
            getOccupation(occupationId).then(data => dispatch(setOccupationDetails(data)))
        ])
            .then(() => dispatch(evaluate(occupationId, targetStageId)))
        : dispatch(evaluate()),
    onSubmitEvaluation: (values, props) => {
        const data = Object.keys(values).filter(k => values[k]).map(k => ({ competencyId: k, proficiencyId: values[k] }));
        return (ownProps.my ? saveMyEvaluation(data) : saveEntityEvaluation(ownProps.userId, data))
            .then(() => evaluate())
            .then(() => (ownProps.my ? getMyOccupations() : getEntityOccupations(ownProps.userId)))
            .then(data => dispatch(setEntityOccupations(ownProps.userId, data.occupationIds, data.stages))
        );
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(lifecycle(loadOnMount)(EntityOccupations));