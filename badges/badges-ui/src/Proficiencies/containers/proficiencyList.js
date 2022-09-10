import actions from '../actions';
import {updateProficiency} from '../api';
import list from '../../reusable/containers/list';
import ProficiencyList from '../views/proficiencyList';

const extraHandlers = dispatch => ({
    onReorder: (data, newIndex, oldIndex) => Promise.all(data.map((r,i) => {
        if (
            i < oldIndex && i < newIndex ||
            i > oldIndex && i > newIndex
        ) {
            return updateProficiency(r.id, {...r, factor: i});
        }
        else if (i === oldIndex) {
            return updateProficiency(r.id, {...r, factor: newIndex});
        }
        else if (newIndex > oldIndex) {
            return updateProficiency(r.id, {...r, factor: i - 1});
        }
        else {
            return updateProficiency(r.id, {...r, factor: i + 1});
        }
    }))
        .then(results => dispatch(actions.setList(results)))
});

export default list({
    View: ProficiencyList,
    stateName: 'proficiencies',
    actions,
    extraHandlers
});
