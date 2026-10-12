# FosterFind

A React (Create React App) directory for finding hospitals, orphanages and old age homes in India.

## Scripts

- `npm start` – run the dev server at http://localhost:3000
- `npm test` – run the tests
- `npm run build` – production build
- `npm run convert-data` – regenerate `public/data/*.json` from the spreadsheets in `data-source/`

## Data

The source spreadsheets live in `data-source/` and are **not** shipped to the browser. `npm run convert-data`
converts them to slim JSON files in `public/data/`, which the search pages fetch at runtime. Re-run it
(and commit the JSON) whenever a spreadsheet changes.

## Structure

- `src/pages/` – route pages (Home, About Us, Hospital, Orphanage, OldAgeHome)
- `src/components/DirectoryPage/` – the shared search + pagination component used by the three directory pages
- `src/components/Common/` – Header, Footer and the shared NavMenu
