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
    console.error('[ERROR][DB init] Error on Database Initialisation:',error);
    throw(error);
}
var db = new sqlite3.Database(file);

//custom promisifying:
const dbAll = (sql, params) => {
    return new Promise( (resolve, reject) =>{
        db.all(sql,params, (err, rows)=>{
            if(err) {
                console.error(`[ERROR][dbAll] failed to run command '${sql}' with params`, params);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const dbRun = (sql,params) => {
    return new Promise( (resolve, reject) =>{
        db.run(sql,params, (err)=>{
            if(err) {
                console.error(`[ERROR][dbRun] failed to run command '${sql}' with params`, params);
                reject(err);
            } else {
                resolve();
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

function getUserPointCountFromDb(id){
    return dbAll("SELECT * FROM STRINGS WHERE uid = ?;", id).then((rows)=>{
        console.log(`[getUserPointCountFromDb] for id ${id} gave results:`, rows);
        return rows.reduce((acc, row)=>{return acc + row.points},0);
    })
    .catch(handleDbError('getUserPointCountFromDb'));
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
    let args= ["SELECT * FROM USERS ORDER BY points DESC;"];
    if(isFinite(count)){
        args = ["SELECT * FROM USERS ORDER BY points DESC LIMIT ? ;", count];
    }
    return dbAll(...args)
    .catch(handleDbError('getTopUsersByPointCount'));
}

export function addNewPointsStringToUser(name, string, points) {
    //Clean the data

    //Add the data
    return getUserTableDataByName(name).then((userData)=>{
        return getUserPointCountFromDb(userData.id).then((calcedPoints)=>{
            return Promise.all([
                dbRun("UPDATE USERS SET points= ? WHERE id=?", [calcedPoints+Number.parseInt(points), userData.id]),
                dbRun("INSERT INTO STRINGS (uid, text, points) VALUES (?, ? ,?)",[userData.id, string, points])
            ]);
        })
    }).catch(handleDbError('addNewPointsStringToUser'));
}
