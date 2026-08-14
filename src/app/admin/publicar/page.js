'use client';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, MapPin, ChevronRight, LayoutDashboard } from 'lucide-react';
import styles from './page.module.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { towns, addTown } = useData();
  const router = useRouter();

  // Proteger ruta
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  const [showModal, setShowModal] = useState(false);
  const [newTownName, setNewTownName] = useState('');

  const handleCreateTown = () => {
    if (newTownName && newTownName.trim()) {
      const id = addTown({ 
        name: newTownName.trim(), 
        image: 'https://picsum.photos/seed/town/800/400',
        shieldImage: '',
        history: '',
        population: '',
        area: '',
        altitude: '',
        coordinates: [37.2, -4.8]
      });
      setShowModal(false);
      setNewTownName('');
      router.push(`/admin/pueblos/${id}`);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <LayoutDashboard size={28} color="white" />
        </div>
        <div>
          <h1 className={styles.title}>Panel de Control</h1>
          <p className={styles.subtitle}>Gestiona el contenido de Lo Nuestro</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Tus Pueblos</h2>
          <button className={styles.addButton} onClick={() => setShowModal(true)}>
            <Plus size={20} />
            <span>Añadir Pueblo</span>
          </button>
        </div>

        <div className={styles.townsList}>
          {towns.map(town => (
            <Link href={`/admin/pueblos/${town.id}`} key={town.id} className={styles.townCard}>
              <img src={town.image} alt={town.name} className={styles.townImage} />
              <div className={styles.townInfo}>
                <h3 className={styles.townName}>{town.name}</h3>
                <div className={styles.townMeta}>
                  <MapPin size={14} />
                  <span>{town.businessesCount} negocios registrados</span>
                </div>
              </div>
              <ChevronRight className={styles.chevron} />
            </Link>
          ))}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Añadir Nuevo Pueblo</h2>
            <p style={{marginBottom: '1rem', color: '#666'}}>Introduce el nombre del pueblo que quieres dar de alta en la plataforma.</p>
            <input 
              value={newTownName}
              onChange={e => setNewTownName(e.target.value)}
              className={styles.input}
              placeholder="Ej. La Roda de Andalucía"
              autoFocus
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={handleCreateTown} className={styles.saveBtn} style={{background: 'var(--color-primary)', color: 'white', border: 'none', padding: '0.875rem', borderRadius: 'var(--radius-md)', flex: 1, cursor: 'pointer', fontWeight: 'bold'}}>
                Crear Pueblo
              </button>
              <button onClick={() => {setShowModal(false); setNewTownName('');}} style={{background: '#9ca3af', color: 'white', border: 'none', padding: '0.875rem', borderRadius: 'var(--radius-md)', flex: 1, cursor: 'pointer', fontWeight: 'bold'}}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
