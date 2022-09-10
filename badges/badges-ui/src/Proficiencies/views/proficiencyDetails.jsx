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
import ProficiencyFields from './ProficiencyFields';

const styles = theme => ({
    title: center(theme)
});

const ProficiencyDetails = ({
    classes, item, prevItem, nextItem,
    showDeleteDialog, showOnDelete, onClose, onShowProficiency, onUpdate, onToggleDeleteDialog, onDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowProficiency}
                prevItem={prevItem} prevLabel={prevItem && <span>Previous:<br/>{prevItem.name}</span>}
                nextItem={nextItem} nextLabel={nextItem && <span>Next:<br/>{nextItem.name}</span>}
            />
            <div className={classes.title}>{item.name}</div>
        </DialogTitle>
        <ProficiencyFields
            form="proficiencyDetails"
            initialValues={item}
            enableReinitialize
        />
        <UpdateFormButtons
            form="proficiencyDetails"
            onClose={onClose}
            onDelete={onToggleDeleteDialog}
            onSubmit={values => onUpdate(values)}
        />

        <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will delete `{item.name}` proficiency level and all associated data, this operation can not be undone.
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

ProficiencyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShowProficiency: PropTypes.func.isRequired,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object,
    showDeleteDialog: PropTypes.bool,
    showOnDelete: PropTypes.object
};

export default withStyles(styles)(ProficiencyDetails);
