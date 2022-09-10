import lifecycle from 'react-pure-lifecycle';
import {connect} from  'react-redux';
import {loadOnMount} from '../lifecycleMethods';

const mapStateToProps = (stateName, options) => state => {
    const  [mainOption, ...otherOptions] = options || [{}.undefined]; //eslint-disable-line no-unused-vars
    return ({
        showDetails: Boolean(state[stateName].showId),
        showOptionDetails: otherOptions
            .reduce((r,o) => ({...r, [o.stateKey]: Boolean(state[stateName][o.stateKey].showId)}), {}),
        showNewDialog: state[stateName].showNew,
        showNewOption: otherOptions.reduce((r,o) => ({...r, [o.stateKey]: Boolean(state[stateName][o.stateKey].showNew)}), {}),
        loading: state[stateName].loading,
        filter: state[stateName].filter,
        options
    });
};

const mapDispatchToProps = (actions, onLoad) => (dispatch, ownProps) => ({
    onLoad: () => onLoad(dispatch, ownProps),
    onCreate: option => dispatch((option ? actions[option] : actions).toggleShowNew()),
    onFilter: event => dispatch(actions.setFilter(event.target.value))
});

export default ({View, stateName, actions, onLoad, options}) => connect(
    mapStateToProps(stateName, options),
    mapDispatchToProps(actions, onLoad)
)(lifecycle(loadOnMount)(View));
