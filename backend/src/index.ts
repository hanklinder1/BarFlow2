import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || '*';
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'barflow-api' });
});

const io = new Server(httpServer, {
  cors: { origin: corsOrigins },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`BarFlow API running on port ${PORT}`);
});
