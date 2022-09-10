import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    currentItem: {
        backgroundColor: theme.palette.background.default
    },
    currentItemIcon: {
        color: theme.palette.primary.main
    },
});

const NavigationItem = ({classes, Icon, label, path, onNavigate, pathname}) => (
    <ListItem button onClick={() => onNavigate(path)} className={classNames((pathname === path) && classes.currentItem)}>
        <ListItemIcon>
            <Icon classes={pathname === path ? {root: classes.currentItemIcon} : null} />
        </ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{color: pathname === path ? 'primary' : 'textPrimary'}} />
    </ListItem>
);

NavigationItem.propTypes = {
    classes: PropTypes.object.isRequired,
    Icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
};

export default withStyles(styles)(NavigationItem);
