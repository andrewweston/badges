import lifecycle from 'react-pure-lifecycle';
import {connect} from  'react-redux';
import {loadOnMount} from '../../reusable/lifecycleMethods';
import {toggleEditor} from '../../EntityOccupations';
import { getCompetencies, setCompetencyList } from '../../Competencies';
import { getProficiencies, setProficiencyList } from '../../Proficiencies';
import { getOccupations, setOccupationList } from '../../Occupations';
import {getMyDetails} from '../api';
import {setMyDetails} from '../actions';
import My from '../views/my';

const mapStateToProps = state => ({
    details: state.my
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => Promise.all([
        getMyDetails().then(data => dispatch(setMyDetails(data))),
        getOccupations().then(data => dispatch(setOccupationList(data))),
        getCompetencies().then(data => dispatch(setCompetencyList(data))),
        getProficiencies().then(data => dispatch(setProficiencyList(data)))
    ]),
    onChooseOccupations: () => dispatch(toggleEditor())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(lifecycle(loadOnMount)(My));
