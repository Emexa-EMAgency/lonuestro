import dynamic from 'next/dynamic';

// Importa dinámicamente el mapa desactivando el SSR (Server-Side Rendering)
// ya que Leaflet utiliza el objeto 'window' que no existe en el servidor.
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', borderRadius: '12px' }}>Cargando mapa...</div>
});

export default DynamicMap;
