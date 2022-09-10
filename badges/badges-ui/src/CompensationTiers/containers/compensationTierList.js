import actions from '../actions';
import list from '../../reusable/containers/list';
import CompensationTierList from '../views/compensationTierList';
import {updateCompensationTier} from '../api';

const extraProps = state => ({
    compensationSteps: state.compensationTiers.compensationSteps.list
});

const extraHandlers = dispatch => ({
    onSelectCompensationStep: item => dispatch(actions.compensationSteps.show(item)),
    onReorder: (data, newIndex, oldIndex) => Promise.all(data.map((r,i) => {
        if (
            i < oldIndex && i < newIndex ||
            i > oldIndex && i > newIndex
        ) {
            if (r.factor !== i) {
                return updateCompensationTier(r.id, {...r, factor: i});
            }
            else {
                return Promise.resolve(r);
            }
        }
        else if (i === oldIndex) {
            if (r.factor !== newIndex) {
                return updateCompensationTier(r.id, {...r, factor: newIndex});
            }
            else {
                return Promise.resolve(r);
            }
        }
        else if (newIndex > oldIndex) {
            if (r.factor !== i - 1) {
                return updateCompensationTier(r.id, {...r, factor: i - 1});
            }
            else {
                return Promise.resolve(r);
            }
        }
        else if (r.factor !== i + 1) {
            return updateCompensationTier(r.id, {...r, factor: i + 1});
        }
        else {
            return Promise.resolve();
        }
    }))
        .then(results => dispatch(actions.setList(results)))
});

export default list({
    View: CompensationTierList,
    stateName: 'compensationTiers',
    actions,
    extraProps,
    extraHandlers
});
