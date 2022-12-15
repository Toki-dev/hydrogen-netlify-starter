/* import mongoose from 'mongoose';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority';


 const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  location: String,
  links: String,
  city: String,
  approved: Boolean,
  userId: String,
});





 let cachedDb = null;

const connectToDatabase = async (uri) => {

  if (cachedDb) return cachedDb;
try {
  const client = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
 
  cachedDb = client.model('Event', eventSchema);

  return cachedDb;
} catch (error) {
  throw error;
}
 
};


export async function api(request, {params, queryShop}) {
try {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db("test").collection("events");
    if (request.method == 'POST') {
      const x = JSON.parse(request.body)
      return await cachedDb.create({name:x.name,description: x.description});
    }
  
  
    return await cachedDb.find();
    client.close();
  });
   await connectToDatabase() 
  if (request.method == 'POST') {
    const x = JSON.parse(request.body)
    return await cachedDb.create({name:x.name,description: x.description});
  }


  return await cachedDb.find();
} catch (error) {
  return error
}

} */

import { MongoClient, ServerApiVersion } from 'mongodb';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority'

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db("test");

  return cachedDb;
};

const queryDatabase = async (db) => {
  return await db.collection("events").find({}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  };
};

const pushToDatabase = async (db, data) => {

  console.log('-----------ev', data);
 
   return  await db.collection("events").insertMany([data]);
  
  
};

export async function api(request, {params, queryShop}) {
  try {


  const db = await connectToDatabase(MONGODB_URI);

  switch (request.method ) {
    case "GET":
      return queryDatabase(db);
    case "POST":
      return pushToDatabase(db, JSON.parse(request.body));
    default:
      return { statusCode: 400 };
  }

} catch (error) {
  return error
}

}