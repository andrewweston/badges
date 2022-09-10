import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '../../reusable/table';
import sort from '../../reusable/sort';
import {renderInputField as InputField} from '../../reusable/formComponents';
import {CompensationTierSelector} from '../../CompensationTiers';

const styles = () => ({
    description: {
        minWidth: 200
    },
    addButton: {
        margin: '-24px 0'
    },
    deleteButton: {
        margin: '-12px 0'
    },
    tableHeader: {
        whiteSpace: 'nowrap'
    }
});

const columns = ['name', 'compensationTierId', 'delete'];
const labels = {name: 'Occupation Stages', compensationTierId: 'Compensation Tier'};

const getTierTitle = (id, tiers) => {
    if (!id) return <span>Select tier</span>;

    const tier = tiers.find(t => t.id === id);
/*
    const data = Object.keys(tier.compensations).reduce((r,c) => ({
        min: !r.min || tier.compensations[c] < r.min ? tier.compensations[c] : r.min,
        max: !r.max || tier.compensations[c] > r.max ? tier.compensations[c] : r.max
    }), {});
*/
    return <span>{tier.name}</span>;
};

const renderCell = (r, c, classes, onChange, values, compensationTiers) => {
    switch (c) {
        case 'delete':
            return onChange && (
                <IconButton
                    className={classes.deleteButton}
                    onClick={()=> onChange(values.reduce((a,v) => (v.id !== r.id ? [...a, {...v, factor: a.length}] : a), []))}>
                    <DeleteIcon/>
                </IconButton>
            );
        case 'name':
            return onChange
                ? <InputField
                    className={classes[c]}
                    input={{
                        value: r[c],
                        onChange: e => onChange(values.map(v => (v.id === r.id ? {...v, [c]: e.target.value} : v)))
                    }}
                    meta={{}}
                    margin='none'
                    required
                    placeholder="Enter stage title"
                    disableUnderline
                />
                : <div className={classes[c]}>{r[c]}</div>;
        case 'compensationTierId':
            return (
                <div className={classnames(classes[c], onChange && 'highlight')}>
                    {getTierTitle(r[c], compensationTiers)}
                </div>
            );
        default:
            return null;
    }
};

const renderHeader = (c, classes, onAdd) => {
    switch (c) {
        case 'name':
            return (
                <span className={classes.tableHeader}>
                    {labels[c]}
                    <Tooltip title="Add stage">
                        <IconButton className={classes.addButton} onClick={onAdd}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </span>
            );
        default:
            return labels[c];
    }
};



const onReorder = (data, newIndex, oldIndex) => data.map((r,i) => {
    if (
        i < oldIndex && i < newIndex ||
            i > oldIndex && i > newIndex
    ) {
        return ({...r, factor: i});
    }
    else if (i === oldIndex) {
        return ({...r, factor: newIndex});
    }
    else if (newIndex > oldIndex) {
        return ({...r, factor: i - 1});
    }
    else {
        return ({...r, factor: i + 1});
    }
});

const StagesEditor = ({
    classes,
    data,
    onChange,
    onToggleCompensationSelector,
    compensationSelector,
    compensationTiers,
    readOnly
}) => (
    <div className={classes.table}>
        <Table
            data={data.sort(sort('asc', 'factor'))}
            columns={columns}
            labels={readOnly
                ? labels
                : c => renderHeader(c, classes, () => onChange([...data, {id: uuid(), factor: data.length, name: ''}]))
            }
            onChange={onChange}
            renderCell={(r, c) => renderCell(r, c, classes, !readOnly && onChange, data, compensationTiers)}
            onSelect={readOnly
                ? null
                : ((r,c) => (c === 'compensationTierId' && !readOnly
                    ? onToggleCompensationSelector(r.id, r[c])
                    : null
                ))
            }
            selectiveClickable
            onDnDSort={readOnly ? null : ({oldIndex, newIndex}) => onChange(onReorder(data, newIndex, oldIndex)) }
        />
        {!readOnly && compensationSelector
            ? <CompensationTierSelector
                compensationTierId={compensationSelector.value}
                onClose={() => onToggleCompensationSelector()}
                onSelect={tier => onToggleCompensationSelector(compensationSelector.id, tier.id)}
                onSubmit={() =>onChange(data.map(v => (v.id === compensationSelector.id
                    ? {...v, compensationTierId: compensationSelector.value}
                    : v
                )))}
            />
            : null
        }
    </div>
);

StagesEditor.propTypes = {
    classes: PropTypes.object.isRequired,
    compensationTiers: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onToggleCompensationSelector: PropTypes.func.isRequired,
    compensationSelector: PropTypes.object,
    data: PropTypes.array,
    readOnly: PropTypes.bool
};

export default withStyles(styles)(StagesEditor);
