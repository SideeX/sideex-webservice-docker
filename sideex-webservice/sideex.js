const fs = require('fs'); 
const { exec } = require('child_process');

const varsionPath = "/opt/sideex-webservice/version.json";
let version = JSON.parse(fs.readFileSync(varsionPath, 'utf8').trim());
let finalVersion = version.finalVersion;
let currentVersion = version.currentVersion;
let first = version.first;

if(currentVersion != finalVersion) {
    exec(`npm view "@sideex/webservice@ >= ${currentVersion} < ${finalVersion}" version --json`, (err, stdout, stderr) => {
        const remoteVersions = JSON.parse(stdout);
        const remoteVersion = typeof remoteVersions === "object" ? remoteVersions[remoteVersions.length-1]: remoteVersions;
        
        if(remoteVersion != currentVersion || first) {
            version.currentVersion = remoteVersion;
            version.first = false;
            console.log(`Downloading @sideex/webservice@${remoteVersion}....`);
            fs.writeFileSync(varsionPath, JSON.stringify(version, null, 4));
            exec(`sudo npm i -g @sideex/webservice@${remoteVersion}`, (err, stdout, stderr) => {
                console.log(stdout);
            })
        }
    });
}