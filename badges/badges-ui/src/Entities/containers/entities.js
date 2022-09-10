import {
    getCompensationTiers,
    getCompensationSteps,
    setCompensationTierList,
    setCompensationStepList
} from '../../CompensationTiers';
import {getCompetencies, setCompetencyList} from '../../Competencies';
import {getProficiencies, setProficiencyList} from '../../Proficiencies';
import {getOccupations, setOccupationList} from '../../Occupations';
import {getEntityOccupations, setAllEntityOccupations} from '../../EntityOccupations';
import {getPerson} from '../api';
import actions from '../actions';
import screen from '../../reusable/containers/screen';
import Entities from '../views/entities';

const onLoad = dispatch => {
    dispatch(actions.setLoading(true));
    return Promise.all([
        getPerson().then(data => dispatch(actions.setList(data))),
        getCompetencies().then(data => dispatch(setCompetencyList(data))),
        getProficiencies().then(data => dispatch(setProficiencyList(data))),
        getOccupations().then(data => dispatch(setOccupationList(data))),
        getCompensationTiers().then(data => dispatch(setCompensationTierList(data))),
        getCompensationSteps().then(data => dispatch(setCompensationStepList(data))),
        getEntityOccupations().then(data => dispatch(setAllEntityOccupations(data)))
    ])
        .then(() => dispatch(actions.setLoading(false)));
};

export default screen({
    View: Entities,
    stateName: 'entities',
    actions,
    onLoad,
    options: [{ name: 'entity' }]
});
