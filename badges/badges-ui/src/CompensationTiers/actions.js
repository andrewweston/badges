import actions from '../reusable/actions';
import {prefix, compensationStep} from './reducers';

const compensationTierActions = actions(prefix);
const compensationStepActions = actions(compensationStep);

export default {
    ...compensationTierActions,
    compensationSteps: compensationStepActions
};
