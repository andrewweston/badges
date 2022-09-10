import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {center} from '../../reusable/styles';
import {CreateFormButtons} from '../../reusable/formButtons';
import CompetencyFields from './competencyFields';

const styles = {
    title: center()
};

const NewCompetencyDetails = ({classes,  onClose, onCreate, tags}) => (
    <Dialog open onClose={onClose} disableBackdropClick scoll='paper'>
        <DialogTitle>
            <div className={classes.title}>Create new competency</div>
        </DialogTitle>
        <CompetencyFields
            form="competencyDetails"
            tags={tags}
        />
        <CreateFormButtons
            form="competencyDetails"
            onClose={onClose}
            onSubmit={onCreate}
        />
    </Dialog>
);

NewCompetencyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired
};

export default withStyles(styles)(NewCompetencyDetails);
