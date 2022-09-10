export default ({url, controller, id, ...ajaxSettings}) => new Promise((resolve, reject) =>
    $.ajax({
        ...ajaxSettings,
        url: url || `${__CONFIG__.api.endpoint}/api/${controller}${id ? `/${id}` : ''}`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
            'Identity': window.localStorage.getItem('id_token')
        }
    })
        .done(resolve)
        .fail(error => {
            console.error(error);
            if ((error.responseJSON || {}).ExceptionMessage) {
                window.alert(error.responseJSON.ExceptionMessage);
            }
            reject(error);
        })
        //.always()
);
