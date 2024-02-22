const sass = require('sass');
const fs = require('fs');

const inputPath = 'ruta/del/archivo.scss';
const outputPath = 'ruta/del/resultado.css';

// Configuración de opciones
const options = {
  file: inputPath,
  outputStyle: 'expanded', // Opciones: 'compressed', 'expanded', etc.
};

// Compilar Sass
sass.render(options, (error, result) => {
  if (!error) {
    // Guardar el resultado en un archivo
    fs.writeFileSync(outputPath, result.css.toString());
    console.log('Compilación exitosa. Archivo guardado:', outputPath);
  } else {
    console.error('Error al compilar Sass:', error.message);
  }
});