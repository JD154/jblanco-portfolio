import { useState, useTransition } from 'react';
import { useControls } from 'leva';
import { Canvas } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei';
import { useTheme } from '../ThemeProvider';
import { Text3D as DreiText3D } from '@react-three/drei';

function Text3D() {
  const { text, size, color } = useControls({
    text: { value: 'Im Jesus Blanco\nMy Focus is Architect clean and maintainable UI solutions.', label: 'Text' }, // Example with a newline
    size: { value: 1, min: 0.5, max: 3, label: 'Size' },
    color: { value: '#ffffff', label: 'Color' },
  });

  const lines = text.split('\n'); // Split text by newline character

  return (
    <Center top>
      {lines.map((line, index) => (
        <DreiText3D
          key={index}
          font={'/Inter_Regular.typeface.json'}
          size={size}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelSegments={5}
          position={[0, -index * size * 1.2, 0]} // Adjust position for each line
        >
          {line}
          <meshStandardMaterial color={color} />
        </DreiText3D>
      ))}
    </Center>
  );
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 10 }}>
        <group position={[0, 0, 0]}>
          <Text3D />
          <AccumulativeShadows
            temporal
            frames={200}
            color="purple"
            colorBlend={0.5}
            opacity={1}
            scale={10}
            alphaTest={0.85}
          >
            <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
          </AccumulativeShadows>
        </group>
        <Env />
        <OrbitControls enablePan enableZoom minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}

function Env() {
  const [preset, setPreset] = useState('sunset');
  const { theme } = useTheme();

  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value)),
    },
  });
  return <Environment preset={theme === 'light' ? 'sunset' : 'night'} background blur={blur} />;
}
