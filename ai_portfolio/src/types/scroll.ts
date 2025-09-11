import * as THREE from 'three';

export interface WindowScrollHandlerProps {
  setVisibleSections: (sections: Set<string>) => void;
}

/**
 * @param zoom - ズームレベル
 */
export interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

/**
 * @param material - ズーム効果を持つマテリアル
 */
export interface ZoomSprite extends THREE.Object3D {
  material: ZoomMaterial;
}
