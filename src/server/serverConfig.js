const config = {
    port: 3000,

    defaultResponseHeaders: [
        {key:'Access-Control-Allow-Origin', value:'*'},
        {key:'Content-Security-Policy', value:'font-src *;'}
    ]
};
export default config;
