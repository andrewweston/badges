import {connect} from  'react-redux';
import actions from '../actions';
import {createCompensationTier} from '../api';
import NewCompensationTierDetails from '../views/newCompensationTierDetails';
import scrollIntoView from '../../reusable/scrollIntoView';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.toggleShowNew()),
    onCreate: compensationTier => createCompensationTier(compensationTier)
        .then(data => {
            dispatch(actions.appendList(data));
            dispatch(actions.toggleShowNew());
            scrollIntoView(data.id);
        })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCompensationTierDetails);
