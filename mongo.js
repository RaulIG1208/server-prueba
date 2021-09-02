const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// conexion a mongodb
mongoose
  .connect("mongodb://localhost/notes-api")
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.error(err);
  });

/**Creamos un Schema que identifica el tipo de datos que va aceptar es una especie de patron del patron */

// Note.find({}).then((res) => {
//   console.log(res);
//   mongoose.connection.close();
// });
// const note = new Note({
//   content: "Contenido de mi primera nota",
//   date: new Date(),
//   important: false,
// });

// note
//   .save()
//   .then((res) => {
//     console.log(res);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
