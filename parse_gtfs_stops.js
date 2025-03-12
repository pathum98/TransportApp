const fs = require('fs');
const csv = require('csv-parser');

const INPUT_FILE = 'stops.txt'; // Path to GTFS stops.txt
const OUTPUT_FILE = 'bus_stops.json';
const STOP_COUNT = 10; // Number of stops to extract

const stops = [];

fs.createReadStream(INPUT_FILE)
  .pipe(csv())
  .on('data', (row) => {
    stops.push({
      stop_id: row.stop_id,
      stop_name: row.stop_name,
      latitude: row.stop_lat,
      longitude: row.stop_lon,
      zone_id: row.zone_id,
      stop_url: row.stop_url,
    });
  })
  .on('end', () => {
    const selectedStops = stops.sort(() => 0.5 - Math.random()).slice(0, STOP_COUNT);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(selectedStops, null, 2));
    console.log(`Extracted ${selectedStops.length} stops and saved to ${OUTPUT_FILE}`);
  });