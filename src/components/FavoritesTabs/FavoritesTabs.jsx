'use client';

import { useState } from 'react';
import styles from './FavoritesTabs.module.css';

export default function FavoritesTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'novedades', label: 'Novedades' },
    { id: 'negocios', label: 'Negocios' },
    { id: 'eventos', label: 'Eventos' }
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsWrapper}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
