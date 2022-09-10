import {connect} from 'react-redux';
import ProficiencyMap from '../views/ProficiencyMap';

const emptyArray = [];

const mapStateToProps = (state) => ({
    proficiencies: state.proficiencies.list || emptyArray,
    competencies: state.competencies.list || emptyArray
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProficiencyMap);
