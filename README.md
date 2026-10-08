# MF Remote

This is the Module Federation remote application.

## Run

```bash
npm install
npm run build
npm run preview
```

The host expects the remote entry at:

`http://localhost:4174/remoteEntry.js`

It exposes:

`remoteApp/Widget`

## Deploying to a CDN

### 1. Upload `dist/` as-is, under a versioned path

`remoteEntry.js` loads its chunks with paths relative to its own URL
(`./assets/...`), so the folder layout must be kept intact:

```
https://cdn.example.com/px-hub/v1.2.0/remoteEntry.js
https://cdn.example.com/px-hub/v1.2.0/assets/...
```

Any path works, because nothing depends on Vite's `base`. A version (or commit
SHA) in the path is recommended. Old versions stay available, and rolling back
just means pointing the host back at the previous URL.

Then set that URL in the host's `remote-config.json` (see the host README).

### 2. Allow cross-origin requests (CORS)

The host loads `remoteEntry.js` and its chunks as ES modules from a different
origin, so browsers require CORS. The CDN must return this header for every
file under the remote's path:

```
Access-Control-Allow-Origin: https://your-host-domain.example.com
```

`*` also works, since no credentials are sent. Without this header the host
shows the widget as unavailable and the browser console reports a CORS error.

### 3. Cache headers

| File               | Header                                         | Why                                                         |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------- |
| `remoteEntry.js`   | `Cache-Control: no-cache`                      | Not content-hashed. A long TTL hides new deploys from users |
| `assets/*`         | `Cache-Control: public, max-age=31536000, immutable` | Filenames are content-hashed, so they never change     |
| `@mf-types/*`      | `no-cache` (only needed if you publish types)  | Generated type declarations for consumers                   |

If you use versioned paths (step 1), each version's `remoteEntry.js` never
changes. You can then cache it longer, though `no-cache` remains the safe
default.
