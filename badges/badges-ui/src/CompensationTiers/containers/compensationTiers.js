import React from 'react';
import CompensationStepIcon from '@material-ui/icons/Grade';
import {getCompensationTiers, getCompensationSteps} from '../api';
import actions from '../actions';
import screen from '../../reusable/containers/screen';
import CompensationTiers from '../views/compensationTiers';
import CompensationStepDetails from '../containers/compensationStepDetails';
import NewCompensationStepDetails from '../containers/newCompensationStepDetails';

const options = [
    {name: 'compensation tier'},
    {
        stateKey: 'compensationSteps',
        name: 'compensation step',
        icon: <CompensationStepIcon />,
        Details: CompensationStepDetails,
        New: NewCompensationStepDetails
    }
];

const onLoad = dispatch => {
    dispatch(actions.setLoading(true));
    return Promise.all([
        getCompensationTiers().then(data => dispatch(actions.setList(data))),
        getCompensationSteps().then(data => dispatch(actions.compensationSteps.setList(data)))
    ])
        .then(() => dispatch(actions.setLoading(false)));
};

export default screen({
    View: CompensationTiers,
    stateName: 'compensationTiers',
    actions,
    onLoad,
    options
});
