import actions from './actions';

export Occupations from './containers/occupations'; //eslint-disable-line object-curly-spacing
export OccupationList from './containers/occupationList'; //eslint-disable-line object-curly-spacing
export {getOccupations, getOccupation} from './api';
export const setOccupationList = actions.setList;
export const setOccupationDetails = actions.setDetails;
