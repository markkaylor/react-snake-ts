## Live demo

https://mk-snake-game.netlify.app/

## To run locally

```
yarn install
yarn start
```

## How to play

To control the snake, use the arrow keys:
The snake cannot hit the wall
The snake cannot hit itself
When the snake eats it grows, the speed increases, and the food moves

## Description

Built with React using react hooks and TypeScript.

I decided to use the HTML `<canvas>` element and the Canvas API for the actual game play.

I also used a `useInterval` hook by Dan Abramov: https://github.com/donavon/use-interval to control the speed of the game loop.

The top 10 scores will be displayed on the scoreboard. However, the data does not persist. If the page is refreshed the users will be lost.
