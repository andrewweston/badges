import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import ProficiencyFields from './ProficiencyFields';

const styles = {
    title: center()
};

const NewProficiencyDetails = ({classes,  onClose, onCreate}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <div className={classes.title}>Create proficiency level</div>
        </DialogTitle>
        <ProficiencyFields
            form="proficiencyDetails"
        />
        <CreateFormButtons
            form="proficiencyDetails"
            onClose={onClose}
            onSubmit={onCreate}
        />
    </Dialog>
);

NewProficiencyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(NewProficiencyDetails);
