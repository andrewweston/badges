module.exports = {
    'api': {
        'endpoint': 'http://badges-api-dev.ap-southeast-2.elasticbeanstalk.com'
    },
    'auth0': {
        'clientId': '0cdvNW4AosazHrJBk13gHQgJRXv6SK7O',
        'domain': 'scale-it.au.auth0.com',
        'audience': 'badge-api.propellerhead.co.nz',
        'scope': 'openid email ' +
            'list:proficiency update:proficiency create:proficiency delete:proficiency ' +
            'list:competency update:competency create:competency delete:competency ' +
            'list:compensation update:compensation create:compensation delete:compensation ' +
            'list:occupation read:occupation update:occupation create:occupation delete:occupation ' +
            'list:entityoccupation update:entityoccupation list:myoccupation update:myoccupation ' +
            'list:entity update:entity create:entity delete:entity read:mydetails ' + 
            'update:mycompetency update:entitycompetency list:mycompetency list:entitycompetency '
    }
};
