# Git
GIT_REVISION ?= $(shell git rev-parse --short HEAD)
GIT_TAG ?= $(shell git describe --tags --abbrev=0 --always | sed -e s/v//g)

# Tools
TOOLS_DIR ?= /usr/local/bin

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.DEFAULT_GOAL := help

.PHONY: install-deps-dev
install-deps-dev: ## install dependencies for development
	@which actionlint || echo "install actionlint https://github.com/rhysd/actionlint"
	@# https://pnpm.io/installation
	@which pnpm || npm install -g pnpm
	pnpm install

.PHONY: lint
lint: ## lint
	pnpm lint
	actionlint

.PHONY: build
build: ## build applications
	pnpm build

.PHONY: ci-test
ci-test: install-deps-dev lint build ## run CI test

.PHONY: dev
dev: ## run development server
	pnpm dev

.PHONY: preview
preview: ## preview production build
	pnpm preview

.PHONY: update
update: ## update dependencies
	pnpm update --latest
