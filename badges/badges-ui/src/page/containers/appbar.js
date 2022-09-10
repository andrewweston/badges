import {connect} from  'react-redux';
import {toggleDrawer} from '../actions';
import AppBar from '../views/appbar';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onDrawerToggle: () => dispatch(toggleDrawer())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar);
