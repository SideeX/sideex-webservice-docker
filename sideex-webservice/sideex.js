const fs = require('fs'); 
const { exec, execSync, spawn } = require('child_process');

let version = fs.readFileSync('/opt/sideex-webservice/version', 'utf8').trim();

exec(`npm i -g @sideex/webservice@${version}`, (err, stdout, stderr) => {
  if(err) {
    exec(`npm view "@sideex/webservice@>=${version}-1 <${version}" version --json`, (err, stdout, stderr) => {
      const versions = JSON.parse(stdout);
      console.log(`Downloading @sideex/webservice@${versions}....`);
      fs.writeFileSync('/opt/sideex-webservice/version', versions);
      exec(`sudo npm i -g @sideex/webservice@${versions}`, (err, stdout, stderr) => {
        console.log(stdout);
      });
    });
  }
});
