'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

/* ═══════════════════════════════════════════════════════════════
   3D TILT CARD
   Pure CSS/JS perspective tilt effect with glare overlay.
   No Three.js needed — ultra-lightweight.
   ═══════════════════════════════════════════════════════════════ */

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltMax?: number;
    glareOpacity?: number;
    scale?: number;
}

export function TiltCard({
    children,
    className = '',
    tiltMax = 8,
    glareOpacity = 0.12,
    scale = 1.02,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * tiltMax * 2;
        const rotateX = (0.5 - y) * tiltMax * 2;

        setTransform(
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`
        );
        setGlarePos({ x: x * 100, y: y * 100 });
    }

    function handleMouseLeave() {
        setIsHovered(false);
        setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    }

    function handleMouseEnter() {
        setIsHovered(true);
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                transform,
                transition: isHovered
                    ? 'transform 0.1s ease-out'
                    : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {children}
            {/* Glare overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    opacity: isHovered ? glareOpacity : 0,
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 60%)`,
                    transition: 'opacity 0.3s ease',
                    zIndex: 20,
                }}
            />
        </div>
    );
}
