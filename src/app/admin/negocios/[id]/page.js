'use client';

import { useData } from '@/context/DataContext';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Plus, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';
import styles from './page.module.css';

export default function NegocioAdminPage() {
  const params = useParams();
  const { businesses, updateBusiness, news, addNews, updateNews, deleteNews, addOffer } = useData();
  const router = useRouter();

  const businessId = params.id;
  const business = businesses.find(b => b.id === businessId);
  const businessNews = news.filter(n => n.businessId === businessId || n.businessName === business?.name);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: business?.name || '', 
    type: business?.type || '',
    image: business?.image || ''
  });

  const emptyNews = { title: '', description: '', price: '', image: '', category: business?.type || '' };
  const [isNewsFormOpen, setIsNewsFormOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [newsData, setNewsData] = useState(emptyNews);

  const emptyOffer = { title: '', description: '', originalPrice: '', offerPrice: '', totalStock: '', startDate: '', endDate: '' };
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [offerData, setOfferData] = useState(emptyOffer);

  if (!business) return <div className={styles.loading}>Cargando...</div>;

  const handleSaveBusiness = () => {
    updateBusiness(business.id, formData);
    setIsEditing(false);
  };

  const handleSaveOffer = () => {
    if (!offerData.title || !offerData.totalStock || !offerData.endDate) {
      alert("Título, Stock y Fecha de Fin son obligatorios.");
      return;
    }
    const newOfferId = 'o' + Date.now(); // Create explicit ID to link if we wanted
    addOffer({
      ...offerData,
      businessId: business.id,
      businessName: business.name,
    });
    
    // Auto-create a news notification
    addNews({
      title: `¡Nueva Oferta Limitada: ${offerData.title}!`,
      description: `Disponemos de ${offerData.totalStock} unidades de esta oferta exclusiva hasta el ${new Date(offerData.endDate).toLocaleDateString()}. Entra ahora y reclámala antes de que se agote.`,
      image: business.image || 'https://picsum.photos/seed/oferta/800/400',
      category: 'ofertas',
      businessId: business.id,
      businessName: business.name,
      location: business.location
    });

    setIsAddingOffer(false);
    setOfferData(emptyOffer);
  };

  const openNewsForm = (newsItem = null) => {
    if (newsItem) {
      setEditingNewsId(newsItem.id);
      setNewsData(newsItem);
    } else {
      setEditingNewsId(null);
      setNewsData(emptyNews);
    }
    setIsNewsFormOpen(true);
  };

  const handleSaveNews = () => {
    if (!newsData.title) return;

    if (editingNewsId) {
      updateNews(editingNewsId, newsData);
    } else {
      addNews({
        ...newsData,
        businessId: business.id,
        businessName: business.name,
        businessAvatar: business.name.charAt(0) + business.name.charAt(business.name.length - 1).toUpperCase()
      });
    }

    setIsNewsFormOpen(false);
    setNewsData(emptyNews);
    setEditingNewsId(null);
  };

  const handleDeleteNews = (id) => {
    if(confirm("¿Estás seguro de que quieres borrar esta novedad?")) {
      deleteNews(id);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.appBar}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <span className={styles.appBarTitle}>Gestión de Negocio</span>
      </div>

      <div className={styles.businessHeader}>
        {isEditing ? (
          <div className={styles.editForm}>
            <input 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className={styles.input}
              placeholder="Nombre del negocio"
            />
            <input 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
              className={styles.input}
              placeholder="Categoría (ej. Restauración)"
            />
            <input 
              value={formData.image} 
              onChange={e => setFormData({...formData, image: e.target.value})}
              className={styles.input}
              placeholder="URL Logo/Imagen"
            />
            <button onClick={handleSaveBusiness} className={styles.saveBtn}>Guardar Perfil</button>
          </div>
        ) : (
          <div className={styles.profileCard}>
            <img src={business.image || 'https://picsum.photos/seed/biz/100'} alt={business.name} className={styles.bAvatar} />
            <div className={styles.bInfo}>
              <h2>{business.name}</h2>
              <p>{business.type}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Editar</button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2>Ofertas y Cupones</h2>
          <button onClick={() => setIsAddingOffer(!isAddingOffer)} className={styles.addButtonSecondary}>
            <Plus size={18} /> Crear Oferta Limitada
          </button>
        </div>

        {isAddingOffer && (
          <div className={styles.newsForm}>
            <h3>Nueva Oferta Canjeable</h3>
            <input 
              value={offerData.title} 
              onChange={e => setOfferData({...offerData, title: e.target.value})}
              className={styles.input}
              placeholder="Título (ej. 10 Hamburguesas a 10€)"
            />
            <textarea 
              value={offerData.description} 
              onChange={e => setOfferData({...offerData, description: e.target.value})}
              className={styles.textarea}
              placeholder="Condiciones de la oferta..."
            />
            <div className={styles.row}>
              <input 
                value={offerData.originalPrice} 
                onChange={e => setOfferData({...offerData, originalPrice: e.target.value})}
                className={styles.input}
                placeholder="Precio Normal (ej. 15€)"
              />
              <input 
                value={offerData.offerPrice} 
                onChange={e => setOfferData({...offerData, offerPrice: e.target.value})}
                className={styles.input}
                placeholder="Precio Oferta (ej. 10€)"
              />
            </div>
            <div className={styles.row}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Fecha Inicio</label>
                <input 
                  type="date"
                  value={offerData.startDate} 
                  onChange={e => setOfferData({...offerData, startDate: e.target.value})}
                  className={styles.input}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Fecha Fin (Límite)</label>
                <input 
                  type="date"
                  value={offerData.endDate} 
                  onChange={e => setOfferData({...offerData, endDate: e.target.value})}
                  className={styles.input}
                />
              </div>
            </div>
            <input 
              type="number"
              value={offerData.totalStock} 
              onChange={e => setOfferData({...offerData, totalStock: parseInt(e.target.value) || 0})}
              className={styles.input}
              placeholder="Stock total disponible (ej. 5)"
            />
            <div className={styles.formActions}>
              <button onClick={() => setIsAddingOffer(false)} className={styles.cancelBtn}>Cancelar</button>
              <button onClick={handleSaveOffer} className={styles.saveBtn}>Publicar Oferta</button>
            </div>
          </div>
        )}

        <div className={styles.sectionHeader} style={{marginTop: '2rem'}}>
          <h2>Novedades Publicadas</h2>
          <button onClick={() => openNewsForm()} className={styles.addButton}>
            <Plus size={18} /> Publicar Noticia
          </button>
        </div>

        {isNewsFormOpen && (
          <div className={styles.newsForm}>
            <h3>{editingNewsId ? 'Editar Novedad' : 'Nueva Publicación'}</h3>
            <input 
              value={newsData.title} 
              onChange={e => setNewsData({...newsData, title: e.target.value})}
              className={styles.input}
              placeholder="Título de la novedad (ej. Oferta en Pan)"
            />
            <textarea 
              value={newsData.description} 
              onChange={e => setNewsData({...newsData, description: e.target.value})}
              className={styles.textarea}
              placeholder="Descripción detallada..."
            />
            <input 
              value={newsData.price} 
              onChange={e => setNewsData({...newsData, price: e.target.value})}
              className={styles.input}
              placeholder="Precio (opcional)"
            />
            <input 
              value={newsData.image} 
              onChange={e => setNewsData({...newsData, image: e.target.value})}
              className={styles.input}
              placeholder="URL de la imagen"
            />
            <div className={styles.formActions}>
              <button onClick={() => setIsNewsFormOpen(false)} className={styles.cancelBtn}>Cancelar</button>
              <button onClick={handleSaveNews} className={styles.saveBtn}>{editingNewsId ? 'Guardar Cambios' : 'Publicar Ahora'}</button>
            </div>
          </div>
        )}

        <div className={styles.newsList}>
          {businessNews.length === 0 ? (
            <p className={styles.emptyText}>Este negocio no ha publicado novedades aún.</p>
          ) : (
            businessNews.map(n => (
              <div key={n.id} className={styles.newsCard}>
                {n.image && <img src={n.image} alt={n.title} className={styles.newsImg} />}
                <div className={styles.nContent}>
                  <div className={styles.nHeaderRow}>
                    <h4>{n.title}</h4>
                    <div className={styles.nActions}>
                      <button onClick={() => openNewsForm(n)} className={styles.iconBtn}><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteNews(n.id)} className={`${styles.iconBtn} ${styles.danger}`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <p className={styles.nDesc}>{n.description}</p>
                  <span className={styles.nTime}>{n.timeAgo}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
