export const runtime = 'edge';

interface CounterResponse {
    total: number;
    daily: number;
}

export async function GET(request: Request) {
    try {
        // Cloudflare KVにアクセス
        const env = process.env as any;
        const KV = env.FOODVS_COUNTER;

        // KVが設定されていない場合はダミーデータを返す
        if (!KV) {
            console.warn('FOODVS_COUNTER KV not configured, returning dummy data');
            return Response.json({
                total: 0,
                daily: 0,
            } as CounterResponse);
        }

        const today = new Date().toISOString().split('T')[0];
        const totalKey = 'counter:total';
        const dailyKey = `counter:daily:${today}`;

        // 現在のカウントを取得
        const totalCount = await KV.get(totalKey);
        const dailyCount = await KV.get(dailyKey);

        const newTotal = parseInt(totalCount || '0') + 1;
        const newDaily = parseInt(dailyCount || '0') + 1;

        // カウントを増やす
        await KV.put(totalKey, String(newTotal));
        await KV.put(dailyKey, String(newDaily), {
            expirationTtl: 86400 * 7 // 7日間保持
        });

        return Response.json({
            total: newTotal,
            daily: newDaily,
        } as CounterResponse);
    } catch (error) {
        console.error('Counter error:', error);
        // エラー時もダミーデータを返す
        return Response.json({
            total: 0,
            daily: 0
        } as CounterResponse);
    }
}
