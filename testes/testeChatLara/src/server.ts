import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';

class App {
    private app: express.Application;
    private httpServer: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);

        // Configurar CORS
        this.app.use(cors({
            origin: 'http://localhost:8000', // URL do seu frontend, se necessário
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type']
        }));

        // Servir arquivos estáticos
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Configurar rotas
        this.setupRoutes();

        // Configurar WebSocket
        this.listenSocket();
    }

    listenServer() {
        this.httpServer.listen(3000, () => console.log('Server is running on port 3000'));
    }

    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('user connected =>', socket.id);

            socket.on('message', (msg) => {
                console.log('message received', msg);
                this.io.emit('message', msg); // Envia para todos os clientes conectados
            });
        });
    }

    setupRoutes() {
        // Rota para servir o arquivo HTML
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });
    }
}

const app = new App();
app.listenServer();
