import { Canvas } from '@react-three/fiber';
import { ThreeStars } from './components/ThreeStars';
import { forwardRef, useRef, useEffect } from 'react';

// Accept cameraZ prop for zoom control
export const StarsBackground = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { cameraZ?: number }>(
  ({ cameraZ = 1, ...props }, ref) => {
    const cameraRef = useRef<any>(null);

    // Update camera position when cameraZ changes
    useEffect(() => {
      if (cameraRef.current) {
        cameraRef.current.position.z = cameraZ;
      }
    }, [cameraZ]);

    return (
      <div
        ref={ref}
        {...props}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          maxHeight: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          ...(props.style || {}),
        }}
      >
        <Canvas
          camera={{ position: [0, 0, cameraZ] }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
        >
          <ThreeStars />
        </Canvas>
      </div>
    );
  },
);
