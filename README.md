# Getting started with Next.js and Replicate

This is a [Next.js](https://nextjs.org/) template project that's preconfigured for interacting with a language model like [FLAN-T5](https://replicate.com/daanelson/flan-t5) with Replicate's API.

You can use this as a quick jumping-off point to build a web app using Replicate's API, or you can recreate this codebase from scratch by following the guide at [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)

## Noteworthy files

- [pages/index.js](pages/index.js) - The React frontend that renders the home page in the browser
- [pages/api/predictions/index.js](pages/api/predictions/index.js) - The backend API endpoint that calls Replicate's API to create a prediction
- [pages/api/predictions/[id].js](pages/api/predictions/[id].js) - The backend API endpoint that calls Replicate's API to get the prediction result

## Usage

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to `.env.local`:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Changing the model

This example app is configured to use the [FLAN-T5 model](https://replicate.com/daanelson/flan-t5) by default, but you can change it to use any other Replicate model that has a similar input and output format.

To change the model, update the `modelVersion` constant in [pages/api/predictions/index.js](pages/api/predictions/index.js) to the version ID of the Replicate model you want to run.

## Editing the homepage

The homepage is a React component in [pages/index.js](pages/index.js). You can edit it to change the look and feel of the app.

## Deploy to Vercel

For detailed instructions on how to create and use this template, see [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)

There are many ways to deploy apps to Vercel, but for the sake of brevity, we'll use the vercel CLI here. Start by installing the CLI and running it:

```
npx vercel
```

The command above installs the CLI, then walks you through the process of logging in to Vercel, creating the app, and deploying it. Once you've deployed your app, you need to add your Replicate API token to the remote app's environment variables. This allows your app to make requests to the Replicate API.

```
vercel env add REPLICATE_API_TOKEN
```

The command above prompts you to enter a value for your token. Paste your token fron [replicate.com/account](https://replicate.com/account). You then need to deploy again:

```
npx vercel deploy --prod
```
