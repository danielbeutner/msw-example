# MSW example

This is a combination of [CRA](https://github.com/facebook/create-react-app) boostrapped App, [Storybook](https://github.com/storybookjs/storybook), [MSW](https://github.com/mswjs/msw).

Additionally I use (for graphql queries) the fabulous [urql](https://github.com/FormidableLabs/urql).

## Known issues

- Tests are buggy
  - `act()` errors
  - `renders graphql error` passes only with `.only` (flaky)