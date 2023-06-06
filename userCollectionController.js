'use strict';
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = 'videojuegos';

exports.obtener_usuarios = async function (req, res) {
    //Nos conectamos a la BD
    const database = client.db(dbName);
    // Referencia a la coleccion
    const usuarios = database.collection("usuarios");
    const query = {}; // Consulta sin filtros
    const options = {
        // Indicamos las columnas que queremos obtener en el resultado
        projection: { _id: 0, nombre: 1, correo: 1 },
    };
    // Hacemos la consulta
    const cursor = usuarios.find(query, options);
    cursor.toArray().then((data) => {
        console.log("Resultados Obtenidos: " + data.length);
        res.end(JSON.stringify(data));
    });
};


//Obtener toda la información de un usuario en base a su correo electrónico.
//http://localhost:8585/usuarios/andrear@outlook.com
exports.obtener_usuario_por_correo = async function (req, res) {
  // Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la coleccion
  const usuarios = database.collection("usuarios");
  // Obtenemos el valor del parametro
  var correo = req.params.correo;
  // Declaramos los filtros
  const query = { correo: new RegExp(correo, 'i') };
  // Hacemos la consulta
  const usuario = await usuarios.findOne(query);
  console.log("Resultado Obtenido:", usuario);
  res.end(JSON.stringify(usuario));
};

//Obtener todos los eventos del log que correspondan a un usuario en específico.
//http://localhost:8586/event/usr_3
exports.obtener_eventos_por_usuario = async function (req, res) {
  // Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la colección
  const eventos = database.collection("logs");
  // Obtenemos el valor del parámetro (identificador de usuario)
  const username = req.params.user;
  // Construimos el filtro para el usuario
  const filtroUsuario = { username: new RegExp(username, 'i') };
  // Hacemos la consulta
  const eventosUsuario = await eventos.find(filtroUsuario).toArray();
  console.log("Eventos obtenidos:", eventosUsuario);
  res.json(eventosUsuario);
};



//Obtener todos los eventos del log que correspondan a un usuario en específico y que el evento contenga
//las palabras de búsqueda indicadas.

  //http://localhost:8585/eventos/usr_2/sesi
  exports.obtener_eventos_por_usuario_y_palabras_clave = async function (req, res) {
    // Nos conectamos a la BD
    const database = client.db(dbName);
    // Referencia a la colección
    const eventos = database.collection("logs");
    // Obtenemos los valores de los parámetros (identificador de usuario y evento)
    const username = req.params.username;
    const evento = req.params.evento;
  
    // Construimos el filtro para el usuario
    const filtroUsuario = { username: new RegExp(username, 'i') };
  
    // Construimos el filtro para el evento
    const filtroEvento = {
      evento: { $regex: evento, $options: 'i' }
    };
  
    // Combinamos los filtros con un operador lógico AND
    const query = {
      $and: [filtroUsuario, filtroEvento]
    };
  
    // Hacemos la consulta
    const cursor = eventos.find(query);
    const eventosUsuarioEvento = await cursor.toArray();
    console.log("Eventos obtenidos:", eventosUsuarioEvento);
    res.json(eventosUsuarioEvento);
};


//Obtener todos los registros de la colección de videojuegos de un usuario en específico, y que correspondan 
//a palabras de búsqueda utilizando el nombre del videojuego.

//http://localhost:8585/video/usr_1/g
exports.obtener_video_por_usuario_y_palabras_clave = async function (req, res) {
    
    // Conectarse a la base de datos
    const database = client.db(dbName);
    // Referencia a la colección
    const videojuegos = database.collection("videojuegos");
    // Obtener los valores de los parámetros (identificador de usuario y nombre del juego)
    const username = req.params.username;
    const nombreJuego = req.params.video;
  
    // Construimos el filtro para el usuario
    const filtroUsuario = { username: new RegExp(username, 'i') };
  
    // Construimos el filtro para el evento
    const filtrovideo = {
        nombreJuego: { $regex: nombreJuego, $options: 'i' }
    };
  
    // Combinamos los filtros con un operador lógico AND
    const query = {
      $and: [filtroUsuario, filtrovideo]
    };

    // Realizar la consulta
    const cursor = videojuegos.find(query);
    const videos = await cursor.toArray();
    console.log("videojuegos obtenidos:", videos);
    res.json(videos);
    
  };

// Obtener todos los registros de la colección de videojuegos de un usuario en específico y de una consola en
//específico.
//http://localhost:8585/videojuego/usr_1/macOS
  exports.obtener_video_por_usuario_y_plataforma = async function (req, res) {
    
    // Conectarse a la base de datos
    const database = client.db(dbName);
    // Referencia a la colección
    const videojuegos = database.collection("videojuegos");
    // Obtener los valores de los parámetros (identificador de usuario y nombre del juego)
    const username = req.params.username;
    const plataforma = req.params.plataforma;
  
    // Construimos el filtro para el usuario
    const filtroUsuario = { username: new RegExp(username, 'i') };
  
    // Construimos el filtro para el evento
    const filtrovideo = {
        plataforma: { $regex: plataforma, $options: 'i' }
    };
  
    // Combinamos los filtros con un operador lógico AND
    const query = {
      $and: [filtroUsuario, filtrovideo]
    };

    // Realizar la consulta
    const cursor = videojuegos.find(query);
    const videos = await cursor.toArray();
    console.log("videojuegos obtenidos:", videos);
    res.json(videos);
    
  };
  
  


