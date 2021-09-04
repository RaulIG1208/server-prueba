const { Schema, model } = require('mongoose');

const santoSchema = new Schema({
  name: String,
  date: Date,
  constellation: String,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

santoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Santo = model('Santo', santoSchema);

module.exports = Santo;
