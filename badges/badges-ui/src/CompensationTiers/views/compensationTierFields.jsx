import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '../../reusable/table';
import {renderInputField} from '../../reusable/formComponents';

const styles = {
    column: {
        flexDirection: 'column'
    }
};

const CompensationTierFields = ({classes, compensationSteps}) => (
    <DialogContent>
        <form>
            <Field
                name="name"
                label="Compensation tier name"
                type="text"
                component={renderInputField}
                fullWidth
                required
                margin="normal"
            />
            <Table
                data={compensationSteps}
                columns={['name', 'compensation']}
                labels={{name: 'Compensation step', 'compensation': 'Compensation'}}
                orderBy='factor'
                order='desc'
                renderCell={(s,c) => (c === 'compensation'
                    ? <Field
                        name={`compensations.${s.id}`}
                        type="number"
                        component={renderInputField}
                        fullWidth
                        margin="none"
                        prefix="$"
                        suffix="K"
                        width={80}
                    />
                    : s[c]
                )}
            />
        </form>
    </DialogContent>
);

CompensationTierFields.propTypes = {
    classes: PropTypes.object.isRequired,
    compensationSteps: PropTypes.array
};

const validate = (values, props) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter compensation tier name';
    }

    if (props.compensationSteps) {
        props.compensationSteps.forEach(s => {
            if (!values.compensations || !values.compensations[s.id]) {
                errors.compensations = {...errors.compensations, [s.id]: `Please enter compensation for step ${s.name}`};
            }
        });
    }

    return errors;
};

export default reduxForm({
    validate
})(withStyles(styles)(CompensationTierFields));
