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
import OccupationFields from '../containers/occupationFields';


const styles = theme => ({
    title: center(theme)
});

const OccupationDetails = ({admin,
    classes, item, prevItem, nextItem,
    showDeleteDialog, showOnDelete, onClose, onShowOccupation, onUpdate, onToggleDeleteDialog, onDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' maxWidth="lg" fullWidth>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowOccupation}
                prevItem={prevItem} prevLabel={prevItem && <span>Previous:<br/>{prevItem.name}</span>}
                nextItem={nextItem} nextLabel={nextItem && <span>Next:<br/>{nextItem.name}</span>}
            />
            <div className={classes.title}>{item.name}</div>
        </DialogTitle>
        <OccupationFields readOnly={!admin}
            form="occupationDetails"
            initialValues={item}
            enableReinitialize
        />
        <UpdateFormButtons
            form="occupationDetails"
            onClose={onClose}
            onDelete={admin && onToggleDeleteDialog}
            onSubmit={admin && onUpdate}
        />

        {admin && <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will delete `{item.name}` occupation series and any associated data, this operation can not be undone.
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
        </Dialog>}

    </Dialog>
);

OccupationDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShowOccupation: PropTypes.func.isRequired,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    admin: PropTypes.bool,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object,
    showDeleteDialog: PropTypes.bool,
    showOnDelete: PropTypes.object
};

export default withStyles(styles)(OccupationDetails);
