#!/bin/bash

cd /opt/sideex-webservice/
node /opt/sideex-webservice/sideex.js
sideex-webservice -c serviceconfig.json
