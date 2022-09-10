import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import DialogContent from '@material-ui/core/DialogContent';
import { renderInputField, renderTagListField} from '../../reusable/formComponents';
import {BehaviourList} from '../../Behaviours';

const renderBehaviourList = ({input: {value, onChange}}) => (
    <BehaviourList
        behaviours={value || []}
        onChange={onChange}
    />
);
renderBehaviourList.propTypes = {
    input: PropTypes.object.isRequired
};

const CompetencyFields = ({tags}) => (
    <DialogContent>
        <form>
            <Field
                name="name"
                label="Title"
                type="text"
                component={renderInputField}
                autoFocus
                required
                fullWidth
                margin="normal"
            />
            <Field
                name="tags"
                label="Tags"
                component={renderTagListField}
                list={tags}
                fullWidth
                margin="normal"
            />
            <Field
                name="description"
                label="Description"
                type="text"
                component={renderInputField}
                fullWidth
                margin="normal"
                multiline
                rows={5}
            />
            <Field
                name="behaviours"
                component={renderBehaviourList}
            />
        </form>
    </DialogContent>
);

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter competency name';
    }

    return errors;
};

export default reduxForm({validate})(CompetencyFields);
