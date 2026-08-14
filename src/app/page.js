'use client';

import Header from '@/components/Header/Header';
import TownCarousel from '@/components/TownCarousel/TownCarousel';
import NewsFeed from '@/components/NewsFeed/NewsFeed';
import SidebarWidgets from '@/components/SidebarWidgets/SidebarWidgets';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { Map } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const { activeTown } = useData();

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.content}>
        <TownCarousel />

        {!activeTown ? (
          <div className={styles.emptyState}>
            <h2>Selecciona un pueblo para empezar</h2>
            <p>Descubre noticias, eventos y los mejores rincones de cada localidad.</p>
            <Link href="/pueblos">
              <button className={styles.mapBtn}>
                <Map size={20} /> Ver Mapa de la Comarca
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Left Column - Novedades */}
            <div className={styles.feedColumn}>
              <h2 className={styles.sectionTitle}>Novedades en {activeTown.name}</h2>
              <NewsFeed townFilter={activeTown.name} />
            </div>

            {/* Right Column - Widgets */}
            <div className={styles.sidebarColumn}>
              <SidebarWidgets town={activeTown} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
