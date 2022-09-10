import React from 'react';
import {reduxForm} from 'redux-form';
import DialogActions from '@material-ui/core/DialogActions';
import {withStyles} from  '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarFullIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';
import {left} from './styles';


const formButtonsStyles = {
    left: left(),
};

export const renderUpdateFormButtons = ({
    classes, //eslint-disable-line react/prop-types
    dirty, //eslint-disable-line react/prop-types
    reset, //eslint-disable-line react/prop-types
    handleSubmit, //eslint-disable-line react/prop-types
    onSubmit, //eslint-disable-line react/prop-types
    onClose, //eslint-disable-line react/prop-types
    onDelete, //eslint-disable-line react/prop-types
    onChooseOccupations //eslint-disable-line react/prop-types
}) => (
    <DialogActions>
        {onDelete && <Button onClick={onDelete} className={classes.left} color="secondary">
            Delete
        </Button>}
        {onChooseOccupations && <Button onClick={onChooseOccupations} className={classes.left}>
                Select occupations
        </Button>}
        {onSubmit && dirty && <Button onClick={reset} >
            Reset
        </Button>}
        {onSubmit && dirty && <Button onClick={handleSubmit} color="primary">
            Update
        </Button>}
        {(!onSubmit || !dirty) && <Button onClick={onClose} color="primary">
            Close
        </Button>}
    </DialogActions>
);

export const UpdateFormButtons = reduxForm()(withStyles(formButtonsStyles)(renderUpdateFormButtons));

export const renderCreateFormButtons = ({
    handleSubmit, //eslint-disable-line react/prop-types
    onClose, //eslint-disable-line react/prop-types
}) => (
    <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
    </DialogActions>
);

export const CreateFormButtons = reduxForm()(renderCreateFormButtons);
