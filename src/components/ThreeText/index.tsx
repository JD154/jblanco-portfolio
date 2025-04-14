import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

interface ThreeTextProps {
  textToRender: string;
  className?: string;
  width?: number | '100%'; // Allow "100%" as a valid width
  height?: number;
}

export const ThreeText: FC<ThreeTextProps> = ({
  textToRender = 'Hello Three.js!',
  className,
  width = 1000, // Default width
  height = 672, // Default height
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(typeof width === 'number' ? width : window.innerWidth);

  useEffect(() => {
    // Update canvas width if "100%" is used
    const handleResize = () => {
      if (width === '100%') {
        setCanvasWidth(window.innerWidth);
      }
    };

    if (width === '100%') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial width
    }

    return () => {
      if (width === '100%') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [width]);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Remove background color

    // Camera
    const camera = new THREE.PerspectiveCamera(45, canvasWidth / height, 1, 10000);
    camera.position.set(0, -400, 600);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, height); // Use dynamic canvasWidth
    mountRef.current && (mountRef.current as HTMLElement).appendChild(renderer.domElement);

    renderer.setClearColor(0x000000, 0); // Set clear color to transparent black

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Font loading and text creation
    const loader = new FontLoader();
    loader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      (font) => {
        console.log('Font loaded:', font);

        const color = new THREE.Color(0x006699);
        const materials = {
          matDark: new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
          matLite: new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
          }),
        };

        const shapes = font.generateShapes(textToRender, 100);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const xMid = geometry.boundingBox ? -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x) : 0;
        geometry.translate(xMid, 0, 0);

        // Create main text
        const text = new THREE.Mesh(geometry, materials.matLite);
        text.position.z = -150;
        scene.add(text);

        // Create stroke effect
        const strokeText = createStrokeText(shapes, xMid, materials.matDark);
        scene.add(strokeText);
      },
      undefined,
      (error) => {
        console.error('Error loading font:', error);
      },
    );

    // Event handlers
    const onWindowResize = () => {
      if (width === '100%') {
        setCanvasWidth(window.innerWidth);
      }
      camera.aspect = canvasWidth / height; // Update aspect ratio
      camera.updateProjectionMatrix();
      renderer.setSize(canvasWidth, height); // Update renderer size
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize);
    controls.addEventListener('change', () => renderer.render(scene, camera));

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [canvasWidth, height]); // Add canvasWidth as a dependency

  // Helper function for stroke text creation
  const createStrokeText = (shapes: any[], xMid: number, material: THREE.MeshBasicMaterial) => {
    const strokeText = new THREE.Group();
    const holeShapes = shapes.flatMap((shape) => shape.holes || []);

    [...shapes, ...holeShapes].forEach((shape) => {
      const style = SVGLoader.getStrokeStyle(5, material.color.getStyle());
      const geometry = SVGLoader.pointsToStroke(shape.getPoints(), style);
      geometry.translate(xMid, 0, 0);
      strokeText.add(new THREE.Mesh(geometry, material));
    });

    return strokeText;
  };

  return (
    <div
      ref={mountRef}
      style={{ width: width === '100%' ? '100%' : `${canvasWidth}px`, height: `${height}px` }} // Apply CSS dimensions
    />
  );
};
