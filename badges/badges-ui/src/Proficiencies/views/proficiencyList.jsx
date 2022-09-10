import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';

const styles = theme => ({
    table: table(theme)
});

const columns = ['factor', 'name', 'description'];
const selectorColumns = ['selection', 'name', 'description'];
const labels = {factor: '', name: 'Title', description: 'Description'};

const renderCell = (r,c, selection) => {
    switch (c) {
        case 'selection':
            return <RadioGroup name="proficiencySelection" value={selection || ''}><Radio value={r.id} /></RadioGroup>;
        case 'factor':
            return r[c] + 1;
        default:
            return r[c];
    }
};

const ProficiencyList = ({classes, list, orderBy, order, onSelect, onReorder, selector, onSelectProficiency, selectedId}) => (
    <div className={classes.table}>
        <Table
            data={selector
                ? [{id: '', factor: -1, name: 'None', description: 'Remove mapping to proficiency level'},...list]
                : list
            }
            columns={selector ? selectorColumns : columns}
            labels={labels}
            orderBy={orderBy}
            order={order}
            onDnDSort={!selector && (({oldIndex, newIndex}) => onReorder(list, newIndex, oldIndex)) || null}
            onSelect={selector ? onSelectProficiency : onSelect}
            renderCell={(r,c) => renderCell(r,c,selectedId)}
        />
    </div>
);

ProficiencyList.propTypes = {
    classes: PropTypes.object.isRequired,
    onReorder: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array,
    onSelectProficiency: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    selectedId: PropTypes.string,
    selector: PropTypes.bool
};

export default withStyles(styles)(ProficiencyList);
