import actions from './actions';

export ProficiencySelector from './views/proficiencySelector'; //eslint-disable-line object-curly-spacing
export Proficiencies from './containers/proficiencies'; //eslint-disable-line object-curly-spacing
export {getProficiencies} from './api'; //eslint-disable-line object-curly-spacing
export const setProficiencyList = actions.setList;
