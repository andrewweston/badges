import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import {left, right, navigation, navButton} from '../../reusable/styles';

const styles = theme => ({
    navigation: navigation(theme),
    navButton: navButton(theme),
    left: left(theme),
    right: right(theme)
});

const DetailsNavigation = ({classes, prevItem, nextItem, prevLabel, nextLabel, onShowItem}) => (
    <div className={classes.navigation}>
        {prevItem &&
            <Button
                onClick={() => onShowItem(prevItem)}
                color="primary"
                size="small"
                disableRipple
                classes={{root: classnames(classes.navButton, classes.left)}}
            >
                <ArrowLeft />{prevLabel}
            </Button>
        }
        <div>&nbsp;</div>
        {nextItem &&
            <Button
                onClick={() => onShowItem(nextItem)}
                color="primary" size="small"
                disableRipple
                classes={{root: classnames(classes.navButton, classes.right)}}
            >
                {nextLabel}<ArrowRight />
            </Button>
        }
    </div>
);

DetailsNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    onShowItem: PropTypes.func.isRequired,
    nextItem: PropTypes.object,
    nextLabel: PropTypes.any,
    prevItem: PropTypes.object,
    prevLabel: PropTypes.any
};

export default withStyles(styles)(DetailsNavigation);
