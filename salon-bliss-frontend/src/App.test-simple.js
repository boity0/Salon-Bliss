import React from 'react';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <header style={{ padding: '20px', background: '#667eea', color: 'white', textAlign: 'center' }}>
        <h1>🌟 Salon Bliss - Test Version</h1>
        <p>If you can see this, React is working!</p>
      </header>
      
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Welcome to Salon Bliss</h2>
        <p>Your premier destination for beauty and wellness services</p>
        
        <div style={{ margin: '30px 0' }}>
          <button style={{ 
            background: '#667eea', 
            color: 'white', 
            border: 'none', 
            padding: '15px 30px', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            Book Appointment
          </button>
          <button style={{ 
            background: 'transparent', 
            color: '#667eea', 
            border: '2px solid #667eea', 
            padding: '13px 28px', 
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            View Services
          </button>
        </div>
        
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>✂️ Hair Styling</h3>
            <p>Professional cuts and styling</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>💆 Facial Treatments</h3>
            <p>Rejuvenating skin care</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3>💅 Nail Services</h3>
            <p>Manicure and pedicure</p>
          </div>
        </div>
      </main>
      
      <footer style={{ background: '#2d3436', color: 'white', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p>&copy; 2024 Salon Bliss. All rights reserved.</p>
        <p>📍 10 Dorset Street | 📞 079 478 1068</p>
      </footer>
    </div>
  );
}

export default App;