import api from  '../api';

const getAPIModel = compensationTier => ({
    ...compensationTier,
    compensations: compensationTier.compensations && Object.keys(compensationTier.compensations).map(k => ({
        Key: k,
        Value: compensationTier.compensations[k].replace &&
            compensationTier.compensations[k].replace('$','').replace('K','') || compensationTier.compensations[k]
    }))
});

/* Compensation Tiers */
export const getCompensationTiers = () => api({
    method: 'GET',
    controller: 'compensationTier'
});

export const updateCompensationTier = (id, compensationTier) => api({
    method: 'PUT',
    controller: 'compensationTier',
    id,
    data: getAPIModel(compensationTier)
});

export const patchCompensationTier = (id, data) => api({
    method: 'PUT',
    controller: 'compensationTier',
    id,
    data
});

export const createCompensationTier = compensationTier => api({
    method: 'POST',
    controller: 'compensationTier',
    data: getAPIModel(compensationTier)
});

export const deleteCompensationTier = compensationTier => api({
    method: 'DELETE',
    controller: 'compensationTier',
    data: compensationTier
});

/* Compensation Steps */
export const getCompensationSteps = () => api({
    method: 'GET',
    controller: 'compensationStep'
});

export const updateCompensationStep = (id, compensationStep) => api({
    method: 'PUT',
    controller: 'compensationStep',
    id,
    data: compensationStep
});

export const createCompensationStep = compensationStep => api({
    method: 'POST',
    controller: 'compensationStep',
    data: compensationStep
});

export const deleteCompensationStep = compensationStep => api({
    method: 'DELETE',
    controller: 'compensationStep',
    data: compensationStep
});
