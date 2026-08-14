'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { useData } from '@/context/DataContext';
import styles from './TownCarousel.module.css';

export default function TownCarousel() {
  const { towns, activeTown, setActiveTown } = useData();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Elige tu pueblo</h2>
        <button className={styles.viewAllBtn}>Ver todos <ChevronRight size={16} /></button>
      </div>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel}>
          {towns.map((town) => (
            <div 
              key={town.id} 
              className={`${styles.card} ${activeTown?.id === town.id ? styles.selected : ''}`}
              onClick={() => setActiveTown(town)}
            >
              <div className={styles.imageContainer}>
                <img src={town.image} alt={town.name} className={styles.image} />
                {activeTown?.id === town.id && (
                  <div className={styles.checkIcon}>
                    <CheckCircle2 size={24} fill="var(--color-primary)" color="white" />
                  </div>
                )}
                {/* Overlay gradient for text readability if needed, but per design it's white card below */}
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.townName}>{town.name}</h3>
                <div className={styles.businessCount}>
                  <MapPin size={12} className={styles.smallIcon} />
                  <span>{town.businessesCount} comercios</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
