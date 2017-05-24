import serverConfig from '../serverConfig.js';

export default function basicResponseRouter(req, res, next) {

    //Add default response headers.
    serverConfig.defaultResponseHeaders.forEach(header => {
        res.setHeader(header.key, header.value);
    });

    next();
}
