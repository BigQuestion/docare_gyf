// var Client = require('ftp');

//   var c = new Client();
//   c.on('ready', function() {
//     c.put('/src', '/src/', function(err) {
//       if (err) throw err;
//       c.end();
//     });
//     c.list(function(err, list) {
//       if (err) throw err;
//       console.dir(list);
//       c.end();
//     });
//   });
//   // connect to localhost:21 as anonymous
//   c.connect({
//   });

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var path = require('path')
var distPath = path.resolve(__dirname, '..')+'/dist';
var config = {
  host:'119.29.6.121',
  username:'administrator',
  password:'DoCare_Dev2017',
  port: 21,
  localRoot: distPath,
  remoteRoot: "/",
  // include: ['build/version.txt'],
  // exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}
  
ftpDeploy.deploy(config, function(err) {
  if (err) console.log(err)
  else console.log('finished');
});