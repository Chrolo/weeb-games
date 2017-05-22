import path from 'path';
import fs from 'fs';
import React from 'react';
import Promise from 'promise';
import {renderToString} from 'react-dom/server';

import IndexPage from '../../client/pages/indexPage.js';
import * as db from '../../data-model/db-connect.js';


export default function IndexRouter (req, res) {
    const fileToLoad = path.resolve(__dirname, '../../client/htmlSkeleton.html');
    if(!fs.existsSync(fileToLoad)){
        console.error(`Couldn't find ${fileToLoad}`);
        res.send('Unfortunately I couldn\'t find the template');
    }
    console.log('loading index page');

    fs.readFile(fileToLoad,(err, template)=>{
                if(err) {
                    console.error('[ERROR][FileRead] Attempted to read "'+ fileToLoad + '", but got error' + err);
                }
                //Set headers
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('X-Foo', 'bar');

                //get data:
                const users = db.getTopUsersByPointCount(5);

                users.then((data)=>{
                    console.log('users were:', data);
                    //render the page:
                    const ReactString = renderToString(<IndexPage users={data}/>);
                    const renderedHtml = template.toString().replace('<!--ReactHere-->', ReactString);
                    res.send(renderedHtml);
                }).catch((error)=>{
                    res.status(500);
                    console.error('indexPageRouter: Error retrieving user data.', error);
                    res.send('Something Went wrong ;_;');
                });
            });
}
