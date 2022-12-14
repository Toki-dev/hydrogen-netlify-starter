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
export async function api() {
  mongoose.connect('mongodb+srv://sandor:xZj4EJFn9cPrrI0H@cluster0.gcspyje.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
  return await EventsModel.find({});
}
