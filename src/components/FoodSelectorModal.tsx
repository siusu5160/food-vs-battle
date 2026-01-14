'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

// Define category type locally if not imported
type FoodCategory = 'Meat' | 'Carb' | 'Side' | 'Fruit' | 'Snack' | 'Alcohol' | 'All';

interface FoodSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (food: FoodItem) => void;
    currentSelectedId?: string;
    opponentFood?: FoodItem | null;
    selectingSide?: 'A' | 'B';
}

const CATEGORIES: { id: FoodCategory | 'All'; label: string; icon: string }[] = [
    { id: 'All', label: 'すべて', icon: '🍽️' },
    { id: 'Meat', label: 'お肉・魚', icon: '🍖' },
    { id: 'Carb', label: '炭水化物', icon: '🍚' },
    { id: 'Side', label: 'おかず', icon: '🥗' },
    { id: 'Fruit', label: '果物', icon: '🍎' },
    { id: 'Snack', label: 'おやつ', icon: '🍰' },
    { id: 'Alcohol', label: 'お酒', icon: '🍺' },
];

export const FoodSelectorModal: React.FC<FoodSelectorModalProps> = ({ isOpen, onClose, onSelect, currentSelectedId, opponentFood, selectingSide = 'A' }) => {
    const [activeTab, setActiveTab] = useState<FoodCategory | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [allFoods, setAllFoods] = useState<FoodItem[]>([]);

    useEffect(() => {
        // Load foods on mount
        setAllFoods(getAllFoods());
    }, []);

    // Colors based on side
    const myColor = selectingSide === 'A' ? '#EF4444' : '#3B82F6'; // Red vs Blue
    const opponentColor = selectingSide === 'A' ? '#3B82F6' : '#EF4444'; // Opposite

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const filteredFoods = useMemo(() => {
        return allFoods.filter(food => {
            const matchesCategory = activeTab === 'All' || food.category === activeTab;
            const matchesSearch =
                food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (food.tags && food.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))); // Search tags too
            return matchesCategory && matchesSearch;
        });
    }, [activeTab, searchQuery, allFoods]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#111827', width: '100%', maxWidth: '56rem', height: '90vh',
                borderRadius: '1rem', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                border: '1px solid #374151', padding: 0
            }} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1f2937', backgroundColor: '#111827' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        {opponentFood && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.375rem',
                                backgroundColor: '#1f2937', padding: '0.125rem 0.5rem',
                                borderRadius: '9999px', border: '1px solid #374151',
                                minWidth: 0, flex: 1
                            }}>
                                <span style={{ fontSize: '0.625rem', fontWeight: 'bold', color: opponentColor, whiteSpace: 'nowrap' }}>VS</span>
                                <div style={{
                                    width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden',
                                    border: `1px solid ${opponentColor}`, flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#374151'
                                }}>
                                    <span style={{ fontSize: '14px', lineHeight: 1 }}>{opponentFood.emoji}</span>
                                </div>
                                <span style={{
                                    color: 'white', fontWeight: 500, fontSize: '0.875rem',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px'
                                }}>
                                    {opponentFood.name}
                                </span>
                            </div>
                        )}
                        {!opponentFood && <div className="flex-1"></div>}
                        <button onClick={onClose} style={{
                            padding: '0.5rem 1rem', borderRadius: '9999px', color: '#9ca3af', border: '1px solid #374151',
                            background: 'transparent', cursor: 'pointer', flexShrink: 0, marginLeft: '0.5rem'
                        }}>
                            ✕
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', width: '100%' }}>
                        <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="食材名を入力..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && filteredFoods.length > 0) {
                                    onSelect(filteredFoods[0]);
                                    onClose();
                                }
                            }}
                            style={{
                                width: '100%', backgroundColor: '#1f2937', color: 'white', borderRadius: '0.5rem',
                                padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #374151', fontSize: '1rem'
                            }}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Grid Content - Only show when searching */}
                <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '1rem', backgroundColor: '#0b0f19' }}>
                    {!searchQuery ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4b5563', gap: '1rem' }}>
                            <span style={{ fontSize: '3rem', opacity: 0.5 }}>⌨️</span>
                            <p className="text-sm">検索してファイターを見つけてください</p>
                        </div>
                    ) : filteredFoods.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280', gap: '1rem' }}>
                            <span style={{ fontSize: '2.25rem' }}>😢</span>
                            <p>見つかりませんでした...</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '0.75rem'
                        }}>
                            {filteredFoods.slice(0, 100).map(food => { // Limit render for perf
                                const isOpponentSelected = opponentFood?.id === food.id;

                                return (
                                    <button
                                        key={food.id}
                                        onClick={() => {
                                            onSelect(food);
                                            onClose();
                                        }}
                                        style={{
                                            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                                            backgroundColor: '#1f2937', borderRadius: '0.5rem', overflow: 'hidden',
                                            border: currentSelectedId === food.id
                                                ? `3px solid ${myColor}`
                                                : isOpponentSelected
                                                    ? `3px solid ${opponentColor}`
                                                    : '1px solid #374151',
                                            cursor: 'pointer', padding: 0
                                        }}
                                    >
                                        {/* Emoji Area */}
                                        <div style={{
                                            width: '100%', aspectRatio: '1/1', backgroundColor: '#374151',
                                            position: 'relative', overflow: 'hidden',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{food.emoji}</span>
                                            {/* Overlay Gradient */}
                                            <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', opacity: 0.7 }}></div>

                                            {/* Opponent Badge */}
                                            {isOpponentSelected && (
                                                <div style={{
                                                    position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
                                                    border: `4px solid ${opponentColor}`, pointerEvents: 'none',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8
                                                }}>
                                                    <span className="text-white font-bold px-2 py-1 rounded text-xs shadow-lg" style={{ backgroundColor: opponentColor }}>相手の選択</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Name Area */}
                                        <div style={{ width: '100%', padding: '0.5rem 0.25rem', textAlign: 'center', backgroundColor: '#1f2937' }}>
                                            <h4 style={{
                                                fontSize: '0.75rem', fontWeight: 'bold', color: '#f3f4f6',
                                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                minHeight: '2.4em', lineHeight: '1.2', margin: 0
                                            }}>
                                                {food.name}
                                            </h4>
                                        </div>

                                        {/* Selected Checkmark (My Side) */}
                                        {currentSelectedId === food.id && (
                                            <div style={{
                                                position: 'absolute', inset: 0, backgroundColor: `${myColor}33`, // 20% opacity hex
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <div style={{
                                                    width: '1.5rem', height: '1.5rem', backgroundColor: myColor, color: 'white',
                                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                                }}>
                                                    ✓
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
