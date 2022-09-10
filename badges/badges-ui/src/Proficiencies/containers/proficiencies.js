import {getProficiencies} from '../api';
import actions from '../actions';
import screen from '../../reusable/containers/screen';
import Proficiencies from '../views/proficiencies';

const onLoad = dispatch => {
    dispatch(actions.setLoading(true));
    return getProficiencies()
        .then(data => {
            dispatch(actions.setLoading(false));
            dispatch(actions.setList(data));
        });
};

export default screen({
    View: Proficiencies,
    stateName: 'proficiencies',
    actions,
    onLoad,
    options: [{name: 'proficiency level'}]
});
