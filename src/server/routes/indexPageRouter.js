import path from 'path';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';

import IndexPage from '../../ui/pages/IndexPage';
import * as db from '../../data-model/db-connect.js';
import createHtmlPage from '../../ui/htmlSkeleton.js';


export default function IndexRouter (req, res) {

    //add content-type:
    //res.setHeader('Content-Type', 'text/html');

    //get data:
    const users = db.getTopUsersByPointCount(5);

    users.then((data)=>{
        //render the page:
        const ReactString = renderToString(<IndexPage users={data}/>);
        const renderedHtml = createHtmlPage(ReactString);
        res.send(renderedHtml);
    }).catch((error)=>{
        res.status(500);
        console.error('indexPageRouter: Error retrieving user data.', error);
        res.send('Something Went wrong ;_;');
    });
}
