import mongoose from 'mongoose';

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


 const EventsModel = mongoose.model('Event', eventSchema);

/*  */
export async function api(request, {params, queryShop}) {
try {
  mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  if (request.method == 'POST') {
    const x = JSON.parse(request.body)
    return await EventsModel.create({name:x.name,description: x.description});
  }


  return await EventsModel.find();
} catch (error) {
  return error
}

}
