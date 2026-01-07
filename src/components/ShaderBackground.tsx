"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Color palette - Rose red gradient matching logo
  vec3 coral = vec3(1.0, 0.42, 0.29);
  vec3 roseRed = vec3(0.91, 0.12, 0.39);
  vec3 white = vec3(1.0, 1.0, 1.0);
  
  // Smooth noise function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  // SDF for circle (used for dots and rings)
  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }
  
  // SDF for ring
  float sdRing(vec2 p, float r, float thickness) {
    return abs(length(p) - r) - thickness;
  }
  
  // SDF for horizontal line segment
  float sdLine(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }
  
  // Clean Pi symbol
  float sdPi(vec2 p, float s) {
    float d = 1e10;
    // Top bar
    d = min(d, sdLine(p, vec2(-0.35 * s, 0.35 * s), vec2(0.35 * s, 0.35 * s), 0.04 * s));
    // Left leg
    d = min(d, sdLine(p, vec2(-0.15 * s, 0.35 * s), vec2(-0.15 * s, -0.35 * s), 0.04 * s));
    // Right leg
    d = min(d, sdLine(p, vec2(0.15 * s, 0.35 * s), vec2(0.15 * s, -0.35 * s), 0.04 * s));
    return d;
  }
  
  // Infinity symbol
  float sdInfinity(vec2 p, float s) {
    p.x = abs(p.x);
    float d1 = sdRing(p - vec2(0.2 * s, 0.0), 0.15 * s, 0.03 * s);
    return d1;
  }
  
  // Plus symbol
  float sdPlus(vec2 p, float s) {
    float d = sdLine(p, vec2(-0.2 * s, 0.0), vec2(0.2 * s, 0.0), 0.03 * s);
    d = min(d, sdLine(p, vec2(0.0, -0.2 * s), vec2(0.0, 0.2 * s), 0.03 * s));
    return d;
  }
  
  // Mathematical symbol field with cleaner shapes
  float mathField(vec2 uv, float time) {
    float result = 1.0;
    
    for (float i = 0.0; i < 8.0; i++) {
      // Slower, smoother movement
      float angle = i * 0.785398; // PI/4
      vec2 offset = vec2(
        sin(time * 0.05 + angle) * 0.3,
        cos(time * 0.04 + angle * 0.7) * 0.25
      );
      
      vec2 gridPos = vec2(
        mod(i, 4.0) * 0.25 + 0.125,
        floor(i / 4.0) * 0.5 + 0.25
      );
      
      vec2 pos = uv - gridPos - offset;
      
      float symbol;
      float idx = mod(i, 4.0);
      if (idx < 1.0) {
        symbol = sdPi(pos, 0.08);
      } else if (idx < 2.0) {
        symbol = sdCircle(pos, 0.04); // Clean dot
      } else if (idx < 3.0) {
        symbol = sdPlus(pos, 0.06);
      } else {
        symbol = sdRing(pos, 0.05, 0.015); // Ring/circle
      }
      
      result = min(result, symbol);
    }
    
    return result;
  }
  
  // Subtle flowing waves
  float flowingWaves(vec2 uv, float time) {
    float wave = 0.0;
    wave += sin(uv.x * 4.0 + time * 0.3) * 0.5;
    wave += sin(uv.y * 3.0 - time * 0.2) * 0.5;
    wave += sin((uv.x + uv.y) * 2.0 + time * 0.25) * 0.3;
    return wave * 0.1 + 0.5;
  }
  
  // Soft grid pattern
  float softGrid(vec2 uv, float time) {
    vec2 grid = sin(uv * 25.0 + time * 0.1);
    return smoothstep(0.95, 1.0, max(abs(grid.x), abs(grid.y))) * 0.08;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 center = uv - 0.5;
    float dist = length(center);
    
    // Base gradient with flowing animation
    float wave = flowingWaves(uv, uTime);
    float gradient = smoothstep(0.0, 1.0, dist * 1.2);
    
    // FBM noise for organic movement
    float n = fbm(uv * 2.5 + uTime * 0.03);
    
    // Mathematical symbols layer
    float symbols = mathField(uv, uTime);
    float symbolMask = smoothstep(0.01, 0.0, symbols);
    
    // Subtle grid
    float grid = softGrid(uv + n * 0.05, uTime);
    
    // Color mixing - mostly white with subtle rose tints
    vec3 baseColor = white;
    vec3 tintColor = mix(coral, roseRed, uv.y) * 0.15;
    
    vec3 gradientColor = mix(baseColor, baseColor - tintColor * gradient, wave);
    
    // Add subtle color variations based on noise
    gradientColor -= vec3(n * 0.03);
    
    // Apply mathematical symbols with very subtle color
    vec3 symbolColor = mix(coral, roseRed, uv.y) * 0.25;
    gradientColor = mix(gradientColor, symbolColor + white * 0.7, symbolMask * 0.3);
    
    // Add subtle grid lines
    gradientColor = mix(gradientColor, roseRed * 0.15 + white * 0.85, grid);
    
    // Soft vignette effect
    float vignette = 1.0 - smoothstep(0.4, 1.2, dist);
    gradientColor = mix(gradientColor * 0.95, gradientColor, vignette);
    
    // Keep colors bright and clean
    gradientColor = clamp(gradientColor, vec3(0.85), vec3(1.0));
    
    gl_FragColor = vec4(gradientColor, 1.0);
  }
`;

function MathShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <MathShaderMesh />
      </Canvas>
    </div>
  );
}
