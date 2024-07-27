const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const { Server } = require('socket.io'); 
const cors = require('cors');

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('send name', (username) => {
    io.emit('send name', username);
  });

  socket.on('send message', (chat) => {
    io.emit('send message', chat);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/purchases', purchaseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
