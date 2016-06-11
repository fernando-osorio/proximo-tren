# Próximo tren (by FM5HD)
**Aviso:** Es una WebApp no oficial. 

Es un proyecto que pretende ser la alternativa a "Trenes en vivo", la aplicación creada por el Ministerio del Transporte (ex-Ministerio del Interior y Transporte).

Este proyecto obtiene los datos directamente de la aplicación "Trenes en Vivo", no genera ni modifica esos datos. 

A diferencia de Trenes en Vivo, esta plataforma híbrida (lo considero de esa forma ya que se mezcla mi código con el código original) presenta mejoras en cuanto estética e información se refiere.

# Líneas y ramales disponibles 
Al contrario de la app oficial, acá se despliegan todos los datos de todos los ramales en donde se haya implementado la generación de datos en tiempo real, incluyendo servicios en/hacia el interior del país. 

## Sarmiento. 
* Once-Moreno. 
* Merlo-Lobos. 
* Moreno-Mercedes. 

## Mitre. 
* Retiro-Tigre. 
* Retiro-J.L.Suárez/Bme.Mitre. 
* Victoria-Capilla del Señor (sólo cabeceras). 
* Zárate-Villa Ballester (sólo cabeceras). 

## Roca. 
* Constitución-La Plata. 
* Constitución Bosques/Gutiérrez (en pruebas). 
* Constitución Alejandro Korn (en pruebas). 
* Constitución Cañuelas (en pruebas). 
* Constitución Haedo-Temperley (en pruebas). 

## Belgrano Sur. 
* Buenos Aires-M.C.G.Belgrano. 
* Buenos Aires-González Catán. 
* Puente Alsina-Aldo Bonzi (sólo cabeceras). 

## Líneas de ramal único
* San Martín. 
* Tren de la Costa. 
* Belgrano Norte (en pruebas). 
* Urquiza (en pruebas). 

# Mejoras con respecto a Trenes en Vivo
* Visualización de próximos servicios por estación y desde cabeceras en formato general como por andén. 
* Se incluyen los ramales que no han sido publicados (o que están en pruebas). 
* Posibilidad de elegir la frecuencia de actualización, evitando el consumo excesivo de los datos móviles. 
* Es responsive, adaptando la forma de mostrar la información según el tamaño del dispositivo. 
* Interfaz gráfica agradable que se adapta a cualquier paleta de colores. 
* Personalización de elementos gráficos y tipografías. 
* Fondo diferente según el horario. 
* Facilidad de cambiar de línea y estación. 
* Los tiempos superiores a 60 minutos se traducen en horas y minutos. 
* Se admiten tiempos superiores a 99 minutos. 
* En caso de cortarse la conexión muestra un mensaje de error mientras reintenta conectarse para obtener los datos. 
* Reloj en pantalla. 
* Los scrolls del próximo tren rápido/semi-rápido/especial y de las alertas en pantalla no se interrumpen por actualización.
* Se usan los cuadros necesarios para mostrar los servicios que tengan datos, los que no muestran información no se muestran a la vista. 
* Se utilizan textos claros y concisos que respondan a lo que el usuario busca. 

| Antes | Después |
| ------------- | ------------- |
| Próximo tren en: Destino: Moreno. 5 minutos | El próximo hacia Moreno llega en 5 minutos |
| El tren es tuyo, cuidalo. | No hay información de los próximos servicios. Consultá la cartelera de horarios para más información. |

# Changelog 
## v1.6 
Una de las actualizaciones más importantes de la webapp (por eso la tardanza). 
* Corregido el bypass apuntando a los nuevos servers de la API (se hizo hace un par de meses), ahora apunta a los servers de SOFSE, con la misma base íntegra, donde en un principio estaba MUY inestable pero ahora ya se normalizó todo. 
* El menú mobile es más amigable. c: 
* Se cambia `container` por `container-fluid` para el mejor aprovechamiento del espacio. 
* Reescritura de un par de scripts, reducción de 15% del código original. 
* Nuevo soporte de hashing, más eficiente que en la primera versión. 
* Detección de errores mediante un modal al obtener erróneamente los datos. 
* Soporta publicidad tanto en imagen como en video. Ambos modos mantienen la visualización de los tiempos de llegada. Por el momento sólo está en el modo estación. Por defecto está desactivado y será de esta forma para no frustrar la experiencia en mobile. 
* EN PRUEBAS: Módulo de estaciones de acceso rápido (o favoritos, como más te guste llamarlo), no recomiendo usarlo porque no están disponibles las opciones de quitar estación y hasta se puede duplicar la estación en la pantalla. 
* EN PRUEBAS: Módulo de tracking (unificación del sub-proyecto "Viaje en vivo"), por el momento no cambia a la siguiente estación pero obtiene los datos del N° de servicio y formación. 

## v1.5.1 
* Más optimización en el funcionamiento. 
* Corrección del bug de la estación de destino en mayúsculas. 
* Cambio de algunos textos. 
* Habilitación de la personalización de las marcas de las líneas. 

## v1.5
* Optimización de scripts. 
* Migración de Unsemantic a Bootstrap. 
* Dependencias mediante Bower. 
* Opciones de personalización. 
* Actualización y vectorialización de marcas de líneas ferroviarias. 
* Se quitaron momentáneamente las líneas del/hacia el interior del país. 

## v1.0
* Carga inicial del proyecto.

# Frameworks utilizados
* jQuery 
* Modernizr 
* MomentJS 
* Moment-duration-format (plugin) 
* Bootstrap v4.0.0-alpha2