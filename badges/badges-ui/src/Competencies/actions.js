import actions from '../reusable/actions';
import {prefix, prefixProficiencyMap, prefixTag} from './reducers';

const competencyActions = actions(prefix);

competencyActions.proficiencyMap = {
    setList: data => ({
        type: `${prefixProficiencyMap}SET_LIST`,
        data
    }),
    showSelector: (competencyId, proficiencyId) => ({
        type: `${prefixProficiencyMap}TOGGLE_SELECTOR`,
        data: {competencyId, proficiencyId}
    }),
    updateItem: data => ({
        type: `${prefixProficiencyMap}UPDATE_ITEM`,
        data
    })
};

competencyActions.toggleSelector = show => ({
    type: `${prefix}TOGGLE_SELECTOR`,
    show
});

competencyActions.toggleSelection = (id, selected) => ({
    type: `${prefix}TOGGLE_SELECTION`,
    id, selected
});

competencyActions.tags = {
    setList: data => ({
        type: `${prefixTag}SET_LIST`,
        data
    })
};

export default competencyActions;
