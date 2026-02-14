'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   WIREFRAME GLOBE
   A rotating wireframe sphere with copper styling
   ═══════════════════════════════════════════════════════════════ */

function WireframeGlobe() {
    const globeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!globeRef.current) return;
        globeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    });

    return (
        <group ref={globeRef}>
            {/* Main wireframe sphere */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial
                    color="#c77d4a"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </mesh>

            {/* Inner glow sphere */}
            <mesh>
                <sphereGeometry args={[1.95, 24, 24]} />
                <meshBasicMaterial
                    color="#0c0c12"
                    transparent
                    opacity={0.6}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Latitude rings for visual interest */}
            {[0.3, 0.7, 1.0, 1.3, 1.7].map((lat, i) => (
                <mesh key={i} rotation={[lat, 0, 0]}>
                    <torusGeometry args={[2 * Math.cos(lat - 0.85), 0.005, 8, 64]} />
                    <meshBasicMaterial
                        color="#c77d4a"
                        transparent
                        opacity={0.15}
                    />
                </mesh>
            ))}

            {/* Equator ring — more prominent */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.008, 8, 64]} />
                <meshBasicMaterial
                    color="#d49566"
                    transparent
                    opacity={0.25}
                />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════════════════════════════
   LOCATION PIN
   Glowing marker on the globe surface
   ═══════════════════════════════════════════════════════════════ */

function LocationPin({
    lat,
    lng,
    label,
    delay,
}: {
    lat: number;
    lng: number;
    label: string;
    delay: number;
}) {
    const pinRef = useRef<THREE.Group>(null);
    const pulseRef = useRef<THREE.Mesh>(null);

    // Convert lat/lng to 3D position on sphere
    const position = useMemo(() => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const r = 2.02;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
    }, [lat, lng]);

    useFrame((state) => {
        if (!pulseRef.current) return;
        const t = state.clock.elapsedTime + delay;
        const pulseScale = 1 + Math.sin(t * 2) * 0.4;
        pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.3 - Math.sin(t * 2) * 0.15;
    });

    return (
        <group ref={pinRef} position={position}>
            {/* Pin dot */}
            <mesh>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#e8734a" />
            </mesh>

            {/* Pulse ring */}
            <mesh ref={pulseRef as React.RefObject<THREE.Mesh>}>
                <ringGeometry args={[0.08, 0.14, 24]} />
                <meshBasicMaterial
                    color="#c77d4a"
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Connection line from pin to core */}
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array([0, 0, 0, ...position.clone().normalize().multiplyScalar(-0.3).toArray()]), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#c77d4a" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ORBITING PARTICLES around the globe
   ═══════════════════════════════════════════════════════════════ */

function OrbitParticles({ count = 40 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const r = 2.5 + Math.random() * 0.8;
            const yOffset = (Math.random() - 0.5) * 1.5;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = yOffset;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#d49566"
                transparent
                opacity={0.5}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

// NYC restaurant locations (approximate coordinates)
const locations = [
    { lat: 40.7128, lng: -74.006, label: 'Downtown', delay: 0 },
    { lat: 40.7580, lng: -73.9855, label: 'Midtown', delay: 1.5 },
    { lat: 40.7282, lng: -73.7949, label: 'Brooklyn Heights', delay: 3 },
];

export function LocationGlobe() {
    return (
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
            <group>
                {/* Ambient scene lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[3, 3, 3]} intensity={0.3} color="#c77d4a" />

                {/* The globe */}
                <WireframeGlobe />

                {/* Location pins */}
                {locations.map((loc) => (
                    <LocationPin
                        key={loc.label}
                        lat={loc.lat}
                        lng={loc.lng}
                        label={loc.label}
                        delay={loc.delay}
                    />
                ))}

                {/* Orbiting particles */}
                <OrbitParticles />
            </group>
        </Float>
    );
}
