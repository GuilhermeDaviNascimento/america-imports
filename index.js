// Importar as dependências
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bd = require('./bd.js')
// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Middleware para analisar corpos de solicitação
app.use(bodyParser.urlencoded({ extended: true }));

//Enviar informações das camisas para pagina principal
app.get('/', (req, res) => {
    PegarTodasAsCamisas((err, result) => {
        if (err) { console.log('Nenhuma camisa encontrada') }
        if (result) {
            res.render('index', { camisas: result })
        }
    })
})

//Enviar informações da camisa quando for acessada
app.get('/camisa/:id', (req, res) => {
    const { id } = req.params
    PegarCamisaPeloID(id, (err, result) => {
        if (err) { console.log('Nenhuma camisa encontrada') }
        if (result) {
            res.render('camisa', { camisa: result })
        }
    })
})

// Funções
function PegarTodasAsCamisas(callback) {
    const query = 'SELECT * FROM camisas';
    bd.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao encontrar usuário:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}

function PegarCamisaPeloID(id, callback) {
    const query = 'SELECT * FROM camisas WHERE id = ?';
    bd.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao encontrar usuário:', err);
            callback(err, null);
            return;
        }
        callback(null, results[0]);
    });
}

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});