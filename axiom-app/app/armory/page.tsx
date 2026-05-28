'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ArmoryPage() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState<any[]>([]);

  useEffect(() => {
    const armory = JSON.parse(localStorage.getItem('axiom_armory') || '[]');
    setSavedItems(armory);
  }, []);

  const handleDelete = (indexToDelete: number) => {
    const updatedArmory = savedItems.filter((_, index) => index !== indexToDelete);
    setSavedItems(updatedArmory);
    localStorage.setItem('axiom_armory', JSON.stringify(updatedArmory));
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
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  };

  const TacticalBullet = () => (
    <svg width="14" height="14" viewBox="0 0 100 100" style={{ marginRight: '10px', flexShrink: 0, marginTop: '4px' }}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#94A3B8" strokeWidth="8"/>
      <path d="M50 25 L30 75 L38 75 L42 63 L58 63 L62 75 L70 75 Z M50 38 L55 54 L45 54 Z" fill="#94A3B8"/>
    </svg>
  );

  return (
    <div style={{ backgroundColor: '#232D38', height: '100vh', display: 'flex', justifyContent: 'center', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Background Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08, zIndex: 0, width: '80%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src="/logo.svg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Header with Back Button */}
        <div style={{ padding: '30px 24px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/logo.svg" alt="Axiom Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.6))' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '1.5px', margin: '0 0 2px 0', textShadow: '0px 4px 12px rgba(0, 0, 0, 0.9), 0px 1px 3px rgba(255, 255, 255, 0.1)' }}>AXIOM PROTOCOL</h1>
              <p style={{ color: '#8892B0', fontSize: '11px', fontWeight: '500', letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>THE ARMORY</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/')}
            style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ← Back
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '0 24px 24px', overflowY: 'auto', zIndex: 10 }}>
          <div style={{ ...outerGlassStyle, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
              Saved References
            </div>

            {savedItems.length === 0 ? (
              <div style={{ color: '#64748B', fontSize: '13px', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>
                The Armory is currently empty.
              </div>
            ) : (
              savedItems.map((item, index) => (
                <div key={index} style={innerGlassStyle}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                    <TacticalBullet />
                    <div>
                      <div style={{ color: '#CBD5E1', fontSize: '14px', fontWeight: '700', lineHeight: '1.4' }}>
                        {item.title}
                      </div>
                      <div style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
                        {item.author}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(index)}
                    style={{ 
                      backgroundColor: 'transparent', 
                      border: '1px solid #EF4444', 
                      color: '#EF4444', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '10px', 
                      fontWeight: '700', 
                      textTransform: 'uppercase', 
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}>
                    Purge
                  </button>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
}