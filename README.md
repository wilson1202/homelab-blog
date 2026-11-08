# Homelab

A homelab knowledge base built with [VuePress](https://vuepress.vuejs.org/) and [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume).

## Requirements

- Node.js: `^20.19.0 || >=22.0.0` (see `package.json`)
- Package manager: pnpm

Run the following commands from the project root.

## Install

```sh
pnpm install --frozen-lockfile
```

Use pnpm to manage dependencies. Keep `pnpm-lock.yaml` and `pnpm-workspace.yaml`; avoid generating `package-lock.json` with npm. The frozen install uses the existing lockfile and fails if it does not match `package.json`.

After intentionally changing dependency declarations, run `pnpm install` to update the lockfile and verify the build.

## Dependency management

```sh
# Add a dependency
pnpm add <package>

# Add a development dependency
pnpm add -D <package>

# Remove a dependency
pnpm remove <package>
```

Keep dependency changes together with the updated `package.json` and `pnpm-lock.yaml`. Do not edit lockfile package entries manually.

## Usage

```sh
# Start the development server
pnpm docs:dev

# Start development with a clean cache and temporary files
pnpm docs:dev-clean

# Build the production site
pnpm docs:build

# Preview the production build (build first)
pnpm docs:preview

# Manually update VuePress and the theme
pnpm dlx vp-update
```

Build output: `docs/.vuepress/dist`.

The update command uses pnpm directly. The existing `vp-update` script in `package.json` still invokes `npx`; use `pnpm dlx vp-update` for the pnpm workflow. Review dependency changes and run `pnpm docs:build` after updating.

## Documentation

For theme configuration, components, and syntax, consult the official source and website and check compatibility with the installed theme version.

- [VuePress](https://vuepress.vuejs.org/)
- [Plume source](https://github.com/pengzhanbo/vuepress-theme-plume)
- [Plume website](https://theme-plume.vuejs.press/)
