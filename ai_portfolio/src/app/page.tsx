import ThreeCanvas from '@/components/ThreeCanvas';
export default function Home() {
  return (
    <main>
      {/* クライアントコンポーネントで3D体験 */}
      <section className='h-screen'>
        <ThreeCanvas />
      </section>
    </main>
  );
}
