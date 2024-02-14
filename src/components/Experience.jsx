import {
  Billboard,
  Circle,
  Environment,
  Float,
  OrbitControls,
  useScroll,
  useTexture,
} from '@react-three/drei';
import { useControls } from 'leva';

import { Sphere } from './Sphere';
import { Sphere2 } from './Sphere2';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
  GodRays,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Color, DoubleSide } from 'three';
import GorRay from './GorRay';
import { MathUtils } from 'three';

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
  const scrollData = useScroll();
  let val = 0.01;
  useFrame(({ clock }) => {
    // console.log(scrollData.offset, scrollData.__damp.velocity_offset);\
    if (Math.abs(scrollData.__damp?.velocity_offset) > 0.01) {
      val = MathUtils.lerp(val, 0.1, 0.1);
    } else if (Math.abs(scrollData.__damp?.velocity_offset) < 0.01) {
      val = MathUtils.lerp(val, 0.01, 0.1);
    }
    group.current.rotation.y += val;
  });

  // useEffect(() => {
  //   console.log('scroll');
  //   group.current.rotation.y += 0.02;
  // }, [offset]);

  const ref = useRef();
  const [s, st] = useState();
  useEffect(() => {
    setTimeout(() => {
      st('');
    }, 200);
  }, []);

  const { brightness, constrast } = useControls({
    brightness: {
      value: -0.2,
      min: -1,
      max: 1,
      step: 0.1,
    },
    constrast: {
      value: -0.5,
      min: -1,
      max: 1,
      step: 0.1,
    },
  });

  return (
    <>
      <OrbitControls enableZoom={false} />

      <Circle
        args={[1, 1, 1]}
        ref={ref}
        position={[0, 0, 0]}>
        <meshBasicMaterial
          color={new Color('#ffffff')}
          side={DoubleSide}
        />
      </Circle>
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
          scale={0.3}
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
      <ambientLight />

      <directionalLight
        color={new Color(0x575757)}
        position={[0, 1, -1]}
        intensity={10}
      />
      <directionalLight
        color={new Color(0x575757)}
        position={[-1, -1, -1]}
      />
      <pointLight
        intensity={1}
        color={new Color(0xffffff)}
      />
      <Environment
        preset='sunset'
        background='only'
        blur={0.4}
      />

      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={1}
          radius={10}
          height={300}
        />
        <BrightnessContrast
          brightness={brightness}
          contrast={constrast}
        />
        {ref.current && <GorRay sun={ref.current} />}
        <Noise opacity={0.02} />
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={1.1}
        />
      </EffectComposer>
    </>
  );
};
