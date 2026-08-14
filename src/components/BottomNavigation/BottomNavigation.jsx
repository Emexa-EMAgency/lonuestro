'use client';

import Link from 'next/link';
import { Home, Map, PlusSquare, Heart, User } from 'lucide-react';
import styles from './BottomNavigation.module.css';
import { useAuth } from '@/context/AuthContext';

export default function BottomNavigation() {
  const { user } = useAuth();
  
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.item} ${styles.active}`}>
          <Home size={24} />
          <span>Inicio</span>
        </Link>
        <Link href="/pueblos" className={styles.item}>
          <Map size={24} />
          <span>Pueblos</span>
        </Link>
        
        {user?.role === 'admin' && (
          <div className={styles.fabContainer}>
            <Link href="/admin/publicar" className={styles.fab}>
              <PlusSquare size={32} color="white" />
            </Link>
            <span className={styles.fabLabel}>Publicar</span>
          </div>
        )}

        <Link href="/favoritos" className={styles.item}>
          <Heart size={24} />
          <span>Favoritos</span>
        </Link>
        <Link href="/cuenta" className={styles.item}>
          <User size={24} />
          <span>Mi cuenta</span>
        </Link>
      </div>
    </nav>
  );
}
