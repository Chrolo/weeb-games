//TODO: configure static page delivery from root
import express from 'express';
import fs from 'fs';
import path from 'path';
import config from './serverConfig.js';

//routes
import indexRouter from './routes/indexPageRouter.js';
import userRouter from './routes/userRouter.js';

let app = express();
const port = process.env['NODE_PORT'] || config.port;

//TODO: configure routes so that common template always used and designs injected ontop
app.get('/', indexRouter);

//The simplest static serving:
app.use('/user/:name', userRouter);
app.use('/static', express.static(path.resolve(__dirname, '../../static')));

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});
