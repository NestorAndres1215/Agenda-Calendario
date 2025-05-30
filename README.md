﻿# Agenda con Calendario

Este proyecto implementa una agenda interactiva con calendario, donde los usuarios pueden agregar, editar, ver y eliminar eventos. Utiliza **FullCalendar** para la visualización y gestión de eventos, y **Axios** para la comunicación con el backend.

## Tecnologías Usadas
- **HTML5**: Estructura del contenido.
- **CSS3**: Estilos personalizados con variables y diseño responsivo.
- **FullCalendar**: Para la visualización y manejo de eventos en el calendario.
- **Axios**: Para realizar solicitudes HTTP y cargar eventos desde el servidor.
- **JavaScript**: Lógica para interactuar con el calendario y los formularios modales.

## Características
- **Registro de eventos**: Permite agregar eventos al calendario mediante un formulario modal.
- **Edición de eventos**: Los usuarios pueden editar los eventos ya registrados.
- **Eliminación de eventos**: Los usuarios pueden eliminar eventos.
- **Vista de eventos**: Los usuarios pueden ver los detalles de cada evento.
- **Modal dinámico**: Un modal se abre para agregar o editar eventos.

## Estructura del Proyecto

### HTML
El archivo HTML contiene el siguiente contenido principal:
- **Cabecera**: Un encabezado con el título de la agenda.
- **Controles**: Un botón para agregar eventos y una sección de estado que muestra la última actualización.
- **Calendario**: Se inserta un contenedor para el calendario que se genera dinámicamente.
- **Modales**: Se incluyen modales para agregar, editar y ver eventos.

### CSS
Se utiliza un diseño limpio y moderno con:
- **Colores personalizados**: A través de variables CSS para mantener un estilo coherente.
- **Diseño responsivo**: El diseño se ajusta en dispositivos móviles mediante media queries.

### JavaScript
El código JavaScript maneja la lógica de interacción:
- **FullCalendar**: Se configura para mostrar el calendario y los eventos.
- **Funciones para abrir y cerrar los modales**: Los usuarios pueden agregar, editar y eliminar eventos.
- **Conexión con el backend**: Usando Axios para cargar los eventos desde el servidor.

## Instrucciones para el Uso
1. **Carga de eventos**: Al iniciar, el calendario cargará los eventos disponibles desde el backend.
2. **Agregar evento**: Haz clic en el botón "Registrar Evento", llena el formulario y presiona "Guardar".
3. **Editar evento**: Haz clic en un evento para ver sus detalles y modificarlo.
4. **Eliminar evento**: En el modal de detalles del evento, selecciona "Eliminar Evento" para borrarlo.

## Requisitos
- Un servidor con una API para manejar los eventos (`/api/events`).
- Conexión a Internet para cargar recursos externos como FullCalendar y Axios.

## Imagen
![image](https://github.com/user-attachments/assets/f44ebebd-a992-40b0-9ae6-7bfa5b84e428)
