const { ServiceBroker } = require('moleculer');
const ApiService = require('moleculer-web');
const express = require('express');

const broker = new ServiceBroker({
    nodeID: "ritwik-node-1",
    logger: console,
});

const svc = broker.createService({
    mixins: [ApiService],

    settings: {
        path: '/api',
        server: false,
        routes: [
            {
                path: '/admin',
                aliases: {
                    "POST register": "webhooks.register",
                    "PUT update": "webhooks.update",
                    "GET list": "webhooks.list",
                    "DELETE delete": "webhooks.delete"
                },
                mappingPolicy: "restrict",
                bodyParsers: {
                    json: true
                }
            }
        ]
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.use('/', svc.express());

app.listen(port);

broker.loadServices();
broker.start().then(() => console.log("Started"));