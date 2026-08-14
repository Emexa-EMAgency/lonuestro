'use client';

import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Building, LandPlot } from 'lucide-react';
import styles from './page.module.css';

export default function DescubrePage() {
  const { activeTown, businesses, towns } = useData();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  if (!activeTown) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={24} />
          </button>
          <h1 className={styles.title}>Descubre tu zona</h1>
        </div>
        <div className={styles.content}>
          <p className={styles.emptyText}>Selecciona un pueblo en el inicio para ver su directorio.</p>
        </div>
      </main>
    );
  }

  // Combine businesses and monuments
  const townBusinesses = businesses
    .filter(b => b.location === activeTown.name)
    .map(b => ({ ...b, entityType: 'business' }));

  const townMonuments = (activeTown.monuments || [])
    .map(m => ({ ...m, entityType: 'monument' }));

  const combinedDirectory = [...townMonuments, ...townBusinesses];

  const filteredDirectory = combinedDirectory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Descubre {activeTown.name}</h1>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {filteredDirectory.length === 0 ? (
            <p className={styles.emptyText}>No se encontraron resultados.</p>
          ) : (
            filteredDirectory.map(item => (
              <div 
                key={item.id} 
                className={styles.card}
                onClick={() => router.push(`/perfil/${item.id}`)}
              >
                <div className={styles.cardImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className={styles.placeholderImg}>
                      {item.entityType === 'monument' ? <LandPlot size={32} /> : <Building size={32} />}
                    </div>
                  )}
                  <span className={styles.badge}>
                    {item.entityType === 'monument' ? 'Monumento' : 'Negocio'}
                  </span>
                </div>
                <div className={styles.cardInfo}>
                  <h3>{item.name}</h3>
                  <p className={styles.cardType}>{item.type}</p>
                  <p className={styles.cardLocation}><MapPin size={12}/> {activeTown.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
