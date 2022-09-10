import api from  '../api';

export const getPerson = id => api({
    method: 'GET',
    controller: 'entity',
    id //nullable - get the whole list
});

export const createEntity = (entity) => api({
    method: 'POST',
    controller: 'entity',
    data: entity
});

export const updateEntity = (id, entity) => api({
    method: 'PUT',
    controller: 'entity',
    id,
    data: entity
});

export const deleteEntity = (entity) => api({
    method: 'DELETE',
    controller: 'entity',
    data: entity
});