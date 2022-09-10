import {connect} from  'react-redux';
import actions from '../actions';
import {createCompetency, getTags} from '../api';
import NewCompetencyDetails from '../views/newCompetencyDetails';
import scrollIntoView from '../../reusable/scrollIntoView';

const mapStateToProps = (state) => ({
    tags: state.competencies.tags
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.toggleShowNew()),
    onCreate: competency => createCompetency(competency)
        .then(data => {
            dispatch(actions.appendList(data));
            dispatch(actions.toggleShowNew());
            scrollIntoView(data.id);
            return getTags();
        })
        .then(data => dispatch(actions.tags.setList(data))),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCompetencyDetails);
