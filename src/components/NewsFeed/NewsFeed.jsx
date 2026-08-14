'use client';

import { Heart, MessageCircle, Share2, MoreHorizontal, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import styles from './NewsFeed.module.css';

export default function NewsFeed({ townFilter }) {
  const { news } = useData();
  const router = useRouter();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.headerIcon}>
              <path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
            </svg>
          </div>
          <h2 className={styles.title}>Novedades de tu pueblo</h2>
        </div>
        <button className={styles.viewAll}>
          Ver todas <ArrowRight size={16} />
        </button>
      </div>

      <div className={styles.feed}>
        {news
          .filter(item => !townFilter || item.location === townFilter)
          .map((item) => (
          <article 
            key={item.id} 
            className={styles.card}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (item.offerId) router.push(`/oferta/${item.offerId}`);
              else if (item.businessId) router.push(`/perfil/${item.businessId}`);
            }}
          >
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.title} className={styles.image} />
              {item.offerId && (
                <div style={{
                  position: 'absolute', top: '10px', right: '10px', 
                  background: 'var(--color-primary)', color: 'white', 
                  padding: '4px 12px', borderRadius: '20px', 
                  fontWeight: 'bold', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  ¡OFERTA!
                </div>
              )}
            </div>
            
            <div className={styles.content}>
              <div className={styles.businessHeader}>
                <div className={styles.avatar}>{item.businessAvatar}</div>
                <div className={styles.businessInfo}>
                  <h3 className={styles.businessName}>{item.businessName}</h3>
                  <span className={styles.timeAgo}>{item.timeAgo}</span>
                </div>
              </div>

              <h4 className={styles.newsTitle}>{item.title}</h4>
              {item.price && <span className={styles.price}>{item.price}</span>}
              <p className={styles.description}>{item.description}</p>

              <div className={styles.actions}>
                <button className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                  <Heart size={18} />
                  <span>{item.likes}</span>
                </button>
                <button className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                  <MessageCircle size={18} />
                  <span>{item.comments}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
