const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = __dirname;
const outputFolder = __dirname;

async function resizeImage(input, output, width, height) {
  try {
    const inputPath = path.join(inputFolder, input);
    const outputPath = path.join(outputFolder, output);

    if (!fs.existsSync(inputPath)) {
      console.error(`❌ File input tidak ditemukan: ${inputPath}`);
      return;
    }

    // Untuk output .ico, kita akan menggunakan .png terlebih dahulu
    const outputExt = path.extname(output);
    const tempOutput = outputExt === '.ico' 
      ? outputPath.replace('.ico', '.png')
      : outputPath;

    await sharp(inputPath)
      .resize(width, height)
      .toFile(tempOutput);

    if (outputExt === '.ico') {
      // Disini kita bisa menambahkan konversi ke ICO jika diperlukan
      // Untuk sementara kita biarkan sebagai PNG
      fs.renameSync(tempOutput, outputPath);
    }

    console.log(`✅ Berhasil membuat ${output}`);
  } catch (error) {
    console.error(`❌ Error saat membuat ${output}:`, error);
  }
}

async function generateIcons() {
  const icons = [
    {
      source: 'google.png',  // Gunakan file PNG sebagai sumber
      output: [
        { name: 'favicon.ico', width: 64, height: 64 },
        { name: 'favicon16.ico', width: 16, height: 16 },
        { name: 'favicon32.ico', width: 32, height: 32 }
      ],
      platform: 'web'
    },
    {
      source: 'ios.png',  // Gunakan file PNG sebagai sumber
      output: [
        { name: 'apple-touch-icon.png', width: 180, height: 180 }
      ],
      platform: 'ios'
    },
    {
      source: 'andro.png',  // Gunakan file PNG sebagai sumber
      output: [
        { name: 'android-chrome-192x192.png', width: 192, height: 192 }
      ],
      platform: 'android'
    }
  ];

  console.log('Files in directory:', fs.readdirSync(inputFolder));

  for (const icon of icons) {
    console.log(`Processing ${icon.source}...`);
    
    for (const output of icon.output) {
      await resizeImage(icon.source, output.name, output.width, output.height);
    }
  }

  console.log('✨ Selesai generate semua icon!');
}

generateIcons().catch(console.error);