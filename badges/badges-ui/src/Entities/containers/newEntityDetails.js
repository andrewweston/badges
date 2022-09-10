import {connect} from 'react-redux';
import actions from '../actions';
import {toggleEditor} from '../../EntityOccupations';
import {createEntity} from '../api';
import NewEntityDetails from '../views/newEntityDetails';
import scrollIntoView from '../../reusable/scrollIntoView';

const mapStateToProps = state => ({
    occupations: state.occupations.list
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.toggleShowNew()),
    onCreate: entity => createEntity(entity)
        .then(data => {
            dispatch(actions.appendList(data));
            dispatch(actions.toggleShowNew());
            scrollIntoView(data.id);
        }),
    onChooseOccupations: () => dispatch(toggleEditor())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEntityDetails);
