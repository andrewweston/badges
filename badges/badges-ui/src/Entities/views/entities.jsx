import React from 'react';
import EntityList from '../containers/entityList';
import EntityDetails from '../containers/entityDetails';
import NewEntityDetails from '../containers/newEntityDetails';
import Screen from '../../reusable/views/screen';

const Entity = props => (
    <Screen {...props} components={{
        List: EntityList,
        Details: EntityDetails,
        New: NewEntityDetails
    }}/>
);

export default Entity;
