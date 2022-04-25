#!/bin/bash

#Give permission to the files inside the express-app directory
sudo chmod -R 777 /home/ec2-user/express-app

#Navigate into our working directory 
cd /home/ec2-user/express-app

#add npm and node to path
export NWM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh"] && \. "$NVM_DIR/nvm.sh" #loads nvm
[ -s "$NVM_DIR/bash_completion"] && \. "$NVM_DIR/bash_completion" #loads nvm bash_completion

npm install
#start out node app in the background
node server.js > server.out.log 2> server.err.log < /dev/null &