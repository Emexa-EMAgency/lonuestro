export const towns = [
  {
    id: 'pedrera',
    name: 'Pedrera',
    image: '/images/towns/pedrera.png',
    shieldImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Blas%C3%B3n_de_Pedrera.svg',
    businessesCount: 28,
    coordinates: [37.223, -4.896],
    history: 'De origen muy antiguo, con hallazgos arqueológicos del período calcolítico. Fenicia la llamó BARBA, y bajo dominio romano pasó a ser ILIPULA MINOR, dedicada a la explotación agrícola. Se mantuvo activa en época visigoda, y tras la dominación árabe quedó reducida a alquería, uniéndose a Estepa tras la Reconquista.\n\nEl nombre "Pedrera" viene de su papel como suministradora de balas de piedra para los primeros cañones de artillería medievales, gracias a la calidad de sus canteras; también se relaciona con la extracción de piedra para el castillo de Estepa y la calzada Estepa-Sevilla.\n\nEn 1557 obtuvo el privilegio real para constituirse en ayuntamiento propio (villa). En 1837, al suprimirse los señoríos, dejó de pertenecer al Marquesado de Estepa, pasando a ser Ayuntamiento Constitucional.',
    patrimony: 'El municipio cuenta con importantes puntos patrimoniales como la Iglesia parroquial del Señor San Sebastián Mártir, la Ermita del Santísimo Cristo de la Sangre y la Ermita de la Virgen del Carmen, además de la famosa Fuente De La Higuera y El Búho.',
    population: '5.146 habitantes (2023)',
    area: '60,64 km²',
    altitude: '460 msnm',
    monuments: [
      { 
        id: 'm1', name: 'Iglesia Parroquial de San Sebastián', type: 'monument', coordinates: [37.223314, -4.895966],
        description: 'Erigida en el último tercio del siglo XVI, de mampuesto y sillares, nave única con contrafuertes y cabecera poligonal. Retablo mayor neoclásico, con la Virgen de la Oliva (patrona del municipio), obra de Sebastián Santos. Primer monumento del pueblo, con esculturas policromadas y orfebrería de los siglos XVI y XVIII.',
        phone: '954 81 91 22', hours: 'L-D: 10:00 - 13:00 y 18:00 - 20:00', website: '',
        address: 'Pza. de Guzmán y Andrés, 2, 41566',
        image: 'https://picsum.photos/seed/iglesia/400'
      },
      { 
        id: 'm2', name: 'Escudo de Pedrera', type: 'monument', coordinates: [37.222, -4.896],
        description: 'Campo de oro con catorce balas de cañón esféricas, un cupulín de cuatro columnas con bóveda de azur, acostado de dos dagas curvas, y corona real. Simboliza: la fabricación de balas de cañón, la extracción de piedra, la amenaza árabe, y la independencia municipal de 1557.',
        phone: '', hours: 'Visible 24h', website: '',
        image: 'https://picsum.photos/seed/escudo/400'
      }
    ],
    pois: [
      { id: 'p1', name: 'Ayuntamiento', type: 'institution', address: 'C/ Plaza del Pueblo, 1', phone: '95 481 91 71 / 95 481 90 19', extra: 'Fax: 95 481 93 13 / 95 481 97 53', coordinates: [37.222, -4.896] },
      { id: 'p2', name: 'Biblioteca Municipal (TV local)', type: 'institution', address: 'C/ Jazmín', phone: '95 582 74 48 / 95 481 96 40', coordinates: [37.2235, -4.894] },
      { id: 'p3', name: 'Centro Ocupacional (Arco Iris)', type: 'institution', address: 'C/ Las Huertas, s/n', phone: '95 481 97 75', coordinates: [37.224, -4.897] },
      { id: 'p4', name: 'Guardería Municipal (Doña Lola)', type: 'institution', address: 'C/ Tulipán, s/n', phone: '95 481 93 80 / 95 481 80 97', coordinates: [37.221, -4.898] },
      { id: 'p5', name: 'Oficina del PER y Asuntos Sociales', type: 'institution', address: 'C/ Plaza Guzmán y Andrés, 1', phone: '95 481 90 93', extra: 'Fax: 95 481 97 31', coordinates: [37.223, -4.895] },
      { id: 'p6', name: 'Pabellón Municipal', type: 'institution', address: 'C/ Carlos Cano, s/n', phone: '95 481 95 88 / 95 481 80 71', coordinates: [37.225, -4.892] },
      { id: 'p7', name: 'Policía Local', type: 'institution', address: 'C/ Pedro Palomas', phone: '656 87 72 26 (móvil)', coordinates: [37.2215, -4.8965] },
      { id: 'p8', name: 'Escuela de Adultos', type: 'institution', address: 'C/ Prolongación Santo Cristo, s/n ("Centro Formación El Pilar")', phone: '95 582 74 88', coordinates: [37.226, -4.894] },
      { id: 'p9', name: 'Centro Guadalinfo', type: 'institution', address: 'C/ Prolongación Santo Cristo, s/n', phone: '95 481 95 63 / 95 481 80 99', coordinates: [37.2262, -4.8942] },
      { id: 'p10', name: 'TV Local', type: 'institution', address: 'C/ 1º de Mayo, 108', phone: '95 481 92 23 / 95 481 91 71', coordinates: [37.220, -4.895] },
      { id: 'p11', name: 'Ribete', type: 'institution', address: 'C/ Rodríguez de la Fuente, s/n', phone: '95 481 80 22', coordinates: [37.2245, -4.899] },
      { id: 'p12', name: 'Centro Empresas', type: 'institution', address: 'C/ P.I. Madre Vieja, s/n', phone: '95 481 80 17', extra: 'Fax: 95 481 93 72', coordinates: [37.228, -4.891] },
      { id: 'p13', name: 'PIM', type: 'institution', address: 'C/ Donantes de Órganos, 3', phone: '95 481 94 13 / 95 481 80 84', coordinates: [37.2225, -4.893] }
    ]
  },
  {
    id: 'casariche',
    name: 'Casariche',
    image: '/images/towns/casariche.png',
    businessesCount: 24,
    coordinates: [37.293, -4.757],
    history: 'Casariche es un municipio de la provincia de Sevilla, famoso por sus mosaicos romanos y rico patrimonio arqueológico. Ubicado en el centro de Andalucía.',
    population: '5.337 habitantes (2023)',
    area: '52,90 km²',
    altitude: '276 msnm',
    monuments: []
  },
  {
    id: 'osuna',
    name: 'Osuna',
    image: '/images/towns/osuna.png',
    businessesCount: 36,
    coordinates: [37.237, -5.103],
    history: 'Villa ducal con una universidad renacentista, famosa por su belleza y monumentos inigualables. Declarada Conjunto Histórico-Artístico.',
    population: '17.442 habitantes (2023)',
    area: '592,49 km²',
    altitude: '328 msnm',
    monuments: []
  },
  {
    id: 'martin',
    name: 'Martín de la Jara',
    image: '/images/towns/martin.png',
    businessesCount: 18,
  },
  {
    id: 'campillos',
    name: 'Campillos',
    image: '/images/towns/campillos.png',
    businessesCount: 22,
  },
  {
    id: 'estepa',
    name: 'Estepa',
    image: '/images/towns/estepa.png',
    businessesCount: 31,
  }
];

