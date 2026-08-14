'use client';

import { createContext, useContext, useState } from 'react';
import { 
  towns as initialTowns, 
  news as initialNews, 
  mockFavoriteBusinesses as initialBusinesses,
  mockFavoriteEvents as initialEvents
} from '@/data/mockData';
import { mockOffers as initialOffers } from '@/data/mockOffers';

const DataContext = createContext();

export function DataProvider({ children }) {
  // Calculamos el recuento real basado en los negocios iniciales
  const [towns, setTowns] = useState(
    initialTowns.map(town => ({
      ...town,
      businessesCount: initialBusinesses.filter(b => b.location === town.name).length
    }))
  );
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [news, setNews] = useState(initialNews);
  const [events, setEvents] = useState(initialEvents);
  const [offers, setOffers] = useState(initialOffers);
  const [activeTown, setActiveTown] = useState(null); // Nuevo estado global
  
  // Tiempos simulados de carga
  const [isLoading, setIsLoading] = useState(false);

  // --- TOWNS CRUD ---
  const updateTown = (id, updatedData) => {
    setTowns(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };
  
  const addTown = (newTown) => {
    const id = newTown.name.toLowerCase().replace(/\s+/g, '-');
    const town = { ...newTown, id, businessesCount: 0, monuments: [], pois: [] };
    setTowns(prev => [...prev, town]);
    return id;
  };
  
  const deleteTown = (id) => {
    setTowns(prev => prev.filter(t => t.id !== id));
  };

  // --- BUSINESSES CRUD ---
  const updateBusiness = (id, updatedData) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    
    // Si cambia el nombre o logo, deberíamos actualizar las noticias asociadas
    if (updatedData.name || updatedData.businessAvatar) {
      setNews(prev => prev.map(n => n.businessId === id ? { 
        ...n, 
        businessName: updatedData.name || n.businessName,
        businessAvatar: updatedData.businessAvatar || n.businessAvatar
      } : n));
    }
  };

  const addBusiness = (newBusiness) => {
    const business = { ...newBusiness, id: Date.now().toString(), followers: 0 };
    setBusinesses(prev => [...prev, business]);
    // Incrementar contador de negocios en el pueblo
    if (business.townId) {
      setTowns(prev => prev.map(t => t.id === business.townId ? { ...t, businessesCount: t.businessesCount + 1 } : t));
    }
  };

  // --- NEWS CRUD ---
  const updateNews = (id, updatedData) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updatedData } : n));
  };

  const addNews = (newsItem) => {
    const newItem = {
      ...newsItem,
      id: Date.now().toString(),
      timeAgo: 'Hace un instante',
      likes: 0,
      comments: 0
    };
    setNews(prev => [newItem, ...prev]);
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // --- OFFERS CRUD ---
  const addOffer = (newOffer) => {
    const offer = {
      ...newOffer,
      id: 'o' + Date.now(),
      claimedBy: [],
      redeemedBy: [],
      currentStock: newOffer.totalStock
    };
    setOffers(prev => [offer, ...prev]);
  };

  const claimOffer = (offerId, userId) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId && o.currentStock > 0 && !o.claimedBy.includes(userId)) {
        return {
          ...o,
          currentStock: o.currentStock - 1,
          claimedBy: [...o.claimedBy, userId]
        };
      }
      return o;
    }));
  };

  const redeemOffer = (offerId, userId) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId && o.claimedBy.includes(userId) && (!o.redeemedBy || !o.redeemedBy.includes(userId))) {
        return {
          ...o,
          redeemedBy: [...(o.redeemedBy || []), userId]
        };
      }
      return o;
    }));
  };

  return (
    <DataContext.Provider value={{
      activeTown, setActiveTown,
      towns, setTowns, updateTown, addTown, deleteTown,
      businesses, setBusinesses, updateBusiness, addBusiness,
      news, setNews, updateNews, addNews, deleteNews,
      events, setEvents,
      offers, setOffers, addOffer, claimOffer, redeemOffer,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
