import net from 'net';
const socket = net.connect({ host: '2a05:d012:42e:5719:748c:5453:cb47:2148', port: 5432 }, () => {
  console.log('Connected!');
  socket.end();
});
socket.on('error', (err) => {
  console.error('Error:', err.message);
});
