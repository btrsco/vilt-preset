## VILT Preset

This preset allows you to quickly scaffold a VILT (Vue.js, Inertia, Laravel, and Tailwind) project. All the major
dependencies are already installed and configured for you.

## Requirements

There are some expectations for your environment and how the initial Laravel project was created. This preset assumes
that you have a fresh Laravel project and have used the following command to create it:

```bash
laravel new project-name \
  --git \
  --pest \
  --database=sqlite \
  --breeze \
  --dark \
  --stack=vue \
  --ssr \
  --typescript
```

## Installation

Install the preset via Preset CLI:

```bash
preset apply btrsco/vilt-preset
```

Install the preset via NPX:

```bash
npx @preset/cli apply btrsco/vilt-preset
```

<div align="center">
  This preset was made by Miguel Batres.
  <br />
  <br />
  <a href="https://preset.dev">Learn more</a>
</div>
