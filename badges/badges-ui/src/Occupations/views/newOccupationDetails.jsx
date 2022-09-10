import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import OccupationFields from '../containers/occupationFields';

const styles = {
    title: center()
};

const NewOccupationDetails = ({classes, onClose, onCreate}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper' maxWidth="lg" fullWidth>
        <DialogTitle>
            <div className={classes.title}>Create new occupation series</div>
        </DialogTitle>
        <OccupationFields
            form="occupationDetails"
        />
        <CreateFormButtons
            form="occupationDetails"
            onClose={onClose}
            onSubmit={onCreate}
        />
    </Dialog>
);

NewOccupationDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewOccupationDetails);
