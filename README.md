## Brief Description

**This project is implemented using Svelte.** Learn more about Svelte [here](https://svelte.dev/docs/introduction).

The svelte-search project allows you to fetch data from the following sources:
- Games: [Games JSON](https://storage.googleapis.com/estoty-temp/games.json)
- Retention: [Retention JSON](https://storage.googleapis.com/estoty-temp/retention.json)

These data can be displayed either in a table format or as a chart. The chart is created using the Chart.js library ([Chart.js](https://www.chartjs.org/)).

The layout is implemented using Bootstrap. You can find more information about Bootstrap [here](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

Users can utilize filters (Game, Version, Country) to explore more precise data.

| <span style="color: green; font-size: 20px;">TIP: If you simply want to familiarize yourself and test the functionality of the application, please use this link:<br/>[Vercel Deployment](https://svelte-search-filter.vercel.app/) |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

