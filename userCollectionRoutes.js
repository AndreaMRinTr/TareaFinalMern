'use strict';

module.exports = function (app) {

    var userCollection = require('./userCollectionController');
    
    app.route('/users')
        .get(userCollection.obtener_usuarios)

    app.route('/usuarios/:correo')
        .get(userCollection.obtener_usuario_por_correo);
    
    app.route('/usuarios/autenticar/:correo/:contrasena')
        .get(userCollection.autenticarUsuario);

    app.route('/eventos/:user')
        .get(userCollection.obtener_eventos_por_usuario)
    
    app.route('/eventos/:username/:evento')
        .get(userCollection.obtener_eventos_por_usuario_y_palabras_clave);
      
    app.route('/video/:username/:video')
        .get(userCollection.obtener_video_por_usuario_y_palabras_clave);

    app.route('/videojuego/:username/:plataforma')
        .get(userCollection.obtener_video_por_usuario_y_plataforma);
      
    app.route('/videojuegos/:username')
        .get(userCollection.obtener_videojuegos_por_usuario);

    app.route('/eventos/fechas/:fechaInicio/:fechaFin')
        .get(userCollection.obtener_eventos_por_rango_fechas);


        

        
    
     



};

