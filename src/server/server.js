//TODO: configure static page delivery from root
import express from 'express';
import fs from 'fs';
import path from 'path';
import config, {banner} from './serverConfig.js';

//middleware
import basicResponseRouter from './middleware/basicResponseSetup.js';
import loggingRouter from './middleware/loggingRouter.js';
import errorRouter from './middleware/errorRouter.js';

//routes
import indexRouter from './routes/indexPageRouter.js';
import userRouter from './routes/userRouter.js';

let app = express();
const port = process.env['NODE_PORT'] || config.port;

//Apply middleware
app.use('/',basicResponseRouter);
app.use('/', loggingRouter);

// Define routes.
app.get('/', indexRouter);

//The simplest static serving:
app.use('/user', userRouter);
app.use('/static', express.static(path.resolve(__dirname, '../../static')));

//Error handling:
app.use('/', errorRouter);


app.listen(port, ()=>{
    console.log(banner);
    console.log(`Server started on http://localhost:${port}`);
});
