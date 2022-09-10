import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {green, red} from '@material-ui/core/colors';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Table from '../../reusable/table';
import { renderRadioField, renderSelectField } from '../../reusable/formComponents';
import { center } from '../../reusable/styles';
import sort from '../../reusable/sort';
import { COMPETENCY_CATEGORIES } from '../../reusable/constants';

const columns = ['competency', ''];
const labels = {competency: 'Competency', '': 'N/A' };

const styles = theme => ({
    title: center(),
    option: {
        margin: theme.spacing(-1)
    },
    dropDown: {
        width: '200px'
    },
    targetAchieved: {
        background: green.A100
    },
    targetUnachieved: {
        background: red.A100
    },
    proficiencyHeader: {
        whiteSpace: 'nowrap'
    },
    categoryHeader: {
        whiteSpace: 'nowrap'
    }
});

const stylesTooltip = (width) => theme => ({
    tooltip: {
        backgroundColor: theme.palette.grey[600],
        maxWidth: width,
        padding: theme.spacing(2),
        whiteSpace: "pre-line"
    },
})

const ProficiencyTooltip = withStyles(stylesTooltip(320))(Tooltip);

const CategoryTooltip = withStyles(stylesTooltip(480))(Tooltip);

const InfoIconStyled = withStyles(theme => ({
    root: {
        verticalAlign: 'middle', 
        paddingLeft: theme.spacing(0.5),
        color: theme.palette.grey[500]
    }
}))(InfoIcon);

const renderCell = (r, c, category, classes, occupation, targetStageId, proficiencies) => {
    switch (c) {
        case 'competency':
            return (
                <span className={classes.categoryHeader}>
                    {r.name}
                    <CategoryTooltip title={
                        <React.Fragment>
                            <Typography color="inherit" variant="subtitle2">{r.name}</Typography>
                            <br />
                            <Typography color="inherit" variant="caption">
                                {r.description}
                                <br/>Key behaviours:<br/>
                                <ul>{r.behaviours.sort(sort('asc','factor')).map(b => <li key={b.id}>{b.description}</li>)}</ul>
                            </Typography>
                        </React.Fragment>
                    }>
                        <InfoIconStyled fontSize="small" />
                    </CategoryTooltip> 
                </span>
            );
        default:
            let targetProficiencyId = null;
            if (targetStageId) {
                const proficiencyMap = occupation.proficiencyMap
                    .filter(x => x.competencyId === r.id)
                    .reduce((r, x) => ({ ...r, [x.occupationStageId]: x.proficiencyId }), {});
                targetProficiencyId = proficiencyMap[targetStageId];
                if (!targetProficiencyId) {
                    const stage = occupation.stages.find(s => s.id === targetStageId);
                    if (stage) {
                        targetProficiencyId = (occupation.stages
                            .filter(s => s.factor < stage.factor)
                            .map(s => ({ factor: s.factor, value: proficiencyMap[s.id] }))
                            .sort((a, b) => a.factor > b.factor ? 1 : a.factor < b.factor ? -1 : 0)
                        [0] || {}).value;
                    }
                }
            }
            return (!category && !c 
                ? null
                : <Field
                        name={r.id}
                        component={renderRadioField}
                        optionValue={c}
                        className={v => classnames(
                            classes.option, 
                            c === targetProficiencyId && (
                                (proficiencies.find(p => p.id === v) || {}).factor >= (proficiencies.find(p => p.id === targetProficiencyId) || {}).factor
                                ? classes.targetAchieved
                                : classes.targetUnachieved
                            )
                        )}
                />
            );
    }
}

const Select = renderSelectField;

