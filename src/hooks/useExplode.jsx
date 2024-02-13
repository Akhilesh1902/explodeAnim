import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

import * as THREE from 'three';

export const useExplode = (group, { distance = 3, enableRotation = true }) => {
  useEffect(() => {
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      mesh.originalPosition = mesh.position.clone();
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      mesh.directionVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();
      mesh.offsetMultiplier = Math.random();
      mesh.originalRotation = mesh.rotation.clone();
      mesh.targetRotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
    });
  }, []);

  useEffect(() => {
    group.current.children.forEach((mesh) => {
      mesh.targetPosition = mesh.originalPosition
        .clone()
        .add(mesh.directionVector.clone().multiplyScalar(distance));
    });
  }, [distance]);

  const scrollData = useScroll();

  useFrame(({ clock }) => {
    group.current.children.forEach((mesh) => {
      if (scrollData.offset < 0.0001) {
        if (mesh.name === 'origin') {
          mesh.visible = true;
        } else {
          // mesh.visible = false;
        }
      } else {
        if (mesh.name === 'origin') {
          mesh.visible = false;
        } else {
          mesh.visible = true;
        }
      }
      // console.log(scrollData.offset);
      // mesh.targetPosition.z = Math.sin(clock.getElapsedTime());
      mesh.position.x = THREE.MathUtils.lerp(
        mesh.originalPosition.x,
        mesh.targetPosition.x,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );

      mesh.position.y = THREE.MathUtils.lerp(
        mesh.originalPosition.y,
        mesh.targetPosition.y,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );
      // mesh.position.y =
      //   (Math.abs(Math.sin(clock.getElapsedTime() * mesh.offsetMultiplier)) +
      //     2) *
      //   (mesh.position.y / 4);
      mesh.position.z = THREE.MathUtils.lerp(
        mesh.originalPosition.z,
        mesh.targetPosition.z,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );
      if (scrollData.offset < 0.025) {
        // return;
        mesh.position.x =
          mesh.originalPosition.x +
          (Math.sin(clock.getElapsedTime() * mesh.offsetMultiplier) + 1) *
            (mesh.position.x / 10);
        mesh.position.y =
          mesh.originalPosition.y +
          Math.abs(
            Math.sin(clock.getElapsedTime() * mesh.offsetMultiplier) + 1
          ) *
            (mesh.position.y / 10);
        mesh.position.z =
          mesh.originalPosition.z +
          Math.abs(
            Math.sin(clock.getElapsedTime() * mesh.offsetMultiplier) + 1
          ) *
            (mesh.position.z / 10);
      }
      // mesh.position.x = Math.sin(clock.getElapsedTime());s
      if (enableRotation) {
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.originalRotation.x,
          mesh.targetRotation.x,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );
        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.originalRotation.y,
          mesh.targetRotation.y,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );
        mesh.rotation.z = THREE.MathUtils.lerp(
          mesh.originalRotation.z,
          mesh.targetRotation.z,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );
      }
    });
  });
};
