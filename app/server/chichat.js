var express = require( 'express' );
var app = express();
var server = require( 'http' ).Server( app );
var io = require( 'socket.io' )( server );
var globals = {
    url: '127.0.0.1',
    port: 8013
};

var message = {};

app.use( express.static( 'public' ) );

io.on( 'connection', function ( socket ) {
    socket.on( 'newMessage', function ( data ) {
        message = data;
        io.sockets.emit( 'userMessage', message );
    } );
} );

server.listen( globals.port, globals.url, function () {
    console.info( 'Server listening on port ' + globals.port );
} );
