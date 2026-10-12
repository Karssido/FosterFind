// Converts the source spreadsheets in data-source/ into slim JSON files in public/data/.
// Run with: npm run convert-data
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const root = path.join(__dirname, '..');

// Spreadsheet cells use 0 / "0" / "" as "no value".
const clean = (v) => {
  if (v === undefined || v === null) return '';
  const s = String(v).replace(/\s+/g, ' ').trim();
  return s === '0' ? '' : s;
};

const sources = {
  hospitals: (r) => ({
    name: clean(r.Hospital_Name),
    address: clean(r.Address_Original_First_Line),
    state: clean(r.State),
    district: clean(r.District),
    phone: clean(r.Telephone) || clean(r.Mobile_Number),
    website: clean(r.Website),
    specialties: clean(r.Specialties).slice(0, 160),
    coordinates: clean(r.Location_Coordinates),
  }),
  oldAgeHomes: (r) => ({
    name: clean(r.Home_Name),
    address: clean(r.Address),
    state: clean(r.State),
    district: clean(r.District),
    phone: clean(r.Telephone),
    email: clean(r.Email),
  }),
  orphanages: (r) => ({
    name: clean(r.Orphanage_Name),
    address: clean(r.Address),
    state: clean(r.State),
    phone: clean(r.Telephone),
  }),
};

fs.mkdirSync(path.join(root, 'public', 'data'), { recursive: true });

for (const [file, mapRow] of Object.entries(sources)) {
  const wb = XLSX.readFile(path.join(root, 'data-source', `${file}.xlsx`));
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  const items = rows
    .map(mapRow)
    .filter((i) => i.name)
    .map((i) => Object.fromEntries(Object.entries(i).filter(([, v]) => v)));
  const out = path.join(root, 'public', 'data', `${file}.json`);
  fs.writeFileSync(out, JSON.stringify(items));
  console.log(`${file}: ${items.length} records, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
