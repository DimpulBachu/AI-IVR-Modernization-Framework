// frontend/src/components/CallLog.jsx
import React, { useState } from 'react';

/*
 This demo component shows static placeholder entries.
 In a real implementation, fetch entries from backend API (/calls) which stores call logs in DB.
*/
export default function CallLog() {
  const [items] = useState([
    { id: 1, from: '+919876543210', text: 'Hello, I want to check my balance', time: '2025-10-29 12:00' },
    { id: 2, from: '+919876543211', text: 'Transfer me to an agent', time: '2025-10-29 12:05' }
  ]);

  return (
    <div>
      {items.map(it => (
        <div key={it.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 6 }}>
          <div><strong>From:</strong> {it.from}</div>
          <div><strong>Text:</strong> {it.text}</div>
          <div style={{ color: '#666', fontSize: 12 }}>{it.time}</div>
        </div>
      ))}
      <div style={{ color: '#666', marginTop: 8 }}>This view is static in demo. Backend DB + API will be implemented in full project.</div>
    </div>
  );
}
