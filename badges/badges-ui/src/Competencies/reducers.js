import reducers, {defaultState} from '../reusable/reducers';

export const prefix = 'COMPETENCY_';
export const prefixProficiencyMap = 'PROFICIENCY_MAP_';
export const prefixTag = 'TAG_';

const filterFields = ['name','description'];
const superFilter = tags => (item, result, filterString) => result || item.tags.find(t => {
    const tag = tags.find(x => x.id === t);
    return tag && tag.name.toLowerCase().indexOf(filterString.toLowerCase()) >= 0;
});

export default (state = {...defaultState, proficiencyMap: {}, compensationSelector: {}}, action) => {
    if (action.type.substring(0,prefix.length) === prefix) {
        const type = action.type.substring(prefix.length);
        switch (type) {
            case 'TOGGLE_SELECTOR':
                return {...state, showSelector: action.show, selection: {}};
            case 'TOGGLE_SELECTION':
                return {...state, selection: {...state.selection, [action.id]: action.selected}};
            default:
                return reducers(state, {...action, type}, filterFields, superFilter(state.tags));
        }
    }
    else if (action.type.substring(0,prefixProficiencyMap.length) === prefixProficiencyMap) {
        const type = action.type.substring(prefixProficiencyMap.length);
        switch (type) {
            case 'SET_LIST':
                return {...state, proficiencyMap: action.data.reduce((r,i) => ({
                    ...r,
                    [i.competencyId]: {...r[i.competencyId], [i.proficiencyId]: i.compensationTierId}
                }), {})};
            case 'TOGGLE_SELECTOR':
                return {...state, compensationSelector: {show: !state.compensationSelector.show, ...action.data}};
            case 'UPDATE_ITEM':
                return {
                    ...state,
                    proficiencyMap: {
                        ...state.proficiencyMap,
                        [action.data.competencyId]: {
                            ...state.proficiencyMap[action.data.competencyId],
                            [action.data.proficiencyId]: action.data.compensationTierId
                        }
                    }
                };
            default:
                return state;
        }
    }
    else if (action.type.substring(0, prefixTag.length) === prefixTag) {
        const type = action.type.substring(prefixTag.length);
        switch (type) {
            case 'SET_LIST':
                return {...state, tags: action.data};
            default:
                return state;
        }
    }
    else {
        return state;
    }
};
