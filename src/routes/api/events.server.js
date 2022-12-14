import mongoose from "mongoose";

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
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await   mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
 
  cachedDb = client.model('Event', eventSchema);

  return cachedDb;
};

/*  */
export async function api(request, {params, queryShop}) {
try {

  await connectToDatabase()
  if (request.method == 'POST') {
    const x = JSON.parse(request.body)
    return await cachedDb.create({name:x.name,description: x.description});
  }


  return 'jjjjj'
} catch (error) {
  return 'gggg ' +error
}

}
