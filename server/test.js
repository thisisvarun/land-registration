const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://land_admin:e0qjoLtZfAZJd5GH@cluster0.m2w9t.mongodb.net/land_registration?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("land_registration").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);