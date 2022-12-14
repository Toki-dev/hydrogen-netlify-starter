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
  mongoose.connect('mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
  if (request.method == 'POST') {
  

    const {name, description} = JSON.parse(request.body)
    return await EventsModel.create({name,description});
  }


  return await EventsModel.find({});
}
