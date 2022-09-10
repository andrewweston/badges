import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CompetencyIcon from '@material-ui/icons/Category';
import ProficiencyIcon from '@material-ui/icons/FormatListNumbered';
import TierIcon from '@material-ui/icons/TableChart';
import OccupationIcon from '@material-ui/icons/Style';
import MyIcon from '@material-ui/icons/Person';
import AdminIcon from '@material-ui/icons/Group';
import NavigationItem from './navigationItem';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(7),
        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(9),
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(7),
        },
    },
    toolbar: theme.mixins.toolbar,
});

const BadgesDrawer = ({classes, drawerOpen, pathname, admin, onNavigate}) => (
    <Drawer
        variant="permanent"
        classes={{
            paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}
    >
        <div className={classes.toolbar} />
        {admin
            ? <List component="nav">
                <NavigationItem
                    Icon={AdminIcon}
                    label="People"
                    path="/admin/entities"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </List>
            : <List component="nav">
                <NavigationItem
                    Icon={MyIcon}
                    label="My details"
                    path="/"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </List>
        }
        <Divider />
        {admin
            ? <List component="nav">
                <NavigationItem
                    Icon={TierIcon}
                    label="Pay scale"
                    path="/admin/compensationScale"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
                <NavigationItem
                    Icon={ProficiencyIcon}
                    label="Proficiency levels"
                    path="/admin/proficiencyScale"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
                <NavigationItem
                    Icon={CompetencyIcon}
                    label="Competencies"
                    path="/admin/competencies"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
                <NavigationItem
                    Icon={OccupationIcon}
                    label="Occupations"
                    path={`${admin ? '/admin' : ''}/occupations`}
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </List>
            : null
        }
        <Divider />
        {admin
            ? <List component="nav">
                <NavigationItem
                    Icon={MyIcon}
                    label="My portal"
                    path="/"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </List>
            : window.localStorage.getItem('is_admin') && <List component="nav">
                <NavigationItem
                    Icon={AdminIcon}
                    label="Admin portal"
                    path="/admin/entity"
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </List>
        }
    </Drawer>
);

BadgesDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    onNavigate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    admin: PropTypes.bool
};

export default withStyles(styles)(BadgesDrawer);
