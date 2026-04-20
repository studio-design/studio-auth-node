# @studio-design/studio-auth-node

TypeScript / JavaScript client for the Studio Auth Service API.

## Install

```bash
pnpm add @studio-design/studio-auth-node
# or
npm install @studio-design/studio-auth-node
```

## Usage

```ts
import { client } from '@studio-design/studio-auth-node';

client.setConfig({
  baseUrl: 'https://auth.studio.design',
  auth: () => `Bearer ${accessToken}`,
});
```

The SDK is generated from our public OpenAPI specification. Refer to the
[OpenAPI docs](https://auth.studio.design/docs) for the full API surface.

## Versioning

Releases follow [Semantic Versioning](https://semver.org/). Breaking changes
bump the major version; backwards-compatible additions bump the minor version.
During the `0.x` series, minor bumps may contain breaking changes.

Published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements/)
— verify with `npm audit signatures`.

## License

[MIT](./LICENSE) © Studio Design Inc.
