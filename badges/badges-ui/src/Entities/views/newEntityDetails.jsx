import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import EntityFields from '../containers/entityFields';


const styles = theme => ({
    title: center(theme)
});

const NewEntityDetails = ({classes, onClose, onCreate, onChooseOccupations}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' maxWidth="lg" fullWidth>
        <DialogTitle>
            <div className={classes.title}>Create new Person or Team</div>
        </DialogTitle>
        <EntityFields
            form="personDetails"
            detailsAreEditable
        />
        <CreateFormButtons
            form="personDetails"
            onClose={onClose}
            onSubmit={onCreate}
            onChooseOccupations={onChooseOccupations}
        />
    </Dialog>
);

NewEntityDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onChooseOccupations: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewEntityDetails);
