import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {reduxForm, Field} from 'redux-form';
import DialogContent from '@material-ui/core/DialogContent';
import {renderInputField} from '../../reusable/formComponents';

const styles = {
    numberField: {
        maxWidth: '100px'
    }
};

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter proficiency level title';
    }

    if (!(values.factor >= 0)) {
        errors.factor = 'Please specify proficiency order number';
    }

    return errors;
};

const ProficiencyFields = () => (
    <DialogContent>
        <form>
            <Field
                name="name"
                label="Title"
                type="text"
                component={renderInputField}
                autoFocus
                fullWidth
                required
                margin="normal"
            />
            <Field
                name="description"
                label="Description"
                type="text"
                component={renderInputField}
                fullWidth
                required
                margin="normal"
                multiline
                rows={10}
            />
            <Field
                name="behaviourObservation"
                label="Behaviour Observation"
                type="text"
                component={renderInputField}
                fullWidth
                required
                margin="normal"
            />
        </form>
    </DialogContent>
);

export default reduxForm({validate})(withStyles(styles)(ProficiencyFields));
