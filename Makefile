PORT ?= 5001
FILE ?= *

all: help

help:
	@echo ""
	@echo "  deps       - Installs dependencies"
	@echo "  dev        - Runs development server   PORT ?= $(PORT)"
	@echo "  story      - Runs storybook server     PORT ?= $(PORT)"
	@echo "  lint       - Runs linter"
	@echo "  lint.fix   - Runs linter with fix"
	@echo "  test       - Runs tests                FILE ?= $(FILE)"
	@echo "  test.watch - TDD                       FILE ?= $(FILE)"
	@echo "  build      - Transpile source code"
	@echo ""

deps:
	@yarn

dev: deps
	@PORT=$(PORT) BABEL_REACT=true NODE_PATH=./src:./src/app \
		./node_modules/jbs-fe/bin.js dev \
		--app-index ./src/app/index.js

story: deps
	@BABEL_REACT=true NODE_PATH=./src:./src/app ./node_modules/@storybook/react/bin/index.js \
		-p $(PORT) \
		-c .storybook

lint:
	@./node_modules/eslint/bin/eslint.js .

lint.fix:
	@./node_modules/eslint/bin/eslint.js . --fix

test:
	@BABEL_REACT=true NODE_PATH=./src:./src/app \
		./node_modules/jbs-fe/bin.js test --single-run

test.watch:
	@BABEL_REACT=true NODE_PATH=./src:./src/app \
		./node_modules/jbs-fe/bin.js test

.PHONY: build
build:
	@rm -rf ./build
	@BABEL_REACT=true NODE_ENV=production APP_ENV=production NODE_PATH=./src:./src/app \
		./node_modules/jbs-fe/bin.js build \
			--app-index ./src/app/index.js
