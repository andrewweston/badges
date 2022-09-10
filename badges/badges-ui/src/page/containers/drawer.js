import {connect} from  'react-redux';
import {push} from 'connected-react-router';
import Drawer from '../views/drawer';

const mapStateToProps = state => ({
    drawerOpen: state.page.drawerOpen,
    pathname: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
    onNavigate: path => dispatch(push(path))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer);
