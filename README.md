# Próximo tren (by FM5HD)
Es un proyecto que pretende ser la alternativa a "Trenes en vivo" creado por el Ministerio del Transporte (ex-Ministerio del Interior y Transporte).

A diferencia de Trenes en Vivo, esta plataforma híbrida (lo considero de esa forma ya que se mezcla mi código con el código original) presenta mejoras en cuanto estética e información se refiere.


# Mejoras con respecto a Trenes en Vivo
* Es responsive, adaptando la forma de mostrar la información según el tamaño del dispositivo.
* Gráfica transparente que se adapta a cualquier paleta de colores.
* Facilidad de cambiar de línea y estación por medio de hash. 
* Los tiempos superiores a 60 minutos se traducen en horas y minutos. 
* Se admiten tiempos superiores a 99 minutos. 
* Reloj en pantalla. 
* El scroll del próximo tren rápido/semi-rápido/especial y de las alertas no se interrumpe.
* Se usan los cuadros necesarios para mostrar los servicios que tengan datos, los que no muestran información no se muestran a la vista. 
* Se reemplaza el uso de textos en imagen por textos claros y concisos, que respondan a lo que el usuario busca.

| Antes | Después |
| ------------- |-------------|
| Próximo tren en: Destino: Moreno. 5 minutos | El próximo hacia Moreno llega en 5 minutos |
| El tren es tuyo, cuidalo. | No hay información de los próximos servicios. Consultá la cartelera de horarios para más información. |

# Changelog
## v1.0
* Carga inicial del proyecto.


# Frameworks utilizados

* jQuery v2.1.4
* MomentJS 
* Moment-duration-format (plugin) 
* Unsemantic (fork de 960gs)