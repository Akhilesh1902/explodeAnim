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

export const Experience = () => {
  const item = 'sphere';
  // const { item } = useControls({
  //   item: {
  //     value: 'sphere',
  //     options: ['heart', 'banana', 'bird', 'sphere'],
  //   },
  // });
  const xLogo = useTexture('/textures/x-logo.png');

  return (
    <>
      <OrbitControls enableZoom={false} />
      {/* <Float
        floatIntensity={2}
        speed={3}> */}
      <Heart
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
      />
      <Sphere
        // scale={0.5}
        visible={item === 'sphere'}
      />
      <Sphere2
        scale={0.5}
        visible={item === 'sphere'}
      />

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
      <Environment
        preset='sunset'
        background
        blur={0.4}
      />
    </>
  );
};
