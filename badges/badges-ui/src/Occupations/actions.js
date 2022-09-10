import actions from '../reusable/actions';
import {prefix} from './reducers';

const occupationActions = actions(prefix);

occupationActions.showDetailsTab = tab => ({
    type: `${prefix}SHOW_DETAILS_TAB`,
    tab
});

export default occupationActions;
