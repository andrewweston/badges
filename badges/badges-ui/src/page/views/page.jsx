import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '../containers/appbar';
import Drawer from '../containers/drawer';
import {My} from '../../My';
import {Entities} from '../../Entities';
import {Competencies} from '../../Competencies';
import {Proficiencies} from '../../Proficiencies';
import {CompensationTiers} from '../../CompensationTiers';
import {Occupations} from '../../Occupations';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        minHeight: '100vh'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        minWidth: 0, // So the Typography noWrap works
        marginTop: '64px',
        position: 'relative',
        height: 'calc(100vh - 64px)',
        boxSizing: 'border-box'
    },
});


const Page = ({classes, authenticated, auth}) => (authenticated
    ? <Switch>
        <Route path="/admin" render={({match}) => (
            <div className={classes.root}>
                <AppBar authenticated auth={auth} />
                <Drawer admin />
                <main className={classes.content}>
                    <Switch>
                        <Route path={`${match.url}/competencies`} render={() => <Competencies admin />} />
                        <Route path={`${match.url}/proficiencyScale`} render={() => <Proficiencies admin />} />
                        <Route path={`${match.url}/compensationScale`} render={() => <CompensationTiers admin />} />
                        <Route path={`${match.url}/occupations`} render={() => <Occupations admin />} />
                        <Route render={() => <Entities admin />} />
                    </Switch>
                </main>
            </div>
        )} />
        <Route render={() => (
            <div className={classes.root}>
                <AppBar authenticated auth={auth} />
                <Drawer />
                <main className={classes.content}>
                    <Switch>\
                        <Route path="/occupations" render={() => <Occupations />} />
                        <Route render={() => <My />} />
                    </Switch>
                </main>
            </div>
        )} />
    </Switch>
    : <div className={classes.root}>
        <AppBar auth={auth} />
        <main className={classes.content}>
            <Typography noWrap>Welcome to Badges App. Please login.</Typography>
        </main>
    </div>
);

Page.propTypes = {
    auth: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);
