const fs = require('fs'); 
const { exec, execSync, spawn } = require('child_process');

let version = fs.readFileSync('version', 'utf8');
console.log(version);
exec(`npm i -g @sideex/webservice@${version}`, (err, stdout, stderr) => {
  if(err) {
    exec(`npm view "@sideex/webservice@>=${version}-1 <${version}" version --json`, (err, stdout, stderr) => {
      const versions = JSON.parse(stdout);
      console.log(`Downloading @sideex/webservice@${versions[versions.length-1]}....`);
      process.env.SIDEEX_VERSION = versions[versions.length-1];
      // exec(`sudo npm i -g @sideex/webservice@${versions}`, (err, stdout, stderr) => {
      //   console.log(stdout);
      // });
    });
  }
});