const EvaluationFields = ({ 
    occupation, competencies, proficiencies, dirty, reset, handleSubmit, onClose, classes, error, submitFailed, onStageSelected, targetStageId
}) => (
    <React.Fragment>
        <DialogContent>
            <form>
                <Select
                    label="Target stage"
                    className={classes.dropDown}
                    input={{
                        onChange: e => onStageSelected(e.target.value),
                        value: targetStageId
                    }}
                    meta={{}}
                >
                    {occupation.stages.map(stage => <MenuItem key={stage.id} value={stage.id}>{stage.name}</MenuItem>)}
                </Select>
                <Table
                    isGrouped showGroupHeader={COMPETENCY_CATEGORIES.map((x,i) => Boolean(occupation.competencies.find(y => y.category === i)))}
                    data={COMPETENCY_CATEGORIES.map((c, i) => occupation.competencies
                        .sort(sort('asc','factor'))
                        .filter(x => x.category === i)
                        .map(k => competencies.find(x => x.id === k.competencyId))
                    )}
                    columns={[...columns, ...proficiencies.map(p => p.id)]}
                    labels={proficiencies.reduce((r, p) => ({ 
                        ...r, 
                        [p.id]: 
                            <span className={classes.proficiencyHeader}>
                                {p.name}
                                <ProficiencyTooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit" variant="subtitle2">{p.name}</Typography>
                                        <br/>
                                        <Typography color="inherit" variant="caption">{p.description}</Typography>
                                    </React.Fragment>
                                }>
                                    <InfoIconStyled fontSize="small" />
                                </ProficiencyTooltip>
                            </span>                  
                    }), labels)}
                    renderCell={(r, c, g) => renderCell(r, c, g, classes, occupation, targetStageId, proficiencies)}
                    renderGroupHeader={g => `${COMPETENCY_CATEGORIES[g]} (${g 
                        ? `choose any ${occupation.optionsCount}${occupation.competencies.find(y => y.category && y.category !== g)
                            ? ' from preferred or desired options'
                            : ''
                        }`
                        : 'all options are required'
                    })`}
                />
            </form>
        </DialogContent>
        <DialogActions>
            {submitFailed && error && <Typography color="error">{error}</Typography>}
            {dirty && <Button onClick={reset} >
                Reset
            </Button>}
            {dirty && <Button onClick={handleSubmit} color="primary">
                Update
            </Button>}
            {!dirty && <Button onClick={onClose} color="primary">
                Close
            </Button>}
        </DialogActions>
    </React.Fragment>
);

const validate = (values, props) => {
    let optionsMarked = 0;
    for (var competency of props.occupation.competencies) 
    {
        if (!competency.category) {
            if (!values[competency.competencyId]) {
                return {_error: 'Please select proficiency for each required competency'}
            }
        }
        else {
            if (values[competency.competencyId]) {
                optionsMarked++;
            }
        }
    };

    const optionsRequired = props.occupation.optionsCount;
    if (optionsMarked < optionsRequired) {
        return { _error: `Please select proficiency for at least ${optionsRequired} preferred or desired competencies`}
    }
    
    return {};
};

const EvaluationFieldsForm = reduxForm({ form: 'entityOccupationEvaluation', validate })(EvaluationFields);


const EvaluationForm = ({ occupation, competencies, proficiencies, evaluation, classes, onClose, onSubmit, onStageSelected, targetStageId}) => (
    <Dialog open={Boolean(occupation)} disableBackdropClick scoll='paper' maxWidth="md">
        <DialogTitle>
            <div className={classes.title}>Evaluate {occupation && occupation.name || 'occupation'} stage</div>
        </DialogTitle>
        {occupation && <EvaluationFieldsForm
            initialValues={evaluation}
            occupation={occupation}
            competencies={competencies}
            proficiencies={proficiencies}
            onClose={onClose}
            onSubmit={onSubmit}
            classes={classes}
            onStageSelected={onStageSelected}
            targetStageId={targetStageId}
        />}
    </Dialog>
);

EvaluationForm.propTypes = {
    classes: PropTypes.object.isRequired,
    competencies: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onStageSelected: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    proficiencies: PropTypes.array.isRequired,
    evaluation: PropTypes.object,
    occupation: PropTypes.object,
    targetStageId: PropTypes.string
}

export default withStyles(styles)(EvaluationForm);