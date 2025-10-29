// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import CallLog from './components/CallLog';
import axios from 'axios';

/*
 Very simple dashboard:
 - Polls backend /calls (we will create a lightweight in-memory store later if desired)
 - Displays last interactions recorded (for now we'll call backend health endpoint)
*/

export default function App() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/health');
        setStatus('Backend: ' + res.data.status + ' @ ' + res.data.time);
      } catch (err) {
        setStatus('Backend unreachable. Start backend and set VITE_BACKEND_URL in .env');
      }
    }
    fetchHealth();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Conversational IVR Dashboard (Demo)</h1>
      <p>{status}</p>

      <section>
        <h2>Call Log</h2>
        <CallLog />
      </section>

      <footer style={{ marginTop: 40, color: '#666' }}>
        <small>Demo dashboard. Data updates after calls are processed. Integrate persistent DB to store logs.</small>
      </footer>
    </div>
  );
}
