const stackroxRoutes = (app, fs) => {

    // variables
    const dataPath = './data/stackrox-running.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };


    // READ
    app.get('/apis/apiextensions.k8s.io/v1/customresourcedefinitions/centrals.platform.stackrox.io', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/stackrox-running', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use.
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });

};

module.exports = stackroxRoutes;
