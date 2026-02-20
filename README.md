## Setup

Clone the repo into any directory

## Installation

- Run pnpm install
- Copy the .env.example and rename it to .env.local and paste https://cataas.com/api as base url
- Run pnpm run dev to start the application

## Explanation

The app is pretty straight forward. I went with NextJJs because that is being used within Setso.

I have created one server component, thats the page.tsx in the root directory. In here we fetch all the possible tags. The reason for this is that the tags response is fairly small, doesn't cost any time and we can give it as props to the children. It saves an extra loading state.

CatsView exists out of two main components, the tags and the actual grid. In here we keep a global state to keep track of the selected tags.

For tags I've created a search input because there's more then 1000 available tags, you can simply click on them to add them and click on the pill to remove it. Clicking on the tags updates the state in CatsView which causes a refetch of the cats in CatGrid
