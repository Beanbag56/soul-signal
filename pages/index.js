import dynamic from 'next/dynamic';

const SoulSignal = dynamic(() => import('../components/SoulSignal'), { ssr: false });

export default function Home() {
  return <SoulSignal />;
}
