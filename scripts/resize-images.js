'use strict';

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '..', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

async function resizeImages() {
    console.log('🔄 Iniciando redimensión de imágenes...\n');

    // Process consultorio vertical -> hero images
    const consultorioPath = path.join(imagesDir, 'consultorio vertical.jpg');
    const heroBasePath = path.join(imagesDir, 'hero');
    
    // Hero 1200x1600 (full size, but could be cropped to landscape)
    await sharp(consultorioPath)
        .resize(1200, 1600, { fit: 'inside' })
        .toFile(`${heroBasePath}-1200.jpg`);
    console.log('✅ Creado: hero-1200.jpg');

    // Hero 600x800 (medium)
    await sharp(consultorioPath)
        .resize(600, 800, { fit: 'inside' })
        .toFile(`${heroBasePath}-600.jpg`);
    console.log('✅ Creado: hero-600.jpg');

    // Process flor -> about images
    const florPath = path.join(imagesDir, 'flor.jpg');
    const aboutBasePath = path.join(imagesDir, 'about');

    // About 800x800 (square crop for professional photo)
    await sharp(florPath)
        .resize(800, 800, { fit: 'cover', position: 'center' })
        .toFile(`${aboutBasePath}-800.jpg`);
    console.log('✅ Creado: about-800.jpg');

    // About 400x400 (small)
    await sharp(florPath)
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .toFile(`${aboutBasePath}-400.jpg`);
    console.log('✅ Creado: about-400.jpg');

    // Also create WebP versions for better performance
    console.log('\n🔄 Creando versiones WebP...\n');

    // Hero WebP
    await sharp(consultorioPath)
        .resize(1200, 1600, { fit: 'inside' })
        .toFormat('webp')
        .toFile(`${heroBasePath}-1200.webp`);
    console.log('✅ Creado: hero-1200.webp');

    await sharp(consultorioPath)
        .resize(600, 800, { fit: 'inside' })
        .toFormat('webp')
        .toFile(`${heroBasePath}-600.webp`);
    console.log('✅ Creado: hero-600.webp');

    // About WebP
    await sharp(florPath)
        .resize(800, 800, { fit: 'cover', position: 'center' })
        .toFormat('webp')
        .toFile(`${aboutBasePath}-800.webp`);
    console.log('✅ Creado: about-800.webp');

    await sharp(florPath)
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .toFormat('webp')
        .toFile(`${aboutBasePath}-400.webp`);
    console.log('✅ Creado: about-400.webp');

    console.log('\n🎉 ¡Todas las imágenes procesadas correctamente!');
}

resizeImages().catch(err => {
    console.error('❌ Error al procesar imágenes:', err);
    process.exit(1);
});
