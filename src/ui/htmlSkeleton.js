export const htmlSkeleton = `<html>
    <head>
        <title>Weeb Games</title>
        <link rel="stylesheet" type="text/css" href="/static/normalize.css">
        <link rel="stylesheet" type="text/css" href="/static/style.css">
    </head>
    <body>
        <div id="reactRoot"><!--ReactHere--></div>
    </body>
</html>`;

export default function injectHtmlIntoSkeleton(injectedHtml) {
    return htmlSkeleton.replace('<!--ReactHere-->', injectedHtml);
}
