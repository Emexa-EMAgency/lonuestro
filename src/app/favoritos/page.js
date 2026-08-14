'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import FavoritesTabs from '@/components/FavoritesTabs/FavoritesTabs';
import { mockFavoriteNews, mockFavoriteBusinesses, mockFavoriteEvents } from '@/data/mockData';
import styles from './page.module.css';
import Link from 'next/link';
import { Heart, MapPin, Calendar, Users, ShoppingBag } from 'lucide-react';

export default function FavoritosPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('novedades');

  // Si no está logueado, animamos a registrarse
  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mis Favoritos</h1>
          <p className={styles.subtitle}>Guarda lo que más te gusta</p>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <Heart size={48} className={styles.emptyIcon} />
          </div>
          <h2 className={styles.emptyTitle}>Inicia sesión para guardar</h2>
          <p className={styles.emptyDesc}>Podrás guardar tus negocios, noticias y eventos favoritos para no perderte nada de tu pueblo.</p>
          <Link href="/cuenta" className={styles.loginButton}>
            Ir a Mi Cuenta
          </Link>
        </div>
      </main>
    );
  }

  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === 'novedades') {
      return (
        <div className={styles.gridList}>
          {mockFavoriteNews.map((news) => (
            <div key={news.id} className={styles.newsCard}>
              <div className={styles.newsImageWrapper}>
                <img src={news.image} alt={news.title} className={styles.newsImage} />
                <button className={styles.favoriteBtnActive}><Heart size={20} fill="currentColor" /></button>
              </div>
              <div className={styles.newsContent}>
                <div className={styles.newsHeader}>
                  <span className={styles.newsAvatar}>{news.businessAvatar}</span>
                  <span className={styles.newsBusiness}>{news.businessName}</span>
                </div>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsCategory}>{news.category}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'negocios') {
      return (
        <div className={styles.listContainer}>
          {mockFavoriteBusinesses.map((business) => (
            <div key={business.id} className={styles.businessCard}>
              <img src={business.image} alt={business.name} className={styles.businessImage} />
              <div className={styles.businessInfo}>
                <h3 className={styles.businessName}>{business.name}</h3>
                <div className={styles.businessMeta}>
                  <span className={styles.metaItem}><ShoppingBag size={14} /> {business.type}</span>
                  <span className={styles.metaItem}><MapPin size={14} /> {business.location}</span>
                </div>
                <p className={styles.followersText}><Users size={14} /> {business.followers} seguidores</p>
              </div>
              <button className={styles.favoriteBtnActiveRound}><Heart size={20} fill="currentColor" /></button>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'eventos') {
      return (
        <div className={styles.gridList}>
          {mockFavoriteEvents.map((evento) => (
            <div key={evento.id} className={styles.eventCard}>
              <div className={styles.eventImageWrapper}>
                <img src={evento.image} alt={evento.title} className={styles.eventImage} />
                <button className={styles.favoriteBtnActive}><Heart size={20} fill="currentColor" /></button>
              </div>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{evento.title}</h3>
                <div className={styles.eventMeta}>
                  <span className={styles.metaItem}><Calendar size={14} /> {evento.date}</span>
                  <span className={styles.metaItem}><MapPin size={14} /> {evento.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mis Favoritos</h1>
      </div>
      
      <FavoritesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </main>
  );
}
