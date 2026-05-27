'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [submittedLog, setSubmittedLog] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setSubmittedLog(input);
    setResponse(''); 

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: input }),
      });
      const data = await res.json();
      setResponse(data.directive || data.error);
    } catch (err: any) {
      setResponse("Error: " + err.message);
    } finally {
      setIsLoading(false);
      setInput(''); 
    }
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

  const parseProtocolResponse = (text: string) => {
    if (!text) return null;
    if (text.includes('**Direct Reframe**')) {
      return {
        reframe: text.match(/\*\*Direct Reframe\*\*([\s\S]*?)(?=\*\*The Blueprint\*\*|$)/)?.[1]?.trim(),
        blueprint: text.match(/\*\*The Blueprint\*\*([\s\S]*?)(?=\*\*The Tactical Action\*\*|$)/)?.[1]?.trim(),
        action: text.match(/\*\*The Tactical Action\*\*([\s\S]*?)(?=\*\*The Deep Dive\*\*|$)/)?.[1]?.trim(),
        deepDive: text.match(/\*\*The Deep Dive\*\*([\s\S]*?)$/)?.[1]?.trim(),
      };
    }
    return null;
  };

  const parsedData = parseProtocolResponse(response);

  const cleanText = (text: string | undefined) => {
    if (!text) return '';
    return text.replace(/^[\*\-\•]\s*/, '');
  };

  return (
    <div style={{ backgroundColor: '#232D38', height: '100vh', display: 'flex', justifyContent: 'center', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Background Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08, zIndex: 0, width: '80%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src="/logo.svg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '30px 24px 12px', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10, flexShrink: 0 }}>
          <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src="/logo.svg" alt="Axiom Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.6))' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '1.5px', margin: '0 0 2px 0', textShadow: '0px 4px 12px rgba(0, 0, 0, 0.9), 0px 1px 3px rgba(255, 255, 255, 0.1)' }}>AXIOM PROTOCOL</h1>
            <p style={{ color: '#8892B0', fontSize: '11px', fontWeight: '500', letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>THE UNYIELDING BASELINE</p>
          </div>
        </div>

        {/* Progressive Disclosure: Hide Brief and Quote on execution */}
        {!submittedLog && !isLoading && (
          <>
            {/* Operational Brief - Spacing Reduced */}
            <div style={{ padding: '0 24px 8px', zIndex: 10, flexShrink: 0 }}>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 0', textAlign: 'center' }}>
                <p style={{ color: '#CBD5E1', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', lineHeight: '1.6', margin: 0 }}>
                  A rapid-reference tool for mental discipline.<br />Log your point of friction. Confront the literature. Do the work.
                </p>
              </div>
            </div>

            {/* The Quote - Inline format, reduced padding */}
            <div style={{ margin: '0 24px 8px', padding: '10px 16px', textAlign: 'center', flexShrink: 0, backgroundColor: 'rgba(15, 20, 25, 0.6)', border: '1px solid #64748B', borderRadius: '8px' }}>
              <span style={{ color: '#CBD5E1', fontStyle: 'italic', fontSize: '13px' }}>"How long are you going to wait before you demand the best for yourself?"</span>
              <span style={{ color: '#94A3B8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '8px', whiteSpace: 'nowrap' }}>— Epictetus</span>
            </div>
          </>
        )}

        {/* Main Interface Area */}
        <div style={{ flex: 1, padding: '0 24px 0px', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
          
          {/* Top Glass: Logged Friction (Progressively Disclosed) */}
          {submittedLog && (
            <div style={{ ...outerGlassStyle, flexShrink: 0, minHeight: '100px', padding: '16px 20px' }}>
              <div style={{ color: '#F1F5F9', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>Logged Friction</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.5', fontStyle: 'italic' }}>
                "{submittedLog}"
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
            <div style={{ display: 'flex', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', backgroundColor: 'rgba(15, 20, 25, 0.8)' }}>
              <input
                type="text"
                value={input}
                maxLength={200}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={isLoading}
                placeholder="Log current friction..."
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#F8FAFC',
                  padding: '0 16px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  backgroundColor: '#E2E8F0',
                  border: 'none',
                  color: '#0F172A',
                  padding: '0 20px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                EXECUTE
              </button>
            </div>
            <div style={{ textAlign: 'right', color: input.length >= 200 ? '#EF4444' : '#64748B', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', paddingRight: '4px' }}>
              {input.length} / 200
            </div>
          </div>

          {/* Bottom Glass: Response Area */}
          <div style={{ ...outerGlassStyle, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '16px 20px' }}>
            {isLoading ? (
              <div style={{ color: '#94A3B8', fontStyle: 'italic', padding: '4px', fontSize: '14px' }}>Processing logic...</div>
            ) : !response ? (
              <div style={{ color: '#94A3B8', padding: '4px', fontSize: '14px' }}>System standing by. . .</div>
            ) : parsedData ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Nested Glass 1: Friction Point */}
                <div style={innerGlassStyle}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <TacticalBullet />
                    <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Identify the Friction Point:</div>
                  </div>
                  <div style={{ paddingLeft: '24px', color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <DiamondBullet />
                      <div style={{ flex: 1 }}>{cleanText(parsedData.reframe)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', fontStyle: 'italic', color: '#94A3B8' }}>
                      <div style={{ width: '6px', height: '6px', marginRight: '10px', flexShrink: 0 }} /> {/* Invisible Spacer for alignment */}
                      <div style={{ flex: 1 }}>{cleanText(parsedData.blueprint)}</div>
                    </div>
                  </div>
                </div>

                {/* Nested Glass 2: Tactical Action */}
                <div style={innerGlassStyle}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <TacticalBullet />
                    <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>The Tactical Action:</div>
                  </div>
                  <div style={{ paddingLeft: '24px' }}>
                    <ReactMarkdown 
                      components={{
                        ul: ({node, ...props}) => <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: 0 }} {...props} />,
                        li: ({node, ...props}) => (
                          <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <DiamondBullet />
                            <span style={{ color: '#CBD5E1', lineHeight: '1.5', fontSize: '14px' }} {...props} />
                          </li>
                        ),
                        strong: ({node, ...props}) => <strong style={{ color: '#FFFFFF', fontWeight: '700' }} {...props} />
                      }}
                    >
                      {parsedData.action || ''}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Nested Glass 3: Deep Dive */}
                <div style={{ ...innerGlassStyle, marginBottom: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <TacticalBullet />
                    <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>The Deep Dive:</div>
                  </div>
                  <div style={{ paddingLeft: '24px', color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <DiamondBullet />
                      <div style={{ flex: 1 }}>{cleanText(parsedData.deepDive)}</div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <ReactMarkdown 
                components={{
                  p: ({node, ...props}) => <p style={{ marginBottom: '16px', color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6' }} {...props} />,
                  strong: ({node, ...props}) => <strong style={{ color: '#FFFFFF', fontWeight: '700' }} {...props} />
                }}
              >
                {response}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '12px 0 24px 0', zIndex: 10, flexShrink: 0 }}>
          <div style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '400', marginBottom: '2px' }}>A Pocket Mentor</div>
          <div style={{ color: '#475569', fontSize: '10px', letterSpacing: '2px' }}>EST. 2026</div>
        </div>

      </div>
    </div>
  );
}