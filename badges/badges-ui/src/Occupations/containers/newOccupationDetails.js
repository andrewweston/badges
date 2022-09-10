import {connect} from  'react-redux';
import actions from '../actions';
import {createOccupation} from '../api';
import NewOccupationDetails from '../views/newOccupationDetails';
import scrollIntoView from '../../reusable/scrollIntoView';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.toggleShowNew()),
    onCreate: occupation => createOccupation(occupation)
        .then(data => {
            dispatch(actions.appendList(data));
            dispatch(actions.toggleShowNew());
            scrollIntoView(data.id);
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewOccupationDetails);
