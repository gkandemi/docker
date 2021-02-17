1 apt-get update
2 apt-get install curl -y
3 curl -sL https://deb.nodesource.com/setup_10.x | bash
4 apt-get install nodejs -y
6 cd opt/
9 mkdir node-app
10 cd node-app/
14 echo 'console.log("nodejsapp from ubuntu...");' > index.js
17 node index.js
