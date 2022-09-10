import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import CompensationStepFields from '../containers/compensationStepFields';

const styles = {
    title: center()
};

const NewCompensationStepDetails = ({classes, factor, onClose, onCreate}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <div className={classes.title}>Create new compensation step</div>
        </DialogTitle>
        <CompensationStepFields
            form="compensationStepDetails"
            initialValues={{factor}}
            enableReinitialize
        />
        <CreateFormButtons
            form="compensationStepDetails"
            onClose={onClose}
            onSubmit={onCreate}
        />
    </Dialog>
);

NewCompensationStepDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    factor: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewCompensationStepDetails);
