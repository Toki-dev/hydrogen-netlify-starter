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

const { MongoClient } = require("mongodb");
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

var data = JSON.stringify({
  "collection": "events",
  "database": "test",
  "dataSource": "Cluster0",

});
          
var config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
  },
  body: data
};



const queryDatabase = async () => {
 const res = await fetch('https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/find',config)
const data = await res.json()

return JSON.stringify(data)

};

const pushToDatabase = async ( data3) => {
console.log('________________', data3)
  var data2 = {
    "collection": "events",
    "database": "test",
    "dataSource": "Cluster0",
    "document" : data3
  
  };
            
  var config2 = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'api-key': 't0FA8t5vlbggADy0PP0ZE3voJkCvQm8w0ux7PFHTtykkQEDOeWvY6DIzEML9z6dG',
    },
    body: {"document": {
      "name": "open",
      "text": "Do the dishes"
    }}
  };
      

  const res = await fetch('https://data.mongodb-api.com/app/data-iobky/endpoint/data/v1/action/insertOne',config2)
  
  console.log('reest', res)
  return JSON.stringify(res)
 
   
  
  
};

      




export async function api(request, {params, queryShop}) {
  try {

/* 
  const db = await connectToDatabase(MONGODB_URI); */

  switch (request.method ) {
    case "GET":
      console.log('hhhd')
      return queryDatabase();
    case "POST":
      return pushToDatabase( JSON.parse(request.body));
    default:
      return { statusCode: 400 };
  }

} catch (error) {
  return error
}

}