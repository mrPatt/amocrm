var imaps = require('imap-simple');

var config = {
    imap: {
        user: 'yci64owxndezz73u@ethereal.email',
        password: 'reqHR9De1YZrHCcmCu',
        host: 'imap.ethereal.email',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};
 
imaps.connect(config).then(function (connection) {
 
    return connection.search(searchCriteria, fetchOptions).then(function (results) {
            var subjects = results.map(function (res) {
                return res.parts.filter(function (part) {
                    return part.which === 'HEADER';
                })[0].body.subject[0];
            });
 
            console.log(subjects);
            // =>
            //   [ 'Hey Chad, long time no see!',
            //     'Your amazon.com monthly statement',
            //     'Hacker Newsletter Issue #445' ]
        });
});