import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicHtmlPath = path.join(__dirname, '..', '_public_html');

const server = http.createServer((req, res) => {
  let filePath = path.join(publicHtmlPath, req.url === '/' ? 'index.html' : req.url);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    filePath = path.join(publicHtmlPath, 'index.html'); // Fallback to index.html
  }
  
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (ext) {
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const port = 5000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Static server serving _public_html on port ${port}`);
  console.log(`Serving files from: ${publicHtmlPath}`);
});