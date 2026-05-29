'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReadPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('axiom_reading_data');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleSaveToArmory = () => {
    if (!data) return;
    
    const existingArmory = JSON.parse(localStorage.getItem('axiom_armory') || '[]');
    const isDuplicate = existingArmory.some((item: any) => item.title === data.title);

    if (!isDuplicate) {
      // We now spread the entire data object so the full text is saved
      const newEntry = {
        ...data,
        timestamp: new Date().toISOString()
      };
      existingArmory.push(newEntry);
      localStorage.setItem('axiom_armory', JSON.stringify(existingArmory));
    }
    
    setSaved(true);
  };

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

  const TacticalBullet = () => (
    <svg width="14" height="14" viewBox="0 0 100 100" style={{ marginRight: '10px', flexShrink: 0, marginTop: '2px' }}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#94A3B8" strokeWidth="8"/>
      <path d="M50 25 L30 75 L38 75 L42 63 L58 63 L62 75 L70 75 Z M50 38 L55 54 L45 54 Z" fill="#94A3B8"/>
    </svg>
  );

  const DiamondBullet = () => (
    <div style={{ width: '6px', height: '6px', backgroundColor: '#64748B', transform: 'rotate(45deg)', marginTop: '8px', marginRight: '10px', flexShrink: 0 }} />
  );

  if (!data) return <div style={{ backgroundColor: '#232D38', height: '100vh' }} />;

  return (
    <div style={{ backgroundColor: '#232D38', height: '100vh', display: 'flex', justifyContent: 'center', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08, zIndex: 0, width: '80%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src="/logo.svg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>

        <div style={{ padding: '30px 24px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/logo.svg" alt="Axiom Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.6))' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '1.5px', margin: '0 0 2px 0', textShadow: '0px 4px 12px rgba(0, 0, 0, 0.9), 0px 1px 3px rgba(255, 255, 255, 0.1)' }}>AXIOM PROTOCOL</h1>
              <p style={{ color: '#8892B0', fontSize: '11px', fontWeight: '500', letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>DEEP DIVE</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/')}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ← Back
          </button>
        </div>

        <div style={{ flex: 1, padding: '0 24px 24px', overflowY: 'auto', zIndex: 10 }}>
          <div style={{ ...outerGlassStyle, display: 'flex', flexDirection: 'column' }}>
            
            <div style={innerGlassStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <TacticalBullet />
                <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>The Directive Quote</div>
              </div>
              <div style={{ paddingLeft: '24px', color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '12px' }}>
                "{data.quote}"
              </div>
              <div style={{ paddingLeft: '24px', color: '#94A3B8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                — {data.author}
              </div>
              <div style={{ paddingLeft: '24px', color: '#64748B', fontSize: '11px', fontStyle: 'italic' }}>
                {data.title}
              </div>
            </div>

            <div style={innerGlassStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <TacticalBullet />
                <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Expanded Context</div>
              </div>
              <div style={{ paddingLeft: '24px', color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>
                {data.expandedText}
              </div>
            </div>

            <div style={{ ...innerGlassStyle, marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                <TacticalBullet />
                <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Core Principles</div>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                {Array.isArray(data.mainIdeas) && data.mainIdeas.map((idea: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <DiamondBullet />
                    <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.5' }}>{idea}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={handleSaveToArmory}
                disabled={saved}
                style={{ 
                  backgroundColor: saved ? 'rgba(16, 185, 129, 0.1)' : '#E2E8F0', 
                  border: saved ? '1px solid #10B981' : 'none',
                  color: saved ? '#10B981' : '#0F172A', 
                  padding: '10px 24px', 
                  borderRadius: '6px',
                  fontSize: '13px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px', 
                  cursor: saved ? 'default' : 'pointer',
                  transition: 'all 0.2s'
                }}>
                {saved ? 'Saved to Armory ✓' : 'Save Title / Author'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}