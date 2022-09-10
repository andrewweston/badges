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
import CompetencyFields from './competencyFields';

const styles = theme => ({
    title: center(theme)
});

const CompetencyDetails = ({
    classes, item, prevItem, nextItem,tags,
    showDeleteDialog, showOnDelete, onClose, onShowCompetency, onUpdate, onToggleDeleteDialog, onDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' fullWidth>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowCompetency}
                prevItem={prevItem} prevLabel={prevItem && <span>Previous competency:<br/>{prevItem.name}</span>}
                nextItem={nextItem} nextLabel={nextItem && <span>Next competency:<br/>{nextItem.name}</span>}
            />
            <div className={classes.title}>{item.name}</div>
        </DialogTitle>
        <CompetencyFields
            form="competencyDetails"
            initialValues={item}
            enableReinitialize
            tags={tags}
        />
        <UpdateFormButtons
            form="competencyDetails"
            onClose={onClose}
            onDelete={onToggleDeleteDialog}
            onSubmit={values => onUpdate(values)}
        />

        <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will delete `{item.name}` competency and all associated data, this operation can not be undone.
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

CompetencyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onShowCompetency: PropTypes.func.isRequired,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object,
    showDeleteDialog: PropTypes.bool,
    showOnDelete: PropTypes.object
};

export default withStyles(styles)(CompetencyDetails);
