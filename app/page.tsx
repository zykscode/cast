import ElectionMap from '@/components/election-map';
import { stateMapData } from '@/data/states';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ElectionMap map={stateMapData} />
    </main>
  );
}
