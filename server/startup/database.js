module.exports = function(connectionString) {
    const { MongoClient, ServerApiVersion } = require('mongodb');

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(connectionString, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    async function run() {
        try {
            await client.connect();

            await client.db("admin").command({ ping: 1 });
            console.log("[DB] Connected to database.");
        } finally {
            await client.close();
        }
    }

    run().catch(console.dir);

    return client;
}