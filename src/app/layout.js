import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';

export const metadata = {
  title: 'Lo Nuestro | Descubre lo que tienes cerca',
  description: 'Descubre los pueblos, negocios y novedades de la Sierra Sur de Sevilla.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <DataProvider>
            {children}
            <BottomNavigation />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
