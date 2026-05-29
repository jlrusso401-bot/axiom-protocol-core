'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReadPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('axiom_reading_data');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing memory:", err);
      }
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div style={{ backgroundColor: '#232D38', height: '100vh' }} />;
  }

  // Fallback UI if accessed directly without logging friction first
  if (!data) {
    return (
      <div style={{ backgroundColor: '#232D38', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif' }}>
        <div style={{ color: '#94A3B8', fontSize: '14px', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>No active intelligence found.</div>
        <button 
          onClick={() => router.push('/')}
          style={{ backgroundColor: '#E2E8F0', border: 'none', color: '#0F172A', padding: '10px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer' }}>
          RETURN TO LOG
        </button>
      </div>
    );
  }

  const outerGlassStyle = {
    background: 'rgba(20, 25, 35, 0.75)', 
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative' as const,
    zIndex: 10,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  };

  const innerGlassStyle = {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  };

  return (
    <div style={{ backgroundColor: '#232D38', height: '100vh', display: 'flex', justifyContent: 'center', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Background Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08, zIndex: 0, width: '80%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src="/logo.svg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '30px 24px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 50, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/logo.svg" alt="Axiom Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.6))' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '1.5px', margin: '0 0 2px 0', textShadow: '0px 4px 12px rgba(0, 0, 0, 0.9), 0px 1px 3px rgba(255, 255, 255, 0.1)' }}>AXIOM PROTOCOL</h1>
              <p style={{ color: '#8892B0', fontSize: '11px', fontWeight: '500', letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>THE DEEP DIVE</p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/')}
            style={{ backgroundColor: 'transparent', border: '1px solid #64748B', color: '#94A3B8', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase' }}>
            BACK ▼
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, padding: '0 24px 24px', overflowY: 'auto', zIndex: 10 }}>
          <div style={outerGlassStyle}>
            
            {/* Historical Context Section */}
            <div style={innerGlassStyle}>
              <div style={{ color: '#94A3B8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Source Material</div>
              <div style={{ color: '#F1F5F9', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{data.title}</div>
              <div style={{ color: '#CBD5E1', fontSize: '12px', fontStyle: 'italic', marginBottom: '16px' }}>By {data.author}</div>
              <div style={{ color: '#E2E8F0', fontSize: '14px', lineHeight: '1.7', borderLeft: '2px solid #64748B', paddingLeft: '12px', fontStyle: 'italic', marginBottom: '16px' }}>
                "{data.quote}"
              </div>
              <div style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}>
                {data.expandedText}
              </div>
            </div>

            {/* Tactical Breakdown Section */}
            <div style={innerGlassStyle}>
              <div style={{ color: '#94A3B8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Tactical Breakdown</div>
              <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: 0 }}>
                {data.mainIdeas?.map((idea: string, index: number) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', color: '#CBD5E1', fontSize: '13px', lineHeight: '1.5' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#64748B', transform: 'rotate(45deg)', marginTop: '6px', marginRight: '10px', flexShrink: 0 }} />
                    <span>{idea.replace(/^[\*\-\•]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audio Intelligence Section */}
            {data.podcast && (
              <div style={{ ...innerGlassStyle, marginBottom: 0, borderColor: '#3B82F6' }}>
                <div style={{ color: '#60A5FA', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontWeight: '700' }}>Audio Intelligence: {data.podcast.theme}</div>
                <div style={{ color: '#F1F5F9', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>{data.podcast.title}</div>
                <div style={{ color: '#CBD5E1', fontSize: '12px', fontStyle: 'italic', marginBottom: '16px' }}>Host: {data.podcast.host}</div>
                
                {/* Audio Embed Player */}
                <div style={{ width: '100%', height: '152px', backgroundColor: '#0F172A', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #475569', marginBottom: '16px', overflow: 'hidden' }}>
                   {data.podcast.embedUrl.startsWith('http') ? (
                      <iframe src={data.podcast.embedUrl} width="100%" height="152" frameBorder="0" allow="encrypted-media" style={{ borderRadius: '12px' }}></iframe>
                   ) : (
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ color: '#64748B', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>[ AUDIO PLAYER STANDBY ]</span>
                        <div style={{ color: '#475569', fontSize: '10px', marginTop: '8px' }}>{data.podcast.embedUrl}</div>
                      </div>
                   )}
                </div>

                <div style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.6' }}>
                  <strong style={{ color: '#CBD5E1' }}>Rationale:</strong> {data.podcast.rationale}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}