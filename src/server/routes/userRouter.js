import path from 'path';
import fs from 'fs';
import React from 'react';

export default function UserRoute (req, res) {
    console.log('Hit UserRoute with\n', req);

    res.status(500);
    res.send('Not ready yet');
}
