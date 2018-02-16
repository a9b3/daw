# daw

Digital audio work station using React.

<img src="https://raw.githubusercontent.com/esayemm/daw/master/screenshots/screenshot.png" style="width: 30em;text-align:center;"/>

## Dev

Running `make` will display all the dev tasks.

```
  deps       - Installs dependencies
  dev        - Runs development server   PORT ?= 5001
  story      - Runs storybook server     PORT ?= 5001
  lint       - Runs linter
  lint.fix   - Runs linter with fix
  test       - Runs tests                FILE ?= *
  test.watch - TDD                       FILE ?= *
  build      - Transpile source code

```

Example:

`PORT=5002 make dev` will spin up dev server on port 5002.
