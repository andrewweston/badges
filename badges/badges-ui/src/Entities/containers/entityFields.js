import {connect} from  'react-redux';
import EntityFields from '../views/entityFields';

const mapStateToProps = state => ({
    occupations: state.occupations.list
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntityFields);
