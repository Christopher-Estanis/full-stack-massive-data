import { io } from 'socket.io-client';

const socket = io('http://172.24.122.90:5000');

export default socket;