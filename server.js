/**
 * To-do
 * Hack to Home Screen
 * 
 * PWA Pilipinas
 * 2020
 */
const liveServer = require('live-server');
 
const params = {
    port: 8080,
    host: "0.0.0.0",
    root: "./public",
    open: false,
    file: "index.html",
};

process.stdout.write('\033c');
console.log(`
PWA Pilipinas
Hack to Home Screen

Mabuhay!
`);

liveServer.start(params);