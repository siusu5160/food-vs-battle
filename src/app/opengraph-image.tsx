import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FOODVS - 食べ物バトルゲーム';
export const size = { width: 1200, height: 630 };
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                <div style={{ fontSize: 120, marginBottom: 20 }}>
                    🍕 VS 🍔
                </div>
                <h1 style={{
                    fontSize: 80,
                    fontWeight: 'bold',
                    margin: 0,
                    textAlign: 'center',
                }}>
                    FOODVS
                </h1>
                <p style={{
                    fontSize: 40,
                    marginTop: 20,
                    opacity: 0.9,
                }}>
                    食べ物バトルゲーム
                </p>
                <div style={{
                    marginTop: 40,
                    display: 'flex',
                    gap: 20,
                    fontSize: 24,
                    opacity: 0.8,
                }}>
                    <span>🎮 バトル</span>
                    <span>🎰 ガチャ</span>
                    <span>📊 ランキング</span>
                    <span>❓ クイズ</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
