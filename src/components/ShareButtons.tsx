'use client';

interface ShareButtonsProps {
    title: string;
    url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    const shareToTwitter = () => {
        const text = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(shareUrl);
        window.open(
            `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
            '_blank',
            'width=550,height=420'
        );
    };

    const shareToLine = () => {
        const encodedUrl = encodeURIComponent(shareUrl);
        window.open(
            `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
            '_blank',
            'width=550,height=420'
        );
    };

    const shareToFacebook = () => {
        const encodedUrl = encodeURIComponent(shareUrl);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            '_blank',
            'width=550,height=420'
        );
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('URLをコピーしました！');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="share-buttons">
            <button onClick={shareToTwitter} className="share-btn twitter">
                <span className="icon">🐦</span>
                <span className="text">Xでシェア</span>
            </button>
            <button onClick={shareToLine} className="share-btn line">
                <span className="icon">💬</span>
                <span className="text">LINEでシェア</span>
            </button>
            <button onClick={shareToFacebook} className="share-btn facebook">
                <span className="icon">📘</span>
                <span className="text">Facebookでシェア</span>
            </button>
            <button onClick={copyToClipboard} className="share-btn copy">
                <span className="icon">🔗</span>
                <span className="text">URLをコピー</span>
            </button>

            <style jsx>{`
        .share-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin: 1rem 0;
        }
        
        .share-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }
        
        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .share-btn.twitter {
          background: #1DA1F2;
        }
        
        .share-btn.line {
          background: #00B900;
        }
        
        .share-btn.facebook {
          background: #1877F2;
        }
        
        .share-btn.copy {
          background: #6B7280;
        }
        
        .icon {
          font-size: 1.2rem;
        }
        
        @media (max-width: 640px) {
          .share-buttons {
            flex-direction: column;
          }
          
          .share-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
        </div>
    );
}
