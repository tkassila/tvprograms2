# tvprograms2

Finnish tv programs from different sources, v 2.0, which has smaller application size, than v. 1.5 on tvprograms repository.

This app is showing finnish tv and radio programs on a browser from different sources. To get json or xml data from servers, it is calling local proxy node server (on port 9090). You can show also descriptions and search a text from channels or programs. The app is also working with screenreaders.
It has two page theme: white and black. It is using bigger fonts.

You can use a mouse or screenreader and some keyboard alt commands to navigate and set focus inside of local readed programs and channnels on a program table. Those keyboard combinations are: alt+s = next channel (column), alt+k = prev. channel and alt+o set focus into inside of channel title. You can also set focus/move into "ohjelmataulukko" title, when pressing alt+t. This title is above showen program table.
These keyborad combinations do not work with Firefox browser, because on it on impossible to set focus within a web page on a web app!

Ohjelmataulukko
-- Ohjelmataulukko, liikutaan hiirellä tai taulukon sisällä seuraavilla näppäimillä alt+s = seuraava kanava, alt+k = edellinen kanava sekä alt+o = kanavan ohjelmiin, otsakkeeseen. Ohjelman kuvailun saa näkymään tab näppäimellä ja enterillä tai hiirenklikkauksella. Taulukon sisällä ja ohjelmien välillä toimivat myös tab sekä shift-tab näppäimet. Taulukon yläpuolelle tekstin "Ohjelmataulukko" kohdalle pääsee komennolla alt+t.

# Developer install

1. On local repo: 
2. Install node, npm, curl apps and preact-cli.
3. give command: deploy.bat or deploy.sh
   (deploy give next commands: npm run build
   and copies build files into proxy dir public)
- 3.ab Add installed curl path into common path in a computer where node server.js should to start
- 3.b cd proxyserver
- 3.c start proxy server: node server.js
   if above deploy is given, then this proxy server can serve also as html normal server and as a proxy server.
- 3.d Start a browser and a load command: localhost:9090 and enter (or url: xxx.com:9090 if it is servers address)
4.  if no deploy.sh comand given, then: give on repo dir: npm run dev and enter
- 4.b  cd proxyserver
- 4.c node server.js
- 4.d  Start a browser and a load command: localhost:8080 and enter (or url: xxx.com:8080 if it is servers address)
5. Select Yle, Telkku, Amppari etc program sources and select a date html link to choose a date of programs to show
6. You can control to how loaded programs are shown and search text from programs data etc  

# User install

1. Download proxyserver.zip 
2. Install node and curl apps.
3. Unzip proxyserver.zip
4. Add installed curl path and node path if needed into common path in a computer where node server.js should to find it
5. cd proxyserver
6. start proxy server: node server.js
   This node server is using curl app, when it is loading html from different tv program html servers!
6. Start a browser and a load command: localhost:9090 and enter
7. Select Yle, Telkku, Amppari etc program sources and select a date html link to choose a date of programs to show
8. You can control to how loaded programs are shown and search text from programs data etc 

Super performant app for preact world without material components, only omit dialog is used. That and another library changes are meaning almost half app size!

V. 1.5 has been updated. That is more updated software: preact-cli 3.3.3 and preact 10.6.4.

## Developer PREACT-CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```
For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

# build for production with minification
npm run build

# test the production build locally
npm run serve
```
