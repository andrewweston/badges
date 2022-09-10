import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '../../reusable/table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
    description: {
        minWidth: 200
    },
    behaviours: {
        minWidth: 200
    },
    addButton: {
        margin: '-24px 0'
    },
    tableHeader: {
        whiteSpace: 'nowrap'
    }
});

const columns = ['name', 'description'];
const columnsSelected = ['category', ...columns, 'delete'];
const columnsUnselected = ['selected', ...columns];
const labels = {category: 'Category', name: 'Competencies', description: 'Description'};

const renderCell = (r, c, classes, onChange, values, category) => {
    switch (c) {
        case 'category':
            return <Select disableUnderline
                value={category[r.id]}
                onChange={e => onChange(values, {...category, [r.id]: e.target.value})}
            >
                <MenuItem value={0}>Required</MenuItem>
                <MenuItem value={1}>Preferred</MenuItem>
                <MenuItem value={2}>Desired</MenuItem>
            </Select>
        case 'selected':
            return onChange && <Checkbox onChange={e => onChange(r.id, e.target.checked)} />;
        case 'delete':
            return onChange && (
                <IconButton
                    onClick={() => onChange(values.filter(x => x !== r.id), category)}>
                    <DeleteIcon/>
                </IconButton>
            );
        default:
            return <div className={classes[c]}>{r[c]}</div>;
    }
};

const renderHeader = (c, classes, onToggleSelector) => {
    switch (c) {
        case 'name':
            return (
                <span className={classes.tableHeader}>
                    {labels[c]}
                    <Tooltip title="Add competency">
                        <IconButton className={classes.addButton} onClick={() => onToggleSelector(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </span>
            );
        case 'category':
        case 'behaviours':
        case 'description':
            return labels[c];
        default:
            return '';
    }
};

const handleAddSelection = (oldSelection, addSelection, oldCategory, onChange, onToggleSelector) => () => {
    const selection = [...oldSelection, ...Object.keys(addSelection).filter(k => addSelection[k])];
    const category = {...oldCategory, ...Object.keys(addSelection).filter(k => addSelection[k]).reduce((r,k) => ({...r, [k]: 0}), {})}; //make new ones required by default
    onChange(selection, category);
    onToggleSelector(false);
};

const onReorder = (data, newIndex, oldIndex) => {
    var el = data.splice(oldIndex, 1);
    return [...data.slice(0,newIndex), ...el, ...data.slice(newIndex)];
};

const CompetenciesEditor = ({
    classes,
    list,
    selection,
    category,
    onChange,
    onToggleSelector,
    showSelector,
    onToggleSelection,
    addSelection,
    readOnly
}) => (
    <div className={classes.table}>
        <Table
            isGrouped
            showGroupHeader={[false,false,false]}
            data={selection && [0, 1, 2].map(c => selection
                .filter(r => category[r] === c)
                .map((r, i) => ({...list.find(x => x.id === r), factor: i}))
            )}
            columns={columnsSelected}
            labels={readOnly ? labels : c => renderHeader(c, classes, onToggleSelector)}
            renderCell={(r, c) => renderCell(r, c, classes, readOnly ? null : onChange, selection, category)}
            onDnDSort={readOnly 
                ? null 
                : ({ oldIndex, newIndex, collection }) => onChange([0, 1, 2].map(c => c === collection
                    ? onReorder(selection.filter(r => category[r] === c), newIndex, oldIndex)
                    : selection.filter(r => category[r] === c)
                ).reduce((r,a) => [...r, ...a], []), category)
            }
            orderBy="factor"
        />
        {!readOnly && showSelector
            ? <Dialog open disableBackdropClick scoll='paper' maxWidth="md">
                <DialogTitle>
                    <div className={classes.title}>Add competencies to model</div>
                </DialogTitle>
                <DialogContent>
                    <Table
                        data={list.filter(r => !selection || !selection.includes(r.id))}
                        columns={columnsUnselected}
                        labels={labels}
                        orderBy='name'
                        order='asc'
                        onChange={onChange}
                        renderCell={(r, c) => renderCell(r, c, classes, onToggleSelection, selection, category)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onToggleSelector(false)}>Cancel</Button>
                    <Button
                        color="primary"
                        onClick={handleAddSelection(selection, addSelection, category, onChange, onToggleSelector)}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            : null
        }
    </div>
);

CompetenciesEditor.propTypes = {
    addSelection: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onToggleSelection: PropTypes.func.isRequired,
    onToggleSelector: PropTypes.func.isRequired,
    category: PropTypes.object,
    list: PropTypes.array,
    readOnly: PropTypes.bool,
    selection: PropTypes.array,
    showSelector: PropTypes.bool
};

export default withStyles(styles)(CompetenciesEditor);
