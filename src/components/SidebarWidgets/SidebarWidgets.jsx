import { Heart, CalendarDays, MapPin, Search } from 'lucide-react';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import styles from './SidebarWidgets.module.css';

export default function SidebarWidgets({ town }) {
  const { events } = useData();
  
  // Filter events by selected town
  const townEvents = events.filter(e => e.location === town?.name);

  if (!town) return null;

  return (
    <aside className={styles.sidebar}>
      
      {/* Widget 1: Descubre tu zona */}
      <div className={`${styles.widget} ${styles.widgetGreen}`}>
        <div className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <div className={styles.widgetIconBg}>
              <Search size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className={styles.widgetTitleGreen}>Descubre tu zona</h3>
              <p className={styles.widgetSubtitle}>Monumentos, historia y lugares de interés.</p>
            </div>
          </div>
          <div className={styles.widgetImageContainer}>
            <img src="/images/widgets/castillo.png" alt="Castillo de la zona" className={styles.widgetImage} />
            <Link href={town ? `/pueblos/${town.id}` : "/pueblos"}>
              <button className={styles.exploreButton}>Explorar &rarr;</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Widget 2: Conoce tu pueblo */}
      <div className={`${styles.widget} ${styles.widgetYellow}`}>
        <div className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <Heart size={24} color="#D97706" />
            <div>
              <h3 className={styles.widgetTitleYellow}>Conoce tu pueblo</h3>
              <p className={styles.widgetSubtitle}>Historia, curiosidades, tradiciones y mucho más.</p>
            </div>
          </div>
          <div className={styles.widgetImageContainer}>
            <img src="/images/widgets/calle.png" alt="Calle de pueblo" className={styles.widgetImage} />
            <Link href={`/pueblos/${town.id}`}>
              <button className={styles.knowMoreButton}>Saber más &rarr;</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Widget 3: WhatsApp */}
      <div className={`${styles.widget} ${styles.widgetLightGreen}`}>
        <div className={styles.widgetHeader}>
          <div className={styles.whatsappIcon}>
            {/* SVG placeholder for WhatsApp */}
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
          <div>
            <h3 className={styles.widgetTitleGreen}>Canal de WhatsApp</h3>
            <p className={styles.widgetSubtitle}>Recibe cada semana todas las novedades y ofertas.</p>
          </div>
        </div>
        <button className={styles.whatsappButton}>
          Únete al canal
        </button>
      </div>

      {/* Widget 4: Eventos */}
      <div className={`${styles.widget} ${styles.widgetPurple}`}>
        <div className={styles.widgetHeaderEvents}>
          <div className={styles.eventsTitleContainer}>
            <CalendarDays size={20} color="#7E22CE" />
            <h3 className={styles.widgetTitlePurple}>Próximos eventos</h3>
          </div>
          <button className={styles.viewAllEvents}>Ver todos &rarr;</button>
        </div>

        <div className={styles.eventsList}>
          {townEvents.length === 0 ? (
            <p style={{fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>No hay próximos eventos programados.</p>
          ) : (
            townEvents.map((ev) => (
              <div key={ev.id} className={styles.eventItem}>
                <div className={styles.eventDate}>
                  <span className={styles.eventDay}>{ev.day}</span>
                  <span className={styles.eventMonth}>{ev.month}</span>
                </div>
                <div className={styles.eventInfo}>
                  <h4 className={styles.eventTitle}>{ev.title}</h4>
                  <div className={styles.eventLocation}>
                    <MapPin size={12} /> {ev.location}
                  </div>
                  <p className={styles.eventDesc}>{ev.description}</p>
                </div>
                <img src={ev.image} alt={ev.title} className={styles.eventImage} />
              </div>
            ))
          )}
        </div>
        <button className={styles.viewAllEventsButton}>
          Ver todos los eventos &rarr;
        </button>
      </div>
    </aside>
  );
}
