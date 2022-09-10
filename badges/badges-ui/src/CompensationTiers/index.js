import actions from './actions';

export CompensationTiers from './containers/compensationTiers'; //eslint-disable-line object-curly-spacing
export CompensationTierSelector from './views/compensationTierSelector'; //eslint-disable-line object-curly-spacing
export {getCompensationTiers, getCompensationSteps} from './api'; //eslint-disable-line object-curly-spacing
export const setCompensationTierList = actions.setList;
export const setCompensationStepList = actions.compensationSteps.setList;
