// import other routes
//const exampleRoutes = require('./exmple.js');
const complianceRoutes = require('./openshift-compliance');
const loggingRoutes = require('./openshift-logging');
const stackroxRoutes = require('./stackrox-running');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    // exampleRoutes(app, fs);
    complianceRoutes(app, fs);
    loggingRoutes(app, fs);
    stackroxRoutes(app, fs);
};

module.exports = appRouter;
