import api from  '../api';

export const getProficiencies = () => api({
    method: 'GET',
    controller: 'proficiency'
});

export const updateProficiency = (id, proficiency) => api({
    method: 'PUT',
    controller: 'proficiency',
    id,
    data: proficiency
});

export const createProficiency = proficiency => api({
    method: 'POST',
    controller: 'proficiency',
    data: proficiency
});

export const deleteProficiency = proficiency => api({
    method: 'DELETE',
    controller: 'proficiency',
    data: proficiency
});
