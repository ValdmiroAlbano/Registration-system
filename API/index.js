const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes'); 




const app = express();
const port = 3000;

let corsOptions ={
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.json({msg:"Rota publica"});
});

app.use('/api', usuarioRoutes);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
