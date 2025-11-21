import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function twitter() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
          background: '#0B6E4F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
          🌱 TerraFund
        </div>
        <div style={{ fontSize: 24 }}>
          Connecting landowners with investors for sustainable land development
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}