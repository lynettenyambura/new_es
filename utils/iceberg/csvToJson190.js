"use strict";


import { parse } from "csv-parse/sync";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let pathToCSV = path.join(__dirname, 'pdf', 'dp0190-2.csv')

let icbgCsv = fs.readFileSync(pathToCSV);

let cats = new Set();
let courts = new Set();
let URIs = parse(icbgCsv, {
    columns: true,
    skip_empty_lines: true
}).forEach(d => {
    d.court && courts.add(d.court);
    d.cat_juicio && cats.add(d.cat_juicio);
});

//write cats to cats.txt, each on a new line
fs.writeFileSync(path.join(__dirname, 'pdf', 'cats.txt'), [...cats].sort().join("\n"));

//write courts to courts.txt, each on a new line
fs.writeFileSync(path.join(__dirname, 'pdf', 'courts-v3.txt'), [...courts].sort().join("\n"));


