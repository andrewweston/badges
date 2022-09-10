import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';
import sort from '../../reusable/sort';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { COMPETENCY_CATEGORIES } from '../../reusable/constants';

const styles = theme => ({
    table: {
        ...table(theme),
        padding: 0
    }
});

const InfoIconStyled = withStyles(theme => ({
    root: {
        verticalAlign: 'middle',
        paddingLeft: theme.spacing(0.5),
        color: theme.palette.grey[500]
    }
}))(InfoIcon);

const ProficiencyTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.grey[600],
        maxWidth: 320,
        padding: theme.spacing(2),
        whiteSpace: "pre-line"
    },
}))(Tooltip);

const columns = ['category', 'name'];
const columnWithBadges = [...columns, 'badges'];
const labels = {category: 'Category', name: 'Competencies', badges: 'My badges'};

const getProficiency = (competencyId, occupationStageId, values, proficiencies) => {
    const value = (values || []).find(v => v.occupationStageId === occupationStageId && v.competencyId === competencyId) || {};
    const id = value.proficiencyId;
    if (!id) {
        return null;
    }
    return proficiencies.find(p => p.id === id);
};

const updateValue = (data, occupationStageId, competencyId, proficiencyId) => {
    if (proficiencyId)
    {
        const record = (data || []).find(v => v.occupationStageId === occupationStageId && v.competencyId === competencyId);
        if (record) {
            return data.map(r => r === record ? {...record, proficiencyId} : r);
        }
        else {
            return [...data, {occupationStageId, competencyId, proficiencyId}];
        }
    }
    else {
        return (data || []).filter(v => v.occupationStageId !== occupationStageId || v.competencyId !== competencyId);
    }
}

const renderCell = (r, c, category, data, proficiencies, classes, readOnly, onChange) => {
    switch (c) {
        case 'category':
            return COMPETENCY_CATEGORIES[category]
        case 'name':
            return <div className={classes[c]}>{r[c]}</div>;
        default:
            return (
                <Select disableUnderline
                    value={(getProficiency(r.id, c, data, proficiencies) || {}).id || "none"}
                    onChange={readOnly ? null : e => onChange(updateValue(data, c, r.id, e.target.value))}
                    readOnly={readOnly}
                    renderValue={value => (proficiencies.find(x => x.id === value) || {}).name || <Typography color="textSecondary">Select proficiency</Typography>}
                >
                    {proficiencies.sort(sort('asc', 'factor')).map(p => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name}
                            <ProficiencyTooltip title={
                                <React.Fragment>
                                    <Typography color="inherit" variant="subtitle2">{p.name}</Typography>
                                    <br />
                                    <Typography color="inherit" variant="caption">{p.description}</Typography>
                                </React.Fragment>
                            }>
                                <InfoIconStyled fontSize="small" />
                            </ProficiencyTooltip>
                        </MenuItem>
                    ))}
                </Select>
            );
    }
};

const ProficiencyMap = ({
    classes,
    competencies,
    selection,
    categories,
    stages,
    proficiencies,
    data,
    onChange,
    readOnly,
    renderOptionsCount
}) => (
    <div className={classes.table}>
        <Table
            isGrouped showGroupHeader={[false, Boolean(Object.keys(categories).find(x => categories[x])), false]}
            data={COMPETENCY_CATEGORIES.map((c, i) => selection.filter(x => categories[x] === i).map(k => competencies.find(x => x.id === k)))}
            columns={[...(readOnly ? columnWithBadges : columns), ...stages.sort(sort('asc', 'factor')).map(p => p.id)]}
            labels={stages.reduce((r,p) => ({...r, [p.id]: p.name}), labels)}
            renderCell={(r,c,g) => renderCell(r, c, g, data, proficiencies, classes, readOnly, onChange)}
            renderGroupHeader={renderOptionsCount}
        />
    </div>
);

ProficiencyMap.propTypes = {
    classes: PropTypes.object.isRequired,
    competencies: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    proficiencies: PropTypes.array.isRequired,
    renderOptionsCount: PropTypes.any.isRequired,
    selection: PropTypes.array.isRequired,
    stages: PropTypes.array.isRequired,
    data: PropTypes.array,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default withStyles(styles)(ProficiencyMap);
