import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Logo from '@material-ui/icons/Style';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    flex: {
        flex: 1,
        fontFamily:'Roboto Slab',
        fontSize: '24px',
        lineHeight: '1.3em'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
});

const BadgesAppBar = ({classes, authenticated, auth, onDrawerToggle}) => (
    <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
            {authenticated
                ? <IconButton
                    color="inherit"
                    aria-label="toggle drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                : null
            }
            <Typography variant="h6" color="inherit" className={classes.flex} noWrap>
              Badges&nbsp;<Logo/>
            </Typography>
            {authenticated
                ? <div>
                    <Button
                        color="inherit"
                        onClick={auth.logout}
                    >
                        Logout
                    </Button>
                </div>
                : <Button
                    color="inherit"
                    onClick={auth.login}
                >
                    Login
                </Button>
            }
        </Toolbar>
    </AppBar>
);

BadgesAppBar.propTypes = {
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    authenticated: PropTypes.bool
};

export default withStyles(styles)(BadgesAppBar);
