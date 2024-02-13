import {
  Billboard,
  Environment,
  Float,
  OrbitControls,
  useTexture,
} from '@react-three/drei';
import { useControls } from 'leva';
import { Banana } from './Banana';
import { Heart } from './Heart';
import { WesternBluebird } from './WesternBluebird';
import { Sphere } from './Sphere';
import { Sphere2 } from './Sphere2';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Color } from 'three';

export const Experience = () => {
  const item = 'sphere';
  // const { item } = useControls({
  //   item: {
  //     value: 'sphere',
  //     options: ['heart', 'banana', 'bird', 'sphere'],
  //   },
  // });
  const xLogo = useTexture('/textures/x-logo.png');
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y += clock.getDelta() * 5;
  });

  return (
    <>
      <OrbitControls enableZoom={false} />
      {/* <Float
        floatIntensity={2}
        speed={3}> */}
      {/* <Heart
        scale={0.25}
        visible={item === 'heart'}
      />
      <Banana
        scale={0.15}
        visible={item === 'banana'}
      />
      <WesternBluebird
        scale={1.34}
        rotation-y={-Math.PI / 4}
        visible={item === 'bird'}
      /> */}
      <group ref={group}>
        <Sphere
          // scale={0.5}
          visible={item === 'sphere'}
        />
        <Sphere2
          scale={0.5}
          visible={item === 'sphere'}
        />
      </group>

      <Billboard visible={item === 'bird'}>
        <mesh>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial
            map={xLogo}
            transparent
          />
        </mesh>
      </Billboard>
      {/* </Float> */}
      <ambientLight
        color={new Color(0xff0000)}
        intensity={10}
      />
      <pointLight intensity={10} />
      <EffectComposer>
        {/* <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        /> */}
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1}
          radius={10}
          height={300}
        />
        <Noise opacity={0.02} />
        {/* <Vignette
          eskil={false}
          offset={0.1}
          darkness={1.1}
        /> */}
      </EffectComposer>
      <Environment
        preset='night'
        background
        blur={0.4}
      />
    </>
  );
};
