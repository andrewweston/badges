import React from 'react';
import OccupationList from '../containers/occupationList';
import OccupationDetails from '../containers/occupationDetails';
import NewOccupationDetails from '../containers/newOccupationDetails';
import Screen from '../../reusable/views/screen';

const Occupations = props => (
    <Screen {...props} components={{
        List: OccupationList,
        Details: OccupationDetails,
        New: NewOccupationDetails
    }}/>
);

export default Occupations;
