<h1 align="center">Reproxy</h1>

<div align="center">

**🚚 Deliver any files in the GitHub repository**

<br />

[![GitHub Release](https://img.shields.io/github/v/release/5ouma/reproxy?label=Release&style=flat-square)](https://github.com/5ouma/reproxy/releases)
[![JSR](https://jsr.io/badges/@5ouma/reproxy?style=flat-square)](https://jsr.io/@5ouma/reproxy)
[![JSR Score](https://jsr.io/badges/@5ouma/reproxy/score)](https://jsr.io/@5ouma/reproxy)
<br />
[![CI](https://img.shields.io/github/actions/workflow/status/5ouma/reproxy/ci.yml?label=CI&style=flat-square)](https://github.com/5ouma/reproxy/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/actions/workflow/status/5ouma/reproxy/release.yml?label=Release&style=flat-square)](https://github.com/5ouma/reproxy/actions/workflows/release.yml)
[![pre-commit](https://img.shields.io/github/actions/workflow/status/5ouma/reproxy/pre-commit.yml?label=pre-commit&style=flat-square)](https://github.com/5ouma/reproxy/actions/workflows/pre-commit.yml)
[![codecov](https://codecov.io/github/5ouma/reproxy/graph/badge.svg)](https://codecov.io/github/5ouma/reproxy)

![Repobeats Analytics Image](https://repobeats.axiom.co/api/embed/1a8a73d955b8c9a227d007646d77ca8e22f6e88c.svg)

</div>

<br /><br />

## 💡 Concepts

You can host your specific file on the GitHub repository. The usage I assume is
for one-line scripts. (i.e. dotfiles or some install scripts, like
`curl https://example.com | sh`)

If you access from browsers, you'll redirected to the GitHub page, not a raw
file.

For the development or testing, you can access to the different branches or
tags. To do this, simply add the ref name to the sub-directory. (i.e.
`curl https://example.com/ref | sh`)

<br /><br />

## 📊 Usage

### 💻 On Local

1. Copy the [`.env.tmpl`](./.env.tmpl) to `.env` and edit as you prefer

   > [🌍 Environment Variables](#-environment-variables)

2. Follow the steps depending on the runtime

   - [🦕 Deno](https://deno.com)

     1. Run this command

        ```sh
        deno serve -A --env-file='.env' jsr:@5ouma/reproxy
        ```

   - [🍞 Bun](https://bun.sh)

     1. Add this code to the `index.ts`

        ```ts
        export { default } from "@5ouma/reproxy";
        ```

     2. Run these commands

        ```sh
        bunx jsr add @5ouma/reproxy
        bun run index.ts
        ```

   - [🐢 Node.js](https://nodejs.org)

     1. Add this code to the `index.js`

        ```js ignore
        import { serve } from "@hono/node-server";
        import app from "@5ouma/reproxy";
        serve(app);
        ```

     2. Run these commands

        ```sh
        npm install @hono/node-server
        npx jsr add @5ouma/reproxy
        node run index.js
        ```

<br />

### 🦕 Use [Deno Deploy](https://deno.com/deploy)

1. [Create a new playground](https://dash.deno.com)

2. Replace the default code with this

   ```ts
   export { default } from "jsr:@5ouma/reproxy";
   ```

3. Set the environment variables (_Don't forget!!_)

   > [🌍 Environment Variables](#-environment-variables)

<br />

### ⛅️ Use [Cloudflare Workers](https://workers.cloudflare.com)

1. Set up the `wrangler.toml`

   > [🌍 Environment Variables](#-environment-variables)

2. Add this code to the `index.ts`

   ```ts
   export { default } from "@5ouma/reproxy";
   ```

3. Deploy with these commands

   ```sh
   npx jsr add @5ouma/reproxy
   npx wrangler deploy index.ts
   ```

<br /><br />

## 🔨 Development

1. Clone this repository

   ```sh
   git clone https://github.com/5ouma/reproxy.git
   ```

2. Copy the [`.env.tmpl`](./.env.tmpl) to `.env` and edit as you prefer

   > [🌍 Environment Variables](#-environment-variables)

3. Run the [`server.ts`](./src/server.ts) via these task runners

   ```sh
   # For production
   deno task start
   ```

   ```sh
   # For development
   deno task dev
   ```

<br /><br />

## 🌍 Environment Variables

|        Name        | Required |
| :----------------: | :------: |
| `REPOSITORY_OWNER` |   yes    |
| `REPOSITORY_NAME`  |   yes    |
| `REPOSITORY_PATH`  |   yes    |
|  [`GITHUB_TOKEN`]  |    no    |

> [!NOTE]
> You need to add [`GITHUB_TOKEN`] if you want to:
>
> - Access the file in the private repository
> - Avoid the API usage limit

[`GITHUB_TOKEN`]: https://github.com/settings/tokens/new?scopes=repo

<br /><br />

## 🆘 Help

- [**⚠️ Issues**]: Feature Requests or Bug Reports
- [**💬 Discussions**]: General Chats or Questions
- [**🛡️ Security Advisories**]: Security Issues that should not be public

[**⚠️ Issues**]: https://github.com/5ouma/reproxy/issues/new/choose
[**💬 Discussions**]: https://github.com/5ouma/reproxy/discussions/new/choose
[**🛡️ Security Advisories**]: https://github.com/5ouma/reproxy/security/advisories/new

<br /><br />

## 🎽 Contributing

I happily welcome your contributions! Before you contribute, I would recommend
reading [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for a better development
experience.
