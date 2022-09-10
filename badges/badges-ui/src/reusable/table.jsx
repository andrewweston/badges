import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {withStyles} from '@material-ui/core/styles';
import TableBase from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import DragIcon from '@material-ui/icons/DragIndicator';
import {clickable, tablehead, tablerow} from './styles';

const styles = theme => ({
    clickable: clickable(theme),
    head: tablehead(theme),
    groupSubhead: {
        ...tablehead(theme),
        background: theme.palette.grey[50],
        borderBottom: {}.undefined
    },
    row: tablerow(theme),
    cell: {
        paddingRight: '24px',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.5',
        padding: '1em',

        '& .highlight:hover': {
            ...clickable(theme),
            textDecoration: 'underline'
        }
    },
    'cell-none': {
        padding: 0
    },
    draggedItemOnTop: {
        zIndex: 10000,
        fontFamily: theme.typography.fontFamily
    }
});

const stylesDragIcon = {
    root: {
        verticalAlign: 'middle'
    }
};

const StyledDragIcon = withStyles(stylesDragIcon)(DragIcon);

const SortableTableRow = SortableElement(({children, ...props}) => (
    <TableRow {...props}>{children}</TableRow>
)); //eslint-disable-line new-cap

export const DragHandle = SortableHandle((props) => <TableCell {...props}><StyledDragIcon /></TableCell>);

const SortableTableBody = SortableContainer(({children, ...props}) => (<TableBody {...props}>{children}</TableBody>));  //eslint-disable-line new-cap

const SortableTableHeader = ({classes, column, label, orderBy, order, onSort, padding, ...props}) => (
    <TableCell 
        sortDirection={orderBy === column ? order : false} 
        classes={{root: `${classes.cell} ${classes[`cell-${padding}`]}`, head: classes.head}} 
        padding={padding} 
        {...props}
    >
        <Tooltip title="Sort">
            <TableSortLabel
                active={orderBy === column}
                direction={order}
                onClick={() => onSort(column)}
            >
                {label}
            </TableSortLabel>
        </Tooltip>
    </TableCell>
);

SortableTableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    column: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    label: PropTypes.any,
    order: PropTypes.string,
    orderBy: PropTypes.string
};

const NonSortableTableHeader = ({classes, label, ...props}) => (
    <TableCell classes={{root: classes.cell, head: classes.head}} {...props}>{label}</TableCell>
);

NonSortableTableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.any
};

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };

        this.handleGroupToggle = this.handleGroupToggle.bind(this);
    }
    handleGroupToggle() {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        const {
            TBody,
            tBodyProps,
            TRow,
            data,
            columns,
            group,
            renderCell,
            renderGroupHeader,
            useDnDHandle,
            onSelect,
            selectiveClickable,
            classes,
            padding,
            isGroupCollapsible
        } = this.props;
        return (
            <TBody {...tBodyProps}>
                {renderGroupHeader && <TableRow onClick={isGroupCollapsible ? this.handleGroupToggle : undefined}>
                    <NonSortableTableHeader
                        classes={{...classes, cell: classes.groupSubhead}}
                        colSpan={columns.length}
                        label={renderGroupHeader(group, this.state.open)}
                    />
                </TableRow>}
                {this.state.open && data.map((r,i) => (
                    <TRow
                        hover
                        key={r.id || i}
                        id={r.id}
                        index={i}
                        collection={group}
                        className={classnames(
                            onSelect && !selectiveClickable && classes.clickable,
                            classes.row
                        )}
                    >
                        {columns.map(c =>
                            (<TableCell
                                key={c}
                                onClick={onSelect ? () => onSelect(r, c, group) : null}
                                classes={{ root: `${classes.cell} ${classes[`cell-${padding}`]}`}}
                                padding={padding}
                            >
                                {renderCell(r,c,group)}
                            </TableCell>)
                        )}
                        {useDnDHandle
                            ? <DragHandle classes={{root: classes.cell, head: classes.head}} />
                            : null
                        }
                    </TRow>
                ))}
            </TBody>
        );
    }
}

const Table = ({
    classes,
    data,
    columns,
    labels,
    width,
    padding,
    orderBy,
    order,
    useDnDHandle,
    sortable,
    onSort,
    isGrouped,
    showGroupHeader,
    renderGroupHeader,
    ...bodyProps
}) => (
    <TableBase padding={padding}>
        {width && <colgroup>
            {columns.map(c => <col key={c} width={width[c]} />)}
            {useDnDHandle ? <col width='36px' /> : null}
        </colgroup>}
        <TableHead>
            <TableRow>
                {columns.map(c => ((sortable || onSort) && (!sortable || sortable.includes(c))
                    ? <SortableTableHeader key={c}
                        classes={classes}
                        column={c}
                        label={labels(c)}
                        orderBy={orderBy}
                        order={order}
                        onSort={onSort}
                    />
                    : <NonSortableTableHeader key={c}
                        classes={classes}
                        label={labels(c)}
                    />
                ))}
                {useDnDHandle ? <NonSortableTableHeader classes={classes} /> : null}
            </TableRow>
        </TableHead>
        {data && (isGrouped
            ? data.map((d,i) => (
                <Body
                    key={i}
                    {...bodyProps}
                    data={d}
                    columns={columns}
                    group={i}
                    renderGroupHeader={showGroupHeader[i] && renderGroupHeader}
                    useDnDHandle={useDnDHandle}
                    classes={classes}
                    padding={padding}
                />
            ))
            : <Body
                {...bodyProps}
                data={data}
                columns={columns}
                useDnDHandle={useDnDHandle}
                classes={classes}
                padding={padding}
            />
        )}
    </TableBase>
);

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    labels: PropTypes.func.isRequired,
    renderCell: PropTypes.func.isRequired,
    data: PropTypes.array,
    isGrouped: PropTypes.bool,
    onSelect: PropTypes.func,
    onSort: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    padding: PropTypes.string,
    renderGroupHeader: PropTypes.func,
    selectiveClickable: PropTypes.bool,
    showGroupHeader: PropTypes.array,
    sortable: PropTypes.array,
    tBodyProps: PropTypes.object,
    useDnDHandle: PropTypes.bool,
    width: PropTypes.object
};

const ExternalTable = ({onDnDSort, labels, classes: {draggedItemOnTop, ...classes}, ...props}) => (
    <Table
        useDnDHandle={Boolean(onDnDSort)}
        TBody={onDnDSort ? SortableTableBody : TableBody}
        TRow={onDnDSort ? SortableTableRow : TableRow}
        tBodyProps={onDnDSort && {
            lockToContainerEdges: true,
            lockAxis: 'y',
            helperClass: draggedItemOnTop,
            pressDelay: 50, //so that delete button click does not get intercepted
            onSortEnd: onDnDSort,
            useDragHandle: true,
        }}
        classes={classes}
        labels={!labels.call ? c => labels[c] : labels}
        {...props}
    />
);

ExternalTable.propTypes = {
    classes: PropTypes.object.isRequired,
    labels: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    onDnDSort: PropTypes.func
};

export default withStyles(styles)(ExternalTable);
