const { exec, execSync, spawn } = require('child_process');

let version = "3.3.12";
exec(`npm i -g @sideex/webservice@${version}`, (err, stdout, stderr) => {
  console.log(stdout.trim())
  if(err) {
    exec(`npm view @sideex/webservice@${version} version -json`, (err, stdout, stderr) => {
      if(stdout.trim() != "") {
        exec(`npm view "@sideex/webservice@>=${version}-1 <${version}" version --json`, (err, stdout, stderr) => {
          const versions = JSON.parse(stdout);
          exec(`npm i @sideex/webservice@${versions[versions.length-1]}`, (err, stdout, stderr) => {
            console.log(stdout);
          });
        });
      }
    });
  }
});
