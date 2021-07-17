const isUrl = require('is-valid-http-url');
const dbService = require('moleculer-db');
const MongoDBAdapter = require('moleculer-db-adapter-mongo');

module.exports = function () {

    let adapter;

    return {
        name: "webhooks",
        version: 1,
        mixins: [dbService],
        adapter: new MongoDBAdapter("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, "dyte-test"),
        collection: "webhooks",
        settings: {
            $noVersionPrefix: true,
            fields: ["_id", "url"],
            entityValidator: {
                url: "string"
            }
        },

        afterConnected() {
            adapter = this.adapter;
        },

        actions: {
            register(ctx) {
                let url = ctx.params.targetUrl;
                if (isUrl(url)) {
                    return adapter.insert({ url }).then(doc => {
                        ctx.meta.$statusMessage = 'webhook registered';

                        let oid = doc._id.toHexString();
                        return { id: oid };
                    });
                } else {
                    ctx.meta.$statusMessage = 'Invalid url';
                    ctx.meta.$statusCode = 400;

                    return 'Not a valid url';
                }
            },

            update(ctx) {
                let url = ctx.params.newTargetUrl;
                let id = ctx.params.id;
                if (isUrl(url)) {
                    return adapter.updateById(id, { $set: { url } }).then(doc => {
                        if (doc != null) {
                            ctx.meta.$statusMessage = 'webhook updated';
                            return;
                        } else {
                            ctx.meta.$statusMessage = 'webhook not found';
                            ctx.meta.$statusCode = 404;
                            return;
                        }
                    });
                } else {
                    ctx.meta.$statusMessage = 'Invalid url';
                    ctx.meta.$statusCode = 400;

                    return 'Not a valid url';
                }
            },

            list(ctx) {
                return adapter.find({}).then(docs => {
                    ctx.meta.$statusMessage = 'Done';
                    return docs;
                });
            },

            delete(ctx) {
                let id = ctx.params.id;
                return adapter.removeById(id).then(doc => {
                    if (doc != null) {
                        ctx.meta.$statusMessage = 'webhook deleted';
                        return;
                    } else {
                        ctx.meta.$statusMessage = 'webhook not found';
                        ctx.meta.$statusCode = 404;
                        return;
                    }
                });
            }
        }
    }
}