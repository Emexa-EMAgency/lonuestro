import styles from './Header.module.css';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Header() {
  const { activeTown } = useData();

  return (
    <header className={styles.header}>
      {/* Background Image Overlay */}
      <div className={styles.background}></div>

      {/* Top Bar */}
      <div className={styles.topbar}>
        <div style={{width: '24px'}} /> {/* Spacer for alignment since menu is gone */}
        <button className={styles.iconButton}>
          <Search size={24} color="#1F2937" />
        </button>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>
            LO<HeartIcon />NUESTRO
          </h1>
          <p className={styles.subtitle}>Descubre lo que tienes cerca</p>
        </div>

        {/* Location Selector */}
        <div className={styles.locationSelector}>
          <MapPin size={18} className={styles.locationIcon} />
          <span className={styles.locationText}>{activeTown ? activeTown.name : 'Descubre tu zona'}</span>
          <ChevronDown size={18} className={styles.locationChevron} />
        </div>
      </div>
    </header>
  );
}

// Custom Heart Icon for the 'O' in Logo
function HeartIcon() {
  return (
    <svg 
      className={styles.logoHeart}
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}
