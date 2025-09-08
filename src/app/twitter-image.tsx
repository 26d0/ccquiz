import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-static';

export const alt = 'ccQuiz - Country Code Quiz';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            ccQuiz
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0',
              fontWeight: '300',
            }}
          >
            Country Code Quiz
          </p>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '40px 0 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span>🌍</span>
            <span>Geography Quiz</span>
            <span>🧠</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
