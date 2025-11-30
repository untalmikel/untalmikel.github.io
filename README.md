# MediaHub - Biblioteca Multimedia

Una página web moderna y elegante para organizar series y películas con menús desplegables interactivos y reproductor integrado.

## 📁 Archivos del Proyecto

- **index.html** - Página principal con la biblioteca de medios
- **index.css** - Estilos principales del sitio
- **script.js** - JavaScript para la página principal
- **player.html** - Página del reproductor de video
- **player.css** - Estilos específicos del reproductor
- **player.js** - JavaScript del reproductor

## 🚀 Características

### Página Principal (index.html)
- ✅ Menús desplegables multinivel (Series → Temporadas → Episodios)
- ✅ Sistema de filtros (Todo / Series / Películas)
- ✅ Diseño premium con tema oscuro y efectos glassmorfismo
- ✅ Animaciones suaves en todas las interacciones
- ✅ Diseño responsive para móviles y tablets
- ✅ Navegación por teclado (ESC para cerrar menús)

### Página del Reproductor (player.html)
- ✅ Contenedor de video responsive (16:9)
- ✅ Información del episodio/película
- ✅ Navegación entre episodios (Anterior/Siguiente)
- ✅ Botón para volver a la biblioteca
- ✅ Atajos de teclado para el reproductor
- ✅ Auto-reproducción del siguiente episodio

## 📝 Cómo Usar

### 1. Abrir la Biblioteca
Abre `index.html` en tu navegador para ver la biblioteca de medios.

### 2. Navegar por el Contenido
- Haz clic en una tarjeta para expandirla
- Haz clic en una temporada para ver los episodios
- Usa los filtros en el header para mostrar solo Series o Películas

### 3. Reproducir Contenido
Al hacer clic en un episodio o película, serás redirigido a `player.html` con la información correspondiente.

## 🔧 Personalización

### Agregar Nuevas Series

En `index.html`, agrega una nueva tarjeta dentro de `<div class="media-grid">`:

```html
<div class="media-card" data-type="series">
    <div class="media-card-header">
        <div class="media-icon">📺</div>
        <div class="media-info">
            <h2 class="media-title">Nombre de la Serie</h2>
            <p class="media-meta">X Temporadas • Género</p>
        </div>
        <button class="toggle-btn" aria-label="Expandir">
            <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
    </div>
    <div class="media-content">
        <div class="season-list">
            <!-- Agregar temporadas aquí -->
        </div>
    </div>
</div>
```

### Agregar Temporadas

Dentro de `<div class="season-list">`:

```html
<div class="season-item">
    <button class="season-header">
        <span class="season-title">Temporada 1</span>
        <span class="season-count">X episodios</span>
        <svg class="season-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </button>
    <div class="episode-list">
        <!-- Agregar episodios aquí -->
    </div>
</div>
```

### Agregar Episodios

Dentro de `<div class="episode-list">`:

```html
<a href="TU_URL_DE_VIDEO" class="episode-link">
    <span class="episode-number">01</span>
    <span class="episode-title">Título del Episodio</span>
</a>
```

**Importante:** Reemplaza `TU_URL_DE_VIDEO` con la URL real de tu video. Esta URL se pasará al reproductor.

### Configurar el Reproductor de Video

En `player.html`, reemplaza el placeholder con tu reproductor:

**Opción 1: Usar un iframe (para servicios de streaming)**
```html
<iframe 
    id="videoPlayer"
    src="TU_URL_DE_VIDEO"
    frameborder="0"
    allowfullscreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
></iframe>
```

**Opción 2: Usar HTML5 video (para archivos MP4)**
```html
<video id="videoPlayer" controls>
    <source src="TU_VIDEO.mp4" type="video/mp4">
    Tu navegador no soporta el elemento de video.
</video>
```

## ⌨️ Atajos de Teclado

### Página Principal
- **ESC** - Cerrar todos los menús expandidos

### Reproductor (solo con HTML5 video)
- **Espacio** - Play/Pausa
- **←** - Retroceder 10 segundos
- **→** - Avanzar 10 segundos
- **F** - Pantalla completa
- **M** - Silenciar/Activar sonido

## 🎨 Personalizar Colores

Edita las variables CSS en `index.css` (líneas 2-60):

```css
:root {
    --color-accent-primary: hsl(280, 85%, 60%); /* Color principal */
    --color-accent-secondary: hsl(200, 90%, 55%); /* Color secundario */
    /* ... más variables ... */
}
```

## 📱 Responsive

El sitio está optimizado para:
- 🖥️ Desktop (1200px+)
- 💻 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🔗 Parámetros URL del Reproductor

El reproductor acepta los siguientes parámetros en la URL:

- `series` - Nombre de la serie/película
- `season` - Número de temporada
- `episode` - Número de episodio
- `title` - Título del episodio
- `url` - URL del video (opcional)

Ejemplo:
```
player.html?series=Breaking%20Bad&season=1&episode=1&title=Pilot&url=VIDEO_URL
```

## 💡 Consejos

1. **URLs de Video:** Asegúrate de que las URLs de tus videos sean accesibles y no estén bloqueadas por CORS
2. **Formatos:** Para HTML5 video, usa formatos compatibles (MP4, WebM)
3. **Hosting:** Si usas archivos de video locales, necesitarás un servidor web (no funcionará con file://)
4. **Performance:** Para mejor rendimiento, usa servicios de streaming o CDN para los videos

## 🐛 Solución de Problemas

### Los episodios no se muestran al expandir
✅ **Solucionado** - El problema de overflow ha sido corregido en `index.css`

### El video no se reproduce
- Verifica que la URL del video sea correcta
- Asegúrate de que el formato del video sea compatible
- Revisa la consola del navegador para errores

### Los estilos no se aplican
- Verifica que `index.css` y `player.css` estén en la misma carpeta que los HTML
- Limpia la caché del navegador (Ctrl+F5)

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

---

**¡Disfruta de tu biblioteca multimedia! 🎬**
