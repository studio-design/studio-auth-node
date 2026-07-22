# @studio-design/studio-auth-node

TypeScript / JavaScript client for the Studio Auth Service API.

## Documentation

The full API reference (all endpoints, schemas, and error responses) is
published on the Studio internal developer portal (Google IAP protected —
Studio members only). Open the portal top page and look for
"Auth Service API".

## Requirements

- Node.js 18 or later is required (the SDK uses the global `fetch`). Run a
  currently-maintained LTS line — see the
  [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
  (Node.js 22 and 24 are the maintained LTS lines at the time of writing;
  18 and 20 have reached end-of-life).
- This package is **ESM-only** (`"type": "module"`). CommonJS `require()` is
  not supported — use `import`.

## Install

### Stable

```bash
pnpm add @studio-design/studio-auth-node
# or
npm install @studio-design/studio-auth-node
```

### Snapshot release (pre-release validation)

To validate unreleased SDK changes on staging, install the snapshot tagged on
every `main` commit that touches the OpenAPI spec via the `next` dist-tag:

```bash
pnpm add @studio-design/studio-auth-node@next
# or
npm install @studio-design/studio-auth-node@next
```

The snapshot version follows `<next-patch>-rc.<run_number>` (e.g. `0.2.25-rc.5`).
See the [studio-auth-node tags](https://github.com/studio-design/studio-auth-node/tags)
for the latest snapshot tag.

> ⚠️ Snapshot releases are intended for staging / CI validation. For production,
> install the stable version (`pnpm add @studio-design/studio-auth-node` or pin
> to a stable `^X.Y.Z` range).

## Usage

### Host configuration (required)

The generated client defaults to the local development server
(`https://auth.local.studio.design`, the first `servers` entry of the OpenAPI
spec). Always set `baseUrl` explicitly for the environment you target.

```ts
import { client } from '@studio-design/studio-auth-node';

client.setConfig({
  baseUrl: 'https://your-auth-server.example.com',
  auth: () => accessToken,
});
```

The SDK is generated from the Studio Auth Service OpenAPI specification.

### Authentication

Operations use one of two security schemes, mirroring the OpenAPI spec:

| Scheme | Applies to | What the `auth` callback must return |
| --- | --- | --- |
| `BearerAuth` (JWT) | Admin / Organization operations, `getUserinfo` / `postUserinfo` | The raw access token — the SDK prepends `Bearer ` itself |
| `ClientBasicAuth` | `issueTokens`, `introspectToken`, `revokeToken`, `checkSsoEnforcement` | `client_id:client_secret` — the SDK base64-encodes it and prepends `Basic ` |

Do **not** prefix the return value with `Bearer ` / `Basic ` yourself; the
client adds the scheme prefix based on the operation being called. The
callback receives the scheme descriptor, so a single client can serve both:

```ts
client.setConfig({
  baseUrl: 'https://your-auth-server.example.com',
  auth: (auth) =>
    auth.scheme === 'basic'
      ? `${process.env.AUTH_CLIENT_ID}:${process.env.AUTH_CLIENT_SECRET}`
      : accessToken,
});
```

Access tokens are issued by the Authorization Code + PKCE flow
(`/oauth/authorize` → `/oauth/token`) and renewed with the `refresh_token`
grant — see the API reference on the internal portal for the full flow.
`client_id` / `client_secret` pairs are provisioned per application by the
Auth Service administrators.

### Example: fetch the authenticated caller's organization

```ts
import { client, getMyOrganization } from '@studio-design/studio-auth-node';

client.setConfig({
  baseUrl: 'https://your-auth-server.example.com',
  auth: () => accessToken,
});

try {
  const { data } = await getMyOrganization({
    path: { organization_id: orgId },
    throwOnError: true,
  });
  // data is typed as `Organization`
  console.log(data.display_name);
} catch (err) {
  // With `throwOnError: true`, non-2xx responses throw.
}
```

### Error handling

By default (without `throwOnError`), operations do not throw on non-2xx
responses — they return a result object instead:

```ts
import { getMyOrganization } from '@studio-design/studio-auth-node';

const { data, error, response } = await getMyOrganization({
  path: { organization_id: orgId },
});

if (error) {
  // Each operation's `error` is typed (e.g. `GetMyOrganizationError`), so the
  // generated type — not an assumed shape — is the source of truth. Most
  // endpoints return RFC 9457 Problem Details
  // (`type` / `title` / `status` / `detail`), but the OAuth / OIDC endpoints
  // return their own formats on their auth-failure statuses only:
  // `issueTokens` (RFC 6749), `introspectToken` (RFC 7662) and `revokeToken`
  // (RFC 7009) use `{ error, error_description }` on 400/401 (their 429 and
  // 5xx stay Problem Details); `getUserinfo` / `postUserinfo` use RFC 6750 on
  // 401/403; `checkSsoEnforcement` returns its own error object on 401; and the
  // browser-facing flow endpoints redirect (302) on success but render an HTML
  // error page on some statuses — `initiateAuthorization` on 400 (its 422/429
  // are Problem Details), `handleIdpCallback` on 400/403 — while 5xx stays
  // Problem Details.
  //
  // `response` is `undefined` on a network-level failure (fetch threw), where
  // only `error` is set; on an HTTP error response both are present. Read the
  // status as `response?.status` and branch on it with the operation's error type.
  console.error(response?.status, error);
}
```

Per-operation error union types (e.g. `GetMyOrganizationError`) and response
types are exported from the package root.

## Versioning

Releases follow [Semantic Versioning](https://semver.org/). Breaking changes
bump the major version; backwards-compatible additions bump the minor version.
During the `0.x` series, minor bumps may contain breaking changes.
See the [CHANGELOG](./CHANGELOG.md) for release history.

Published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements/)
— verify with `npm audit signatures`.

## Contributing

This repository is a **read-only release mirror**, generated from the Studio
Auth Service OpenAPI specification. All files are overwritten on every
release, so pull requests cannot be accepted here. Bug reports and feature
requests are welcome via
[GitHub Issues](https://github.com/studio-design/studio-auth-node/issues).

## License

[MIT](./LICENSE) © Studio Design Inc.
