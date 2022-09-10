import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '../../reusable/table';
import {table} from '../../reusable/styles';

const styles = theme => ({
    table: table(theme)
});

const columns = ['name', 'email', 'occupation', 'compensation'];
const labels = {name: 'Name', email: 'Email', occupation: 'Occupation', compensation: 'Compensation range'};

const renderCell = (r,c,entityOccupations, occupations, entityStages, compensationTiers) => {
    switch (c) {
        case 'occupation': {
            const data = entityOccupations && entityOccupations[r.id];
            const stages = entityStages && entityStages[r.id];
            return data && occupations && stages && data
                .map(d => {
                    var occupation = occupations.find(o => o.id === d);
                    var stage = occupation && occupation.stages.find(s => s.id === stages[d]);
                    return occupation && `${occupation.name} (${(stage || {}).name || stages[d]})`;
                }).join(', ');
        }
        case 'compensation': {
            const tier = occupations && entityStages && compensationTiers && Object.keys(entityStages[r.id] || {})
                .map(k => occupations.find(o => o.id === k).stages.find(s => s.id === entityStages[r.id][k]))
                .filter(s => s)
                .map(s => compensationTiers.find(c => c.id === s.compensationTierId))
                .filter(t => t)
                .reduce((r, t) => (r && r.factor > t.factor ? r : t) , null);
            const range = tier && Object.keys(tier.compensations).reduce((r, c) => ({
                min: !r.min || tier.compensations[c] < r.min ? tier.compensations[c] : r.min,
                max: !r.max || tier.compensations[c] > r.max ? tier.compensations[c] : r.max
            }), {});            
            return tier && `${tier.name}: $${range.min}K - $${range.max}K` || '';
        }
        default: 
            return r[c];
    }
}

const EntityList = ({classes, list, orderBy, order, onSort, onSelect, entityOccupations, entityStages, occupations, compensationTiers}) => (
    <div className={classes.table}>
        <Table
            data={list}
            columns={columns}
            labels={labels}
            orderBy={orderBy}
            order={order}
            onSort={onSort}
            sortable={columns}
            onSelect={onSelect}
            renderCell={(r, c) => renderCell(r,c,entityOccupations,occupations, entityStages, compensationTiers)}
        />
    </div>
);

EntityList.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    compensationTiers: PropTypes.array,
    entityOccupations: PropTypes.object,
    entityStages: PropTypes.object,
    list: PropTypes.array,
    occupations: PropTypes.array,
    order: PropTypes.string,
    orderBy: PropTypes.string
};

export default withStyles(styles)(EntityList);
