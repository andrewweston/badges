import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OpenIcon from '@material-ui/icons/ArrowRight';
import CloseIcon from '@material-ui/icons/ArrowDropDown';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';

const styles = theme => ({
    table: table(theme),
    description: {
        minWidth: 200
    },
    groupHeaderIcon: {
        verticalAlign: 'middle'
    }
});

const columns = ['name', 'description', 'occupations'];
const labels = {name: 'Name', description: 'Description', occupations: 'Occupations'};

const renderCell = (r,c,occupations,classes) => {
    switch (c) {
        case 'occupations':
            return occupations && occupations
                .filter(o => o.competencies.find(c => c.competencyId === r.id))
                .map(o => o.name).join(', ');
        default:
            return <div className={classes[c]}>{r[c]}</div>;
    }
}

const renderGroupHeader = (tag, open, classes) => (
    <span>
        {open
            ? <CloseIcon className={classes.groupHeaderIcon} />
            : <OpenIcon className={classes.groupHeaderIcon} />
        }
        {(tag || { name: 'no tags' }).name}
    </span>
);

const CompetencyList = ({
    classes,
    list,
    tags,
    occupations,
    orderBy,
    order,
    onSelect,
}) => {
    const data = tags && list && [
        ...tags.map(t => ({tag: t, data: list.filter(c => c.tags.indexOf(t.id) >= 0)})),
        {data: list.filter(c => !c.tags || !c.tags.length)}
    ].filter(t => t.data.length) || [];
    return (
        <div className={classes.table}>
            <Table
                isGrouped isGroupCollapsible showGroupHeader={data.map(t => true)}
                data={data.map(t => t.data)}
                columns={columns}
                labels={labels}
                orderBy={orderBy}
                order={order}
                onSelect={(r,c) => onSelect(r,c)}
                renderCell={(r,c) => renderCell(r, c, occupations, classes)}
                renderGroupHeader={(i, open) => renderGroupHeader(data[i].tag, open, classes)}
            />
        </div>
    );
};

CompetencyList.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array,
    occupations: PropTypes.array,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    tags: PropTypes.array
};

export default withStyles(styles)(CompetencyList);
