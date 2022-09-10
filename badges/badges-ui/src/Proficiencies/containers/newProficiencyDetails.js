import {connect} from  'react-redux';
import actions from '../actions';
import {createProficiency} from '../api';
import NewProficiencyDetails from '../views/newProficiencyDetails';
import scrollIntoView from '../../reusable/scrollIntoView';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.toggleShowNew()),
    onCreate: proficiency => createProficiency(proficiency)
        .then(data => {
            dispatch(actions.appendList(data));
            dispatch(actions.toggleShowNew());
            scrollIntoView(data.id);
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProficiencyDetails);
