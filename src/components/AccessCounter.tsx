'use client';

import { useEffect, useState } from 'react';

interface CounterData {
    total: number;
    daily: number;
}

export default function AccessCounter() {
    const [counts, setCounts] = useState<CounterData>({ total: 0, daily: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/counter')
            .then(res => res.json())
            .then(data => {
                setCounts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch counter:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="access-counter">
                <div className="counter-item">
                    <span className="counter-label">総アクセス:</span>
                    <span className="counter-value">---</span>
                </div>
                <div className="counter-item">
                    <span className="counter-label">今日:</span>
                    <span className="counter-value">---</span>
                </div>
            </div>
        );
    }

    return (
        <div className="access-counter">
            <div className="counter-item">
                <span className="counter-label">総アクセス:</span>
                <span className="counter-value">{counts.total.toLocaleString()}</span>
            </div>
            <div className="counter-item">
                <span className="counter-label">今日:</span>
                <span className="counter-value">{counts.daily.toLocaleString()}</span>
            </div>

            <style jsx>{`
        .access-counter {
          display: flex;
          gap: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          font-size: 0.875rem;
        }
        
        .counter-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .counter-label {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .counter-value {
          font-weight: bold;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
        </div>
    );
}
