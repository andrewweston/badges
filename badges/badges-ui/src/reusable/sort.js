
const baseSort = (a, b, order, orderBy) => (order === 'desc' //eslint-disable-line no-nested-ternary
    ? ((b[orderBy] || '') < (a[orderBy] || '') ? -1 : 1)
    : ((a[orderBy] || '') < (b[orderBy] || '') ? -1 : 1)
);

const sort = (a, b, order, orderBy) => (orderBy.indexOf('.') >= 0
    ? sort(
        a[orderBy.substring(0, orderBy.indexOf('.'))],
        b[orderBy.substring(0, orderBy.indexOf('.'))],
        order,
        orderBy.substring(orderBy.indexOf('.') + 1)
    )
    : baseSort(a, b,  order, orderBy)
);

export default (order, orderBy) => (a, b) => sort(a, b, order, orderBy);
