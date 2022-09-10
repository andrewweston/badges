import sort from './sort';

export const defaultState = {
    filter: '',
    loading: false,
    orderBy: 'name',
    order: 'asc',
    search: false,
    showNew: false,
    showDeleteDialog: false
};

const filterField = (object, field, filter) => (field.indexOf('.') >= 0
    ? filterField(object[field.substring(0, field.indexOf('.'))], field.substring(field.indexOf('.') + 1), filter)
    : (object[field] || '').toLowerCase().includes(filter.toLowerCase())
);

const filterList = (list, filter, searchFields, orderBy, order, superFilter) => (filter
    ? list.filter(b => { 
        const result = searchFields.reduce((r,f) => r || filterField(b, f, filter), false);
        if (superFilter) {
            return superFilter(b, result, filter);
        }
        else {
            return result;
        }
    })
    : list
).sort(sort(order,orderBy));

export default (state = {...defaultState}, action, searchFields, superFilter) => { // eslint-disable-line complexity
    switch (action.type) {
        case 'SET_LIST':
            return {
                ...state,
                orderBy: action.sortField || state.orderBy,
                order: action.sortDirection || state.order,
                list: action.list,
                filteredList: filterList(
                    action.list,
                    state.filter,
                    searchFields,
                    action.sortField || state.orderBy,
                    action.sortDirection || state.order,
                    superFilter
                )
            };
        case 'SET_ORDER': {
            const order = state.orderBy === action.orderBy && state.order === 'asc' ? 'desc' : 'asc';
            return {
                ...state,
                orderBy: action.orderBy,
                order,
                filteredList: filterList(state.list, state.filter, searchFields, action.orderBy, order, superFilter)
            };
        }
        case 'SET_DETAILS': {
            const newList = action.item
                ? state.list.map(l => (l.id === action.item.id ? action.item : l))
                : state.list;
            return {
                ...state,
                showId: action.item && action.show ? action.item.id : null,
                list: newList,
                filteredList: filterList(newList, state.filter, searchFields, state.orderBy, state.order, superFilter)
            };
        }
        case 'TOGGLE_NEW':
            return {...state, showNew: !state.showNew, item: action.item};
        case 'APPEND_LIST': {
            const newList = [...state.list || [], action.item];
            return {
                ...state,
                list: newList,
                filteredList: filterList(newList, state.filter, searchFields, state.orderBy, state.order, superFilter)
            };
        }
        case 'DELETE': {
            const newList = (state.list || []).filter(l => l.id !== action.item.id);
            return {
                ...state,
                list: newList,
                filteredList: filterList(newList, state.filter, searchFields, state.orderBy, state.order, superFilter)
            };
        }
        case 'TOGGLE_DELETE_DIALOG':
            return {...state, showDeleteDialog: !state.showDeleteDialog};
        case 'SET_LOADING':
            return {...state, loading: action.loading};
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter,
                filteredList: filterList(state.list, action.filter, searchFields, state.orderBy, state.order, superFilter)
            };
        default:
            return state;
    }
};
