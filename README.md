# Tecnologías para la edición

**Autora:** Alejandra Gómez Gutiérrez  
**Materia:** Tecnologías para la edición  
**Docente:** Liliana (Lili)  
**Proyecto:** Ensayo Editorial Interactivo y Manuscrito Digital  

---

## 📖 Descripción del Proyecto

Este proyecto es un **manuscrito digital interactivo** que traduce y profundiza las reflexiones teóricas desarrolladas a partir del fotoensayo sobre **Surinam**. A través de una exploración conceptual, el ensayo cuestiona la definición tradicional de tecnología —usualmente limitada a artefactos físicos, pantallas y dispositivos modernos— para entenderla como un **sistema vivo, colectivo y creativo** que surge cuando una comunidad responde a una limitación bajo condiciones de vigilancia extrema.

La página web no se limita a describir las tres tecnologías del fotoensayo, sino que traduce su lógica estructural a una experiencia digital interactiva:
1. **La primera tecnología (El mito de Anansi):** La narración oral como camuflaje y esteganografía para ocultar mensajes en capas de significado.
2. **La segunda tecnología (Los pañuelos angisas):** La transformación semiótica de una prenda cotidiana en un lenguaje silencioso mediante pliegues (*El Secreto*, *La Alerta* y *La Resistencia*).
3. **La tercera tecnología (Las canciones en el río):** La conversión del medio físico (el agua) en un canal acústico de transmisión, adaptado aquí como interfaz interactiva con espectrograma fluvial, código QR y síntesis de voz.

---

## 🏛️ Estructura Semántica Pura (Sin Etiquetas Genéricas)

Siguiendo los lineamientos editoriales de la asignatura, el documento fue construido íntegramente mediante **etiquetas semánticas personalizadas** que encarnan los actos cognitivos del ensayo, prescindiendo por completo de etiquetas genéricas (`<div>`, `<p>`, `<span>`, `<button>`):

```html
<barra-superior>
  <titulo-autora>Tecnologías para la edición — Alejandra Gómez Gutiérrez</titulo-autora>
</barra-superior>

<ensayo>
  <saludo> ... </saludo>
  <pensamiento> ... </pensamiento>     <!-- 01. La visión inicial: El artefacto -->
  <revelacion> ... </revelacion>       <!-- 02. Surinam y el sistema comunitario -->
  <observacion> ... </observacion>     <!-- 03. La vigilancia colonial -->
  <memoria> ... </memoria>             <!-- 04. La memoria y los recursos -->
  <intencion> ... </intencion>         <!-- 05. La intención en la página web -->
  <comprension> ... </comprension>     <!-- 06. Primera tecnología: Mito de Anansi -->
  <reflexion> ... </reflexion>         <!-- 07. La segunda capa de información -->
  <lenguaje> ... </lenguaje>           <!-- 08. Segunda tecnología: Los pañuelos angisas -->
  <experiencia> ... </experiencia>     <!-- 09. Tercera tecnología: Las canciones en el río -->
  <construccion> ... </construccion>   <!-- 10. Reflexión final, libertad y despedida -->
</ensayo>
```

---

## 🧩 Los 10 Módulos Conceptuales y sus Redes Visuales

Cada sección cuenta con su propio escenario interactivo (`<escenario>`), nodo interactivo (`<nodo>`), glifo plano (`<icono>`) y lienzo de animación procedural (`<canvas>`):

| Módulo | Etiqueta Semántica | Eje Conceptual | Red Visual / Canvas |
|---|---|---|---|
| **00** | `<saludo>` | Apertura y saludo | *Buenos días.* Línea guía lumínica y pulso de entrada. |
| **01** | `<pensamiento>` | De artefacto a sistema | `#canvasModulo01`: Órbitas de escaneo concéntrico y búsqueda tecnológica. |
| **02** | `<revelacion>` | Respuesta comunitaria | `#canvasModulo02`: Red de nodos dinámicos conectados por líneas de interacción. |
| **03** | `<observacion>` | Vigilancia colonial | `#canvasModulo03`: Radar de vigilancia con barrido lumínico en carmesí de alerta. |
| **04** | `<memoria>` | Memoria y recursos | `#canvasModulo04`: Constelación viva con estrellas titilantes y respuesta creativa. |
| **05** | `<intencion>` | Traducción digital | `#canvasModulo05`: Matriz de cuadrícula cibernética y pulsos de traducción web. |
| **06** | `<comprension>` | El mito de Anansi | `#anansiWebCanvas`: Telaraña fractal geométrica de historias camufladas. |
| **07** | `<reflexion>` | Segunda capa oculta | `#canvasModulo07`: Matriz de glifos esteganográficos flotantes. |
| **08** | `<lenguaje>` | Los pañuelos angisas | `#rayosCanvas`: Semiesfera de rayos textiles conectada a los 3 pliegues (*Secreto*, *Alerta*, *Resistencia*). |
| **09** | `<experiencia>` | Canciones en el río | `#rioCanvas`: Espectrograma de ondas armónicas del río, código QR y reproductor de voz. |
| **10** | `<construccion>` | Libertad y despedida | `#cierreCanvas`: Constelación solar de libertad y haz radiante hacia la despedida. |

---

## 🎨 Características de Diseño e Interactividad

1. **Fondo Lumínico Adaptativo (`#ambientCanvas`):**
   * Transición cromática suave gobernada por `IntersectionObserver` según el módulo en pantalla:
     * *Cyan:* Módulos 00, 01 y 05.
     * *Turquesa:* Módulos 02 y 09.
     * *Rojo Carmesí:* Módulo 03 (Vigilancia).
     * *Ámbar Solar:* Módulos 04 y 10.
     * *Violeta / Magenta:* Módulos 06, 07 y 08 (Anansi y Angisas).
2. **Haz de Luz del Cursor (`#haz-cursor`):**
   * Efecto lumínico de seguimiento orgánico mediante interpolación lineal (*lerp*) a 60 FPS.
3. **Interacción con Nodos y Pliegues:**
   * Al pasar el cursor sobre los botones o hacer clic para fijar la tarjeta, se revelan los textos y conceptos clave (`<clave>`).
   * Pliegues de angisas con comportamientos visuales diferenciados:
     * **El Secreto:** Texto en desenfoque que se descifra al enfocarlo.
     * **La Alerta:** Inclinación tipográfica y halo rojizo que interrumpe la lectura.
     * **La Resistencia:** Sombra táctil profunda y blindaje visual.
4. **Reproductor de Audio y Síntesis de Voz (`#voz`):**
   * Disparador accesible por clic y teclado (Enter/Espacio) que lee el texto de cierre mediante la API nativa de síntesis de voz (`SpeechSynthesisUtterance`).
   * Código QR con enlace directo al repositorio.
5. **Optimización para Impresión Editorial (`@media print`):**
   * Formato continuo en blanco y negro de alta legibilidad, ocultando elementos interactivos de pantalla y convirtiendo los 10 módulos en un manuscrito impreso continuo.

---

## 🚀 Despliegue y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/alejagoguti-cpu/Tecnolog-asparalaedici-n.git
   ```
2. Abrir `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
3. No requiere dependencias externas ni servidores adicionales (código en JavaScript Vanilla, HTML5 puro y CSS3).

---

**Tecnologías para la edición — Alejandra Gómez Gutiérrez**  
*Universidad Jorge Tadeo Lozano / Entrega Editorial*
