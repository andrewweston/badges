import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import {EntityOccupationsField} from '../../EntityOccupations';
import {renderInputField} from '../../reusable/formComponents';

const styles = theme => ({
    dialog: {
        display: 'flex',
        flexDirection: 'column'
    },
    fields: {
        width: `calc(50% - ${theme.spacing(2)}px)`,
        margin: `0 ${theme.spacing(1)}px`
    },
    container: {
        padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`
    }
});

const PersonFields = ({classes, detailsAreEditable}) => (
    <DialogContent className={classes.dialog}>
        {detailsAreEditable
            ? <div className={classes.container}>
                <Field
                    className={classes.fields}
                    label="Name"
                    name="name"
                    component={renderInputField}
                />
                <Field
                    className={classes.fields}
                    label="Email"
                    name="email"
                    component={renderInputField}
                />
            </div>
            : null
        }
        <Field 
            name="id"
            component={EntityOccupationsField}
        />

    </DialogContent>
);

PersonFields.propTypes = {
    classes: PropTypes.object.isRequired,
    detailsAreEditable: PropTypes.bool
};

const validate = values => {
    const errors = {};

    return errors;
};

export default reduxForm({
    validate
})(withStyles(styles)(PersonFields));
