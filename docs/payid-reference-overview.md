---
id: payid-reference-overview
title: Reference Implementation Overview
sidebar_label: Reference Implementation Overview
---

[PayID.org](https://payid.org) provides a reference implementation of the PayID Protocol. If you want to use PayID, you can use this reference implementation, or you can make changes to it, or you can create your own solution entirely, as long as you follow the PayID Protocol.

## PayID reference specifications

The [reference implementation](https://github.com/payid-org/payid) uses TypeScript, a Node.js HTTP server, and a Postgres database.

By default, the server hosts the PayID Protocol implementation, or Public API, on port 8080. It also hosts a second RESTful API on port 8081 for CRUD operations of PayIDs and associated addresses.

## PayID server setup

There are multiple ways to set up a PayID server. We recommend any of the following:

- You can use the provided Docker-based deployment as described in [Getting Started](/).
- You can set up a [local PayID server without Docker](local-deployment).
- You can use [AWS and nginx](remote-deployment) to set up your PayID server, or adapt those instructions to other cloud providers. See the [PayID server requirements](payid-server-requirements) to learn about what types of resources you should deploy.

To experiment with PayID, you can quickly set up a local server. First, clone the [PayID reference implementation](https://github.com/payid-org/payid). From inside the repository, run `npm run devEnvUp`, which uses the local `docker-compose.yml` file to set up Docker containers running a Postgres database and PayID server.

If you would like to experiment with the source code but need a Postgres database to develop with you can run `npm run devDbUp`.

When you finish experimenting, you can clean up all deployed docker containers by running `npm run devDown`.

## PayID metrics

The PayID reference implementation provides readily accessible [metrics](metrics).
