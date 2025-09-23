// src/types/scroll.ts
import * as THREE from 'three';

/**
 * WindowScrollHandlerコンポーネントのprops型定義
 */
export interface WindowScrollHandlerProps {
  setVisibleSections: (sections: Set<string>) => void;
  onScrollDataReady?: (scrollData: ScrollData) => void;
}

/**
 * ズーム効果を持つマテリアルの型定義
 * @param zoom - ズームレベル
 */
export interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

/**
 * ズーム効果を持つスプライトの型定義
 * @param material - ズーム効果を持つマテリアル
 */
export interface ZoomSprite extends THREE.Object3D {
  material: ZoomMaterial;
}

/**
 * useScroll()の戻り値の型定義
 * @react-three/dreiのuseScrollフックから返されるオブジェクト
 */
export interface ScrollData {
  /** スクロールコンテナのDOM要素 */
  el: HTMLDivElement | null;
  /** イプシロン値（精度） */
  eps: number;
  /** フィル用テクスチャ */
  fill: THREE.Texture;
  /** 固定値 */
  fixed: number;
  /** 水平スクロールかどうか */
  horizontal: boolean;
  /** ダンピング値（スクロールの滑らかさ） */
  damping: number;
  /** 現在のスクロールオフセット（0-1の範囲） */
  offset: number;
  /** スクロールの変化量 */
  delta: number;
  /** スクロール情報の詳細 */
  scroll: {
    /** 現在のスクロール位置 */
    current: number;
    /** ターゲットスクロール位置 */
    target: number;
    /** 前回のスクロール位置 */
    last: number;
  };
  /** 総ページ数 */
  pages: number;
  /** 指定した範囲でのスクロール進行度を計算する関数 */
  range: (from: number, distance: number, margin?: number) => number;
  /** ベジェカーブによる補間値を計算する関数 */
  curve: (begin: number, end: number, segments?: number) => number[];
  /** 指定した範囲で要素が表示されているかを判定する関数 */
  visible: (from: number, distance: number, margin?: number) => boolean;
}

/**
 * ScrollControllerコンポーネントのprops型定義
 */
export interface ScrollControllerProps {
  onScrollDataReady: (scrollData: ScrollData) => void;
}