export const news = [
  {
    id: '0',
    businessId: 'b2',
    offerId: 'o1',
    businessName: 'La Rubita',
    businessAvatar: 'LR',
    title: '5 hamburguesas por 10€',
    price: '10,00 €',
    description: '¡Ofertón de locos! Llévate 5 hamburguesas clásicas por solo 10€. Ideal para compartir con amigos.',
    timeAgo: 'Hace 10 minutos',
    likes: 45,
    comments: 12,
    image: '/images/news/burger.png',
    category: 'Restauración',
    location: 'Pedrera'
  },
  {
    id: '1',
    businessId: 'b1',
    businessName: 'Carnicería Pepe',
    businessAvatar: 'PEPE', 
    title: 'Pollo fresco',
    price: '4,50 €/kg',
    description: 'Pollo de corral de máxima calidad directo del campo a tu mesa.',
    timeAgo: 'Hace 2 horas',
    likes: 18,
    comments: 3,
    image: '/images/news/pollo.png',
    category: 'Alimentación',
    location: 'Pedrera'
  },
  {
    id: '2',
    businessId: 'b2',
    businessName: 'La Rubita',
    businessAvatar: 'LR',
    title: 'Nueva hamburguesa "La Serrana"',
    price: '',
    description: 'Carne de ternera, queso curado, rúcula, cebolla caramelizada y salsa especial.',
    timeAgo: 'Hace 4 horas',
    likes: 23,
    comments: 4,
    image: '/images/news/burger.png',
    category: 'Restauración',
    location: 'Pedrera'
  },
  {
    id: '3',
    businessName: 'Peluquería Ana',
    businessAvatar: 'PA',
    title: '20% de descuento en coloración',
    price: '',
    description: 'En todos nuestros servicios de coloración durante esta semana.',
    timeAgo: 'Hace 6 horas',
    likes: 15,
    comments: 2,
    image: '/images/news/peluqueria.png',
    category: 'Belleza',
    location: 'Osuna'
  },
  {
    id: '4',
    businessName: 'Moda Luna',
    businessAvatar: 'ML',
    title: 'Nueva colección Primavera - Verano',
    price: '',
    description: 'Descubre las últimas tendencias en nuestra tienda.',
    timeAgo: 'Ayer',
    likes: 12,
    comments: 1,
    image: '/images/news/moda.png',
    category: 'Moda',
    location: 'Osuna'
  },
  {
    id: '5',
    businessName: 'Floristería Rosa',
    businessAvatar: 'FR',
    title: 'Ramos especiales para comuniones',
    price: '',
    description: 'Diseños únicos hechos con mucho cariño.',
    timeAgo: 'Ayer',
    likes: 10,
    comments: 1,
    image: '/images/news/flores.png',
    category: 'Regalos',
    location: 'Casariche'
  },
  {
    id: '6',
    businessName: 'Ayuntamiento de Pedrera',
    businessAvatar: 'AY',
    title: 'Instalación del tartán en la pista de atletismo',
    price: '',
    description: 'Tras la preparación de la base, comenzó la colocación del pavimento sintético, mejorando seguridad y prestaciones para deportistas locales, parte del plan municipal de mejora de infraestructuras deportivas.',
    timeAgo: 'Hace 1 día',
    likes: 56,
    comments: 8,
    image: 'https://picsum.photos/seed/atletismo/400',
    category: 'Institucional',
    location: 'Pedrera'
  },
  {
    id: '7',
    businessName: 'Ayuntamiento de Pedrera',
    businessAvatar: 'AY',
    title: 'Renovación del gimnasio municipal',
    price: '',
    description: 'Llegada de nueva maquinaria deportiva en la fase final de la obra, financiada por el Plan Sevilla 107 (Diputación de Sevilla). Ampliación de ~100 m² del edificio y renovación integral del equipamiento.',
    timeAgo: 'Hace 2 días',
    likes: 89,
    comments: 15,
    image: 'https://picsum.photos/seed/gimnasio/400',
    category: 'Institucional',
    location: 'Pedrera'
  },
  {
    id: '8',
    businessName: 'Ayuntamiento de Pedrera',
    businessAvatar: 'AY',
    title: 'Nuevo camión de recogida de residuos',
    price: '',
    description: 'Adquirido vía el Acuerdo Marco de vehículos de residuos (Plan de Reactivación Económica y Social 2020-2021). Mejoras de eficiencia energética y capacidad de carga (16-17 m³, +3 m³ respecto al anterior).',
    timeAgo: 'Hace 3 días',
    likes: 120,
    comments: 24,
    image: 'https://picsum.photos/seed/camion/400',
    category: 'Institucional',
    location: 'Pedrera'
  }
];

