import {connect} from  'react-redux';
import actions from '../actions';
import OccupationFields from '../views/occupationFields';

const mapStateToProps = state => ({
    tab: state.occupations.detailsTab
});

const mapDispatchToProps = dispatch => ({
    onShowTab: tab => dispatch(actions.showDetailsTab(tab))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OccupationFields);
