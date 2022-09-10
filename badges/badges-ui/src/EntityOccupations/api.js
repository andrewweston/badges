import api from  '../api';

export const getMyOccupations = () => api({
    method: 'GET',
    controller: 'myoccupation'
});

export const getEntityOccupations = id => api({
    method: 'GET',
    controller: 'entityoccupation',
    id
});

export const saveMyOccupations = (occupationIds) => api({
    method: 'PUT',
    controller: 'myoccupation',
    data: { occupationIds }
});

export const saveEntityOccupations = (id, occupationIds) => api({
    method: 'PUT',
    controller: 'entityoccupation',
    id,
    data: { occupationIds }
});

export const saveMyEvaluation = (data) => api({
    method: 'POST',
    controller: 'mycompetency',
    data: { data }
});

export const saveEntityEvaluation = (id, data) => api({
    method: 'POST',
    controller: 'entitycompetency',
    id,
    data: { data }
});

export const getMyEvaluation = () => api({
    method: 'GET',
    controller: 'mycompetency'
});

export const getEntityEvaluation = (id) => api({
    method: 'GET',
    controller: 'entitycompetency',
    id
});