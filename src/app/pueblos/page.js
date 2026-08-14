'use client';

import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Map } from 'lucide-react';
import DynamicMap from '@/components/Map';
import styles from './page.module.css';

export default function PueblosGlobalPage() {
  const { towns } = useData();
  const router = useRouter();

  // Create markers for all towns that have coordinates
  const markers = towns
    .filter(t => t.coordinates)
    .map(t => ({
      id: t.id,
      name: t.name,
      type: 'town',
      coordinates: t.coordinates,
      description: `${t.businessesCount} comercios registrados.`
    }));

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}><Map size={20}/> Mapa de la Comarca</h1>
      </div>

      <div className={styles.mapWrapper}>
        <DynamicMap 
          center={[37.25, -4.95]} 
          zoom={11} 
          markers={markers} 
        />
      </div>
      
      <div className={styles.content}>
        <h2>Explora Sierra Sur</h2>
        <p>Selecciona un pueblo en el mapa o navega desde el inicio para descubrir comercios, monumentos y novedades de cada localidad.</p>
        
        <div className={styles.townList}>
          {towns.map(t => (
            <div key={t.id} className={styles.townCard} onClick={() => router.push(`/pueblos/${t.id}`)}>
              <img src={t.image} alt={t.name} />
              <div className={styles.townInfo}>
                <h3>{t.name}</h3>
                <span>{t.businessesCount} comercios</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
