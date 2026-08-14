'use client';

import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, MapPin, Plus, Image as ImageIcon, LandPlot, Phone, Info, Edit2, Trash2 } from 'lucide-react';
import styles from './page.module.css';
import { towns as initialTowns } from '@/data/mockData';

export default function PuebloAdminPage() {
  const params = useParams();
  const { towns, updateTown, deleteTown, businesses } = useData();
  const router = useRouter();

  const townId = params.id;
  const town = towns.find(t => t.id === townId);
  const townBusinesses = businesses.filter(b => b.location === town?.name);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: town?.name || '', 
    image: town?.image || '',
    shieldImage: town?.shieldImage || '',
    population: town?.population || '',
    area: town?.area || '',
    altitude: town?.altitude || '',
    history: town?.history || ''
  });

  const emptyPoi = { name: '', type: 'monument', address: '', phone: '', extra: '', coordinates: '', description: '', image: '', id: null };
  const [showPoiModal, setShowPoiModal] = useState(false);
  const [poiFormData, setPoiFormData] = useState(emptyPoi);

  if (!town) return <div className={styles.loading}>Cargando...</div>;

  const handleSave = () => {
    updateTown(town.id, formData);
    setIsEditing(false);
  };

  const handleDeleteTown = () => {
    if (confirm(`¿Estás completamente seguro de que deseas borrar el pueblo "${town.name}"? Esta acción no se puede deshacer.`)) {
      deleteTown(town.id);
      router.push('/admin/publicar');
    }
  };

  const handleSavePoi = () => {
    const isMonument = poiFormData.type === 'monument';
    const coords = poiFormData.coordinates && typeof poiFormData.coordinates === 'string' 
      ? poiFormData.coordinates.split(',').map(n => parseFloat(n.trim())) 
      : poiFormData.coordinates;
      
    const newPoi = {
      id: poiFormData.id || `poi_${Date.now()}`,
      name: poiFormData.name,
      type: poiFormData.type,
      address: poiFormData.address,
      phone: poiFormData.phone,
      extra: poiFormData.extra,
      coordinates: coords,
      description: poiFormData.description,
      image: poiFormData.image
    };

    let updatedMonuments = town.monuments || [];
    let updatedPois = town.pois || [];

    if (poiFormData.id) {
       updatedMonuments = updatedMonuments.filter(m => m.id !== poiFormData.id);
       updatedPois = updatedPois.filter(p => p.id !== poiFormData.id);
    }

    if (isMonument) {
      updateTown(town.id, { monuments: [...updatedMonuments, newPoi], pois: updatedPois });
    } else {
      updateTown(town.id, { pois: [...updatedPois, newPoi], monuments: updatedMonuments });
    }
    
    setShowPoiModal(false);
    setPoiFormData(emptyPoi);
  };

  const handleEditPoi = (poi) => {
    setPoiFormData({
      ...poi,
      coordinates: poi.coordinates ? poi.coordinates.join(', ') : ''
    });
    setShowPoiModal(true);
  };

  const handleDeletePoi = (poiId) => {
    if (confirm("¿Seguro que quieres borrar este lugar?")) {
      updateTown(town.id, {
        monuments: (town.monuments || []).filter(m => m.id !== poiId),
        pois: (town.pois || []).filter(p => p.id !== poiId)
      });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.appBar}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <span className={styles.appBarTitle}>Gestión de Pueblo</span>
      </div>

      <div className={styles.header}>
        {isEditing ? (
          <div className={styles.editForm}>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={styles.input} placeholder="Nombre del pueblo" />
            <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className={styles.input} placeholder="URL de la imagen de fondo" />
            <input value={formData.shieldImage} onChange={e => setFormData({...formData, shieldImage: e.target.value})} className={styles.input} placeholder="URL del escudo (ej. https://...)" />
            <div style={{display: 'flex', gap: '1rem'}}>
              <input value={formData.population} onChange={e => setFormData({...formData, population: e.target.value})} className={styles.input} placeholder="Población" />
              <input value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className={styles.input} placeholder="Superficie (ej. 60 km²)" />
              <input value={formData.altitude} onChange={e => setFormData({...formData, altitude: e.target.value})} className={styles.input} placeholder="Altitud (ej. 460 msnm)" />
            </div>
            <textarea value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} className={styles.input} placeholder="Historia (Sobre el pueblo)" rows={6} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={handleSave} className={styles.saveBtn} style={{ flex: 1 }}>Guardar Cambios</button>
              <button onClick={handleDeleteTown} className={styles.saveBtn} style={{ flex: 1, backgroundColor: '#e53e3e' }}>Borrar Pueblo</button>
            </div>
          </div>
        ) : (
          <div className={styles.townOverview}>
            <img src={town.image} alt={town.name} className={styles.heroImage} />
            <div className={styles.heroOverlay}>
              <h1 className={styles.heroTitle}>{town.name}</h1>
              <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Editar</button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Negocios Locales</h2>
          <Link href={`/admin/negocios/nuevo?townId=${town.id}`} className={styles.addButton}>
            <Plus size={18} /> Añadir Negocio
          </Link>
        </div>

        <div className={styles.businessList}>
          {townBusinesses.length === 0 ? (
            <p className={styles.emptyText}>No hay negocios registrados aún.</p>
          ) : (
            townBusinesses.map(business => (
              <Link href={`/admin/negocios/${business.id}`} key={business.id} className={styles.businessCard}>
                <div className={styles.bAvatar}>{business.name.charAt(0)}</div>
                <div className={styles.bInfo}>
                  <h3>{business.name}</h3>
                  <p>{business.type}</p>
                </div>
                <Store className={styles.bIcon} size={20} />
              </Link>
            ))
          )}
        </div>

        <div className={styles.sectionHeader} style={{marginTop: '2rem'}}>
          <h2>Conoce tu pueblo</h2>
          <button className={styles.addButtonSecondary} onClick={() => setShowPoiModal(true)}>
            <Plus size={18} /> Añadir Lugar
          </button>
        </div>
        
        <div className={styles.businessList} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {[...(town.monuments || []), ...(town.pois || [])].map((item, idx) => (
            <div key={item.id || idx} className={styles.businessCard} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
                <div className={styles.bAvatar} style={{ background: 'var(--color-primary)', color: 'white', width: '32px', height: '32px' }}>
                  <LandPlot size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditPoi(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><Edit2 size={16}/></button>
                  <button onClick={() => handleDeletePoi(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e53e3e' }}><Trash2 size={16}/></button>
                </div>
              </div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {item.type === 'monument' ? 'Monumento' : 'Institución'}
              </p>
              {item.address && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#666' }}><MapPin size={14}/> {item.address}</div>}
              {item.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#666', marginTop: '4px' }}><Phone size={14}/> {item.phone}</div>}
              {item.extra && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#666', marginTop: '4px' }}><Info size={14}/> {item.extra}</div>}
            </div>
          ))}
        </div>

      </div>

      {showPoiModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Añadir Lugar de Interés</h2>
            <div className={styles.editForm}>
              <select
                className={styles.input}
                value={poiFormData.type}
                onChange={e => setPoiFormData({...poiFormData, type: e.target.value})}
              >
                <option value="monument">Monumento</option>
                <option value="institution">Punto de Interés / Institución</option>
              </select>
              <input className={styles.input} placeholder="Nombre" value={poiFormData.name} onChange={e => setPoiFormData({...poiFormData, name: e.target.value})} />
              <input className={styles.input} placeholder="Dirección (Opcional)" value={poiFormData.address} onChange={e => setPoiFormData({...poiFormData, address: e.target.value})} />
              <input className={styles.input} placeholder="Teléfono (Opcional)" value={poiFormData.phone} onChange={e => setPoiFormData({...poiFormData, phone: e.target.value})} />
              <input className={styles.input} placeholder="Extras Ej: Fax/Web (Opcional)" value={poiFormData.extra} onChange={e => setPoiFormData({...poiFormData, extra: e.target.value})} />
              <input className={styles.input} placeholder="Coordenadas Ej: 37.222, -4.896 (Opcional)" value={poiFormData.coordinates} onChange={e => setPoiFormData({...poiFormData, coordinates: e.target.value})} />
              <input className={styles.input} placeholder="URL de la Imagen (Opcional)" value={poiFormData.image} onChange={e => setPoiFormData({...poiFormData, image: e.target.value})} />
              <textarea className={styles.input} placeholder="Descripción (Opcional)" value={poiFormData.description} onChange={e => setPoiFormData({...poiFormData, description: e.target.value})} rows={3} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className={styles.saveBtn} onClick={handleSavePoi}>{poiFormData.id ? 'Actualizar Lugar' : 'Guardar Lugar'}</button>
                <button className={styles.editBtn} style={{background: '#999', border:'none', color:'white', padding:'0.875rem', borderRadius:'var(--radius-md)'}} onClick={() => {setShowPoiModal(false); setPoiFormData(emptyPoi);}}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
