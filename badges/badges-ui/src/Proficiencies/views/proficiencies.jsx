import React from 'react';
import ProficiencyList from '../containers/proficiencyList';
import ProficiencyDetails from '../containers/proficiencyDetails';
import NewProficiencyDetails from '../containers/newProficiencyDetails';
import Screen from '../../reusable/views/screen';

const Proficiencies = props => (
    <Screen {...props} components={{
        List: ProficiencyList,
        Details: ProficiencyDetails,
        New: NewProficiencyDetails
    }}/>
);

export default Proficiencies;
