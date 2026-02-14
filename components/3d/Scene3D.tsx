'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, type ReactNode } from 'react';

interface Scene3DProps {
    children: ReactNode;
    className?: string;
    camera?: {
        position?: [number, number, number];
        fov?: number;
    };
}

export function Scene3D({
    children,
    className = '',
    camera = { position: [0, 0, 5], fov: 75 },
}: Scene3DProps) {
    return (
        <div className={className}>
            <Canvas
                camera={camera}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ pointerEvents: 'none' }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
