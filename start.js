const { spawn } = require('child_process');
const path = require('path');

process.env.NODE_ENV = 'development';

const server = spawn('node', ['--loader', 'tsx/esm', 'server/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
  process.exit(0);
});