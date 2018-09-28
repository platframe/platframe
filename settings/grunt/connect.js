module.exports = {

    options: {
        base: {
            options: {
                index: 'index.html',
                maxAge: 0
            }
        },
        open: true,
        keepalive: true,
        port: 3030,
        useAvailablePort: true
    },
    all: {
        options: {
            base: '<%= prd %>'
        }
    }

};
