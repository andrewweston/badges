import {connect} from  'react-redux';

const mapStateToProps = (stateName, extraProps) => (state, ownProps) => ({
    list: state[stateName].filteredList,
    orderBy: state[stateName].orderBy,
    order: state[stateName].order,
    ...extraProps && extraProps(state, ownProps)
});

const mapDispatchToProps = (actions, getAPI,  extraHandlers) => (dispatch, ownProps) => ({
    onSort: orderBy => dispatch(actions.order(orderBy)),
    onSelect: item => {
        getAPI && getAPI(item.id).then(data => dispatch(actions.show({...item, ...data})));
        dispatch(actions.show(item));
    },
    ...extraHandlers && extraHandlers(dispatch, ownProps)
});

export default ({View, stateName, actions, getAPI, extraProps, extraHandlers}) => connect(
    mapStateToProps(stateName, extraProps),
    mapDispatchToProps(actions, getAPI, extraHandlers)
)(View);
