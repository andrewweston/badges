import api from  '../api';

export const getMyDetails = () => api({
    method: 'GET',
    controller: 'my'
});
