import fs from 'fs'
import http from 'http';



const server = http.createServer((req, res) => {
    console.log(req.url);

    // res.writeHead(200, { 'Content-Typoe': 'text/html' });
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'John', age: 30, city: 'New Hampshire' };
    // res.writeHead(200, { 'Content-type': 'application/json' });
    // res.end(JSON.stringify(data));


    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'aplication/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });

    } else {
        res.writeHead(200, { 'Content-Type': 'font/otf' });
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);

});


server.listen(8080, () => {
    console.log('server is running on port 8080')
})