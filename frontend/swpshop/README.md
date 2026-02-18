# SWP Shop Frontend

Next.js App Router Frontend mit Directus REST-Integration.

## Lokale Entwicklung

```bash
npm run dev
```

Die App lauft unter [http://localhost:3000](http://localhost:3000).

## Directus Konfiguration

Lege folgende Variablen an (z. B. in `.env.local`):

```bash
BACKEND_URL=http://localhost:4000
```

Die Produktliste wird ueber das Backend geladen (`/api/products`) und ruft die Detaildaten per `slug`.

## Wichtige Routen

- `/` Produktliste mit Links zu den Details
- `/products/[slug]` Produktdetailseite mit Bild, Beschreibung, Preis und Verfugbarkeit
