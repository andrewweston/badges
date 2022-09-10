import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {center} from '../../reusable/styles';
import {UpdateFormButtons} from '../../reusable/formButtons';
import DetailsNavigation from '../../reusable/views/detailsNavigation';
import EntityFields from '../containers/entityFields';


const styles = theme => ({
    title: center(theme),
    subtitle: center(theme)
});

const EntityDetails = ({
    classes, item, prevItem, nextItem, onClose, onShowPerson, onUpdate, onDelete, onChooseOccupations, 
    showDeleteDialog, onToggleDeleteDialog, showOnDelete
}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' maxWidth="lg" fullWidth>
        <DialogTitle>
            <DetailsNavigation onShowItem={onShowPerson}
                prevItem={prevItem} prevLabel={
                    prevItem && <span>
                        Previous:<br/>{prevItem.name}
                    </span>
                }
                nextItem={nextItem} nextLabel={
                    nextItem && <span>
                        Next:<br/>{nextItem.name}
                    </span>
                }
            />
            <div className={classes.title}>{item.name}</div>
            <Typography variant='caption' className={classes.subtitle} component="div">{item.email}</Typography>
        </DialogTitle>
        <EntityFields
            form="personDetails"
            initialValues={item}
            enableReinitialize
            detailsAreEditable={item.isManual}
        />
        <UpdateFormButtons
            form="personDetails"
            onClose={onClose}
            onSubmit={values => onUpdate(values, item)}
            onChooseOccupations={onChooseOccupations}
            onDelete={item.isManual ? onToggleDeleteDialog : null}
        />
        
        <Dialog open={showDeleteDialog} onClose={onToggleDeleteDialog}>
                <DialogTitle>Delete confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will delete `{item.name}` and any associated data, this operation can not be undone.
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

EntityDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showOnDelete: PropTypes.func,
    onToggleDeleteDialog: PropTypes.func.isRequired,
    onChooseOccupations: PropTypes.func.isRequired,
    onShowPerson: PropTypes.func.isRequired,
    item: PropTypes.object,
    nextItem: PropTypes.object,
    prevItem: PropTypes.object
};

export default withStyles(styles)(EntityDetails);
