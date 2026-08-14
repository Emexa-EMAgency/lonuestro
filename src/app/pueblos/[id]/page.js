'use client';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, MapPin, Store, Tag, BookOpen, ChevronRight, LandPlot, Phone, Info } from 'lucide-react';
import DynamicMap from '@/components/Map';
import Link from 'next/link';
import styles from './page.module.css';
import { towns as initialTowns } from '@/data/mockData';

export default function PuebloPage() {
  const params = useParams();
  const router = useRouter();
  const { towns, businesses, offers, claimOffer } = useData();
  const { user } = useAuth();
  
  const townId = params.id;
  const town = towns.find(t => t.id === townId);
  
  const [activeTab, setActiveTab] = useState('historia');

  if (!town) return <div className={styles.loading}>Cargando pueblo...</div>;

  const townBusinesses = businesses.filter(b => b.location === town.name);
  const townOffers = offers.filter(o => {
    const business = businesses.find(b => b.id === o.businessId);
    return business?.location === town.name;
  });

  const handleClaim = (offerId) => {
    if (!user) {
      alert("Debes iniciar sesión para canjear ofertas.");
      router.push('/cuenta');
      return;
    }
    claimOffer(offerId, user.email);
    alert("¡Oferta canjeada con éxito! La tienes guardada en Mi Cuenta -> Mis Cupones.");
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <img src={town.image} alt={town.name} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={24} color="white" />
          </button>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{town.name}</h1>
            <p className={styles.heroSubtitle}>
              <MapPin size={14} /> Sierra Sur de Sevilla
            </p>
          </div>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsWrapper}>
          <button className={`${styles.tab} ${activeTab === 'historia' ? styles.activeTab : ''}`} onClick={() => setActiveTab('historia')}>
            <BookOpen size={16} /> Historia
          </button>
          <button className={`${styles.tab} ${activeTab === 'mapa' ? styles.activeTab : ''}`} onClick={() => setActiveTab('mapa')}>
            <MapPin size={16} /> Mapa
          </button>
          <button className={`${styles.tab} ${activeTab === 'negocios' ? styles.activeTab : ''}`} onClick={() => setActiveTab('negocios')}>
            <Store size={16} /> Negocios
          </button>
          <button className={`${styles.tab} ${activeTab === 'ofertas' ? styles.activeTab : ''}`} onClick={() => setActiveTab('ofertas')}>
            <LandPlot size={16} /> Lugares de interés
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.section} ${activeTab === 'historia' ? styles.activeSection : ''}`}>
          <div className={styles.historySection}>
            <h2>Sobre {town.name}</h2>
            <div className={styles.townStats}>
              {town.population && <div><strong>Población:</strong> {town.population}</div>}
              {town.area && <div><strong>Superficie:</strong> {town.area}</div>}
              {town.altitude && <div><strong>Altitud:</strong> {town.altitude}</div>}
            </div>
            <div className={styles.historyText}>
              {town.history ? town.history.split('\n\n').map((p, i) => <p key={i}>{p}</p>) : <p>Información no disponible.</p>}
            </div>
            {town.patrimony && (
              <>
                <h3>Patrimonio y Fiestas</h3>
                <div className={styles.historyText}>
                  {town.patrimony.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </>
            )}

          </div>
        </div>

        <div className={`${styles.section} ${activeTab === 'mapa' ? styles.activeSection : ''}`}>
          <div className={styles.mapSection}>
            <h2>Mapa Interactivo</h2>
            <p className={styles.mapDesc}>Descubre monumentos y lugares de interés de {town.name}.</p>
            {town.coordinates ? (
              <DynamicMap 
                key={activeTab}
                center={town.coordinates} 
                zoom={15} 
                markers={[...(town.monuments || []), ...(town.pois || [])]} 
              />
            ) : (
              <div className={styles.noMap}>Coordenadas no disponibles</div>
            )}
          </div>
        </div>

        <div className={`${styles.section} ${activeTab === 'negocios' ? styles.activeSection : ''}`}>
          <div className={styles.businessSection}>
            <h2>Negocios en {town.name}</h2>
            {townBusinesses.length === 0 ? (
              <p className={styles.emptyText}>Todavía no hay negocios registrados.</p>
            ) : (
              <div className={styles.businessList}>
                {townBusinesses.map(b => (
                  <div 
                    key={b.id} 
                    className={styles.businessCard}
                    onClick={() => router.push(`/perfil/${b.id}`)}
                  >
                    <div className={styles.bAvatar}>{b.name.charAt(0)}</div>
                    <div className={styles.bInfo}>
                      <h3>{b.name}</h3>
                      <p>{b.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.section} ${activeTab === 'ofertas' ? styles.activeSection : ''}`}>
          <div className={styles.businessSection}>
            <h2>Lugares de interés</h2>
            {(!town.monuments || town.monuments.length === 0) && (!town.pois || town.pois.length === 0) ? (
              <p className={styles.emptyText}>No hay lugares de interés registrados.</p>
            ) : (
              <div className={styles.poisList}>
                {[...(town.monuments || []), ...(town.pois || [])].map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    className={styles.poiCard}
                    onClick={() => item.id && router.push(`/perfil/${item.id}`)}
                    style={{ cursor: item.id ? 'pointer' : 'default', transition: 'transform 0.2s' }}
                    onMouseOver={(e) => { if(item.id) e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={(e) => { if(item.id) e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                      <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <LandPlot size={20} />
                      </div>
                      <div className={styles.poiName} style={{ margin: 0, lineHeight: 1.2 }}>{item.name}</div>
                    </div>

                    {item.type && (
                      <div className={styles.poiDetail} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                        {item.type === 'monument' ? 'Monumento' : 'Institución'}
                      </div>
                    )}
                    {item.address && (
                      <div className={styles.poiDetail}>
                        <MapPin size={16} className={styles.iconHeading} /> {item.address}
                      </div>
                    )}
                    {item.phone && (
                      <div className={styles.poiDetail}>
                        <Phone size={16} className={styles.iconHeading} /> {item.phone}
                      </div>
                    )}
                    {item.extra && (
                      <div className={styles.poiDetail}>
                        <Info size={16} className={styles.iconHeading} /> {item.extra}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
