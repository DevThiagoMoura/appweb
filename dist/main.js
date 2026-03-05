"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (request, response) => {
    response.send(`
    <html>
    <head>
        <title>Web - Hello World </title>
    </head>
    <body>
        <h1> Hello World</h1>
        <h2> My First app web</h2>

    </body>
    </html>  
    
    `);
});
app.listen(port, () => {
    console.log(`web server running in http://localhost:${port}`);
});
