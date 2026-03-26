import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useGLTF,
} from "@react-three/drei";

type CarViewerProps = {
  modelName: "sedan" | "hatchback";
  viewMode: "exterior" | "interior";
};

function LoadingFallback() {
  return (
    <Html center>
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(0,0,0,0.65)",
          color: "white",
          fontWeight: 600,
          fontSize: "14px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        Loading 3D car...
      </div>
    </Html>
  );
}

function SedanPlaceholder({ viewMode }: { viewMode: "exterior" | "interior" }) {
  if (viewMode === "interior") {
    return (
      <group>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.25, 1.3]} />
          <meshStandardMaterial color="#27374d" metalness={0.35} roughness={0.5} />
        </mesh>

        <mesh position={[-0.65, 0.45, 0]} castShadow>
          <boxGeometry args={[0.45, 0.55, 1.0]} />
          <meshStandardMaterial color="#4a5a70" />
        </mesh>

        <mesh position={[0.05, 0.45, 0]} castShadow>
          <boxGeometry args={[0.45, 0.55, 1.0]} />
          <meshStandardMaterial color="#4a5a70" />
        </mesh>

        <mesh position={[0.6, 0.32, 0]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.6]} />
          <meshStandardMaterial color="#39485e" />
        </mesh>

        <mesh position={[1.0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.55, 0.4, 1.0]} />
          <meshStandardMaterial color="#5f6f86" />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.45, 1.45]} />
        <meshStandardMaterial color="#5f6f86" metalness={0.65} roughness={0.25} />
      </mesh>

      <mesh position={[-0.15, 0.7, 0]} castShadow>
        <boxGeometry args={[1.7, 0.5, 1.2]} />
        <meshStandardMaterial color="#73859b" metalness={0.6} roughness={0.22} />
      </mesh>

      <mesh position={[1.15, 0.5, 0]} castShadow>
        <boxGeometry args={[0.95, 0.32, 1.12]} />
        <meshStandardMaterial color="#687b91" metalness={0.6} roughness={0.25} />
      </mesh>

      <mesh position={[-1.35, 0.2, 0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.25, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      <mesh position={[-1.35, 0.2, -0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.25, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      <mesh position={[1.35, 0.2, 0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.25, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      <mesh position={[1.35, 0.2, -0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.25, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
    </group>
  );
}

function HatchbackReal({ viewMode }: { viewMode: "exterior" | "interior" }) {
  const { scene } = useGLTF("/models/2016_ford_focus_rs.glb");

  const config = useMemo(() => {
    if (viewMode === "interior") {
      return {
        scale: 1.1,
        position: [0, -0.85, 0] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number],
      };
    }

    return {
      scale: 1.15,
      position: [0, -0.85, 0] as [number, number, number],
      rotation: [0, Math.PI, 0] as [number, number, number],
    };
  }, [viewMode]);

  return (
    <primitive
      object={scene.clone()}
      scale={config.scale}
      position={config.position}
      rotation={config.rotation}
    />
  );
}

function ModelSwitch({ modelName, viewMode }: CarViewerProps) {
  if (modelName === "sedan") {
    return <SedanPlaceholder viewMode={viewMode} />;
  }

  return <HatchbackReal viewMode={viewMode} />;
}

export default function CarViewer({ modelName, viewMode }: CarViewerProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "24px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, rgba(0,153,255,0.18), transparent 32%), #08111a",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Canvas camera={{ position: [5, 2.5, 5], fov: 45 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={2} castShadow />

        <Suspense fallback={<LoadingFallback />}>
          <Environment preset="city" />

          <group position={[0, -0.2, 0]}>
            <ModelSwitch modelName={modelName} viewMode={viewMode} />
          </group>

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.5}
            scale={10}
            blur={2.5}
            far={4}
          />
        </Suspense>

        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/2016_ford_focus_rs.glb");