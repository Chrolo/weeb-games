import serverConfig from '../serverConfig.js';

console.log(`[Logger] The log level was set to ${serverConfig.logLevel}. To change, set 'logLevel' key in your server config file.`);

export default function LoggerRoute(req, res, next) {
    if(serverConfig.logLevel) {
        //get important info out of the request:
        //TODO: fill out important params
        const { method, path } = req;

        //TODO: add tiered logging
        console.log(`[Logger] Server received a ${method} request to ${path}`);
    }

    next();
}
