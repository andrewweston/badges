import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';

const styles = theme => ({
    table: {
        ...table(theme)
    },
    clickable: {
        cursor: 'pointer'
    }
});

const renderCell = (r,c, selection) => {
    if (c === 'selection') {
        return <RadioGroup name="compensationSelection" value={selection}><Radio value={r.id} /></RadioGroup>;
    }
    if (c.indexOf('compensations.') === 0) {
        return `$${r.compensations[c.substring(14)] || 0}K`;
    }
    return r[c];
};

const CompensationTierList = ({
    classes,
    list,
    compensationSteps,
    orderBy,
    order,
    onSelect,
    onSelectCompensationStep,
    onReorder,
    selector,
    onValueSelected,
    selectedTierId
}) => (
    <div className={classes.table}>
        <Table
            data={list}
            columns={[
                ...selector ? ['selection'] : [],
                'name',
                ...compensationSteps && compensationSteps.map(s => `compensations.${s.id}`) || []
            ]}
            labels={{
                name: 'Compensation tier',
                ...compensationSteps && compensationSteps.reduce((x,s) => ({...x, [`compensations.${s.id}`]:
                    <div
                        className={classnames(!selector && classes.clickable)}
                        onClick={!selector ? () => onSelectCompensationStep(s) : null}
                    >
                        {s.name}
                    </div>
                }),  {})
            }}
            orderBy={orderBy}
            order={order}
            onSelect={!selector ? onSelect : onValueSelected}
            renderCell={(r,c) => renderCell(r,c,selectedTierId)}
            onDnDSort={!selector ? ({oldIndex, newIndex}) => onReorder(list, newIndex, oldIndex) : null}
        />
    </div>
);

CompensationTierList.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectCompensationStep: PropTypes.func.isRequired,
    onValueSelected: PropTypes.func,
    compensationSteps: PropTypes.array,
    list: PropTypes.array,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onReorder: PropTypes.func,
    selector: PropTypes.bool,
    selectedTierId: PropTypes.string
};

export default withStyles(styles)(CompensationTierList);
