import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {center} from '../../reusable/styles';
import ProficiencyList from '../containers/proficiencyList';

const styles = theme => ({
    title: center(theme)
});

const ProficiencySelector = ({classes, selectedId, onSelect, onClose, onSubmit}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' maxWidth="lg">
        <DialogTitle>
            <div className={classes.title}>Select proficiency level</div>
        </DialogTitle>
        <DialogContent>
            <ProficiencyList selectedId={selectedId} onSelectProficiency={onSelect} selector />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
               Cancel
            </Button>
            <Button color="primary" onClick={() => {onSubmit(); onClose();}}>
               Select
            </Button>
        </DialogActions>
    </Dialog>
);

ProficiencySelector.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    selectedId: PropTypes.string
};

export default withStyles(styles)(ProficiencySelector);
