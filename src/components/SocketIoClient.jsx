import io from 'socket.io-client';

function SocketIoClient(onResponse = console.log){
    const socketio = io('http://localhost:4321', {
        cors: {origin: 'http://localhost:3000'}
    });

    socketio.on('connect', () => console.log('connected'));
    socketio.on('disconnect', () => console.log('disconnected'));

    socketio.on('response', onResponse);

    return socketio;
}

export default SocketIoClient;