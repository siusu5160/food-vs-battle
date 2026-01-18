import { ImageResponse } from 'next/og';
import { getFoodById } from '@/lib/search';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

// Ensure ids are available
interface Props {
    params: Promise<{ idA: string; idB: string }>;
}

export default async function Image({ params }: Props) {
    const { idA, idB } = await params;

    // Fetch food data
    const foodA = getFoodById(idA);
    const foodB = getFoodById(idB);

    // Fallback if data is missing
    const nameA = foodA ? foodA.name : '???';
    const emojiA = foodA ? foodA.emoji : '❓';
    const nameB = foodB ? foodB.name : '???';
    const emojiB = foodB ? foodB.emoji : '❓';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'system-ui, saezns-serif',
                }}
            >
                {/* VS Badge */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 80,
                        fontWeight: 'bold',
                        color: '#fbbf24', // yellow-400
                        textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                        zIndex: 10,
                    }}
                >
                    VS
                </div>

                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: '0 40px' }}>
                    {/* Left Fighter */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45%' }}>
                        <div style={{ fontSize: 140, marginBottom: 20 }}>{emojiA}</div>
                        <div style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2 }}>
                            {nameA}
                        </div>
                    </div>

                    {/* Right Fighter */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45%' }}>
                        <div style={{ fontSize: 140, marginBottom: 20 }}>{emojiB}</div>
                        <div style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2 }}>
                            {nameB}
                        </div>
                    </div>
                </div>

                {/* Footer Brand */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 24,
                        opacity: 0.6,
                        letterSpacing: '0.1em'
                    }}
                >
                    FOOD VS BATTLE - どっちが強い？
                </div>
            </div>
        ),
        { ...size }
    );
}
