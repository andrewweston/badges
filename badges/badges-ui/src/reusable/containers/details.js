import {connect} from  'react-redux';

const getState = (state, stateName) => (stateName.indexOf('.') >= 0
    ? getState(state[stateName.substring(0, stateName.indexOf('.'))], stateName.substring(stateName.indexOf('.') + 1))
    : state[stateName]
);

const mapStateToProps = (stateName, extraProps) => (state, ownProps) => {
    const data = getState(state,stateName);
    const idx = data.filteredList && data.showId
        ? data.filteredList.map((b, i) => ({id: b.id, i})).find(b => b.id === data.showId).i
        : null;
    let showOnDelete = null;
    if (data.showDeleteDialog && data.filteredList.length > 1) {
        showOnDelete = (idx === data.filteredList.length - 1
            ? data.filteredList[idx - 1]
            : data.filteredList[idx + 1]
        );
    }
    const props = {
        item: idx >= 0 ? data.filteredList[idx] : null,
        prevItem: idx >= 1 ? data.filteredList[idx - 1] : null,
        nextItem: idx <= data.filteredList.length ? data.filteredList[idx + 1] : null,
        showDeleteDialog: data.showDeleteDialog,
        showOnDelete
    };

    return ({
        ...props,
        ...extraProps && extraProps(state, {...ownProps, ...props})
    });
};

export default ({View, stateName, extraProps, mapDispatchToProps}) => connect(
    mapStateToProps(stateName, extraProps),
    mapDispatchToProps
)(View);
