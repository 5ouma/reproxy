<h1 align="center">Reproxy</h1>

<div align="center">

**🚚 Deliver any files in the GitHub repository**

[![GitHub Release](https://img.shields.io/github/v/release/5ouma/reproxy?style=flat-square)](https://github.com/5ouma/reproxy/releases)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/5ouma/reproxy?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/5ouma/reproxy?style=flat-square)
[![GitHub last commit](https://img.shields.io/github/last-commit/5ouma/reproxy?style=flat-square)](https://github.com/5ouma/reproxy/commit/HEAD)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/5ouma/reproxy?style=flat-square)](https://github.com/5ouma/reproxy/commits/main)
<br />
[![Test](https://img.shields.io/github/actions/workflow/status/5ouma/reproxy/test.yml?label=test&style=flat-square)](https://github.com/5ouma/reproxy/actions/workflows/test.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/5ouma/reproxy/main.svg?style=flat-square)](https://results.pre-commit.ci/latest/github/5ouma/reproxy/main)
[![codecov](https://codecov.io/github/5ouma/reproxy/graph/badge.svg?token=OQB55KXJIL)](https://codecov.io/github/5ouma/reproxy)

</div>

<br /><br />

## 💡 Concepts

You can host your specific file on the GitHub repository.
The usage I assume is for one-line scripts.
(i.e. dotfiles or some install scripts, like `curl https://example.com | sh`)

If you access from browsers, you'll redirected to the GitHub page, not a raw file.

For the development or testing, you can access to the different branches or tags.
To do this, simply add the ref name to the sub-directory.
(i.e. `curl https://example.com/ref | sh`)

<br /><br />

## 🔧 Setup

You can host your file on [Deno Deploy](https://deno.com/deploy).

### 💪 Manual Deployment

1. Clone this repository

   ```sh
   git clone https://github.com/5ouma/reproxy.git
   ```

2. Copy the [`.env.tmpl`](../.env.tmpl) to `.env` and edit as you prefer

   > [🌍 Environment Variables](#-environment-variables)

3. Install [Deno](https://deno.com) and [deployctl](https://docs.deno.com/deploy/manual/deployctl).

4. Deploy to Deno Deploy

   ```sh
   deployctl deploy --prod --env-file='.env'
   ```

<br />

### ⚙️ Automatic Deployment

1. [Fork this repository](https://github.com/5ouma/reproxy/fork)

2. [Create a new project](https://dash.deno.com/new_project) with your forked repository

3. Set the environment variables
   (_Don't forget!!_)

   > [🌍 Environment Variables](#-environment-variables)

<br /><br />

## 🔨 Development

1. Clone this repository

   ```sh
   git clone https://github.com/5ouma/reproxy.git
   ```

2. Copy the [`.env.template`](../.env.template) to `.env` and edit as you prefer

   > [🌍 Environment Variables](#-environment-variables)

3. Install [Deno](https://deno.com)

4. Run the [`server.ts`](../src/server.ts) via these task runners

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
| `REPOSITORY_OWNER` |   true   |
| `REPOSITORY_NAME`  |   true   |
| `REPOSITORY_PATH`  |   true   |
|  [`GITHUB_TOKEN`]  |  false   |

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

I happily welcome your contributions!
Before you contribute,
I would recommend reading [CONTRIBUTING.md](./CONTRIBUTING.md)
for a better development experience.
