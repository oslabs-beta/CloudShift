<div align = 'center'>

![CloudShift Logo](https://i.imgur.com/vMom9sD.png)

[![License](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

<summary><h1 style="display: inline-block;">CloudShift</h1></summary>

<h3>A free open source tool for securely migrating data between cloud providers.</h3>
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

## Usage & Locating Credentials

<br/>

After installation & navigating to CloudShift in your browser, click on your origin & destination cloud providers.

- Ex. if you are migrating an AWS S3 bucket to a Cloudflare R2 bucket, select AWS as origin and Cloudflare as destination.

Origin & Destination will then populate with the necessary required credentials to complete the transfer process.

    Using root or admin level access credentials is recommended to ensure correct permissions for transferring data.

Credentials

- AWS
  - Access Key/Secret Key: These are both available by clicking on your Profile > Security credentials. You may have to create a new access key if one does not exist.
- Azure Storage Account
  - Account ID: The name of your storage account.
  - Access Key: Within your storage account, click "Access keys" on the left navbar. Key1 or Key2 will work.
- Cloudflare R2
  - Access Key/Secret Key: Under R2, click "Manage R2 API Tokens" > Create API Token. <span style="font-weight:bold">Make sure to select Edit permissions.</span> Make note the Access Key ID & Secret Key.
  - Account ID: You can find your Account ID on the right side of the main Cloudflare R2 page (clicking R2 on the left navbar).

Select your origin & destination buckets from the dropdown lists, which populate after you insert your credentials. Then, press the "Start Migration" button.

- It might take time for the transfer to begin. When "Transfer is complete" becomes visible, your data is now available on your destination bucket!

## What CloudShift Does (and Doesn't)

- See philosophy section below to gain insigh tinto why we made this decisions.

-Secure, any outage won't affect data.

-Doesn't delete origin, doesn't store credentials, create new buckets, doesn't allow for users to granularly specify options (see rclone for this)

## Philosophy

--Link medium article.

Why we did this.

Have medium article

Make sure to link to rclone

## Connect With the Team

-Our org account, our website.

## Want to Contribute?
