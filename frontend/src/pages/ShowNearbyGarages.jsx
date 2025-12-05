import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShowNearbyGarages = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [vehicleType, setVehicleType] = useState('Car');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get('/nearbygarage/all');
        setStores(res.data || []);
      } catch (err) {
        // Log error and fall back to static data silently (do not show an error banner)
        console.error('Failed to fetch from backend, using static data:', err?.message || err);
        // fallback static data (same list as backend staticStores)
        const staticStores = [
          { store_id: 1, name: 'AutoFix Garage', rating: 4.5, latitude: 40.712776, longitude: -74.005974, address: '123 Main St, New York, NY', phone_number: '+1-555-123-4567', open_hours: '8am - 6pm' },
          { store_id: 2, name: 'Speedy Repairs', rating: 4.2, latitude: 40.730610, longitude: -73.935242, address: '22 Queens Blvd, Queens, NY', phone_number: '+1-555-234-5678', open_hours: '9am - 7pm' },
          { store_id: 3, name: 'GaragePro Mechanics', rating: 4.8, latitude: 40.758896, longitude: -73.985130, address: '45 Midtown Ave, Manhattan, NY', phone_number: '+1-555-345-6789', open_hours: '7am - 5pm' },
          { store_id: 4, name: 'FixIt Auto Care', rating: 3.9, latitude: 40.706192, longitude: -74.009160, address: '78 Broad St, New York, NY', phone_number: '+1-555-456-7890', open_hours: '8am - 8pm' },
          { store_id: 5, name: 'WheelWorks Garage', rating: 4.7, latitude: 40.742054, longitude: -74.001524, address: '90 10th Ave, New York, NY', phone_number: '+1-555-567-8901', open_hours: '9am - 6pm' },
          { store_id: 6, name: 'Manhattan Auto Clinic', rating: 4.6, latitude: 40.751620, longitude: -73.977230, address: '200 Park Ave, New York, NY', phone_number: '+1-555-678-9012', open_hours: '8am - 6pm', services: 'Oil change, engine diagnostics, brakes' },
          { store_id: 7, name: 'Queens QuickFix', rating: 4.1, latitude: 40.744000, longitude: -73.948900, address: '88 Northern Blvd, Queens, NY', phone_number: '+1-555-789-0123', open_hours: '9am - 7pm', services: 'Tires, brakes, general service' },
          { store_id: 8, name: 'Bronx Auto Care', rating: 4.3, latitude: 40.844782, longitude: -73.864827, address: '450 Fordham Rd, Bronx, NY', phone_number: '+1-555-890-1234', open_hours: '8am - 8pm', services: 'Tune-ups, tire rotation, repairs' },
          { store_id: 9, name: 'Brooklyn Motors', rating: 4.7, latitude: 40.678178, longitude: -73.944158, address: '310 Flatbush Ave, Brooklyn, NY', phone_number: '+1-555-901-2345', open_hours: '9am - 6pm', services: 'General repairs, painting, diagnostics' },
          { store_id: 10, name: 'Downtown Car Care', rating: 4.4, latitude: 40.707512, longitude: -74.011318, address: '15 Wall St, New York, NY', phone_number: '+1-555-012-3456', open_hours: '7am - 5pm', services: 'Oil change, batteries, inspections' },
          { store_id: 11, name: 'Harlem Auto Service', rating: 4.2, latitude: 40.811550, longitude: -73.946477, address: '230 W 125th St, Harlem, NY', phone_number: '+1-555-234-5670', open_hours: '8am - 7pm', services: 'Transmission, brakes, alignment' },
          { store_id: 12, name: 'East Village Garage', rating: 4.0, latitude: 40.726477, longitude: -73.981533, address: '120 Ave A, New York, NY', phone_number: '+1-555-345-6781', open_hours: '9am - 6pm', services: 'Tire change, diagnostics, battery replacement' },
          { store_id: 13, name: 'SoHo Auto Works', rating: 4.9, latitude: 40.724330, longitude: -74.001850, address: '400 Broome St, SoHo, NY', phone_number: '+1-555-456-7892', open_hours: '8am - 6pm', services: 'Luxury car service, detailing, brakes' },
          { store_id: 14, name: 'Chelsea Garage', rating: 4.5, latitude: 40.746500, longitude: -74.001374, address: '230 W 20th St, New York, NY', phone_number: '+1-555-567-8903', open_hours: '9am - 7pm', services: 'Oil change, suspension, air conditioning' },
          { store_id: 15, name: 'ParkSlope Mechanics', rating: 4.3, latitude: 40.671072, longitude: -73.981918, address: '95 7th Ave, Brooklyn, NY', phone_number: '+1-555-678-9014', open_hours: '8am - 5pm', services: 'Tune-ups, batteries, engine repair' },
          { store_id: 16, name: 'Upper West Auto', rating: 4.6, latitude: 40.787010, longitude: -73.975367, address: '300 Columbus Ave, New York, NY', phone_number: '+1-555-789-0125', open_hours: '8am - 6pm', services: 'Inspections, brakes, general repair' },
          { store_id: 17, name: 'Greenpoint Garage', rating: 4.1, latitude: 40.730230, longitude: -73.954910, address: '45 Greenpoint Ave, Brooklyn, NY', phone_number: '+1-555-890-1236', open_hours: '9am - 6pm', services: 'Oil change, diagnostics, tires' },
          { store_id: 18, name: 'Astoria Auto Clinic', rating: 4.4, latitude: 40.764357, longitude: -73.923462, address: '25 31st St, Astoria, NY', phone_number: '+1-555-901-2347', open_hours: '8am - 7pm', services: 'Brakes, battery, oil service' },
          { store_id: 19, name: 'Williamsburg Garage', rating: 4.8, latitude: 40.708115, longitude: -73.957070, address: '50 Wythe Ave, Brooklyn, NY', phone_number: '+1-555-012-3458', open_hours: '9am - 6pm', services: 'Performance tuning, tire change, detailing' },
          { store_id: 20, name: 'Lower East Auto Works', rating: 4.0, latitude: 40.718092, longitude: -73.987450, address: '220 Grand St, New York, NY', phone_number: '+1-555-234-5679', open_hours: '8am - 6pm', services: 'Tires, oil, diagnostics' },
          { store_id: 21, name: 'Jamaica Auto Center', rating: 4.2, latitude: 40.702678, longitude: -73.788968, address: '980 Liberty Ave, Queens, NY', phone_number: '+1-555-345-6780', open_hours: '9am - 8pm', services: 'Repairs, oil, brakes' },
          { store_id: 22, name: 'Long Island City Mechanics', rating: 4.3, latitude: 40.748000, longitude: -73.939000, address: '21st St, Long Island City, NY', phone_number: '+1-555-456-7893', open_hours: '8am - 7pm', services: 'Diagnostics, oil change, engine work' },
          { store_id: 23, name: 'Flatiron Auto Repair', rating: 4.7, latitude: 40.741061, longitude: -73.989699, address: '75 W 23rd St, Flatiron, NY', phone_number: '+1-555-567-8904', open_hours: '9am - 6pm', services: 'General maintenance, suspension, brakes' },
          { store_id: 24, name: 'Tribeca Auto Spa', rating: 4.9, latitude: 40.719526, longitude: -74.008993, address: '55 Hudson St, Tribeca, NY', phone_number: '+1-555-678-9015', open_hours: '8am - 6pm', services: 'Luxury service, detailing, performance tuning' },
          { store_id: 25, name: 'Sunset Park Garage', rating: 4.1, latitude: 40.645532, longitude: -74.012385, address: '450 4th Ave, Brooklyn, NY', phone_number: '+1-555-789-0126', open_hours: '9am - 7pm', services: 'Brakes, engine service, oil change' }
        ];
        setStores(staticStores);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage('');
    if (!selectedStore) return;

    // Basic validation
    if (!vehicleType || !serviceType || !bookingDate || !bookingTime) {
      setBookingMessage('Please fill all booking fields.');
      setBookingSuccess(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      // require login
      setBookingMessage('Please login to make a booking. Redirecting to login...');
      setBookingSuccess(false);
      setTimeout(() => navigate('/login'), 800);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        store_id: selectedStore.store_id,
        vehicle_type: vehicleType,
        service_type: serviceType,
        booking_date: bookingDate,
        booking_time: bookingTime
      };

      const res = await api.post('/booking', payload, { headers: { Authorization: `Bearer ${token}` } });
      setBookingMessage(res.data?.message || 'Booking created');
      setBookingSuccess(true);
      // optionally close modal after short delay
      setTimeout(() => {
        setShowBooking(false);
        setSelectedStore(null);
        // reset form
        setVehicleType('Car'); setServiceType(''); setBookingDate(''); setBookingTime(''); setBookingMessage(''); setBookingSuccess(false);
      }, 1200);
    } catch (err) {
      console.error('Booking error', err?.response || err);
      const msg = err?.response?.data?.error || err?.response?.data?.message || 'Failed to create booking';
      setBookingMessage(msg);
      setBookingSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Nearby Garages</h1>
        <button style={styles.back} onClick={() => navigate('/')}>Back</button>
      </div>

      {loading && <p style={styles.center}>Loading garages...</p>}
      

      <div style={styles.grid}>
        {stores.map(store => (
          <div key={store.store_id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.storeName}>{store.name}</h3>
              <div style={styles.rating}>{store.rating?.toFixed ? store.rating.toFixed(1) : store.rating}</div>
            </div>
            <p style={styles.address}><MapPin size={14} style={{marginRight:8}}/>{store.address}</p>
            {store.services && <p style={styles.services}><strong>Services:</strong> {store.services}</p>}
            <p style={styles.meta}><strong>Phone:</strong> {store.phone_number || 'N/A'}</p>
            <p style={styles.meta}><strong>Hours:</strong> {store.open_hours || 'N/A'}</p>
            <div style={styles.actions}>
              <button style={styles.call} onClick={() => { setSelectedStore(store); setShowBooking(true); }}>Book</button>
              <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`} style={styles.map}>Open in Maps</a>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedStore && (
        <div style={styles.modalOverlay} onClick={() => { if(!submitting) { setShowBooking(false); } }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{marginTop:0}}>Book: {selectedStore.name}</h2>
            <form onSubmit={handleBookingSubmit} style={{display:'grid', gap:12}}>
              <label style={styles.label}>
                Vehicle Type
                <select value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)} style={styles.input} required>
                  <option>Car</option>
                  <option>Bike</option>
                  <option>Truck</option>
                </select>
              </label>

              <label style={styles.label}>
                Service Type
                <input value={serviceType} onChange={(e)=>setServiceType(e.target.value)} placeholder="e.g., Oil change" style={styles.input} required />
              </label>

              <div style={{display:'flex', gap:8}}>
                <label style={{flex:1}}>
                  Date
                  <input type="date" value={bookingDate} onChange={(e)=>setBookingDate(e.target.value)} style={styles.input} required />
                </label>
                <label style={{flex:1}}>
                  Time
                  <input type="time" value={bookingTime} onChange={(e)=>setBookingTime(e.target.value)} style={styles.input} required />
                </label>
              </div>

              <div style={{display:'flex', gap:8}}>
                <button type="submit" style={styles.submit} disabled={submitting}>{submitting ? 'Booking...' : 'Confirm Booking'}</button>
                <button type="button" style={styles.cancel} onClick={() => setShowBooking(false)} disabled={submitting}>Cancel</button>
              </div>
            </form>
            {bookingMessage && <p style={{marginTop:12,color: bookingSuccess ? '#10b981' : '#ef4444'}}>{bookingMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
    padding: '40px 16px',
    color: '#e6eef8',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    maxWidth: 1100,
    margin: '0 auto 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: 28, margin: 0, background: 'linear-gradient(90deg,#60a5fa,#7c3aed)', WebkitBackgroundClip: 'text', color: 'transparent' },
  back: { background: 'transparent', border: '1px solid #374151', color: '#cbd5e1', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' },
  center: { textAlign: 'center', width: '100%' },
  grid: { maxWidth: 1100, margin: '20px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 },
  card: { background: '#071028', border: '1px solid #172033', borderRadius: 10, padding: 16, boxShadow: '0 10px 30px rgba(2,6,23,0.6)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { margin: 0, fontSize: 18 },
  rating: { background: '#06202e', color: '#9ae6b4', padding: '6px 8px', borderRadius: 6, fontWeight: 700 },
  address: { color: '#9aa8bf', marginTop: 8, display: 'flex', alignItems: 'center' },
  services: { color: '#9aa8bf', marginTop: 8 },
  meta: { color: '#9aa8bf', marginTop: 6, fontSize: 13 },
  actions: { marginTop: 12, display: 'flex', gap: 8 },
  call: { background: '#4f46e5', color: 'white', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' },
  map: { background: 'transparent', color: '#60a5fa', padding: '8px 12px', borderRadius: 8, border: '1px solid #1f2937', textDecoration: 'none' }
  ,
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modal: { background: '#071028', border: '1px solid #23303b', padding: 20, width: 480, maxWidth: '95%', borderRadius: 10 },
  label: { display: 'block', color: '#cbd5e1', fontSize: 13 },
  input: { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #23303b', background: '#0b1220', color: '#e6eef8', boxSizing: 'border-box' },
  submit: { background: '#10b981', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', flex: 1 },
  cancel: { background: 'transparent', border: '1px solid #374151', color: '#cbd5e1', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' }
};

export default ShowNearbyGarages;
