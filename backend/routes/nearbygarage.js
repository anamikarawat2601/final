const express=require('express')
const router = express.Router();
const db = require('../db');
// get nearby garages (by distance) - optional authenticated endpoint
const auth=require('../middleware/auth');

// Existing geolocation-based endpoint (kept, but fix param name typo)
router.get('/nearby/:latitude/:longitude', auth, (req, res) => {
  const userLat = req.params.latitude;
  const userLng = req.params.longitude;

  const sqlQueryNearby = `
SELECT 
    store_id,
    name,
    rating,
    address,
    phone_number,
    open_hours,
    (6371 * 
        ACOS(
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            COS(RADIANS(longitude) - RADIANS(?)) +
            SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )
    ) AS distance_km
FROM store
HAVING distance_km < 5
ORDER BY distance_km ASC;
`;

  db.query(sqlQueryNearby, [userLat, userLng, userLat], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "database error" });
    }
    if (!results || results.length === 0) {
      return res.json([]);
    }
    return res.json(results);
  });
});

// Public endpoint: return all stores (used by frontend 'Nearby Garages' list)
router.get('/all', (req, res) => {
  const sql = `SELECT store_id, name, rating, latitude, longitude, address, phone_number, open_hours, services FROM store ORDER BY name ASC`;

  // static fallback data (provided list)
  const staticStores = [
    { name: 'AutoFix Garage', rating: 4.5, latitude: 40.712776, longitude: -74.005974, address: '123 Main St, New York, NY', phone_number: '+1-555-123-4567', open_hours: '8am - 6pm' },
    { name: 'Speedy Repairs', rating: 4.2, latitude: 40.730610, longitude: -73.935242, address: '22 Queens Blvd, Queens, NY', phone_number: '+1-555-234-5678', open_hours: '9am - 7pm' },
    { name: 'GaragePro Mechanics', rating: 4.8, latitude: 40.758896, longitude: -73.985130, address: '45 Midtown Ave, Manhattan, NY', phone_number: '+1-555-345-6789', open_hours: '7am - 5pm' },
    { name: 'FixIt Auto Care', rating: 3.9, latitude: 40.706192, longitude: -74.009160, address: '78 Broad St, New York, NY', phone_number: '+1-555-456-7890', open_hours: '8am - 8pm' },
    { name: 'WheelWorks Garage', rating: 4.7, latitude: 40.742054, longitude: -74.001524, address: '90 10th Ave, New York, NY', phone_number: '+1-555-567-8901', open_hours: '9am - 6pm' },
    { name: 'Manhattan Auto Clinic', rating: 4.6, latitude: 40.751620, longitude: -73.977230, address: '200 Park Ave, New York, NY', phone_number: '+1-555-678-9012', open_hours: '8am - 6pm', services: 'Oil change, engine diagnostics, brakes' },
    { name: 'Queens QuickFix', rating: 4.1, latitude: 40.744000, longitude: -73.948900, address: '88 Northern Blvd, Queens, NY', phone_number: '+1-555-789-0123', open_hours: '9am - 7pm', services: 'Tires, brakes, general service' },
    { name: 'Bronx Auto Care', rating: 4.3, latitude: 40.844782, longitude: -73.864827, address: '450 Fordham Rd, Bronx, NY', phone_number: '+1-555-890-1234', open_hours: '8am - 8pm', services: 'Tune-ups, tire rotation, repairs' },
    { name: 'Brooklyn Motors', rating: 4.7, latitude: 40.678178, longitude: -73.944158, address: '310 Flatbush Ave, Brooklyn, NY', phone_number: '+1-555-901-2345', open_hours: '9am - 6pm', services: 'General repairs, painting, diagnostics' },
    { name: 'Downtown Car Care', rating: 4.4, latitude: 40.707512, longitude: -74.011318, address: '15 Wall St, New York, NY', phone_number: '+1-555-012-3456', open_hours: '7am - 5pm', services: 'Oil change, batteries, inspections' },
    { name: 'Harlem Auto Service', rating: 4.2, latitude: 40.811550, longitude: -73.946477, address: '230 W 125th St, Harlem, NY', phone_number: '+1-555-234-5670', open_hours: '8am - 7pm', services: 'Transmission, brakes, alignment' },
    { name: 'East Village Garage', rating: 4.0, latitude: 40.726477, longitude: -73.981533, address: '120 Ave A, New York, NY', phone_number: '+1-555-345-6781', open_hours: '9am - 6pm', services: 'Tire change, diagnostics, battery replacement' },
    { name: 'SoHo Auto Works', rating: 4.9, latitude: 40.724330, longitude: -74.001850, address: '400 Broome St, SoHo, NY', phone_number: '+1-555-456-7892', open_hours: '8am - 6pm', services: 'Luxury car service, detailing, brakes' },
    { name: 'Chelsea Garage', rating: 4.5, latitude: 40.746500, longitude: -74.001374, address: '230 W 20th St, New York, NY', phone_number: '+1-555-567-8903', open_hours: '9am - 7pm', services: 'Oil change, suspension, air conditioning' },
    { name: 'ParkSlope Mechanics', rating: 4.3, latitude: 40.671072, longitude: -73.981918, address: '95 7th Ave, Brooklyn, NY', phone_number: '+1-555-678-9014', open_hours: '8am - 5pm', services: 'Tune-ups, batteries, engine repair' },
    { name: 'Upper West Auto', rating: 4.6, latitude: 40.787010, longitude: -73.975367, address: '300 Columbus Ave, New York, NY', phone_number: '+1-555-789-0125', open_hours: '8am - 6pm', services: 'Inspections, brakes, general repair' },
    { name: 'Greenpoint Garage', rating: 4.1, latitude: 40.730230, longitude: -73.954910, address: '45 Greenpoint Ave, Brooklyn, NY', phone_number: '+1-555-890-1236', open_hours: '9am - 6pm', services: 'Oil change, diagnostics, tires' },
    { name: 'Astoria Auto Clinic', rating: 4.4, latitude: 40.764357, longitude: -73.923462, address: '25 31st St, Astoria, NY', phone_number: '+1-555-901-2347', open_hours: '8am - 7pm', services: 'Brakes, battery, oil service' },
    { name: 'Williamsburg Garage', rating: 4.8, latitude: 40.708115, longitude: -73.957070, address: '50 Wythe Ave, Brooklyn, NY', phone_number: '+1-555-012-3458', open_hours: '9am - 6pm', services: 'Performance tuning, tire change, detailing' },
    { name: 'Lower East Auto Works', rating: 4.0, latitude: 40.718092, longitude: -73.987450, address: '220 Grand St, New York, NY', phone_number: '+1-555-234-5679', open_hours: '8am - 6pm', services: 'Tires, oil, diagnostics' },
    { name: 'Jamaica Auto Center', rating: 4.2, latitude: 40.702678, longitude: -73.788968, address: '980 Liberty Ave, Queens, NY', phone_number: '+1-555-345-6780', open_hours: '9am - 8pm', services: 'Repairs, oil, brakes' },
    { name: 'Long Island City Mechanics', rating: 4.3, latitude: 40.748000, longitude: -73.939000, address: '21st St, Long Island City, NY', phone_number: '+1-555-456-7893', open_hours: '8am - 7pm', services: 'Diagnostics, oil change, engine work' },
    { name: 'Flatiron Auto Repair', rating: 4.7, latitude: 40.741061, longitude: -73.989699, address: '75 W 23rd St, Flatiron, NY', phone_number: '+1-555-567-8904', open_hours: '9am - 6pm', services: 'General maintenance, suspension, brakes' },
    { name: 'Tribeca Auto Spa', rating: 4.9, latitude: 40.719526, longitude: -74.008993, address: '55 Hudson St, Tribeca, NY', phone_number: '+1-555-678-9015', open_hours: '8am - 6pm', services: 'Luxury service, detailing, performance tuning' },
    { name: 'Sunset Park Garage', rating: 4.1, latitude: 40.645532, longitude: -74.012385, address: '450 4th Ave, Brooklyn, NY', phone_number: '+1-555-789-0126', open_hours: '9am - 7pm', services: 'Brakes, engine service, oil change' }
  ];

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error fetching stores:', err);
      // return static fallback
      return res.json(staticStores);
    }
    if (!results || results.length === 0) {
      return res.json(staticStores);
    }
    return res.json(results);
  });
});
module.exports=router;
