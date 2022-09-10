import api from  '../api';

export const getCompetencies = () => api({
    method: 'GET',
    controller: 'competency'
});

export const getCompetency = id => api({
    method: 'GET',
    controller: 'competency',
    id
});

export const updateCompetency = (id, competency) => api({
    method: 'PUT',
    controller: 'competency',
    id,
    data: competency
});

export const createCompetency = competency => api({
    method: 'POST',
    controller: 'competency',
    data: competency
});

export const deleteCompetency = competency => api({
    method: 'DELETE',
    controller: 'competency',
    data: competency
});

// Proficiency Map
export const getProficiencyMap = () => api({
    method: 'GET',
    controller: 'proficiencyMap'
});

export const updateProficiencyMap = (competencyId, proficiencyId, compensationTierId) => api({
    method: 'PUT',
    controller: 'proficiencyMap',
    data: {competencyId, proficiencyId, compensationTierId}
});

// Tags
export const getTags = () => api({
    method: 'GET',
    controller: 'tag'
});

export const getTag = id => api({
    method: 'GET',
    controller: 'tag',
    id
});

export const updateTag = (id, tag) => api({
    method: 'PUT',
    controller: 'tag',
    id,
    data: tag
});

export const createTag = tag => api({
    method: 'POST',
    controller: 'tag',
    data: tag
});

export const deleteTag = tag => api({
    method: 'DELETE',
    controller: 'tag',
    data: tag
});
