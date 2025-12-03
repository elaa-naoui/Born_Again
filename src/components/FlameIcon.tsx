import React from 'react';

export default function FlameIcon({ size = 32 }: { size?: number }) {
  return (
    <div style={{ fontSize: size + 'px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      🔥
    </div>
  );
}
