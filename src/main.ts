import  Express, { response }  from "express";
import { request } from "http";
import path from "path";

const app = Express();
const port = 3000;

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/home.html'));
});

app.listen(port, () => {
    console.log(`web server running in http://localhost:${port}`);
});


app.get('/sobre', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/sobre.html'));
});

app.get('/contato', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/contato.html'));
});

app.use(Express.urlencoded({extended : true}));
app.use(Express.json());


app.post('/contato', (request, response)=>{
    console.log(request.body);

    response.redirect('/');
})