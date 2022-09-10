import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import {renderInputField} from '../../reusable/formComponents';

const styles = {
    form: {
        display: 'flex'
    }
};

const CompensationStepFields = ({classes}) => (
    <DialogContent>
        <form className={classes.form}>
            <Field
                name="factor"
                label=" "
                type="number"
                component={renderInputField}
                margin="normal"
                prefix="#"
                min={1}
                width={50}
                format={v => v + 1}
                normalize={v => v - 1}
            />
            <Field
                name="name"
                label="Name"
                type="text"
                component={renderInputField}
                required
                fullWidth
                margin="normal"
            />
        </form>
    </DialogContent>
);

CompensationStepFields.propTypes = {
    classes: PropTypes.object.isRequired
};

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter compensation step name';
    }

    if (!values.factor && values.factor !== 0) {
        errors.factor = 'Please enter order number';
    }

    return errors;
};

export default reduxForm({
    validate
})(withStyles(styles)(CompensationStepFields));
