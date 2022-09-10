import React from 'react';
import CompensationTierList from '../containers/compensationTierList';
import CompensationTierDetails from '../containers/compensationTierDetails';
import NewCompensationTierDetails from '../containers/newCompensationTierDetails';
import Screen from '../../reusable/views/screen';

const CompensationTiers = props => (
    <Screen {...props} components={{
        List: CompensationTierList,
        Details: CompensationTierDetails,
        New: NewCompensationTierDetails
    }}/>
);

export default CompensationTiers;
