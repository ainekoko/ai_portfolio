'use client';
import { Suspense, useState, useEffect } from 'react';
import Loading from '@/app/loading';

export default function SuspenseWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!mounted || !fadeOut) {
    return (
      <div
        className={`transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Loading />
      </div>
    );
  }

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
