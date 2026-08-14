const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  // Header
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Carmona_-_Panor%C3%A1mica.jpg/1280px-Carmona_-_Panor%C3%A1mica.jpg', dest: 'public/images/header-bg.jpg' },
  // Towns
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pedrera_-_Iglesia_de_San_Sebasti%C3%A1n.jpg/640px-Pedrera_-_Iglesia_de_San_Sebasti%C3%A1n.jpg', dest: 'public/images/towns/pedrera.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Casariche_%28Sevilla%29.jpg/640px-Casariche_%28Sevilla%29.jpg', dest: 'public/images/towns/casariche.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Osuna_%28Sevilla%29_-_121.jpg/640px-Osuna_%28Sevilla%29_-_121.jpg', dest: 'public/images/towns/osuna.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ayuntamiento_de_Mart%C3%ADn_de_la_Jara.jpg/640px-Ayuntamiento_de_Mart%C3%ADn_de_la_Jara.jpg', dest: 'public/images/towns/martin.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Campillos.jpg/640px-Campillos.jpg', dest: 'public/images/towns/campillos.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Estepa.jpg/640px-Estepa.jpg', dest: 'public/images/towns/estepa.jpg' },
  // Widgets
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Castillo_de_Olvera.jpg/640px-Castillo_de_Olvera.jpg', dest: 'public/images/widgets/castillo.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Calle_de_Sevilla_%28%C3%89cija%29.jpg/640px-Calle_de_Sevilla_%28%C3%89cija%29.jpg', dest: 'public/images/widgets/calle.jpg' },
  // Events
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Feria_de_Abril_de_Sevilla_%282011%29_06.jpg/640px-Feria_de_Abril_de_Sevilla_%282011%29_06.jpg', dest: 'public/images/events/feria.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Romer%C3%ADa_de_Valme_%28Dos_Hermanas%29_04.jpg/640px-Romer%C3%ADa_de_Valme_%28Dos_Hermanas%29_04.jpg', dest: 'public/images/events/romeria.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Concierto_en_la_plaza_mayor.jpg/640px-Concierto_en_la_plaza_mayor.jpg', dest: 'public/images/events/concierto.jpg' },
  // News
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Raw_chicken_breasts.jpg/640px-Raw_chicken_breasts.jpg', dest: 'public/images/news/pollo.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/640px-Hamburger_%28black_bg%29.jpg', dest: 'public/images/news/burger.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Hairdresser_at_work.jpg/640px-Hairdresser_at_work.jpg', dest: 'public/images/news/peluqueria.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Clothing_store_in_Madrid.jpg/640px-Clothing_store_in_Madrid.jpg', dest: 'public/images/news/moda.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Flower_shop_in_Madrid.jpg/640px-Flower_shop_in_Madrid.jpg', dest: 'public/images/news/flores.jpg' }
];

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'LoNuestroMockup/1.0 (contact@example.com) Node.js'
      }
    };

    https.get(url, options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        https.get(response.headers.location, options, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => reject(err));
        });
      } else {
        fs.unlink(dest, () => reject(new Error(`Failed to download ${url}: ${response.statusCode}`)));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function downloadAll() {
  console.log('Downloading images...');
  for (const img of images) {
    try {
      await downloadImage(img.url, img.dest);
      console.log(`Downloaded ${img.dest}`);
    } catch (err) {
      console.error(`Error downloading ${img.dest}:`, err.message);
    }
  }
  console.log('Done!');
}

downloadAll();
