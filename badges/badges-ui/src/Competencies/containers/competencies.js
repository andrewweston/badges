import {getCompetencies, getTags} from '../api';
import actions from '../actions';
import screen from '../../reusable/containers/screen';
import {getOccupations, setOccupationList} from '../../Occupations';
import Competencies from '../views/competencies';

const onLoad = dispatch => {
    dispatch(actions.setLoading(true));
    return Promise.all([
        getCompetencies().then(data => dispatch(actions.setList(data))),
        getTags().then(data => dispatch(actions.tags.setList(data))),
        getOccupations().then(data => dispatch(setOccupationList(data)))
    ])
        .then(() => dispatch(actions.setLoading(false)));
};

export default screen({
    View: Competencies,
    stateName: 'competencies',
    actions,
    onLoad,
    options: [{name: 'competency'}]
});
