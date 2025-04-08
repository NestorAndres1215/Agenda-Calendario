document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const calendarEl = document.getElementById('calendar');
    const eventoModal = document.getElementById('eventoModal');
    const detalleEventoModal = document.getElementById('detalleEventoModal');
    const eventoForm = document.getElementById('eventoForm');
    const modalTitle = document.getElementById('modalTitle');
    const eventId = document.getElementById('eventId');
    const eventTitle = document.getElementById('eventTitle');
    const eventStart = document.getElementById('eventStart');
    const eventEnd = document.getElementById('eventEnd');
    const btnAgregarEvento = document.getElementById('btnAgregarEvento');
    const closeModal = document.getElementById('closeModal');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const guardarBtn = document.getElementById('guardarBtn');
    const eliminarBtn = document.getElementById('eliminarBtn');
    const eventActions = document.getElementById('eventActions');
    const updateTimeEl = document.getElementById('updateTime');
    
    // Modal de detalles
    const detalleTitulo = document.getElementById('detalleTitulo');
    const detalleInicio = document.getElementById('detalleInicio');
    const detalleFin = document.getElementById('detalleFin');
    const closeDetalleModal = document.getElementById('closeDetalleModal');
    const cerrarDetalleBtn = document.getElementById('cerrarDetalleBtn');
    const editarEventoBtn = document.getElementById('editarEventoBtn');
    const eliminarEventoBtn = document.getElementById('eliminarEventoBtn');
    
    // Instancia del calendario
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'es',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        selectable: true,
        events: async (fetchInfo, successCallback, failureCallback) => {
            try {
                const res = await axios.get('/api/events');
                successCallback(res.data);
                updateLastUpdateTime();
            } catch (error) {
                failureCallback(error);
                console.error('Error al cargar eventos:', error);
            }
        },
        select: function(info) {
            // Abrir modal con fechas seleccionadas
            openAddEventModal(info.startStr, info.endStr);
        },
        eventClick: function(info) {
            // Mostrar modal de detalles
            openDetailModal(info.event);
        },
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        },
        height: 'auto'
    });
    
    // Renderizar calendario
    calendar.render();
    
    // Actualizar hora de última actualización
    function updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        updateTimeEl.textContent = timeString;
    }
    
    // Abrir modal para agregar evento
    function openAddEventModal(start = '', end = '') {
        modalTitle.textContent = 'Registrar Evento';
        eventId.value = '';
        eventTitle.value = '';
        eventStart.value = start ? start : '';
        eventEnd.value = end ? end : '';
        eventActions.style.display = 'none';
        eventoModal.style.display = 'flex';
    }
    
    // Abrir modal para editar evento
    function openEditEventModal(event) {
        modalTitle.textContent = 'Editar Evento';
        eventId.value = event.id;
        eventTitle.value = event.title;
        
        // Formatear fechas para input date
        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : new Date(startDate);
        
        eventStart.value = formatDate(startDate);
        eventEnd.value = formatDate(endDate);
        
        eventActions.style.display = 'flex';
        eventoModal.style.display = 'flex';
    }
    
    // Abrir modal de detalles
    function openDetailModal(event) {
        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : new Date(startDate);
        
        detalleTitulo.textContent = event.title;
        detalleInicio.textContent = startDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        detalleFin.textContent = endDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        
        // Guarda el ID del evento para usar en botones
        detalleEventoModal.dataset.eventId = event.id;
        
        detalleEventoModal.style.display = 'flex';
    }
    
    // Formatear fecha para inputs
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Event Listeners
    btnAgregarEvento.addEventListener('click', () => openAddEventModal());
    
    closeModal.addEventListener('click', () => {
        eventoModal.style.display = 'none';
    });
    
    cancelarBtn.addEventListener('click', () => {
        eventoModal.style.display = 'none';
    });
    
    closeDetalleModal.addEventListener('click', () => {
        detalleEventoModal.style.display = 'none';
    });
    
    cerrarDetalleBtn.addEventListener('click', () => {
        detalleEventoModal.style.display = 'none';
    });
    
    editarEventoBtn.addEventListener('click', async () => {
        detalleEventoModal.style.display = 'none';
        
        try {
            const id = detalleEventoModal.dataset.eventId;
            const event = calendar.getEventById(id);
            
            if (event) {
                openEditEventModal(event);
            }
        } catch (error) {
            console.error('Error al obtener datos del evento:', error);
        }
    });
    
    eliminarEventoBtn.addEventListener('click', async () => {
        if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                const id = detalleEventoModal.dataset.eventId;
                await axios.delete(`/api/events/${id}`);
                calendar.refetchEvents();
                detalleEventoModal.style.display = 'none';
                updateLastUpdateTime();
                
                // Confirmación de eliminación con SweetAlert
                Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
        }
    });
    
    // Guardar evento (nuevo o actualizar)
    eventoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const evento = {
            title: eventTitle.value,
            start: eventStart.value,
            end: eventEnd.value
        };
        
        try {
            if (eventId.value) {
                // Actualizar evento existente
                await axios.put(`/api/events/${eventId.value}`, evento);
                
                // Confirmación de actualización con SweetAlert
                Swal.fire('¡Actualizado!', 'El evento ha sido actualizado.', 'success');
            } else {
                // Crear nuevo evento
                await axios.post('/api/events', evento);
                
                // Confirmación de creación con SweetAlert
                Swal.fire('¡Evento creado!', 'El evento ha sido registrado.', 'success');
            }
            
            calendar.refetchEvents();
            eventoModal.style.display = 'none';
            updateLastUpdateTime();
        } catch (error) {
            console.error('Error al guardar evento:', error);
            alert('Error al guardar el evento. Por favor intenta nuevamente.');
        }
    });
    
    eliminarBtn.addEventListener('click', async () => {
        if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                await axios.delete(`/api/events/${eventId.value}`);
                calendar.refetchEvents();
                eventoModal.style.display = 'none';
                updateLastUpdateTime();
                
                // Confirmación de eliminación con SweetAlert
                Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
        }
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === eventoModal) {
            eventoModal.style.display = 'none';
        }
        if (e.target === detalleEventoModal) {
            detalleEventoModal.style.display = 'none';
        }
    });
    
    // Inicializar hora de última actualización
    updateLastUpdateTime();
});
