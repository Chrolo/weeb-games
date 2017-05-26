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

function handleDbError(functionName) {
    return (error) => {
        console.error(`[db-connect::${functionName}] Error!`, error);
        return Promise.reject(error);
    };
}

function addUserIfNonDuplicate(name) {
    return dbAll('INSERT OR IGNORE INTO USERS (name, points) VALUES (? , 0)', name)
    .catch(handleDbError('addUserIfNonDuplicate'));
}

function getStringsForUserById(id) {
    return dbAll("SELECT * FROM STRINGS WHERE uid = ?;", id)
    .catch(handleDbError('getStringsForUserById'));
}

function getUserTableDataByName(name) {
    return dbAll("SELECT * FROM USERS WHERE name = ? LIMIT 1;", name)
        .then((data)=> data[0])
        .catch(handleDbError('getUserTableDataByName'));
}

export function getUserData(name){
    //make sure user exists in database:
    return addUserIfNonDuplicate(name).then(()=>{
            return getUserTableDataByName(name)
                .then((userData)=>{
                    return getStringsForUserById(userData.id)
                        .then((strings)=>{
                            //add the strings to the returned object
                            userData.strings = strings;
                            return userData;
                        });
            })
        }).catch(handleDbError('getUserData'));
}

export function getTopUsersByPointCount(count) {
    return dbAll("SELECT * FROM USERS ORDER BY points DESC LIMIT ? ;", count)
    .catch(handleDbError('getTopUsersByPointCount'));
}
