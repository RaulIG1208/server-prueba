const mongoose = require('mongoose');

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI;

if (!connectionString) {
  console.error(
    'Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servira de connection string. en las clases usamos MongoDB Atlas puedes usar cualquier otra base de datos de MongoDB (incluso local).'
  );
}

// conexion a mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('database is connected');
  })
  .catch((err) => {
    console.error(err);
  });

/** Creamos un Schema que identifica el tipo de datos que va aceptar es una especie de patron del patron */

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
