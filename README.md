<h1 align="center">playable</h1>

<h5 align="center">Control the playback of Youtube on PC / Tablet / Mobile from any web browsers.</h5>

<br />
<div align="center">
  <a href="https://github.com/ssmak/playable">
    <img src="https://img.shields.io/badge/version-v1.0.0-blueviolet.svg" />
  </a>
  <a href="https://github.com/ssmak/playable">
    <img src="https://img.shields.io/badge/env-nodejs-orange.svg" />
  </a>
</div>
<br />

``` bash
git clone https://github.com/ssmak/playable.git ~/playable.git
cd ~/playable.git
npm install && npm start
```
## History
I have a daughter. She is 3 years old and likes watching Youtube on iPad. However, I am very concerned with her eyes. So, why not moving the view to a large TV rather than the small and brightness screen.
This is a full web based solution and work with socker.io and Youtube API.

This project is tried to bring the view from iPad to a large TV or monitor but leaving the control in the iPad (So the child can be still happy on touch, touch, touch.. but view on a large monitor).
<br />
<div align="center">
  <a href="https://paypal.me/ssmak">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="PayPal Donation" />
  </a>
  <br />
  <a href="https://paypal.me/ssmak">
    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="PayPal" />
  </a>
</div>

## Installation + Test
1. Clone from GitHub (https://github.com/ssmak/playable)
``` bash
git clone https://github.com/ssmak/playable.git ~/playable.git
```
2. In command line, change to the project root
``` bash
cd ~/playable.git
```
3. Install the project dependencies
``` bash
npm install
```
4. Start the service now!
``` bash
npm start
```
5. Visit the below link as a Youtube viewer
```
http://localhost:8080
```
6. Visit the below link as a remote
```
http://localhost:8080/remote
```
7. Join a channel with the same channel id and with FUN!!
<br />

## Customization
The port 8080 is used by default and you can change to other port by passing the argument --port.

## Additional
1. As a web service, it can be run as Docker. You can find the Dockerfile under the project root.
2. Youtube API request an api-token, please replace the project default token by your own.

## License
MIT
