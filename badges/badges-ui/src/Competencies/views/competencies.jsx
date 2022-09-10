import React from 'react';
import CompetencyList from '../containers/competencyList';
import CompetencyDetails from '../containers/competencyDetails';
import NewCompetencyDetails from '../containers/newCompetencyDetails';
import Screen from '../../reusable/views/screen';

const Competencies = props => (
    <Screen {...props} components={{
        List: CompetencyList,
        Details: CompetencyDetails,
        New: NewCompetencyDetails
    }}/>
);

export default Competencies;
