'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   COPPER EMBER PARTICLES
   Floating procedural particles in warm copper/ember tones
   ═══════════════════════════════════════════════════════════════ */

function EmberParticles({ count = 120 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const basePositions = useRef<Float32Array | null>(null);

    const [positions, colors, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const siz = new Float32Array(count);

        // Copper/ember color palette
        const palette = [
            new THREE.Color('#c77d4a'), // copper-500
            new THREE.Color('#d49566'), // copper-400
            new THREE.Color('#e0ad83'), // copper-300
            new THREE.Color('#e8734a'), // ember-500
            new THREE.Color('#f08c66'), // ember-400
            new THREE.Color('#a5643a'), // copper-600
        ];

        for (let i = 0; i < count; i++) {
            // Spread particles in a wide, shallow volume
            pos[i * 3] = (Math.random() - 0.5) * 16;     // x: wide spread
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;     // y: moderate height
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;  // z: depth, pushed back

            // Random color from palette
            const color = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;

            // Varied sizes — mostly small with a few larger ones
            siz[i] = Math.random() * 0.08 + 0.02;
            if (Math.random() > 0.85) siz[i] *= 2.5; // occasional bright ones
        }

        basePositions.current = pos.slice();
        return [pos, col, siz];
    }, [count]);

    useFrame((state) => {
        if (!mesh.current || !basePositions.current) return;
        const time = state.clock.elapsedTime;
        const posArray = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const baseX = basePositions.current[i * 3];
            const baseY = basePositions.current[i * 3 + 1];
            const baseZ = basePositions.current[i * 3 + 2];

            // Each particle drifts in a unique Lissajous-esque orbit
            const speed = 0.15 + (i % 7) * 0.02;
            const phaseX = i * 0.37;
            const phaseY = i * 0.53;
            const phaseZ = i * 0.71;

            posArray[i * 3] = baseX + Math.sin(time * speed + phaseX) * 0.6;
            posArray[i * 3 + 1] = baseY + Math.cos(time * speed * 0.7 + phaseY) * 0.4 + Math.sin(time * 0.1) * 0.15;
            posArray[i * 3 + 2] = baseZ + Math.sin(time * speed * 0.5 + phaseZ) * 0.3;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = time * 0.02; // slow global rotation
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING COPPER RINGS
   Ethereal geometric accents that drift through the scene
   ═══════════════════════════════════════════════════════════════ */

function CopperRing({ position, scale, speed }: {
    position: [number, number, number];
    scale: number;
    speed: number;
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime * speed;
        ref.current.rotation.x = t * 0.3;
        ref.current.rotation.z = t * 0.2;
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={ref} position={position} scale={scale}>
                <torusGeometry args={[1, 0.015, 16, 64]} />
                <meshBasicMaterial
                    color="#c77d4a"
                    transparent
                    opacity={0.12}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO PARTICLES EXPORT
   ═══════════════════════════════════════════════════════════════ */

export function HeroParticles() {
    return (
        <>
            {/* Ambient light for subtle illumination */}
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.4} color="#c77d4a" />
            <pointLight position={[-5, -3, 3]} intensity={0.2} color="#e8734a" />

            {/* Main particle field */}
            <EmberParticles count={150} />

            {/* Decorative floating rings */}
            <CopperRing position={[-3, 1.5, -3]} scale={1.2} speed={0.5} />
            <CopperRing position={[4, -1, -4]} scale={0.8} speed={0.7} />
            <CopperRing position={[1, 2.5, -5]} scale={1.5} speed={0.3} />
            <CopperRing position={[-2, -2, -2]} scale={0.6} speed={0.9} />
        </>
    );
}
