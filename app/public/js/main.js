var globals = {
    url: 'http://127.0.0.1',
    port: '8013',
    userInput: 'userMessage',
    userName: 'userName',
    messagesArea: 'show-messages'
};

var user;

var socket = io.connect(
    globals.url + ':' + globals.port,
    {
        'forceNew': true
    }
);

socket.on( 'userMessage', function ( data ) {
    render( data );
} );

function render ( data ) {
    var messages_container = document.getElementById( globals.messagesArea );
    var x = ( user.id === data.id ) ? 'me' : 'friend';
    var html = (
        `<div class="${x}">
            <img src="${data.avatar}" width="32" height="32">
            <div class="message">
                <p>
                    <strong>${data.name}</strong>:
                    <em>${data.message}</em>
                    <br>
                </p>
            </div>
         </div>`
    );

    messages_container.insertAdjacentHTML( 'beforeend', html );
    messages_container.scrollTop = messages_container.scrollHeight;
}

function createUser () {
    var userInput = document.getElementById( globals.userName );
    var name = userInput.value;
    var avatar = createAvatar();

    userInput.parentNode.removeChild( userInput );

    return {
        id: Math.floor( Date.now() / 1000 ),
        name: name,
        avatar: avatar
    };
}

function createAvatar () {
    var randomUser = Math.floor( (Math.random() * 90) + 1 );

    return 'https://randomuser.me/api/portraits/thumb/men/' + randomUser + '.jpg';
}

function clearMessageInput ( selector ) {
    document.getElementById( selector ).value = '';
}

function addMessage () {
    user || ( user = createUser() );

    var message = {
        id: user.id,
        name: user.name,
        message: document.getElementById( globals.userInput ).value,
        avatar: user.avatar
    };

    socket.emit( 'newMessage', message );
    clearMessageInput( globals.userInput );
}