export const mockFavoriteNews = [
  news[0], // Pollo
  news[3], // Moda
];

export const mockFavoriteBusinesses = [
  {
    id: 'b1',
    name: 'Carnicería Pepe',
    type: 'Alimentación',
    location: 'Pedrera',
    image: '/images/news/pollo.png',
    followers: 128,
    description: 'Carnicería tradicional con los mejores cortes de carne de la sierra. Especialistas en cerdo ibérico y ternera. Elaboración propia de embutidos.',
    phone: '622 334 455', hours: 'L-S: 09:00 - 14:00', website: 'carniceriapepe.com',
    coordinates: [37.224, -4.895]
  },
  {
    id: 'b2',
    name: 'La Rubita',
    type: 'Restauración',
    location: 'Pedrera',
    image: '/images/news/burger.png',
    followers: 342,
    description: 'En un rincón tranquilo de Andalucía, donde las tardes huelen a campo y las conversaciones se alargan en la puerta de casa, vivían dos hermanos: José Luís y Juan Ramón. Siempre habían tenido claro que querían hacer algo juntos, algo que tuviera sentido... algo que supiera a verdad.\n\nLa idea nació una noche cualquiera, recordando las comidas de su abuela Dolores. Nadie en el pueblo la llamaba así. Para todos era Rubita, una mujer sencilla pero inolvidable con su pelo rubio.\n\nAsí decidieron abrir una hamburguesería diferente. Nada de productos congelados ni cosas rápidas sin alma. En La Rubita, todo se haría como antes: carne seleccionada por ellos, pan recién hecho, salsas caseras... cada hamburguesa sería un pequeño homenaje a su abuela.\n\nEl nombre no admitía discusión: tenía que ser el suyo. Y el logo, aún más especial: el rostro de su abuela, con esa expresión que imponía respeto y cariño a la vez, y sobre su ceja, un tatuaje con las iniciales R.P.L., en honor a su marido, Ramón Pariente Luna. Un símbolo de amor que también formaría parte de su historia.\n\nAl principio, algunos dudaban. "¿Una hamburguesería en el pueblo?" decían. Pero bastó una semana para que todo cambiara. La gente empezó a venir, a repetir, a traer a otros. Porque lo que servían José Luís y Juan Ramón no era solo comida... era memoria.\n\nY así, entre risas, brasas y recetas hechas con corazón, La Rubita se convirtió en mucho más que un negocio. Se convirtió en un punto de encuentro. En una tradición nueva con raíces antiguas.\n\nLa Rubita, la hamburguesería de los pueblos.',
    address: 'C. Huelva, 14, 41566 Pedrera, Sevilla',
    phone: '655 443 322', hours: 'M-D: 12:00 - 16:00, 20:00 - 24:00', website: 'http://larubita.es/entrada',
    coordinates: [37.225, -4.897]
  },
  {
    id: 'b3',
    name: 'Bar Plaza Mayor',
    type: 'Restauración',
    location: 'Osuna',
    image: '/images/news/burger.png',
    followers: 512,
    description: 'Tapas tradicionales en el corazón de Osuna. Disfruta de nuestra famosa carrillada y croquetas caseras.',
    phone: '954 112 233', hours: 'L-D: 11:00 - 23:30', website: '',
    coordinates: [37.237, -5.103]
  },
  {
    id: 'b4',
    name: 'Boutique Elegance',
    type: 'Moda',
    location: 'Osuna',
    image: '/images/news/moda.png',
    followers: 245,
    description: 'Moda para mujer con las últimas tendencias de temporada. Asesoramiento personalizado.',
    phone: '600 123 456', hours: 'L-V: 10:00 - 14:00, 17:30 - 20:30', website: 'eleganceosuna.es',
    coordinates: [37.238, -5.104]
  },
  {
    id: 'b5',
    name: 'Panadería Artesanal',
    type: 'Alimentación',
    location: 'Casariche',
    image: '/images/news/pollo.png',
    followers: 180,
    description: 'Pan amasado a mano y cocido en horno de leña. Dulces típicos de la comarca.',
    phone: '955 889 900', hours: 'L-D: 07:00 - 15:00', website: '',
    coordinates: [37.294, -4.758]
  }
];

export const mockFavoriteEvents = [
  {
    id: 'e1',
    title: 'Feria de la Primavera',
    date: '10 Mayo 2026',
    location: 'Pedrera',
    image: '/images/events/feria.png',
    assistants: 450
  },
  {
    id: 'e2',
    title: 'Concierto en la Plaza',
    date: '28 Junio 2026',
    location: 'Osuna',
    image: '/images/events/concierto.png',
    assistants: 120
  }
];
