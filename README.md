<div align = 'center'>

![CloudShift Logo](cloudshift%20banner.png)

<br/>

[![License](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

<h2 style="margin: 1rem 0">A free open source tool for securely migrating data between cloud providers.<br/>CloudShift currently supports AWS S3, Microsoft Azure Storage Accounts, and Cloudflare R2.</h2>
<h2 style="margin: 1rem 0"><a href="https://www.cloudshift.dev/">cloudshift.dev</a></h2>
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

<span style="text-decoration:underline;">Credentials</span>

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

See [Philosophy](#philosophy) for the motivation behind our design decisions.

Built on [Rclone](https://rclone.org/).

Cloudshift...

- Transfers data securely.

- Will not corrupt your data or break your containers if the transfer process fails for any reason.

Couldshift does NOT...

- Delete your origin bucket or any data within your origin bucket upon completition.

- Store credentials/data. All config files are auto deleted after the transfer completes.

- Address specific use-cases that don't apply to most users.

If you find that CloudShift doesn't provide you with the granular control necessary for your use-case, or you wish to learn more about Rclone (and how the transfer process works), [visit the Rclone docs](https://rclone.org/).

## Philosophy

For an in-depth read about our motivation, check out our Medium article here.

If you feel like CloudShift lacks a feature that fits with our design philosophy, [connect with us](#connect-with-the-team) or [get involved](#want-to-contribute)

## Connect With the Team

Send us a [message on our LinkedIn](https://www.linkedin.com/company/93845906/).

If this concerns a bug, [submit an issue](https://github.com/oslabs-beta/CloudShift/issues).

## Want to Contribute?

CloudShift is an open-source product that is open to input and contributions from the community. After trying out the product, feel free to raise issues or submit a PR request.

We welcome community contributions, including new developers who've never [made an open source Pull Request before](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github). If you'd like to start a new PR, we recommend [creating an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue) for discussion first. This lets us open a conversation, ensuring work is not duplicated unnecessarily and that the proposed PR is a fix or feature we're actively looking to add.
