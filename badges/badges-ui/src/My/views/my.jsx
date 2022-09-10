import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import {EntityOccupationList} from '../../EntityOccupations';
import {root, header, addButton} from '../../reusable/styles';

const styles = theme => ({
    root: {
        ...root(theme),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: null,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        ...header(theme),
        paddingBottom: theme.spacing(0.5)
    },
    select: {
        minWidth: '100px'
    },
    flexRow: {
        display: 'flex',
        alignItems: 'baseline',
        paddingTop: theme.spacing(2)
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    leftColumn: {
        flex: 1,
        marginRight: theme.spacing(1)
    },
    rightColumn: {
        flex: 1,
        marginLeft: theme.spacing(1)
    },
    addButton: addButton(theme),
});

const My = ({classes, details, onChooseOccupations}) => (
    <div className={classes.root}>
        <Typography align='center' variant='h6' className={classes.header}>{details.name}</Typography>
        <Typography align='center' variant='caption'>{details.email}</Typography>
        <EntityOccupationList userId={details.id} my />
        <Tooltip title='Select my occupations'>
            <Fab color="primary" className={classes.addButton} onClick={onChooseOccupations}>
                <SettingsIcon />
            </Fab>
        </Tooltip>
    </div>
);

My.propTypes = {
    classes: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    onChooseOccupations: PropTypes.func.isRequired
};

export default withStyles(styles)(My);