//Obtener toda la información de la colección de videojuegos de un usuario en específico.
//http://localhost:8585/videojuegos/usr_3

exports.obtener_videojuegos_por_usuario = async function (req, res) {
    // Nos conectamos a la BD
    const database = client.db(dbName);
    // Referencia a la colección
    const videojuegos = database.collection("videojuegos");
    // Obtenemos el valor del parámetro (identificador de usuario)
    const username = req.params.username;
    // Declaramos los filtros
    const query = { username: new RegExp(username, 'i') };
    // Hacemos la consulta
    const cursor = videojuegos.find(query);
    const videoUsuario = await cursor.toArray();
    console.log("Juegos obtenidos:", videoUsuario);
    res.json(videoUsuario);
  };

// Autenticar un usuario en base a su correo electrónico y contraseña
//http://localhost:8586/usuarios/autenticar/andresv@gmail.com/conejo123

exports.autenticarUsuario = async function (req, res) {
  // Nos conectamos a la BD
  const database = client.db(dbName);
  // Referencia a la colección
  const usuarios = database.collection("usuarios");
  // Obtenemos los valores de los parámetros (correo electrónico y contraseña)
  const correo = req.params.correo;
  const contrasena = req.params.contrasena;
  console.log(correo)
  console.log(contrasena)
  // Construimos el filtro para el correo electrónico y contraseña
  const filtro = {
    correo: correo,
    contrasena: contrasena
  };

  // Realizamos la consulta para verificar las credenciales del usuario
  const usuario = await usuarios.findOne(filtro);
  console.log(filtro)
  if (usuario) {
    // Las credenciales son válidas, el usuario está autenticado
    res.json({ mensaje: "Autenticación exitosa" });
  } else {
    // Las credenciales son inválidas, el usuario no está autenticado
    res.status(401).json({ error: filtro });
  }
};

//Obtener todos los eventos del log que correspondan a un rango de fechas en específico. --buscar error
exports.obtener_eventos_por_rango_fechas = async function (req, res) {
    // Nos conectamos a la BD
    const database = client.db(dbName);
    // Referencia a la colección
    const eventos = database.collection("logs");
    // Obtenemos los valores de los parámetros (fecha inicial y fecha final)
    const fechaInicio = new Date(req.params.fechaInicio);
    const fechaFin = new Date(req.params.fechaFin);
    console.log("fecha:", fechaFin);
    console.log("fecha:", fechaInicio);
    // Construimos el filtro para el rango de fechas
    const filtroFechas = {
      fechaEvento: {
        $gte: fechaInicio,
        $lt: fechaFin
      }
    };
    
    // Hacemos la consulta
    const eventosPorRangoFechas = await eventos.find(filtroFechas).toArray();
    console.log("se hizo",filtroFechas)
    console.log("Eventos obtenidos:", eventosPorRangoFechas);
    res.json(eventosPorRangoFechas);
};

// Guardar toda la información de un registro de videojuego para la colección de un usuario en esepecífico.
//http://localhost:8586/vid/agregara/usr_3

//body
/*{
  "juegoId": "3498",
  "nombreJuego": "Grand Theft Auto V",
  "plataforma": [
    "PlayStation 5",
    "Xbox Series S/X",
    "PlayStation 4",
    "PC",
    "PlayStation 3",
    "Xbox 360",
    "Xbox One"
  ]
}*/

exports.guardar_registro_videojuego = async function (req, res) {
  // Conectarse a la base de datos
  const database = client.db(dbName);
  
  // Obtener el nombre de usuario y los datos del videojuego del cuerpo de la solicitud
  const username = req.params.username;
  const videojuego = req.body;
  
  // Referencia a la colección de videojuegos
  const videojuegos = database.collection("videojuegos");

  // Establecer el campo "username" en los datos del videojuego
  videojuego.username = username;

  // Guardar el registro de videojuego en la colección de videojuegos
  const result = await videojuegos.insertOne(videojuego);
  
  res.json({ message: "Registro de videojuego guardado correctamente" });
  console.log(result);
};

//Guardar un evento de log en base de datos.
//http://localhost:8586/eventos/agregara/usr_3

//body

/*{
  "evento": "Agregó el juego Grand Theft Auto V a su colección"
}
*/

exports.guardar_evento_log = async function (req, res) {
  // Conectarse a la base de datos
  const database = client.db(dbName);
  
  // Obtener el username del parámetro de la ruta
  const username = req.params.username;
  
  // Obtener el evento del cuerpo de la solicitud
  const evento = req.body.evento;
  
  // Referencia a la colección de logs
  const logs = database.collection("logs");

  const fechaEvento = new Date();

  // Crear un objeto que represente el evento de log
  const eventoLog = {
    username: username,
    evento: evento,
    fechaEvento: fechaEvento
  };
  // Guardar el evento de log en la colección de logs
  const result = await logs.insertOne(eventoLog);
  
  // Manejar la respuesta y enviar una confirmación al cliente
  res.json({ message: "Evento de log guardado correctamente" });
  console.log(result);
};




  
  
  

