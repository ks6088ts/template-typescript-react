# Git
GIT_REVISION ?= $(shell git rev-parse --short HEAD)
GIT_TAG ?= $(shell git describe --tags --abbrev=0 --always | sed -e s/v//g)

# Tools
TOOLS_DIR ?= /usr/local/bin

# E2E (set E2E_HEADED=true to show the browser UI instead of running headless)
E2E_HEADED ?= false

.PHONY: help
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.DEFAULT_GOAL := help

.PHONY: install-deps-dev
install-deps-dev: ## install dependencies for development
	@which actionlint || echo "install actionlint https://github.com/rhysd/actionlint"
	@# https://pnpm.io/installation
	@which pnpm || npm install -g pnpm
	pnpm install --frozen-lockfile

.PHONY: install-deps-e2e
install-deps-e2e: install-deps-dev ## install dependencies for E2E tests
	pnpm exec playwright install --with-deps chromium

.PHONY: lint
lint: ## lint
	pnpm lint
	pnpm audit
	actionlint

.PHONY: build
build: ## build applications
	pnpm build

.PHONY: ci-test
ci-test: install-deps-dev lint build ## run CI test

.PHONY: e2e
e2e: ## run E2E tests (E2E_HEADED=true shows the browser)
	E2E_HEADED=$(E2E_HEADED) pnpm e2e

.PHONY: ci-test-e2e
ci-test-e2e: install-deps-e2e e2e ## run E2E CI test

.PHONY: dev
dev: ## run development server
	pnpm dev

.PHONY: preview
preview: ## preview production build
	pnpm preview

.PHONY: update
update: ## update dependencies
	pnpm update --latest
