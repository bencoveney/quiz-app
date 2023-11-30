# quiz-app

## Commands

For building the project:

```bash
npm run build # Build app
```

Running the project for development:

```bash
npm run build # Build app
npm start # Start dev server on localhost:3000
npm run dev-client # Run simultaneously for client code watch mode.
```

## Codebase Structure

This is a quiz web app build in react.

The code in `src/` is split into:

- `src/server/` - A very simple express backend.
- `src/client/` - A react single page application.

### Server

The backend server:

- Hosts the static assets and client code.
- Caches the API data in-memory.
- Serves the API data onwards to the client.

### Client

The entrypoint for the client is `src/client/components/app.tsx`. There are 4 main pages this picks between:

- `Loading` - Shown while the client is accessing the API during initial page load.
- `Home` - The default screen.
- `Activity` - Shown while the user is completing an activity.
- `Results` - Shows the user their most recent set of results.

### Components

A couple of components in the `components/` directory have been kept as "presentational" and do not contain any business logic, to allow them to be reused on mulitple pages:

- `button.tsx`
- `header.tsx`
- `rows.tsx`
- `wrapper.tsx`

For managing styles I opted to use CSS modules, as they are well supported in `esbuild` and allow native CSS rules to be easily associated with React components.

### Hooks

API access is driven by the `useApi` hook.

Page switching is driven by the `useRouter` hook.

The `useActivityProgress` hook manages the user's progress through each activity. It has 3 main functions:

- Expose the question the user is currently answering.
- Save the users answer for the current question, and advance to the next one.
- Once all results have been gathered, switching to the results view.

The `useRoundIntro` hook is responsible for displaying the timed "Round N" screen between questions, when the question is part of an activity that uses rounds.

The `useSavedResults` hook stores the user's most recent set of results into local storage. This allows them to be accessed later from the home screen.

I opted not to use React Context for any of the state as the codebase does not currently suffer from prop-drilling problems, but it is reaching the point where that could be considered. `index.module.css` includes a basic global reset stylesheet.

## Decisions

### Routing and SSR

I have opted not to use any client-side routing library or server-side rendering in the project at this stage, but I have made a conscious effort to structure the code so that those remain open as options in the future. This is reflected in the simple routing-like structure in `src/client/components/app.tsx` - you can see which pages would be served under each route. Additionally, the number of additional parameters each page would require (for example as query string parameters) has been kept concise.

From the design specs it seemed to me that once a user is running an activity, they are on a linear path through and cannot skip ahead/back. As a result I decided to build that as one "page" within my structure, rather than allowing for each different question within an activity to be individually accessible.

### Flat Questions List

Throughout the logic around running an activity, I decided to flatten the hierarchy of questions/rounds into a single flat list of questions. This is carried across to the structures I use around results/answers, which I store as single flat array of booleans (indicating a correct answer). The reasons I thought this would be a good idea are:

- The structure of activities (and whether they contain only questions, or rounds which themselves contains questions) is a bit varied, and I wanted something more uniform to reason about.
- While the activity is running the user advances through the questions in a linear way.

One drawback to this approach is that I sometimes need to "zip" the flat list back to the original structure, for example when displaying each answer against the question and round it applies to.

### Time Spend or Extras

I have chosen to build a React SPA using `express` and `esbuid` as that is the toolchain I find quickest to get up and running and focus on the task.

There were some options/ideas I ruled out as not being necessary to meet the requirements, but could be interesting next steps:

- Server-side rendering of pages for faster initial page-load times (or to realise some of the benefit of my routing structure).
- Saving user results in a database on the server, which would perhaps require some notion of users/sessions to keep results separate.
- Building to a container and deploying using a pipeline. This would be a better production strategy but would be a time-spend on writing boilerplate rather than demonstrating architectural thinking.

## Observations

If I were in control of the API, I would've thought about exposing a identifier on activities/rounds/questions that is certain to be unique. I found on a couple of occasions in the client code I thought "I wish there was an explicit identifier for this X/Y/Z that I could use for lookups". Some of the `_name` or `order` properties may have had this purpose, but I was hesistant to treat them as such as the content didn't "feel" like an identifier.

On `order` specifically, I feel like on some of the domain objects it is never really required. Ultimately JSON arrays are garunteed to be unique, so `order` feels redundant if it is effectively just the index within the array.

As a consumer of this API, I would communicate with the provider of the API (or read any available documentation) to find out what strategy I would need when consuming this. Some factors to explore here would be:

- How much data could potentially be returned.
- How long can responses safely be cached for.

I assume from the test data and user flows that it is not possible for a single activity to have a mix of within-round and without-round questions. I'm not certain this is a safe assumption and to some extent the client code is written with this possibility in mind. There's other edgecases I'd normally also like to rule out, for example whether there could possibly be an empty array of questions.

I'm not sure if it's possible to inspect colors/spacing/CSS using the wireframe I had access to. I would know how to do this in figma, but I'm not as familiar with Adobe XD. Wireframe seemed to auto-advance to the next round (which I have implemented), but I'm not sure that's compatible with the flow description.

## Consider doing

- Responsive styles
- CSS rules to variables
