export default (prefix) => ({
    setList: (list, sortField, sortDirection) => ({
        type: `${prefix}SET_LIST`,
        list, sortField, sortDirection
    }),
    order: orderBy => ({
        type: `${prefix}SET_ORDER`,
        orderBy
    }),
    show: item => ({
        type: `${prefix}SET_DETAILS`,
        item, show:true
    }),
    setDetails: item => ({
        type: `${prefix}SET_DETAILS`,
        item, show:false
    }),
    toggleShowNew: item => ({
        type: `${prefix}TOGGLE_NEW`,
        item
    }),
    appendList: item => ({
        type: `${prefix}APPEND_LIST`,
        item
    }),
    remove: item => ({
        type: `${prefix}DELETE`,
        item
    }),
    toggleDeleteDialog: () => ({
        type: `${prefix}TOGGLE_DELETE_DIALOG`
    }),
    setLoading: loading => ({
        type: `${prefix}SET_LOADING`,
        loading
    }),
    setFilter: filter => ({
        type: `${prefix}SET_FILTER`,
        filter
    })
});
