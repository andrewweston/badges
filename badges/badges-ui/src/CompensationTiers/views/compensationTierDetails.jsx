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
import CompensationTierFields from '../containers/compensationTierFields';


const styles = theme => ({
    title: center(theme)
});

const CompensationTierDetails = ({
    classes, item, prevItem, nextItem,
    showDeleteDialog, showOnDelete, onClose, onShowCompensationTier, onUpdate, onToggleDeleteDialog, onDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowCompensationTier}
                prevItem={prevItem} prevLabel={prevItem && <span>Previous compensation tier: {prevItem.name}</span>}
                nextItem={nextItem} nextLabel={nextItem && <span>Next compensation tier: {nextItem.name}</span>}
            />
            <div className={classes.title}>Compensation tier {item.name}</div>
        </DialogTitle>
        <CompensationTierFields
            form="compensationTierDetails"
            initialValues={item}
            enableReinitialize
        />
        <UpdateFormButtons
            form="compensationTierDetails"
            onClose={onClose}
            onDelete={onToggleDeleteDialog}
            onSubmit={onUpdate}
        />

        <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will delete compensation tier `{item.name}`
                    and any associated data, this operation can not be undone.
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

CompensationTierDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShowCompensationTier: PropTypes.func.isRequired,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object,
    showDeleteDialog: PropTypes.bool,
    showOnDelete: PropTypes.object
};

export default withStyles(styles)(CompensationTierDetails);
