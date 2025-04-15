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
    camera.far = 100000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, height); // Use dynamic canvasWidth
    renderer.shadowMap.enabled = true; // Enable shadows

    if (mountRef.current && !mountRef.current.querySelector('canvas')) {
      mountRef.current.appendChild(renderer.domElement);
    }

    renderer.setClearColor(0x000000, 0); // Set clear color to transparent black

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Add a light source
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 200, 300);
    light.castShadow = true; // Enable shadow casting
    scene.add(light);

    // Configure shadow properties for the light
    light.shadow.mapSize.width = 1024; // Shadow map resolution
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 1000;

    // Add a plane to receive shadows
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate to lie flat
    plane.position.y = -50; // Position below the text
    plane.receiveShadow = true; // Enable shadow receiving
    scene.add(plane);

    // Font loading and text creation
    const loader = new FontLoader();
    loader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
      (font) => {
        const color = new THREE.Color(0xffffff);

        // Glass material
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color,
          transparent: true,
          opacity: 0.5, // Adjust for glass transparency
          roughness: 0.1, // Low roughness for smooth glass
          metalness: 0.9, // High metalness for reflective effect
          transmission: 0.9, // Enable light transmission for glass effect
          ior: 1.5, // Index of refraction for glass
          clearcoat: 1.0, // Add a clear coat for extra shine
          clearcoatRoughness: 0.1, // Slight roughness on the clear coat
        });

        const shapes = font.generateShapes(textToRender, 100);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const xMid = geometry.boundingBox ? -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x) : 0;
        geometry.translate(xMid, 0, 0);

        // Create main text with glass material
        const text = new THREE.Mesh(geometry, glassMaterial);
        text.position.z = -150;
        text.castShadow = true; // Enable shadow casting
        scene.add(text);

        // Create stroke effect (optional, keep as is or modify)
        const strokeText = createStrokeText(shapes, xMid, new THREE.MeshBasicMaterial({ color }));
        strokeText.castShadow = true; // Enable shadow casting for stroke
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
