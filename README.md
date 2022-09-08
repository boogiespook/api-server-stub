# Telescope API Server Stub
There are time when we will not have access to 'real' endpoints so we may need to spoof them to test our systems.  This simple app can be used to read in JSON files taken from the original system (for example OpenShift) and the replay them offline.

### Getting started

First things first, you'll need to fork or clone this repository, and run the install command of your choosing:

```
npm install
```
And that's really about it. To fire up the server and have it do stuff, you'll need to start it with the familiar command:

```
npm start
```

### Accessing the server and returning data

The server should be running by now, and you can visit `http://localhost:3000` to see it in action.

By default, it doesn't return a great deal, but if you visit `http://localhost:3000/api/v1/namespaces/openshift-logging` -- which will automatically issue a GET request to our running API server -- you'll see a the JSON object populated with with data taken from `data/openshift-logging.json`.

Using a bit craft jq, you can just return the specific data you're looking for.  Using the example above, get the status to see if logging is enabled:
```
$ curl -sk -H "Authorization: Bearer $TOKEN" "$ENDPOINT/api/v1/namespaces/openshift-logging" | jq .status
"Failure"
```

## Expanding the server

There are currently 3 API enpoints provided with the same API route as the original/target system:

```
http://localhost:3000/api/v1/namespaces/openshift-logging
http://localhost:3000/api/v1/namespaces/openshift-compliance
http://localhost:3000/apis/apiextensions.k8s.io/v1/customresourcedefinitions/centrals.platform.stackrox.io
```

### Adding new endpoints
1. Add a new JSON file with your relevant data to the main data entry point for the project, `./data`
2. Add a route file that will access this data into `./routes/[your route file].js` -- hint: use the `./routes/example.js` as a starting point
3. Add your new route file into the main routes file located at `./routes/routes.js`
