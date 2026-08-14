'use client';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Tag, Info, Calendar } from 'lucide-react';
import styles from './page.module.css';
import { mockOffers } from '@/data/mockOffers';

export default function OfertaPage() {
  const params = useParams();
  const router = useRouter();
  const { offers, businesses, claimOffer } = useData();
  const { user } = useAuth();
  
  const id = params.id;
  
  const offer = offers.find(o => o.id === id);
  if (!offer) return <div className={styles.loading}>Oferta no encontrada.</div>;

  const business = businesses.find(b => b.id === offer.businessId);
  const isClaimed = user && offer.claimedBy.includes(user.email);
  const isExhausted = offer.currentStock <= 0;
  
  // Date check, normalizando las horas para evitar fallos de zona horaria si se desea, 
  // pero comparando fecha actual con endDate:
  const isExpired = offer.endDate && new Date().setHours(0,0,0,0) > new Date(offer.endDate).setHours(0,0,0,0);

  const handleClaim = () => {
    if (!user) {
      alert("Inicia sesión en Mi Cuenta para canjear esta oferta");
      return;
    }
    claimOffer(offer.id, user.email);
    router.push('/cuenta'); // Ir a mis cupones
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        {business && business.image ? (
          <img src={business.image} alt={offer.title} className={styles.heroImage} />
        ) : (
          <div className={styles.placeholderImg}>
            <Tag size={64} />
          </div>
        )}
        <div className={styles.heroOverlay}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            <ArrowLeft size={24} color="white" />
          </button>
          <div className={styles.badge}>Oferta Especial</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{offer.title}</h1>
          <p className={styles.businessName}>Ofrecido por <strong>{offer.businessName}</strong></p>
        </div>

        <div className={styles.priceCard}>
          <div className={styles.prices}>
            <span className={styles.oldPrice}>{offer.originalPrice}</span>
            <span className={styles.newPrice}>{offer.offerPrice}</span>
          </div>
          <div className={styles.stockInfo}>
            <span className={styles.stockTag}>Quedan {offer.currentStock} de {offer.totalStock}</span>
          </div>
        </div>

        <div className={styles.card}>
          <h2><Info size={20} className={styles.iconHeading} /> Detalles de la oferta</h2>
          <p className={styles.description}>{offer.description}</p>
        </div>

        {offer.endDate && (
          <div className={styles.card}>
            <h2><Calendar size={20} className={styles.iconHeading} /> Validez</h2>
            <p className={styles.description}>Válido hasta el {new Date(offer.endDate).toLocaleDateString('es-ES')}</p>
          </div>
        )}

        <div className={styles.actionContainer}>
          <button 
            onClick={handleClaim} 
            disabled={isClaimed || isExhausted || isExpired}
            className={`${styles.claimBtn} ${isClaimed ? styles.btnClaimed : (isExhausted || isExpired) ? styles.btnExhausted : ''}`}
          >
            {isClaimed ? 'Ya tienes este cupón' : isExpired ? 'Oferta Expirada' : isExhausted ? 'Oferta Agotada' : 'Canjear y guardar cupón'}
          </button>
        </div>
      </div>
    </main>
  );
}
