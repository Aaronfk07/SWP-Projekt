## Backend

### Directus API-Client-Schicht (REST + GraphQL)

Zentrales Modul unter `lib/directus`:

- `lib/directus/client.js`: Basis-Client mit Base-URL, Token-Handling, REST-Request-Methoden und GraphQL-Helfer
- `lib/directus/products.js`: Produkt-Funktionen (`listProducts`, `getProductDetail`, `queryProducts`)
- `lib/directus/index.js`: zentrale Exports

Die Produkte-Liste nutzt den Endpoint `/items/Products` und verarbeitet Directus-Antworten im Format `{ data: [...] }`.

### Beispiel

```js
import { createDirectusClient, createProductsApi } from "./lib/directus/index.js";

const client = createDirectusClient({
	baseUrl: "http://10.115.3.12:8055",
	token: process.env.DIRECTUS_TOKEN,
});

const productsApi = createProductsApi(client);

const result = await productsApi.listProducts({
	limit: 20,
	filter: { status: { _eq: "published" } },
});

if (!result.ok) {
	console.error(result.error);
}
```

### Tests

```bash
npm test
```

### API Server

Der Backend-Server kapselt Directus und stellt eigene Endpoints bereit:

- `GET /api/products`
- `GET /api/products/:slug`

Konfiguration (z. B. `.env`):

```bash
DIRECTUS_URL=http://10.115.3.12:8055
DIRECTUS_TOKEN=dein_token_optional
PORT=4000
```

Starten:

```bash
npm run dev
```