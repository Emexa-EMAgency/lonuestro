'use client';

import { useState } from 'react';
import { Mail, Lock, User, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = login(email, password);
      if (!res.success) {
        setError(res.error);
      }
    } else {
      // Mock register (just logs them in for now)
      if (!name || !email || !password) {
        setError('Por favor, rellena todos los campos');
        return;
      }
      login(email, password);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
          onClick={() => { setIsLogin(true); setError(''); }}
        >
          Iniciar sesión
        </button>
        <button 
          className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
          onClick={() => { setIsLogin(false); setError(''); }}
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre completo</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className={styles.inputGroup}>
          <label className={styles.label}>Correo electrónico</label>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} size={20} />
            <input 
              type="email" 
              className={styles.input} 
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputWrapper}>
            <Lock className={styles.inputIcon} size={20} />
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLogin && <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          {isLogin ? (
            <>Entrar <LogIn size={18} /></>
          ) : (
            <>Registrarme <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
}
