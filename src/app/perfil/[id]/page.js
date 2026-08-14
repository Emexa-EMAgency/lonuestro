'use client';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Phone, Globe, MapPin, Building, LandPlot, ExternalLink, Tag } from 'lucide-react';
import styles from './page.module.css';
import { mockFavoriteBusinesses } from '@/data/mockData';

export default function GenericProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { towns, businesses, offers, claimOffer } = useData();
  const { user } = useAuth();
  
  const id = params.id;

  const handleClaim = (offerId) => {
    if (!user) {
      alert("Inicia sesión para canjear esta oferta");
      return;
    }
    claimOffer(offerId, user.email);
  };
  
  // Find if it's a business or a monument or a poi
  let item = businesses.find(b => b.id === id);
  if (item) {
    item = { ...item, entityType: 'business' };
  } else {
    // Search in all towns' monuments and pois
    for (const t of towns) {
      const monument = (t.monuments || []).find(m => m.id === id);
      if (monument) {
        item = { ...monument, entityType: 'monument', location: t.name };
        break;
      }
      const poi = (t.pois || []).find(p => p.id === id);
      if (poi) {
        item = { ...poi, entityType: 'institution', location: t.name };
        break;
      }
    }
  }

  if (!item) return <div className={styles.loading}>No se encontró el perfil.</div>;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={styles.heroImage} />
        ) : (
          <div className={styles.placeholderImg}>
            {item.entityType === 'monument' ? <LandPlot size={64} /> : <Building size={64} />}
          </div>
        )}
        <div className={styles.heroOverlay}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={24} color="white" />
          </button>
          <div className={styles.badge}>
            {item.entityType === 'monument' ? 'Lugar de Interés' : 'Negocio Local'}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.type}><MapPin size={16}/> {item.type} en {item.location}</p>
        </div>

        <div className={styles.card}>
          <h2>Información</h2>
          <div className={styles.description}>
            {item.description ? item.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>) : <p>No hay descripción disponible para este lugar.</p>}
          </div>
        </div>

        <div className={styles.grid}>
          {item.address && (
            <div className={styles.infoCard}>
              <MapPin size={24} className={styles.icon} />
              <div>
                <h3>Dirección</h3>
                <p>{item.address}</p>
              </div>
            </div>
          )}

          {item.hours && (
            <div className={styles.infoCard}>
              <Clock size={24} className={styles.icon} />
              <div>
                <h3>Horario</h3>
                <p>{item.hours}</p>
              </div>
            </div>
          )}

          {item.phone && (
            <div className={styles.infoCard}>
              <Phone size={24} className={styles.icon} />
              <div>
                <h3>Teléfono</h3>
                <p>{item.phone}</p>
              </div>
            </div>
          )}

          {item.website && (
            <div className={styles.infoCard}>
              <Globe size={24} className={styles.icon} />
              <div>
                <h3>Sitio Web / Redes</h3>
                <p className={styles.link}>
                  {item.website} <ExternalLink size={12} />
                </p>
              </div>
            </div>
          )}
        </div>

        {item.entityType === 'business' && offers && offers.filter(o => o.businessId === id).length > 0 && (
          <div className={styles.offersSection}>
            <h2><Tag size={20} style={{verticalAlign: 'middle', marginRight: '8px'}} /> Ofertas Disponibles</h2>
            <div className={styles.offersList}>
              {offers.filter(o => o.businessId === id).map(o => {
                const isClaimed = user && o.claimedBy.includes(user.email);
                const isExhausted = o.currentStock <= 0;
                
                return (
                  <div key={o.id} className={styles.offerCard}>
                    <div className={styles.offerHeader}>
                      <span className={styles.offerStock}>Quedan {o.currentStock}</span>
                    </div>
                    <h3>{o.title}</h3>
                    <p>{o.description}</p>
                    <div className={styles.priceRow}>
                      <span className={styles.oldPrice}>{o.originalPrice}</span>
                      <span className={styles.newPrice}>{o.offerPrice}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleClaim(o.id)} 
                      disabled={isClaimed || isExhausted}
                      className={`${styles.claimBtn} ${isClaimed ? styles.btnClaimed : isExhausted ? styles.btnExhausted : ''}`}
                    >
                      {isClaimed ? 'Ya lo tienes' : isExhausted ? 'Agotado' : 'Canjear Ahora'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
