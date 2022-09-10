import api from  '../api';

export const getOccupations = () => api({
    method: 'GET',
    controller: 'occupation'
});

export const getOccupation = id => api({
    method: 'GET',
    controller: 'occupation',
    id
});

export const updateOccupation = (id, occupation) => api({
    method: 'PUT',
    controller: 'occupation',
    id,
    data: occupation
});

export const createOccupation = occupation => api({
    method: 'POST',
    controller: 'occupation',
    data: occupation
});

export const deleteOccupation = occupation => api({
    method: 'DELETE',
    controller: 'occupation',
    data: occupation
});
