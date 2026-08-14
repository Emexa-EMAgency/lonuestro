'use client';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Tag, QrCode } from 'lucide-react';
import styles from './page.module.css';

export default function CuponesPage() {
  const router = useRouter();
  const { offers, redeemOffer } = useData();
  const { user } = useAuth();

  if (!user) {
    router.push('/cuenta');
    return null;
  }

  // Find all offers claimed by this user
  const userOffers = offers.filter(o => o.claimedBy.includes(user.email));

  const handleUseCoupon = (offerId) => {
    if (confirm('¿Estás seguro de que quieres canjear este cupón ahora? Solo debes hacerlo delante del comercio.')) {
      redeemOffer(offerId, user.email);
      alert('¡Cupón canjeado con éxito!');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <h1 className={styles.title}>Mis Cupones Guardados</h1>
      </div>

      <div className={styles.content}>
        {userOffers.length === 0 ? (
          <div className={styles.emptyState}>
            <Tag size={48} className={styles.emptyIcon} />
            <h2>No tienes cupones</h2>
            <p>Ve a la sección de tu pueblo para encontrar ofertas de negocios locales y canjearlas.</p>
          </div>
        ) : (
          <div className={styles.couponList}>
            {userOffers.map(offer => {
              const isRedeemed = offer.redeemedBy && offer.redeemedBy.includes(user.email);
              const isExpired = offer.endDate && new Date().setHours(0,0,0,0) > new Date(offer.endDate).setHours(0,0,0,0);
              const isDisabled = isRedeemed || isExpired;
              
              return (
                <div key={offer.id} className={`${styles.couponCard} ${isDisabled ? styles.couponDisabled : ''}`}>
                  <div className={styles.couponHeader}>
                    <h3>{offer.businessName}</h3>
                    <span className={`${styles.validBadge} ${isDisabled ? styles.invalidBadge : ''}`}>
                      {isRedeemed ? 'Canjeado' : isExpired ? 'Expirado' : 'Válido'}
                    </span>
                  </div>
                  
                  <h4 className={styles.couponTitle}>{offer.title}</h4>
                  <p className={styles.couponDesc}>{offer.description}</p>
                  
                  {offer.endDate && (
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>
                      Válido hasta: {new Date(offer.endDate).toLocaleDateString('es-ES')}
                    </p>
                  )}
                  
                  <div className={styles.priceRow}>
                    <span className={styles.oldPrice}>{offer.originalPrice}</span>
                    <span className={styles.newPrice}>{offer.offerPrice}</span>
                  </div>
  
                  <div className={styles.couponAction}>
                    <button 
                      onClick={() => handleUseCoupon(offer.id)} 
                      className={`${styles.useBtn} ${isDisabled ? styles.useBtnDisabled : ''}`}
                      disabled={isDisabled}
                    >
                      <QrCode size={18} /> {isRedeemed ? 'Ya utilizado' : 'Mostrar en tienda y gastar'}
                    </button>
                    {!isDisabled && (
                      <p className={styles.warningText}>Pulsa el botón solo cuando estés delante del comercio.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
