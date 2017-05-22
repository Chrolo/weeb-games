import path from 'path';
import fs from 'fs';
import Promise from 'promise';
/*/
import sqlite3 from 'sqlite3';
/*/
const sqlite3 = require('sqlite3').verbose();
//*/

//check file
var file = path.resolve(__dirname, '../../', "weebpoints.db");
console.log(file);
//TODO: it appears this file check doesn't actually work....
if(!fs.existsSync(file)) {
    const error = `Couldn't find file ${file}\n\t( and I'm too lazy to have implemented the initializer ;_; )`;
    console.error('Error on Database Initialisation:',error);
    throw(error);
}
var db = new sqlite3.Database(file);

//custom promisifying:
const dbAll = (sql, params) => {
    return new Promise( (resolve, reject) =>{
        db.all(sql,params, (err, rows)=>{
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export function getUserData(name){
    return dbAll("SELECT * FROM USERS WHERE name = ? LIMIT 1;", name);
}

export function getTopUsersByPointCount(count) {
    return dbAll("SELECT * FROM USERS ORDER BY points DESC LIMIT ? ;", count);
}
