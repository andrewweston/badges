import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field, Fields} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {CompetenciesEditor} from '../../Competencies';
import {StagesEditor} from '../../OccupationStages';
import {ProficiencyMap} from '../../ProficiencyMap';
import {FieldWrapper, renderInputField} from '../../reusable/formComponents';
import sort from '../../reusable/sort';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    optionsCount: {
        width: 360,
        '& input': {
            width: 40
        },
        fontWeight: 'normal'
    }
});

const renderCompetencyTable = ({
    input,  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    ...custom
}) => (
    <FieldWrapper
        margin={margin}
        fullWidth={fullWidth}
        meta={meta}
        label={label}
        shrink
    >
        <CompetenciesEditor
            {...custom}
            selection={(input.value || []).sort(sort('asc', 'factor')).map(i => i.competencyId)}
            category={(input.value || []).reduce((r,i) => ({...r, [i.competencyId]: i.category}), {})}
            onChange={(s, c) => input.onChange(s.map((k, i) => ({competencyId: k, category: c[k], factor: i})))}
        />
    </FieldWrapper>
);

const renderStageTable = ({
    input,  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    ...custom
}) => (
    <FieldWrapper
        margin={margin}
        fullWidth={fullWidth}
        meta={meta}
        label={label}
        shrink
    >
        <StagesEditor {...custom} data={input.value || []} onChange={input.onChange} />
    </FieldWrapper>
);

const renderProficiencyMapTable = ({
    classes,
    competencies: {input: {value: competencies}},
    stages: {input: {value: stages}},
    proficiencyMap: {input, meta},  //eslint-disable-line react/prop-types
    optionsCount, //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    readOnly,
    ...custom
}) => (
    <ProficiencyMap
        selection={(competencies || []).sort(sort('asc','factor')).map(i => i.competencyId)}
        categories={(competencies || []).reduce((r,i) => ({...r, [i.competencyId]: i.category}), {})}
        stages={stages || []}
        {...custom}
        data={input.value || []}
        onChange={readOnly ? null : input.onChange}
        readOnly={readOnly}
        renderOptionsCount={() => (readOnly
            ? `Choose any ${optionsCount.input.value} preferred or desired option(s)`
            : <Input
                type="number" className={classes.optionsCount}
                value={optionsCount.input.value}
                onChange={e => optionsCount.input.onChange(e.target.value)}
                startAdornment={<InputAdornment position="start">Choose any</InputAdornment>}
                endAdornment={<InputAdornment position="end">preferred or desired option(s)</InputAdornment>}
                inputProps={{min: 1, max: (competencies || []).filter(i => !i.category).length}}
            />
        )}
    />
);

const renderTab = (tab, readOnly, classes) => {
    switch (tab) {
        case 0:
            return (
                <div>
                    <Field
                        name="name"
                        label="Occupation series title"
                        type="text"
                        component={renderInputField}
                        fullWidth
                        required
                        margin="normal"
                        readOnly={readOnly}
                    />
                    <Field
                        name="description"
                        label="Description"
                        type="text"
                        component={renderInputField}
                        fullWidth
                        required
                        margin="normal"
                        readOnly={readOnly}
                        multiline
                    />
                </div>
            );
        case 1:
            return (
                <div>
                    <Field
                        name="competencies"
                        component={renderCompetencyTable}
                        readOnly={readOnly}
                    />
                </div>
            );
        case 2:
            return (
                <div>
                    <Field
                        name="stages"
                        component={renderStageTable}
                        fullWidth
                        margin="normal"
                        readOnly={readOnly}
                    />
                </div>
            );
        case 3:
            return (
                <div>
                    <Fields
                        names={['competencies','stages','proficiencyMap','optionsCount']}
                        component={renderProficiencyMapTable}
                        fullWidth
                        margin="normal"
                        readOnly={readOnly}
                        classes={classes}
                    />
                </div>
            );
        default:
            return null;
    }
};

const OccupationFields = ({classes, readOnly, tab, onShowTab}) => (
    <DialogContent>
        <form>
            <Tabs
                classes={{root: classes.root}}
                value={tab}
                onChange={(e, v) => onShowTab(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Occupation Details" />
                <Tab label="Competencies" />
                <Tab label="Stages" />
                <Tab label="Proficiency Map" />
            </Tabs>
            {renderTab(tab, readOnly, classes)}
        </form>
    </DialogContent>
);

OccupationFields.propTypes = {
    classes: PropTypes.object.isRequired,
    onShowTab: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    tab: PropTypes.number
};

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter title';
    }

    return errors;
};

export default reduxForm({
    enableReinitialize: true,
    validate
})(withStyles(styles)(OccupationFields));
