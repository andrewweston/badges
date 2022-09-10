export const root = theme => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
});
export const header = theme => ({
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`
});
export const addButton = theme => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
});
export const left = theme => ({ //eslint-disable-line no-unused-vars
    marginRight: 'auto'
});
export const right = theme => ({ //eslint-disable-line no-unused-vars
    marginLeft: 'auto'
});
export const center = theme => ({ //eslint-disable-line no-unused-vars
    textAlign: 'center'
});
export const spinner = theme => ({ //eslint-disable-line no-unused-vars
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-36px'
});
export const clickable = theme => ({ //eslint-disable-line no-unused-vars
    cursor: 'pointer'
});
export const table = theme => ({ //eslint-disable-line no-unused-vars
    padding: '0 24px',
    maxWidth: '100%',
    maxHeight: 'calc(100% - 80px)'
});
export const tablehead = theme => ({
    color: theme.palette.common.black,
    fontWeight: 700,
    borderBottom: 'solid 2px black'
});
export const tablerow = theme => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
    }
});
export const navigation = theme => ({
    display: 'flex',
    paddingBottom: theme.spacing(2)
});
export const navButton = () => ({ //eslint-disable-line no-unused-vars
    padding: 0,
    textTransform: 'none',
    fontWeight: 'normal',
    textDecoration: 'underline'
});
