import fs from 'fs';
import path from 'path';

//Some factory defaults:
const defaultConfig = {
    port: 3000,

    defaultResponseHeaders: [
        {key:'Access-Control-Allow-Origin', value:'*'},
        {key:'Content-Security-Policy', value:'font-src *;'}
    ]
};

function getUserServerConfig(){
    const serverConfigFilePath = path.resolve(__dirname, '../../config/serverConfig.json');
    if(fs.existsSync(serverConfigFilePath)){
         const configFile = fs.readFileSync(serverConfigFilePath, "utf8");

         const userConfig = JSON.parse(configFile);

         //return default config, overlaid with the user's config.
         return Object.assign({},defaultConfig,userConfig);
     } else {
         return defaultConfig;
     }
}

const config = getUserServerConfig();

export default config;



//Get the banner!:
function attemptToGetBanner(){
    const bannerFilePath = path.resolve(__dirname, '../../config/banner.txt');
    if(fs.existsSync(bannerFilePath)){
        return fs.readFileSync(bannerFilePath, "utf8");
    } else {
        console.info(`Couldn't find ${bannerFilePath}. If you want a snazzy banner on startup, put one there!`);
        return '';
    }
}

export const banner = attemptToGetBanner();
