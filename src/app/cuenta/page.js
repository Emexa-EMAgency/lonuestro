'use client';

import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm/AuthForm';
import styles from './page.module.css';
import { LogOut, LayoutDashboard, Settings, Heart, Tag } from 'lucide-react';
import Link from 'next/link';

export default function CuentaPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mi Cuenta</h1>
          <p className={styles.subtitle}>Accede para descubrir y gestionar tu entorno.</p>
        </div>
        <AuthForm />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            {user.role === 'admin' ? (
               <span className={styles.badge}>Administrador</span>
            ) : (
               <span className={styles.statsBadge}>12 Elementos guardados</span>
            )}
          </div>
        </div>

        <div className={styles.menuList}>
          {user.role === 'admin' && (
            <Link href="/admin/publicar" className={styles.menuItemLink}>
              <button className={styles.menuItem}>
                <LayoutDashboard size={20} className={styles.menuIcon} />
                <span>Panel de Control</span>
              </button>
            </Link>
          )}
          
          <Link href="/favoritos" className={styles.menuItemLink}>
            <button className={styles.menuItem}>
              <Heart size={20} className={styles.menuIcon} />
              <span>Mis Favoritos</span>
            </button>
          </Link>

          <Link href="/cuenta/cupones" className={styles.menuItemLink}>
            <button className={styles.menuItem}>
              <Tag size={20} className={styles.menuIcon} />
              <span>Mis Cupones</span>
            </button>
          </Link>

          <button className={styles.menuItem}>
            <Settings size={20} className={styles.menuIcon} />
            <span>Configuración de cuenta</span>
          </button>
          <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={logout}>
            <LogOut size={20} className={styles.menuIcon} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </main>
  );
}
