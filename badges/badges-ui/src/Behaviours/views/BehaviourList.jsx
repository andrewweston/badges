import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '../../reusable/table';
import sort from '../../reusable/sort';

const styles = {
    button: {
        margin: '-24px 0'
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

const renderCell = (r, c, onChange, values) => {
    switch (c) {
        case 'description':
            return (
                <Input
                    value={r[c]}
                    onChange={e => onChange(values.map(v => (v === r ? {...v, description: e.target.value} : v)))}
                    type="text"
                    fullWidth
                    multiline
                    disableUnderline
                    placeholder="Enter behaviour description"
                />
            );
        case 'delete':
            return (
                <IconButton
                    onClick={()=> onChange(values.reduce((a,v) => (v !== r ? [...a, {...v, factor: a.length}] : a), []))}
                >
                    <DeleteIcon/>
                </IconButton>
            );
        default:
            return r[c];
    }
};

const renderHeader = (classes, c, onChange, values) => {
    switch (c) {
        case 'description':
            return (
                <span>
                    Key behaviours
                    <Tooltip title="Add new behaviour">
                        <IconButton
                            className={classes.button}
                            onClick={() => onChange([...values, {id: uuid(), factor: values.length}])}
                        >
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </span>
            );
        default:
            return null;
    }
};

const BehaviourList = ({classes, behaviours, onChange}) => (
    <Table
        padding='none'
        data={(behaviours || []).sort(sort('asc','factor'))}
        columns={['description', 'delete']}
        labels={c => renderHeader(classes, c, onChange, behaviours)}
        width={{'delete': '48px'}}
        renderCell={(r, c) => renderCell(r, c, onChange, behaviours)}
        onDnDSort={({oldIndex, newIndex}) => onChange(onReorder(behaviours, newIndex, oldIndex))}
    />
);

BehaviourList.propTypes = {
    classes: PropTypes.object.isRequired,
    behaviours: PropTypes.array,
    onChange: PropTypes.func
};


export default withStyles(styles)(BehaviourList);
