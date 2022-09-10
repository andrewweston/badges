import {connect} from  'react-redux';
import CompensationTierFields from '../views/compensationTierFields';

const mapStateToProps = state => ({
    compensationSteps: state.compensationTiers.compensationSteps.list
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompensationTierFields);
