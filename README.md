# @studio-design/studio-auth-node

TypeScript / JavaScript client for the Studio Auth Service API.

## Install

```bash
pnpm add @studio-design/studio-auth-node
# or
npm install @studio-design/studio-auth-node
```

## Usage

### Host configuration (required)

The SDK does not ship with a default host URL. Configure the base URL before
making any requests.

```ts
import { client } from '@studio-design/studio-auth-node';

client.setConfig({
  baseUrl: 'https://your-auth-server.example.com',
  auth: () => `Bearer ${accessToken}`,
});
```

The SDK is generated from the Studio Auth Service OpenAPI specification.

## Versioning

Releases follow [Semantic Versioning](https://semver.org/). Breaking changes
bump the major version; backwards-compatible additions bump the minor version.
During the `0.x` series, minor bumps may contain breaking changes.

Published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements/)
— verify with `npm audit signatures`.

## License

[MIT](./LICENSE) © Studio Design Inc.
