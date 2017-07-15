import path from 'path';
import fs from 'fs';
import React from 'react';
import {renderToString} from 'react-dom/server';

import ErrorPage from '../../ui/pages/ErrorPage';
import * as db from '../../data-model/db-connect.js';
import createHtmlPage from '../../ui/htmlSkeleton.js';

export default function ErrorRoute(req, res, next) {
    //Display a generic errorPage:
    res.status(400).send(renderErrorPage());
}

export function renderErrorPage(message){
    if(typeof message === 'undefined'){
        message = 'Something went wrong!';
    }
    return createHtmlPage(renderToString(<ErrorPage message={message}/>));
}
