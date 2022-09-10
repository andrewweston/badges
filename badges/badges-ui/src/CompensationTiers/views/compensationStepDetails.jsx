import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import {center} from '../../reusable/styles';
import {UpdateFormButtons} from '../../reusable/formButtons';
import DetailsNavigation from '../../reusable/views/detailsNavigation';
import CompensationStepFields from '../containers/compensationStepFields';


const styles = theme => ({
    title: center(theme)
});

const CompensationStepDetails = ({
    classes, item, prevItem, nextItem,
    showDeleteDialog, showOnDelete, onClose, onShowCompensationStep, onUpdate, onToggleDeleteDialog, onDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowCompensationStep}
                prevItem={prevItem} prevLabel={prevItem && <span>Previous: {prevItem.name}</span>}
                nextItem={nextItem} nextLabel={nextItem && <span>Next: {nextItem.name}</span>}
            />
            <div className={classes.title}>Compensation step {item.name}</div>
        </DialogTitle>
        <CompensationStepFields
            form="compensationStepDetails"
            initialValues={item}
            enableReinitialize
        />
        <UpdateFormButtons
            form="compensationStepDetails"
            onClose={onClose}
            onDelete={onToggleDeleteDialog}
            onSubmit={onUpdate}
        />

        <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will delete compensation step `{item.name}`
                    and clear compensation value for any associated entities, this operation can not be undone.
                    Would you like to proceed?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onToggleDeleteDialog}>
                   Cancel
                </Button>
                <Button onClick={() => onDelete(item, showOnDelete)} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>

    </Dialog>
);

CompensationStepDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShowCompensationStep: PropTypes.func.isRequired,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object,
    showDeleteDialog: PropTypes.bool,
    showOnDelete: PropTypes.object
};

export default withStyles(styles)(CompensationStepDetails);
