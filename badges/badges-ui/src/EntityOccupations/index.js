import React from 'react';
import EntityOccupations from './containers/entityOccupations'; //eslint-disable-line object-curly-spacing

export const EntityOccupationList = ({userId, ...props}) => userId ? <EntityOccupations key={userId} userId={userId} {...props} /> : null;
export const EntityOccupationsField = ({input: {value}}) => value ? <EntityOccupations key={value} userId={value} /> : null;
export {toggleEditor, setAllEntityOccupations} from './actions'; //eslint-disable-line object-curly-spacing
export {getEntityOccupations} from './api'; //eslint-disable-line object-curly-spacing
