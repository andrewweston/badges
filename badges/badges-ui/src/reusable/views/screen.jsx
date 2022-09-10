import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import {root, header, addButton, spinner} from '../../reusable/styles';

const styles = theme => ({
    root: root(theme),
    header: header(theme),
    addButton: addButton(theme),
    spinner: spinner(theme)
});

class Screen extends React.Component {
    state = {open: false};
    handleOpen = () => {
        if (!this.state.hidden) {
            this.setState({open: true});
        }
    };
    handleClose = () => {
        this.setState({open: false});
    };

    render () {
        const {
            admin,
            components: {List, Details, New},
            classes,
            loading,
            showDetails,
            showOptionDetails,
            filter,
            onFilter,
            onCreate,
            showNewDialog,
            showNewOption,
            options
        } = this.props;
        const [mainOption, ...otherOptions] = options || [{}.undefined];
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <TextField
                        id="search"
                        fullWidth
                        placeholder="Search..."
                        type="search"
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterListIcon />
                                </InputAdornment>
                            ),
                        }}
                        values={filter}
                        onChange={onFilter}
                    />

                    {admin && mainOption && (otherOptions.length
                        ? <SpeedDial ariaLabel="button-add"
                            className={classes.addButton}
                            icon={<SpeedDialIcon openIcon={<AddIcon />} />}
                            direction="left"
                            onClick={() => onCreate()}
                            onBlur={this.handleClose}
                            onClose={this.handleClose}
                            onFocus={this.handleOpen}
                            onMouseEnter={this.handleOpen}
                            onMouseLeave={this.handleClose}
                            open={this.state.open}
                        >
                            {otherOptions.map(o => (
                                <SpeedDialAction
                                    key={o.name}
                                    icon={o.icon}
                                    tooltipTitle={`Create new ${o.name}`}
                                    tooltipPlacement="top"
                                    onClick={() => onCreate(o.stateKey)}
                                />
                            ))}
                        </SpeedDial>
                        : <Tooltip title={`Create new ${mainOption.name}`}>
                            <Fab color="primary" className={classes.addButton} onClick={() => onCreate()}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    )}

                </div>
                <List filter={filter} admin={admin} />
                {loading && <CircularProgress className={classes.spinner} size={72} /> }
                {showDetails && <Details admin={admin} />}
                {otherOptions.filter(o => showOptionDetails[o.stateKey]).map(o => <o.Details key={o.stateKey} admin={admin} />)}
                {admin && New && showNewDialog && <New /> }
                {admin && otherOptions.filter(o => showNewOption[o.stateKey]).map(o => <o.New key={o.stateKey} />)}
            </div>
        );
    }
};

Screen.propTypes = {
    classes: PropTypes.object.isRequired,
    components: PropTypes.shape({
        List: PropTypes.object.isRequired,
        Details: PropTypes.object.isRequired,
        New: PropTypes.object
    }).isRequired,
    filter: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    options: PropTypes.array,
    showDetails: PropTypes.bool.isRequired,
    showNewDialog: PropTypes.bool.isRequired,
    showNewOption: PropTypes.object.isRequired,
    showOptionDetails: PropTypes.object.isRequired,
    admin: PropTypes.bool
};

export default withStyles(styles)(Screen);
