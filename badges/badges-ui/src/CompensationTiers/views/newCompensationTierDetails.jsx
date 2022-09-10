import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import CompensationTierFields from '../containers/compensationTierFields';

const styles = {
    title: center()
};

const NewCompensationTierDetails = ({classes, onClose, onCreate}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <div className={classes.title}>Create new compensation tier</div>
        </DialogTitle>
        <CompensationTierFields
            form="compensationTierDetails"
        />
        <CreateFormButtons
            form="compensationTierDetails"
            onClose={onClose}
            onSubmit={onCreate}
        />
    </Dialog>
);

NewCompensationTierDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewCompensationTierDetails);
