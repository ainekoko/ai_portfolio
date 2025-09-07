// components/WindowScrollHandler.tsx - Context使用版
'use client';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const WindowScrollHandler = () => {
  const { setVisibleSections } = useScrollVisibility(); // Context から取得
  const scroll = useScroll(); //スクロール位置（0-1の範囲）を取得
  const lastOffsetRef = useRef<number>(-1); //前回のスクロール位置
  const lastVisibleSectionsRef = useRef<string>(''); //前回表示されていたセクションリストを文字列で記憶
  const frameCountRef = useRef<number>(0); //フレーム数をカウント。処理頻度を制限

  useFrame(() => {
    // 3フレームに1回だけ実行（約20fps）
    frameCountRef.current++;
    if (frameCountRef.current % 3 !== 0) return;

    const offset = scroll.offset; //スクロールの詳細位置

    // スクロール位置が0.5%未満の変化の場合はスキップ
    if (Math.abs(offset - lastOffsetRef.current) < 0.005) return;

    lastOffsetRef.current = offset;
    const newVisibleSections = new Set<string>();

    // 各セクションの表示開始位置
    const sectionThresholds = {
      hello: 0.21, //トップ
      profile: 0.675, //プロフィール
      projects: 0.95, //プロジェクト
    };

    Object.entries(sectionThresholds).forEach(([sectionId, threshold]) => {
      //スクロール位置に達したらnameをnewVisibleSectionsへ追加
      if (offset >= threshold) {
        newVisibleSections.add(sectionId);
      }
    });

    // [hello, profile, projects]⇒ "hello,profile,projects"のように変換して比較
    const currentSectionsString = Array.from(newVisibleSections)
      .sort()
      .join(',');

    // 前回と今回が同様の場合のみpropを送る
    if (currentSectionsString !== lastVisibleSectionsRef.current) {
      lastVisibleSectionsRef.current = currentSectionsString;
      setVisibleSections(newVisibleSections);
    }
  });

  return null;
};

export default WindowScrollHandler;
