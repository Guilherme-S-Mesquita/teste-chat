import express, { Application } from 'express'; // Importa o módulo Express e o tipo Application.
import http from 'http'; // Importa o módulo http do Node.js.
import { Server } from 'socket.io'; // Importa a classe Server do Socket.IO para criar um servidor de WebSocket.

class App {
    private app: Application; // Declara uma variável privada para o aplicativo Express.
    private http: http.Server; // Declara uma variável privada para o servidor HTTP.
    private io: Server; // Declara uma variável privada para o servidor Socket.IO.

    constructor() {
        // No construtor, configuramos e inicializamos o servidor Express e o Socket.IO.
        this.app = express(); // Cria uma instância do aplicativo Express.
        this.http = http.createServer(this.app); // Cria um servidor HTTP usando a instância do Express.
        this.io = new Server(this.http); // Cria uma instância do servidor Socket.IO, associando-o ao servidor HTTP.
        this.listenSocket(); // Configura os eventos do Socket.IO.
        this.setupRoutes(); // Configura as rotas do Express.
    }

    listenServer() {
        // Método para iniciar o servidor HTTP na porta 3000.
        this.http.listen(3000, () => console.log('Server is running')); // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver funcionando.
    }

    listenSocket() {
        // Configura os eventos do Socket.IO.
        this.io.on('connection', (socket) => {
            // Evento de conexão: é acionado quando um cliente se conecta ao servidor WebSocket.
            console.log('user connected =>', socket.id); // Exibe o ID do socket do cliente no console.

            socket.on('message', (msg) => {
                // Evento personalizado 'message': é acionado quando o servidor recebe uma mensagem do cliente.
                console.log('foi fi', msg); // Exibe a mensagem recebida no console.
                this.io.emit('message', msg); // Reenvia a mensagem recebida para todos os clientes conectados.
            });
        });
    }

    setupRoutes() {
        // Configura as rotas HTTP usando o Express.
        this.app.get('/', (req, res) => {
            // Rota GET para a raiz ('/'): quando um cliente acessa a URL principal do servidor.
            res.sendFile(__dirname + '/index.html'); // Envia o arquivo 'index.html' localizado no mesmo diretório que o código do servidor.
        });
    }
}

// Cria uma instância da classe App e inicia o servidor.
const app = new App();
app.listenServer(); // Inicia o servidor HTTP.
