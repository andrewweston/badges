import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { center } from '../../reusable/styles';
import {OccupationList} from '../../Occupations';
import Table from '../../reusable/table';
import { table } from '../../reusable/styles';
import EvaluationForm from '../containers/evaluationForm';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    title: center(),
    table: {
        ...table(theme),
        lineHeight: 1.5
    }
});

const renderOccupationList = ({ input: { value, onChange } }) => (
    <OccupationList
        selection={value || []}
        onToggleSelection={(id, selected) => onChange(selected ? [...value, id] : value.filter(i => i !== id))}
    />
);
renderOccupationList.propTypes = {
    input: PropTypes.object.isRequired
};

const OccupationFields = ({ dirty, reset, handleSubmit, onClose }) => (
    <React.Fragment>
        <DialogContent>
            <form>
                <Field
                    name="selection"
                    component={renderOccupationList}
                />
            </form>
        </DialogContent>
        <DialogActions>
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

const OccupationForm = reduxForm({form: 'entityOccupations'})(OccupationFields);

const renderCell = (r, c, occupations, onEvaluate, stageId, compensationTiers) => {
    const occupation = occupations.find(x => x.id === r);
    if (!occupation) return null;

    switch (c) {
        case "stage":
            const stage = occupation.stages && occupation.stages.find(x => x.id === stageId);
            const nextStage = occupation.stages && occupation.stages[occupation.stages.indexOf(stage) + 1];
            return (
                <React.Fragment>{(stage || {}).name || stageId} 
                    <IconButton aria-label="Edit evaluation" onClick={() => onEvaluate(r, (nextStage || stage || {}).id || '')}>
                        <EditIcon/>
                    </IconButton>
                </React.Fragment>
            );
        case "compensation":
            const tierId = occupation.stages && (occupation.stages.find(x => x.id === stageId) || {}).compensationTierId;
            const tier = tierId && compensationTiers.find(c => c.id === tierId);
            const range = tier && Object.keys(tier.compensations).reduce((r, c) => ({
                min: !r.min || tier.compensations[c] < r.min ? tier.compensations[c] : r.min,
                max: !r.max || tier.compensations[c] > r.max ? tier.compensations[c] : r.max
            }), {});
            return tier && `${tier.name}: $${range.min}K - $${range.max}K` || '';

        default:
            if (!occupation) {
                return null;
            }
            return occupation[c];
    }
};

const columns = ['name', 'stage'];
const adminColumns = [...columns, 'compensation'];
const myLabels = { name: 'My occupations', stage: 'Current stage' };
const labels = { name: 'Occupations', stage: 'Current stage', compensation: 'Compensation range' };

const EntityOccupations = ({ classes, entityOccupations, entityStages, my, userId, onToggleEditor, showEditor, onUpdate, occupations, onEvaluate, evaluateOccupationId, onSubmitEvaluation, compensationTiers }) => (
    <div className={classes.table}>
        <Table
            data={entityOccupations}
            columns={my ? columns : adminColumns}
            labels={my ? myLabels : labels}
            orderBy="name"
            order="asc"
            renderCell={(r, c) => renderCell(r, c, occupations, onEvaluate, entityStages[r], compensationTiers)}
        />
        <Dialog open={Boolean(showEditor)} disableBackdropClick scoll='paper'>
            <DialogTitle>
                <div className={classes.title}>Select occupations</div>
            </DialogTitle>
            <OccupationForm
                initialValues={{ selection: entityOccupations }}
                onClose={onToggleEditor}
                onSubmit={values => onUpdate(values.selection)}
            />
        </Dialog>        
        <EvaluationForm 
            userId={userId}
            evaluateOccupationId={evaluateOccupationId} 
            onClose={() => onEvaluate()}
            onSubmit={onSubmitEvaluation}
        />
    </div>
);

EntityOccupations.propTypes = {
    classes: PropTypes.object.isRequired,
    entityOccupations: PropTypes.array.isRequired,
    entityStages: PropTypes.object.isRequired,
    occupations: PropTypes.array.isRequired,
    onEvaluate: PropTypes.func.isRequired,
    onSubmitEvaluation: PropTypes.func.isRequired,
    onToggleEditor: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    compensationTiers: PropTypes.array,
    evaluateOccupationId: PropTypes.string,
    my: PropTypes.bool,
    showEditor: PropTypes.bool
};

export default withStyles(styles)(EntityOccupations);
