export default (state = {}, action) => {
    switch (action.type) {
        case 'MY_SET':
            return action.data;
        default:
            return state;
    }
};
