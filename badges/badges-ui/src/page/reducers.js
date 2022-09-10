export default (state = {drawerOpen: true}, action) => {
    switch (action.type) {
        case 'PAGE_TOGGLE_DRAWER':
            return {...state, drawerOpen: action.open === true || action.open === false ? action.open : !state.drawerOpen};
        default:
            return state;
    }
};
