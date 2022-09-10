import {getCompetencies, setCompetencyList} from '../../Competencies';
import {getProficiencies, setProficiencyList} from '../../Proficiencies';
import {
    getCompensationTiers,
    getCompensationSteps,
    setCompensationTierList,
    setCompensationStepList
} from '../../CompensationTiers';
import {getOccupations} from '../api';
import actions from '../actions';
import screen from '../../reusable/containers/screen';
import Occupations from '../views/occupations';

const onLoad = dispatch => {
    dispatch(actions.setLoading(true));
    return Promise.all([
        getOccupations().then(data => dispatch(actions.setList(data))),
        getCompetencies().then(data => dispatch(setCompetencyList(data))),
        getCompensationTiers().then(data => dispatch(setCompensationTierList(data))),
        getCompensationSteps().then(data => dispatch(setCompensationStepList(data))),
        getProficiencies().then(data => dispatch(setProficiencyList(data))),
    ])
        .then(() => dispatch(actions.setLoading(false)));
};

export default screen({
    View: Occupations,
    stateName: 'occupations',
    actions,
    onLoad,
    options: [{name: 'occupation series'}]
});
