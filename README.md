<div align = 'center'>

![CloudShift Logo](https://i.imgur.com/vMom9sD.png)

<summary><h1 style="display: inline-block;">CloudShift</h1></summary>

<h3>A free open source tool for migrating data between cloud providers.</h3>
<h3>CloudShift currently supports AWS S3, Microsoft Azure Storage Accounts, and Cloudflare R2.</h3>
</div>

<br/>
<hr/>
<br/>

## Installation & Getting Started

<br/>

CloudShift is a web application available as a container on Docker Hub or for direct download by cloning this repo.

Steps for installing and running CloudShift using either method is outlined below.

<h3 style="text-decoration:underline;font-weight:bold">#1. Docker (Recommended)</h3>

If you do not have Docker installed, follow the [installation instructions here](https://docs.docker.com/get-docker/).

<h4>USING DOCKER DESKTOP</h4>

- Search for "cloudshiftdev/app" under the Containers tab.

- Click the image. Making sure the latest tag is selected, click the "Pull" button to download.

- After the download has completed, click "Run." <span style="font-style:italic">Before clicking "Run" again</span>, click Optional Settings and set the host post to your desired port.

- In your browser, navigate to `localhost:HOST_PORT` where `HOST_PORT` is the host port set in the previous step.

<h4>USING A TERMINAL</h4>

- In an open terminal, type `docker pull cloudshiftdev/app:latest`

- After the download is complete, run the container using `docker run -p HOST_PORT:3000 cloudshiftdev/app`, where `HOST_PORT` is your desired port.

- In your browser, navigate to `localhost:HOST_PORT`.

<h3 style="text-decoration:underline;font-weight:bold">#2. Node</h3>

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 18.12 or higher is recommended.

- In your terminal, run `git clone https://github.com/oslabs-beta/CloudShift.git`.

- Navigate to the Cloudshift folder and run `npm install` followed by `npm start`.

  NOTE: By default, this will open your browser to `localhost:3000`, however you can change the port by opening your `package.json` file.

  Under `scripts` > `start`, change `localhost:3000` to any port value.

## Philosophy

Why we did this.

Have medium article

Make sure to link to rclone

## Connect With the Team

## Want to Contribute?
