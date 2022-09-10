import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';

const styles = theme => ({
    table: {
        ...table(theme),
        lineHeight: 1.5
    }
});

const columns = ['name', 'description'];
const columnsSelection = ['selected', 'name', 'description'];
const labels = {selected: '', name: 'Name', description: 'Description'};

const renderCell = (r, c, selection, onToggleSelection) => {
    switch (c) {
        case 'selected':
            return <Checkbox 
                checked={Boolean(selection.find(i => i === r.id))} 
                onChange={e => onToggleSelection(r.id, e.target.checked)} 
            />
        default:
            return r[c];
    }
}

const OccupationList = ({classes, list, orderBy, order, onSelect, selection, onToggleSelection}) => (
    <div className={classes.table}>
        <Table
            data={list}
            columns={selection ? columnsSelection : columns}
            labels={labels}
            orderBy={orderBy}
            order={order}
            onSelect={selection ? null : onSelect }
            renderCell={(r, c) => renderCell(r, c, selection, onToggleSelection)}
        />
    </div>
);

OccupationList.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array,
    onToggleSelection: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    selection: PropTypes.array
};

export default withStyles(styles)(OccupationList);
