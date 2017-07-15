import path from 'path';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import bodyParser from 'body-parser';

import * as db from '../../data-model/db-connect.js';
import UserPage from '../../ui/pages/UserPage';
import createHtmlPage from '../../ui/htmlSkeleton.js';

function sendUserPage(req, res){
    if(!req.params.name) {
        //shouldn't have got to this route if this wasn't set.
        res.status(400);
        res.send('please select a user.');
    }
    db.getUserData(req.params.name).then((data)=>{
        //render the page:
        const ReactString = renderToString(<UserPage {...data}/>);
        const renderedHtml = createHtmlPage(ReactString);
        res.send(renderedHtml);

    }).catch((error)=>{
        console.error('[UserRouter]',error);
        res.status(500);
        res.send('Server Error ;_;');
    });
}


const UserRouter = express.Router();
//make sure any posted data gets processed:
UserRouter.use(bodyParser.json());
UserRouter.use(bodyParser.urlencoded({ extended: true }));

UserRouter.route('/').post((req,res)=>{
    console.log('caught a post to UserRoute.');
    console.log({params:req.params, body: req.body});
    //actually, just send them to the GET route, so that form is correct:
    res.redirect(301,`/user/${req.body.name}`);
});

UserRouter.route('/:name')
    .post((req, res, next)=>{
        console.log(`[UserRouter] someone posted to ${req.params.name}`);
        console.info('body was:\n',req.body);
        const name = req.params.name;
        const {reason, points} = req.body;
        //Validate and clean the data:


        //update the database:
        const ret = db.addNewPointsStringToUser(name, reason, points).then(
            ()=>{
                //then send them the updated page.
                sendUserPage(req,res);
            }
        );
    })
    .get(sendUserPage);


export default UserRouter;
