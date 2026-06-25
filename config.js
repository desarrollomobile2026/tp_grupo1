    // Helpers (must be first)
    function idGen(){ return 's'+Math.random().toString(36).slice(2,9) }

    // App logic
    const defaultShifts = [
      { id: idGen(), time: "09:00", price: 2000, slots: 2 },
      { id: idGen(), time: "10:00", price: 2200, slots: 2 },
      { id: idGen(), time: "11:00", price: 2500, slots: 1 }
    ];

    const defaultBarbershops = [
      { id: idGen(), name: "Barbería Premium", location: "Av. Corrientes 1234, Buenos Aires", openTime: "09:00", closeTime: "20:00", rating: 4.8, isNew: false, emoji: "💈",
        description: "Somos una barbería premium en el corazón de Buenos Aires. Ofrecemos cortes clásicos y modernos, afeitado tradicional con navaja y tratamientos capilares. Más de 10 años de experiencia.",
        instagram: "", facebook: "", mapsQuery: "Av. Corrientes 1234, Buenos Aires" },
      { id: idGen(), name: "Cortes Clásicos", location: "Calle Rivadavia 567, Buenos Aires", openTime: "10:00", closeTime: "19:30", rating: 4.5, isNew: true, emoji: "✂️",
        description: "Especialistas en cortes clásicos y estilos modernos. Ambiente relajado, atención personalizada y los mejores precios del barrio.",
        instagram: "", facebook: "", mapsQuery: "Calle Rivadavia 567, Buenos Aires" },
      { id: idGen(), name: "Barbería Moderna", location: "Av. Santa Fe 890, Buenos Aires", openTime: "09:30", closeTime: "21:00", rating: 4.6, isNew: false, emoji: "💈",
        description: "La fusión perfecta entre tradición y modernidad. Barbería con diseño vanguardista, cortes de tendencia y productos de primera calidad.",
        instagram: "", facebook: "", mapsQuery: "Av. Santa Fe 890, Buenos Aires" },
      { id: idGen(), name: "El Barbero", location: "Calle Alsino 123, Buenos Aires", openTime: "10:00", closeTime: "20:00", rating: 4.3, isNew: true, emoji: "🪡",
        description: "Tu barbero de confianza. Cortes para toda la familia, arreglo de barba y bigote. Turno en el momento o reserva online.",
        instagram: "", facebook: "", mapsQuery: "Calle Alsino 123, Buenos Aires" },
      { id: idGen(), name: "Tonsura & Estilo", location: "Av. Acoyte 456, Buenos Aires", openTime: "09:00", closeTime: "19:00", rating: 4.7, isNew: false, emoji: "💈",
        description: "Arte en cada corte. Especialistas en barbas, degradados y estilos únicos. Te esperamos de lunes a sábado con o sin turno previo.",
        instagram: "", facebook: "", mapsQuery: "Av. Acoyte 456, Buenos Aires" }
    ];

    // ================================================================ //
    // Conversaciones simuladas para la bandeja de mensajes.             //
    // AGREGAR/QUITAR conversaciones acá, o reemplazar esta lista por    //
    // datos reales cuando conectes un backend de chat.                  //
    // ================================================================ //
    const defaultConversations = [
      { id: idGen(), name: "Barbería Premium", avatar: "💈", unread: true,
        messages: [
          { from: 'them', text: '¡Hola! Tu turno es a las 10:00, te esperamos 🙌', time: '09:10' },
          { from: 'me', text: 'Genial, gracias!', time: '09:12' }
        ]},
      { id: idGen(), name: "Cortes Clásicos", avatar: "✂️", unread: true,
        messages: [
          { from: 'them', text: 'Tenemos un descuento para tu próximo corte', time: 'Ayer' }
        ]},
      { id: idGen(), name: "Barbería Moderna", avatar: "💈", unread: false,
        messages: [
          { from: 'them', text: '¿Cómo estuvo tu última visita?', time: 'Lunes' },
          { from: 'me', text: 'Todo muy bien, gracias!', time: 'Lunes' }
        ]}
    ];

    // ================================================================ //
    // Conversaciones que ve el ADMIN (barbero): acá los clientes son     //
    // quienes escriben ("them") y el barbero responde ("me"). Se         //
    // guardan en una key de localStorage separada de las del usuario.    //
    // AGREGAR ACÁ: más clientes o conectar a mensajes reales entrantes.  //
    // ================================================================ //
    const defaultClientConversations = [
      { id: idGen(), name: "Juan Pérez", avatar: "🧔", unread: true,
        messages: [
          { from: 'them', text: 'Hola! ¿Tienen turno disponible hoy a la tarde?', time: '10:05' }
        ]},
      { id: idGen(), name: "Martina Gómez", avatar: "👩", unread: true,
        messages: [
          { from: 'them', text: 'Buenas, ¿puedo reprogramar mi turno de mañana?', time: '09:40' }
        ]},
      { id: idGen(), name: "Lucas Fernández", avatar: "🧑", unread: false,
        messages: [
          { from: 'them', text: 'Gracias por el corte de ayer, quedó genial!', time: 'Ayer' },
          { from: 'me', text: 'Un gusto Lucas, te esperamos pronto!', time: 'Ayer' }
        ]}
    ];

    // ================================================================ //
    // Notificaciones simuladas. AGREGAR ACÁ más tipos (recordatorios,    //
    // promociones, avisos del sistema, etc).                            //
    // ================================================================ //
    const defaultNotifications = [
      { icon: '📅', text: 'Tenés un turno mañana a las 10:00', time: 'Hace 2h' },
      { icon: '💸', text: 'Nuevo descuento disponible en Cortes Clásicos', time: 'Hace 5h' },
      { icon: '⭐', text: 'No olvides calificar tu última visita', time: 'Ayer' }
    ];

    // ================================================================ //
    // Notificaciones que ve el ADMIN (barbero): avisos de mensajes      //
    // nuevos de clientes y reservas. Se generan en base a las           //
    // conversaciones de clientes que tengan mensajes sin leer.          //
    // AGREGAR ACÁ: notificaciones de nuevas reservas, cancelaciones, etc.//
    // ================================================================ //
    const defaultAdminNotifications = [
      { icon: '📅', text: 'Nueva reserva: Juan Pérez para hoy 16:00', time: 'Hace 1h' },
      { icon: '⭐', text: 'Lucas Fernández dejó una opinión de 5 estrellas', time: 'Ayer' }
    ];

    // Helper functions
    function $(s){ return document.querySelector(s) }
    function $all(s){ return document.querySelectorAll(s) }
    function toast(msg, t=2000){ const el = $('#toast'); el.textContent = msg; el.classList.remove('hidden'); clearTimeout(el._to); el._to = setTimeout(()=> el.classList.add('hidden'), t) }

    // Storage
    function loadShifts(){ try{ return JSON.parse(localStorage.getItem('turnera_shifts')) || defaultShifts }catch(e){ return defaultShifts } }
    function saveShifts(arr){
      localStorage.setItem('turnera_shifts', JSON.stringify(arr));
      // Notificar al panel de visualización
      window.dispatchEvent(new CustomEvent('turnera_shifts_changed'));
    }
    function getUser(){ return JSON.parse(sessionStorage.getItem('turnera_user') || 'null') }
    function setUser(u){ if(u) sessionStorage.setItem('turnera_user', JSON.stringify(u)); else sessionStorage.removeItem('turnera_user'); renderAuth() }

    // Storage for barbershops
    function loadBarbershops(){ try{ return JSON.parse(localStorage.getItem('turnera_barbershops')) || defaultBarbershops }catch(e){ return defaultBarbershops } }
    function saveBarbershops(arr){ localStorage.setItem('turnera_barbershops', JSON.stringify(arr)) }

    // Storage for favorites
    function loadFavorites(){ try{ return JSON.parse(localStorage.getItem('turnera_favorites') || '[]') }catch(e){ return [] } }
    function saveFavorites(arr){ localStorage.setItem('turnera_favorites', JSON.stringify(arr)) }
    function isFavorite(barberId){ return loadFavorites().includes(barberId) }
    function toggleFavorite(barberId){
      const favs = loadFavorites();
      if(favs.includes(barberId)){
        saveFavorites(favs.filter(id => id !== barberId));
        return false;
      } else {
        favs.push(barberId);
        saveFavorites(favs);
        return true;
      }
    }

    // Storage for message conversations
    // El admin (barbero) y el usuario (cliente) tienen bandejas separadas:
    // el admin habla con sus clientes, el usuario habla con las barberías.
    function conversationsKey(){
      const user = getUser();
      return (user && user.role === 'admin') ? 'turnera_conversations_admin' : 'turnera_conversations';
    }
    function defaultConversationsForRole(){
      const user = getUser();
      return (user && user.role === 'admin') ? defaultClientConversations : defaultConversations;
    }
    function loadConversations(){
      try{ return JSON.parse(localStorage.getItem(conversationsKey())) || defaultConversationsForRole() }
      catch(e){ return defaultConversationsForRole() }
    }
    function saveConversations(arr){ localStorage.setItem(conversationsKey(), JSON.stringify(arr)) }

    // Navigation (bloquea acceso si no hay sesión iniciada)
    function showScreen(id){
      const user = getUser();
      const publicScreens = ['screen-login', 'screen-register'];
      if(!user && !publicScreens.includes(id)){
        toast('Debes iniciar sesión');
        // asegurar que se muestre la pantalla de login
        $all('.screen').forEach(s=>{
          s.classList.remove('active','left','right');
          if(s.id === 'screen-login') s.classList.add('active');
          else s.classList.add('right');
        });
        $all('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.screen === 'screen-login'));
        document.querySelector('.app-header')?.classList.add('hidden');
        document.querySelector('.bottom-nav')?.classList.add('hidden');
        return;
      }

      $all('.screen').forEach(s=>{
        s.classList.remove('active','left','right');
        if(s.id === id) s.classList.add('active');
        else s.classList.add('right');
      });
      $all('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.screen === id));
      // ocultar header y nav en pantallas de login/registro
      const isAuthScreen = publicScreens.includes(id);
      document.querySelector('.app-header')?.classList.toggle('hidden', isAuthScreen);
      document.querySelector('.bottom-nav')?.classList.toggle('hidden', isAuthScreen);
      // renderizar favoritos cuando se abre esa pantalla
      if(id === 'screen-favorites') renderFavorites();
      // renderizar bandeja de mensajes y notificaciones al abrirlas
      if(id === 'screen-messages') renderMessagesInbox($('#messages-search')?.value);
      if(id === 'screen-notifications') renderNotifications();
      // Pantalla de edición de turnos: solo admin. Si entra un usuario
      // normal (por ejemplo escribiendo la URL/hash a mano) lo mandamos
      // de vuelta al inicio. Si es admin, refrescamos la lista de turnos.
      if(id === 'screen-edit-shifts'){
        if(!user || user.role !== 'admin'){
          toast('Solo el admin puede editar turnos');
          showScreen('screen-home');
          return;
        }
        renderShifts();
      }
      // Pantalla "Reservar": si hay un turno pendiente de confirmar
      // (currentBooking, seteado por openBooking) mostramos la vista de
      // confirmación con fecha/hora/precio y métodos de pago. Si no,
      // mostramos la lista de reservas ya confirmadas del usuario.
      if(id === 'screen-book'){
        if(currentBooking) showBookingConfirm();
        else showBookingList();
      }
      // Pantalla "Perfil": muestra los datos del usuario logueado
      if(id === 'screen-profile') renderProfile();
    }
    $all('.nav-btn').forEach(b=>{
      b.addEventListener('click', ()=> showScreen(b.dataset.screen));
    });

    // Initial setup
    (function init(){
      if(!localStorage.getItem('turnera_shifts')) saveShifts(defaultShifts);
      // Siempre actualizamos los datos de barberías para que los nuevos campos (descripción, redes) estén disponibles
      saveBarbershops(defaultBarbershops);
      if(!localStorage.getItem('turnera_conversations')) localStorage.setItem('turnera_conversations', JSON.stringify(defaultConversations));
      if(!localStorage.getItem('turnera_conversations_admin')) localStorage.setItem('turnera_conversations_admin', JSON.stringify(defaultClientConversations));
      // Resetear tema a claro si el config guardado era oscuro
      try {
        const _cfg = JSON.parse(localStorage.getItem('turnera_config') || '{}');
        if(!_cfg.theme || _cfg.theme === 'dark'){
          _cfg.theme = 'light';
          localStorage.setItem('turnera_config', JSON.stringify(_cfg));
        }
      } catch(e){}
      renderAuth();
      bindUI();
      // Inicializar punto rojo de mensajes al cargar
      setTimeout(updateMessagesDot, 100);
      const user = getUser();
      if(!user){
        // asegurar que al cargar, si no hay sesión, se muestre sólo el login
        showScreen('screen-login');
      } else {
        showScreen('screen-home');
      }
    })();

    // Render auth and UI
    function renderAuth(){
      const user = getUser();
      const welcome = $('#welcome');
      const roleLabel = $('#role-label');
      const headerSub = $('#header-sub');
      const userBadge = $('#user-badge');
      const logoutBtn = $('#btn-logout');

      if(user){
        welcome.textContent = user.username;
        roleLabel.textContent = user.role === 'admin' ? 'Barbero' : 'Cliente';
        headerSub.textContent = 'Sesión iniciada';
        userBadge.textContent = user.username;
        logoutBtn.classList.remove('hidden');
        $('#btn-login')?.classList?.add?.('hidden');
      } else {
        welcome.textContent = 'Bienvenido';
        roleLabel.textContent = 'Inicia sesión para reservar';
        headerSub.textContent = 'Turnera móvil';
        userBadge.textContent = 'Invitado';
        logoutBtn.classList.add('hidden');
        $('#btn-login')?.classList?.remove?.('hidden');
      }

      // El inicio se muestra igual para admin y usuario (a propósito).
      // La edición de turnos vive en su propia pantalla (#screen-edit-shifts).
      renderBarbershops();

      // Actualiza el botón "Reservar"/"Editar" de la barra de navegación
      // según el rol del usuario logueado.
      updateNavForRole();
    }

    // ============================================================ //
    // Cambia el botón de nav entre "Reservar" (usuario) y "Editar"   //
    // (admin). Si en el futuro agregás más botones que dependan del  //
    // rol, podés replicar este mismo patrón acá.                     //
    // ============================================================ //
    function updateNavForRole(){
      const user = getUser();
      const btn = $('#nav-book-edit');
      if(!btn) return;
      if(user && user.role === 'admin'){
        btn.textContent = 'Editar';
        btn.dataset.screen = 'screen-edit-shifts';
      } else {
        btn.textContent = 'Reservar';
        btn.dataset.screen = 'screen-book';
      }
    }

    // Render shifts for admin (pantalla #screen-edit-shifts)
    function renderShifts(){
      const shifts = loadShifts();
      const adminList = $('#shifts-admin-list');
      if(!adminList) return; // por si se llama antes de entrar a esa pantalla
      adminList.innerHTML = '';

      shifts.forEach(s=>{
        const divA = document.createElement('div');
        divA.className = 'shift';
        divA.innerHTML = `
          <div class="meta">
            <strong>${s.time}</strong>
            <div class="sub">Precio $${s.price} · Cupos ${s.slots}</div>
          </div>
          <div class="actions">
            <button class="btn small edit" data-id="${s.id}">Editar</button>
            <button class="btn ghost small del" data-id="${s.id}">Eliminar</button>
          </div>
        `;
        adminList.appendChild(divA);
      });

      // Attach events
      adminList.querySelectorAll('.edit').forEach(btn=>{
        btn.addEventListener('click', e=>{
          const id = e.target.dataset.id;
          openEditShift(id);
        });
      });
      adminList.querySelectorAll('.del').forEach(btn=>{
        btn.addEventListener('click', e=>{
          const id = e.target.dataset.id;
          if(confirm('Eliminar turno?')) {
            const arr = loadShifts().filter(x=>x.id!==id);
            saveShifts(arr);
            renderShifts();
            toast('Turno eliminado');
          }
        });
      });

      // AGREGAR ACÁ más acciones de admin sobre cada turno si las necesitás
      // (por ejemplo duplicar un turno, marcarlo como inactivo, etc).
    }

    // Render barbershops by category
    function renderBarbershops(){
      const barbershops = loadBarbershops();
      const topList = $('#top-barbershops');
      const newList = $('#new-barbershops');
      const allList = $('#all-barbershops');
      topList.innerHTML = '';
      newList.innerHTML = '';
      allList.innerHTML = '';

      // Categorize
      const top = barbershops.filter(b => b.rating >= 4.6).sort((a,b) => b.rating - a.rating);
      const newBs = barbershops.filter(b => b.isNew);
      const all = barbershops;

      // Function to create card
      function createCard(b){
        const div = document.createElement('div');
        div.className = 'barbershop-card';
        div.dataset.id = b.id;
        div.innerHTML = `
          <div class="img">${b.emoji}</div>
          <div class="info">
            <div>
              <div class="name">${b.name}</div>
              <div class="location">📍 ${b.location}</div>
              <div class="hours">🕐 ${b.openTime} - ${b.closeTime}</div>
            </div>
            <div class="rating">
              <span class="stars">★ ${b.rating}</span>
              <span class="score">(${Math.floor(Math.random()*100)+20} opiniones)</span>
            </div>
          </div>
        `;
        div.addEventListener('click', () => openBarbershopDetail(b.id));
        return div;
      }

      // Render
      top.forEach(b => topList.appendChild(createCard(b)));
      newBs.forEach(b => newList.appendChild(createCard(b)));
      all.forEach(b => allList.appendChild(createCard(b)));
    }

    // Current barbershop detail
    let currentBarbershop = null;

    // Open barbershop detail
    function openBarbershopDetail(id){
      const barbershops = loadBarbershops();
      const barber = barbershops.find(b => b.id === id);
      if(!barber) return;
      currentBarbershop = barber;
      renderBarbershopDetail();
      showScreen('screen-barbershop-detail');
    }

    // Render barbershop detail
    function renderBarbershopDetail(){
      if(!currentBarbershop) return;
      const b = currentBarbershop;
      
      // Header info
      $('#detail-emoji').textContent = b.emoji;
      $('#detail-name').textContent = b.name;
      $('#detail-location').textContent = b.location;
      $('#detail-hours').textContent = `${b.openTime} - ${b.closeTime}`;
      $('#detail-score').textContent = `${b.rating} (${Math.floor(Math.random()*100)+20} opiniones)`;
      
      // Update heart icon
      const isFav = isFavorite(b.id);
      $('#detail-like').textContent = isFav ? '❤' : '♡';
      
      // Stars
      const fullStars = Math.floor(b.rating);
      const hasHalf = b.rating % 1 >= 0.5;
      let stars = '★'.repeat(fullStars);
      if(hasHalf) stars += '½';
      stars += '☆'.repeat(5 - Math.ceil(b.rating));
      $('#detail-stars').textContent = stars;

      // Render shifts preview (first 3) — con descuento de cupos persistido por barbería
      const defaultDetailShifts = [
        { id: b.id+'_09', time: "09:00", price: 1500, slots: 3 },
        { id: b.id+'_11', time: "11:00", price: 1800, slots: 2 },
        { id: b.id+'_14', time: "14:00", price: 2000, slots: 4 }
      ];
      const detailSlotsKey = 'detail_slots_' + b.id;
      let detailSlots = {};
      try{ detailSlots = JSON.parse(localStorage.getItem(detailSlotsKey) || '{}'); }catch(e){}
      // Merge persisted slot counts
      const shifts = defaultDetailShifts.map(s => ({
        ...s,
        slots: detailSlots[s.id] !== undefined ? detailSlots[s.id] : s.slots
      }));

      const shiftsContainer = $('#shifts-preview-list');
      shiftsContainer.innerHTML = '';
      shifts.slice(0, 3).forEach(s => {
        const noSlots = s.slots <= 0;
        const div = document.createElement('div');
        div.className = 'shift-preview';
        div.innerHTML = `
          <div>
            <div class="time">${s.time}</div>
            <div class="details">$${s.price} • <span style="color:${noSlots ? '#ef4444' : 'var(--muted)'}">${noSlots ? 'Sin cupos' : s.slots + ' cupos'}</span></div>
          </div>
          <button class="btn small book-shift" style="padding:7px 14px;font-size:12px;width:auto;flex-shrink:0;${noSlots ? 'opacity:.4;cursor:not-allowed' : ''}" ${noSlots ? 'disabled' : ''}>Reservar</button>
        `;
        if(!noSlots){
          div.querySelector('.book-shift').addEventListener('click', ()=>{
            // Descontar cupo inmediatamente
            const updatedSlots = JSON.parse(localStorage.getItem(detailSlotsKey) || '{}');
            updatedSlots[s.id] = (updatedSlots[s.id] !== undefined ? updatedSlots[s.id] : s.slots) - 1;
            localStorage.setItem(detailSlotsKey, JSON.stringify(updatedSlots));
            openBooking({ id: s.id, time: s.time, price: s.price, slots: s.slots, shopName: b.name, shopEmoji: b.emoji });
          });
        }
        shiftsContainer.appendChild(div);
      });

      // Render comments
      const commentsKey = `comments_${currentBarbershop.id}`;
      const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
      const commentsList = $('#comments-list');
      commentsList.innerHTML = '';
      comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
          <div class="comment-author">${c.author}</div>
          <div class="comment-text">${c.text}</div>
          <div class="comment-date">${new Date(c.date).toLocaleDateString('es-AR')}</div>
        `;
        commentsList.appendChild(div);
      });
    }

    // ================================================================ //
    // INFO DE LA BARBERÍA                                               //
    // Renderiza la pantalla de información detallada: descripción,      //
    // horarios, mapa de Google Maps y redes sociales.                   //
    // ================================================================ //
    function renderBarbershopInfo(){
      if(!currentBarbershop) return;
      const b = currentBarbershop;

      // Nombre y tag
      $('#info-name').textContent = b.name;
      $('#info-tag').innerHTML = b.emoji + ' Barbería';

      // Descripción
      $('#info-description').textContent = b.description || 'Sin descripción disponible.';

      // Horarios
      $('#info-hours').textContent = (b.openTime || '09:00') + ' - ' + (b.closeTime || '20:00');

      // Ubicación
      $('#info-location-text').textContent = b.location || 'Dirección no disponible';

      // Mapa de Google Maps (embed con la dirección)
      const mapsQuery = encodeURIComponent(b.mapsQuery || b.location || b.name);
      const mapUrl = 'https://maps.google.com/maps?q=' + mapsQuery + '&output=embed&z=15';
      $('#info-map-iframe').src = mapUrl;

      // Botón "Ver en Maps" → toca para abrir Google Maps
      /*
        PARA CONFIGURAR LA REDIRECCIÓN DE MAPS:
        Si tenés coordenadas exactas del local, reemplazá mapsLink con:
        const mapsLink = 'https://maps.google.com/?q=TU_LATITUD,TU_LONGITUD';

        Si solo tenés la dirección como texto, dejá como está (usa b.mapsQuery).
        Ejemplo con dirección: 'https://maps.google.com/?q=Av.+Corrientes+1234+Buenos+Aires'
      */
      const mapsLink = 'https://maps.google.com/?q=' + mapsQuery;
      $('#info-maps-btn').onclick = ()=> window.open(mapsLink, '_blank');
      $('#info-map-tap').onclick = ()=> window.open(mapsLink, '_blank');

      // Instagram
      const igHandle = b.instagram || '';
      $('#info-instagram-handle').textContent = igHandle ? '@' + igHandle.replace('@','') : 'Sin cuenta vinculada';
      /*
        PARA AGREGAR LINK DE INSTAGRAM:
        1. En el array defaultBarbershops, completá el campo instagram: "nombre_usuario"
           (solo el usuario, sin @, ej: instagram: "barberiapremiumbsas")
        2. El botón automáticamente abrirá instagram.com/nombre_usuario
        Si el campo instagram está vacío, el botón queda desactivado.
      */
      if(igHandle){
        $('#info-instagram-btn').disabled = false;
        $('#info-instagram-btn').style.opacity = '1';
        $('#info-instagram-btn').onclick = ()=> window.open('https://www.instagram.com/' + igHandle.replace('@',''), '_blank');
      } else {
        $('#info-instagram-btn').disabled = true;
        $('#info-instagram-btn').style.opacity = '0.4';
        $('#info-instagram-btn').onclick = null;
      }

      // Facebook
      const fbHandle = b.facebook || '';
      $('#info-facebook-handle').textContent = fbHandle || 'Sin cuenta vinculada';
      /*
        PARA AGREGAR LINK DE FACEBOOK:
        1. En el array defaultBarbershops, completá el campo facebook: "nombre_pagina"
           (el nombre de la página o el slug de la URL, ej: facebook: "BarberiaPremiumbsas")
        2. El botón abrirá facebook.com/nombre_pagina
        Si el campo facebook está vacío, el botón queda desactivado.
      */
      if(fbHandle){
        $('#info-facebook-btn').disabled = false;
        $('#info-facebook-btn').style.opacity = '1';
        $('#info-facebook-btn').onclick = ()=> window.open('https://www.facebook.com/' + fbHandle, '_blank');
      } else {
        $('#info-facebook-btn').disabled = true;
        $('#info-facebook-btn').style.opacity = '0.4';
        $('#info-facebook-btn').onclick = null;
      }

      // Botón volver → regresa al detalle de la barbería
      $('#info-back').onclick = ()=> showScreen('screen-barbershop-detail');
    }

    // Render favorites
    function renderFavorites(){
      const favIds = loadFavorites();
      const allBarbershops = loadBarbershops();
      const favorites = allBarbershops.filter(b => favIds.includes(b.id));
      const favList = $('#favorites-list');
      const noFavs = $('#no-favorites');
      
      if(favorites.length === 0){
        favList.innerHTML = '';
        noFavs.classList.remove('hidden');
      } else {
        noFavs.classList.add('hidden');
        favList.innerHTML = '';
        favorites.forEach(b => {
          const div = document.createElement('div');
          div.className = 'barbershop-card';
          div.innerHTML = `
            <div class="img">${b.emoji}</div>
            <div class="info">
              <div>
                <div class="name">${b.name}</div>
                <div class="location">📍 ${b.location}</div>
                <div class="hours">🕐 ${b.openTime} - ${b.closeTime}</div>
              </div>
              <div class="rating">
                <span class="stars">★ ${b.rating}</span>
                <span class="score">(${Math.floor(Math.random()*100)+20} opiniones)</span>
              </div>
            </div>
          `;
          div.addEventListener('click', () => openBarbershopDetail(b.id));
          favList.appendChild(div);
        });
      }
    }

    // ================================================================ //
    // PERFIL                                                            //
    // Muestra los datos del usuario logueado (nombre, rol e inicial     //
    // como avatar). AGREGAR ACÁ: foto de perfil real, edición de datos. //
    // ================================================================ //
    function renderProfile(){
      const user = getUser();
      if(!user) return;
      const name = user.username || 'Usuario';
      $('#profile-username').textContent = name;
      $('#profile-role').textContent = user.role === 'admin' ? 'Barbero' : 'Cliente';
      $('#profile-avatar').textContent = name.slice(0, 2).toUpperCase();
      // Mostrar botón Admin solo si el usuario es invitado (sin uid = no es cuenta Firebase)
      const adminRow = document.getElementById('profile-admin-row');
      if(adminRow){
        const isGuest = name === 'Invitado' && !user.uid;
        adminRow.style.display = isGuest ? 'block' : 'none';
      }
    }

    // ================================================================ //
    // BANDEJA DE MENSAJES                                               //
    // ================================================================ //
    function renderMessagesInbox(filterText){
      const list = $('#messages-inbox-list');
      if(!list) return;
      const filter = (filterText || '').trim().toLowerCase();
      const conversations = loadConversations().filter(c => c.name.toLowerCase().includes(filter));
      list.innerHTML = '';

      if(conversations.length === 0){
        list.innerHTML = '<div class="muted center" style="padding:16px">No hay conversaciones</div>';
        return;
      }

      conversations.forEach(c=>{
        const lastMsg = c.messages[c.messages.length - 1];
        const div = document.createElement('div');
        div.className = 'message-item';
        div.innerHTML = `
          <div class="message-avatar">${c.avatar}</div>
          <div class="message-info">
            <div class="message-name">
              <span>${c.name}</span>
              <span class="message-time">${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <div class="message-preview">${lastMsg ? lastMsg.text : 'Sin mensajes'}</div>
          </div>
          ${c.unread ? '<div class="message-unread-dot"></div>' : ''}
        `;
        div.addEventListener('click', ()=> openConversation(c.id));
        list.appendChild(div);
      });

      // Actualizar punto rojo del botón Mensajes
      updateMessagesDot();
      // AGREGAR ACÁ: lógica extra al renderizar la bandeja (ej. ordenar
      // por no leídos primero, mostrar tabs, etc).
    }

    function updateMessagesDot(){
      const dot = document.getElementById('btn-messages-dot');
      if(!dot) return;
      const hasUnread = loadConversations().some(c => c.unread);
      dot.style.display = hasUnread ? 'block' : 'none';
    }

    // ================================================================ //
    // CHAT / MENSAJE INDIVIDUAL                                         //
    // ================================================================ //
    let currentConversationId = null;

    function openConversation(id){
      currentConversationId = id;
      const conversations = loadConversations();
      const conv = conversations.find(c => c.id === id);
      if(conv){
        conv.unread = false; // se marca como leído al abrir
        saveConversations(conversations);
      }
      renderConversation();
      showScreen('screen-message-detail');
      updateMessagesDot();
    }

    function renderConversation(){
      const conv = loadConversations().find(c => c.id === currentConversationId);
      if(!conv) return;
      $('#message-detail-avatar').textContent = conv.avatar;
      $('#message-detail-name').textContent = conv.name;

      const body = $('#message-chat-body');
      body.innerHTML = '';
      conv.messages.forEach(m=>{
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${m.from === 'me' ? 'me' : 'them'}`;
        bubble.innerHTML = `${m.text}<span class="chat-time">${m.time}</span>`;
        body.appendChild(bubble);
      });
      body.scrollTop = body.scrollHeight;

      // AGREGAR ACÁ: indicador de "escribiendo...", estados de envío, etc.
    }

    function sendMessage(){
      const input = $('#message-input');
      const text = input.value.trim();
      if(!text || !currentConversationId) return;
      const conversations = loadConversations();
      const conv = conversations.find(c => c.id === currentConversationId);
      if(!conv) return;
      const now = new Date();
      conv.messages.push({ from: 'me', text, time: now.toLocaleTimeString('es-AR', { hour:'2-digit', minute:'2-digit' }) });
      saveConversations(conversations);
      input.value = '';
      renderConversation();
      // Notificar al panel externo que la app envió un mensaje
      window.dispatchEvent(new CustomEvent('turnera_app_sent'));
    }

    // ================================================================ //
    // CONFIGURACIÓN                                                     //
    // Notificaciones (toggle), volumen (slider), cambiar contraseña     //
    // (acción simulada) y modo claro/oscuro (toggle, persistido).       //
    // AGREGAR ACÁ: conectar estos valores a un backend real si hace     //
    // falta (por ahora todo se guarda en localStorage).                 //
    // ================================================================ //
    function loadConfig(){
      try{
        return JSON.parse(localStorage.getItem('turnera_config')) || { notifications: true, volume: 70, theme: 'light' };
      }catch(e){
        return { notifications: true, volume: 70, theme: 'light' };
      }
    }
    function saveConfig(cfg){ localStorage.setItem('turnera_config', JSON.stringify(cfg)) }

    function applyTheme(theme){
      const phone = document.getElementById('phone-frame');
      const icon = $('#config-theme-icon');
      const toggle = $('#config-theme-toggle');
      const label = document.querySelector('#screen-config .config-item:last-child .config-label');
      if(theme === 'light'){
        phone.classList.add('light-mode');
        if(icon) icon.textContent = '☀️';
        if(label) label.textContent = 'Modo claro';
        if(toggle) toggle.checked = true;
      } else {
        phone.classList.remove('light-mode');
        if(icon) icon.textContent = '🌙';
        if(label) label.textContent = 'Modo oscuro';
        if(toggle) toggle.checked = false;
      }
    }

    function initConfig(){
      const cfg = loadConfig();

      // Aplicar valores guardados a los controles
      const notifToggle = $('#config-notifications-toggle');
      const volumeSlider = $('#config-volume-slider');
      if(notifToggle) notifToggle.checked = !!cfg.notifications;
      if(volumeSlider) volumeSlider.value = cfg.volume;
      applyTheme(cfg.theme);

      // Notificaciones on/off
      notifToggle?.addEventListener('change', (e)=>{
        const c = loadConfig();
        c.notifications = e.target.checked;
        saveConfig(c);
        toast(c.notifications ? 'Notificaciones activadas' : 'Notificaciones desactivadas');
      });

      // Volumen
      volumeSlider?.addEventListener('input', (e)=>{
        const c = loadConfig();
        c.volume = Number(e.target.value);
        saveConfig(c);
      });

      // Cambiar contraseña (simulado)
      $('#config-change-password')?.addEventListener('click', ()=>{
        const current = prompt('Contraseña actual');
        if(current === null) return;
        const next = prompt('Nueva contraseña');
        if(next === null) return;
        if(!next.trim()){ toast('La contraseña no puede estar vacía'); return; }
        toast('Contraseña actualizada');
        // AGREGAR ACÁ: validar contra backend real y guardar el cambio.
      });

      // Modo claro/oscuro
      $('#config-theme-toggle')?.addEventListener('change', (e)=>{
        const theme = e.target.checked ? 'light' : 'dark';
        applyTheme(theme);
        const c = loadConfig();
        c.theme = theme;
        saveConfig(c);
      });
    }

    // ================================================================ //
    // NOTIFICACIONES                                                    //
    // ================================================================ //
    function renderNotifications(){
      const list = $('#notifications-list');
      if(!list) return;
      list.innerHTML = '';

      const user = getUser();
      const isAdmin = user && user.role === 'admin';

      let items = [];
      if(isAdmin){
        const unreadClients = loadConversations().filter(c => c.unread);
        const dynamicMsgNotifications = unreadClients.map(c => ({
          icon: '💬',
          text: `Nuevo mensaje de ${c.name}: "${(c.messages[c.messages.length-1]?.text || '').slice(0,40)}${(c.messages[c.messages.length-1]?.text || '').length > 40 ? '…' : ''}"`,
          time: c.messages[c.messages.length-1]?.time || '',
          conversationId: c.id
        }));
        items = [...dynamicMsgNotifications, ...defaultAdminNotifications];
      } else {
        const userNotifs = loadUserNotifications();
        items = [...userNotifs, ...defaultNotifications];
      }

      if(items.length === 0){
        list.innerHTML = '<div class="muted center" style="padding:16px">Sin notificaciones</div>';
        return;
      }

      items.forEach((n, idx)=>{
        const div = document.createElement('div');
        div.className = 'notification-item';
        if(n.conversationId) div.style.cursor = 'pointer';

        // Solo las notificaciones del usuario (con createdAt) tienen botón de eliminar
        const isDeletable = !!n.createdAt && !isAdmin;

        div.innerHTML = `
          <div class="notification-icon">${n.icon}</div>
          <div style="flex:1;min-width:0">
            <div class="notification-text">${n.text}</div>
            <div class="notification-time">${n.time}</div>
          </div>
          ${isDeletable ? `<button class="notif-delete-btn" title="Eliminar aviso">✕</button>` : ''}
        `;

        if(n.conversationId){
          div.addEventListener('click', ()=> openConversation(n.conversationId));
        }

        // Botón eliminar: solo remueve del array persistido de userNotifs
        if(isDeletable){
          div.querySelector('.notif-delete-btn').addEventListener('click', e=>{
            e.stopPropagation();
            const notifs = loadUserNotifications();
            // Eliminar por createdAt + texto (identificador único)
            const updated = notifs.filter(x => !(x.createdAt === n.createdAt && x.text === n.text));
            localStorage.setItem('turnera_user_notifs', JSON.stringify(updated));
            // Animación de salida
            div.style.transition = 'opacity .2s, transform .2s';
            div.style.opacity = '0';
            div.style.transform = 'translateX(20px)';
            setTimeout(()=>{ renderNotifications(); }, 220);
          });
        }

        list.appendChild(div);
      });
    }

    // Bind UI buttons
    function bindUI(){
      // Login actions
      $('#btn-login')?.addEventListener('click', handleLogin);
      $('#btn-guest')?.addEventListener('click', ()=>{
        setUser({ username: 'Invitado', role: 'user' });
        showScreen('screen-home');
        toast('Entraste como invitado');
      });


      $('#btn-logout')?.addEventListener('click', ()=>{
        setUser(null);
        showScreen('screen-login');
        toast('Sesión cerrada');
      });

      // Registro: ir al formulario de registro, volver, y crear cuenta
      $('#link-register')?.addEventListener('click', ()=>{
        showScreen('screen-register');
      });
      $('#register-back')?.addEventListener('click', ()=> showScreen('screen-login'));

      // Perfil: accesos rápidos a información personal, configuración, ayuda, políticas y salir
      $('#profile-go-personal-info')?.addEventListener('click', ()=> toast('Mi información personal (próximamente)'));
      $('#profile-go-config')?.addEventListener('click', ()=> showScreen('screen-config'));
      $('#profile-go-help')?.addEventListener('click', ()=> toast('Centro de ayuda (próximamente)'));
      $('#profile-go-policies')?.addEventListener('click', ()=> toast('Políticas y seguridad (próximamente)'));
      $('#profile-logout')?.addEventListener('click', async ()=>{
        if(typeof window.firebaseLogout === 'function'){
          try{ await window.firebaseLogout(); }catch(e){}
        }
        setUser(null);
        showScreen('screen-login');
        toast('Sesión cerrada');
      });

      // Botón Admin: solo visible para invitados, cambia al rol admin
      $('#profile-switch-admin')?.addEventListener('click', ()=>{
        setUser({ username: 'Admin', role: 'admin' });
        updateNavForRole();
        renderAuth();
        renderProfile();
        showScreen('screen-home');
        toast('Modo admin activado 🔑');
      });
      $('#btn-register-submit')?.addEventListener('click', handleRegister);

      // Header buttons
      $('#btn-messages').addEventListener('click', ()=> showScreen('screen-messages'));
      $('#btn-config').addEventListener('click', ()=> showScreen('screen-config'));

      // Configuración: notificaciones, volumen, contraseña, tema
      initConfig();

      // Mensajes: búsqueda en la bandeja
      $('#messages-search')?.addEventListener('input', e=>{
        renderMessagesInbox(e.target.value);
      });

      // Mensajes: volver de un chat a la bandeja
      $('#message-back')?.addEventListener('click', ()=> showScreen('screen-messages'));

      // Mensajes: enviar
      $('#message-send-btn')?.addEventListener('click', sendMessage);
      $('#message-input')?.addEventListener('keydown', e=>{
        if(e.key === 'Enter') sendMessage();
      });

      // Mensajes: botón de voz (simulado). Reemplazar por grabación real
      // si en algún momento se conecta un backend de audio.
      $('#message-mic-btn')?.addEventListener('click', ()=>{
        toast('Mensaje de voz - función simulada');
      });

      // Admin add shift
      $('#add-shift').addEventListener('click', ()=>{
        const user = getUser();
        if(!user || user.role !== 'admin'){ toast('Solo admin puede agregar turnos'); return; }
        const time = $('#shift-time').value.trim();
        const price = Number($('#shift-price').value);
        const slots = Number($('#shift-slots').value);
        if(!time || !price || !slots){ toast('Completa los campos'); return; }
        const arr = loadShifts();
        arr.push({ id: idGen(), time, price, slots });
        saveShifts(arr);
        $('#shift-time').value=''; $('#shift-price').value=''; $('#shift-slots').value='1';
        renderShifts();
        toast('Turno agregado');
      });

      // Booking and payment
      $('#pay-mercado').addEventListener('click', ()=>{
        if(!currentBooking) return;
        toast('Procesando pago con Mercado Pago...');
        // Simulación: el pago siempre se aprueba después de un instante.
        setTimeout(()=>{
          confirmReservation('Pago con Mercado Pago simulado - exitoso', 'mercadopago');
        }, 700);
      });
      $('#pay-presencial').addEventListener('click', ()=>{
        if(!currentBooking) return;
        confirmReservation('Pago en efectivo en el local', 'efectivo');
      });

      // Volver atrás sin confirmar la reserva
      $('#booking-back')?.addEventListener('click', ()=>{
        currentBooking = null;
        showScreen('screen-home');
      });
      $('#booking-cancel')?.addEventListener('click', ()=>{
        currentBooking = null;
        showBookingList();
        $all('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.screen === 'screen-book'));
      });

      // Logout button inside header area
      $('#btn-logout').addEventListener('click', ()=>{
        setUser(null);
        showScreen('screen-login');
      });

      // Barbershop detail events
      $('#detail-back').addEventListener('click', ()=>{
        showScreen('screen-home');
        renderBarbershops();
      });
      $('#detail-like').addEventListener('click', ()=>{
        if(!currentBarbershop) return;
        const added = toggleFavorite(currentBarbershop.id);
        $('#detail-like').textContent = added ? '❤' : '♡';
        toast(added ? 'Agregado a favoritos' : 'Removido de favoritos');
        renderFavorites();
      });
      $('#detail-info').addEventListener('click', ()=>{
        if(!currentBarbershop) return;
        renderBarbershopInfo();
        showScreen('screen-barbershop-info');
      });
      $('#view-more-shifts-btn').addEventListener('click', ()=>{
        const modal = $('#modal-shifts');
        const list = $('#modal-shifts-list');
        const shop = currentBarbershop;
        if(!shop) return;

        // Todos los turnos del modal — misma key de cupos que usa la pantalla de detalle
        const detailSlotsKey = 'detail_slots_' + shop.id;
        const defaultModalShifts = [
          { id: shop.id+'_09',   time: "09:00", price: 1500, slots: 3 },
          { id: shop.id+'_0930', time: "09:30", price: 1500, slots: 2 },
          { id: shop.id+'_10',   time: "10:00", price: 1800, slots: 4 },
          { id: shop.id+'_11',   time: "11:00", price: 1800, slots: 2 },
          { id: shop.id+'_1130', time: "11:30", price: 2000, slots: 3 },
          { id: shop.id+'_14',   time: "14:00", price: 2000, slots: 4 },
          { id: shop.id+'_15',   time: "15:00", price: 2200, slots: 2 },
          { id: shop.id+'_16',   time: "16:00", price: 2200, slots: 3 }
        ];

        function renderModalShifts(){
          list.innerHTML = '';
          let savedSlots = {};
          try{ savedSlots = JSON.parse(localStorage.getItem(detailSlotsKey) || '{}'); }catch(e){}

          defaultModalShifts.forEach(s => {
            const currentSlots = savedSlots[s.id] !== undefined ? savedSlots[s.id] : s.slots;
            const noSlots = currentSlots <= 0;
            const div = document.createElement('div');
            div.className = 'shift';
            div.innerHTML = `
              <div class="meta">
                <strong>${s.time}</strong>
                <div class="sub">$${s.price} • <span style="color:${noSlots ? '#ef4444' : 'var(--muted)'}">${noSlots ? 'Sin cupos' : currentSlots + ' cupos'}</span></div>
              </div>
              <button class="btn small" style="padding:7px 14px;font-size:12px;width:auto;flex-shrink:0;${noSlots ? 'opacity:.4;cursor:not-allowed' : ''}" ${noSlots ? 'disabled' : ''}>Reservar</button>
            `;
            if(!noSlots){
              div.querySelector('button').addEventListener('click', ()=>{
                // Descontar cupo y persistir
                const upd = JSON.parse(localStorage.getItem(detailSlotsKey) || '{}');
                upd[s.id] = (upd[s.id] !== undefined ? upd[s.id] : s.slots) - 1;
                localStorage.setItem(detailSlotsKey, JSON.stringify(upd));
                modal.classList.add('hidden');
                openBooking({ id: s.id, time: s.time, price: s.price, slots: currentSlots, shopName: shop.name, shopEmoji: shop.emoji });
              });
            }
            list.appendChild(div);
          });
        }

        renderModalShifts();
        modal.classList.remove('hidden');
      });

      $('#modal-shifts-close').addEventListener('click', ()=>{
        $('#modal-shifts').classList.add('hidden');
      });

      $('#comment-submit').addEventListener('click', ()=>{
        const input = $('#comment-input');
        const text = input.value.trim();
        if(!text){ toast('Escribe un comentario'); return; }
        const user = getUser();
        if(!user){ toast('Debes iniciar sesión'); return; }
        
        const commentsKey = `comments_${currentBarbershop.id}`;
        const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
        comments.push({
          author: user.username,
          text: text,
          date: new Date().toISOString()
        });
        localStorage.setItem(commentsKey, JSON.stringify(comments));
        input.value = '';
        renderBarbershopDetail();
        toast('Comentario publicado');
      });

      // Close modal on backdrop click
      $('#modal-shifts').addEventListener('click', (e)=>{
        if(e.target === e.currentTarget) e.currentTarget.classList.add('hidden');
      });
    }

    // Login handler
    async function handleLogin(){
      const email    = $('#login-username').value.trim();
      const password = $('#login-password').value;

      if(!email || !password){ toast('Completá email y contraseña'); return; }

      // ── Intento con Firebase Authentication + Firestore ──
      if(typeof window.firebaseLogin === 'function'){
        try {
          const cred = await window.firebaseLogin(email, password);
          // firebaseLogin ya resuelve el perfil desde Firestore (nombre + rol)
          const profile = cred._profile || {
            username: cred.user.displayName || email.split('@')[0],
            role: 'user',
            uid: cred.user.uid,
            email: cred.user.email
          };
          setUser(profile);
          $('#login-username').value = ''; $('#login-password').value = '';
          showScreen('screen-home');
          toast('Sesión iniciada ✓');
        } catch(err) {
          const msg = firebaseErrorMsg(err.code);
          toast(msg);
        }
        return;
      }

      // Firebase no está configurado — bloquear acceso
      toast('Error de conexión con el servidor. Intentá de nuevo.');
    }

    function firebaseErrorMsg(code){
      const msgs = {
        'auth/invalid-email':          'El email no es válido',
        'auth/user-not-found':         'No existe una cuenta con ese email',
        'auth/wrong-password':         'Contraseña incorrecta',
        'auth/invalid-credential':     'Email o contraseña incorrectos',
        'auth/too-many-requests':      'Demasiados intentos. Esperá un momento',
        'auth/email-already-in-use':   'Ese email ya tiene una cuenta',
        'auth/weak-password':          'La contraseña es muy débil (mínimo 6 caracteres)',
        'auth/network-request-failed': 'Sin conexión a internet',
      };
      return msgs[code] || 'Error: ' + code;
    }

    // ================================================================ //
    // REGISTRO DE USUARIO NUEVO — conectado a Firebase Authentication   //
    // Al registrarse:                                                   //
    //   1. Firebase crea el usuario con email + contraseña              //
    //   2. El nombre de usuario se guarda como displayName en Firebase  //
    //   3. El rol 'user' se guarda en localStorage por UID              //
    //   4. Se inicia sesión automáticamente                             //
    // ================================================================ //
    function showRegisterError(msg){
      const el = $('#register-error');
      if(!el) return;
      el.textContent = msg;
      el.style.display = msg ? 'block' : 'none';
    }

    async function handleRegister(){
      const username        = $('#register-username').value.trim();
      const email           = $('#register-email').value.trim();
      const password        = $('#register-password').value;
      const passwordConfirm = $('#register-password-confirm').value;

      showRegisterError('');

      if(!username || username.length < 2){ showRegisterError('Elegí un nombre de usuario válido'); return; }
      if(!email || !email.includes('@')){ showRegisterError('Ingresá un email válido'); return; }
      if(!password || password.length < 6){ showRegisterError('La contraseña debe tener al menos 6 caracteres'); return; }
      if(password !== passwordConfirm){ showRegisterError('Las contraseñas no coinciden'); return; }

      // ── Registro con Firebase ──
      if(typeof window.firebaseRegister === 'function'){
        const btn = $('#btn-register-submit');
        btn.disabled = true;
        btn.textContent = 'Creando cuenta...';
        try {
          const cred = await window.firebaseRegister(email, password, username);
          const fbUser = cred.user;

          // El rol y nombre ya quedaron guardados en Firestore por firebaseRegister
          // No se necesita localStorage para el rol

          // Limpiar formulario
          $('#register-username').value = '';
          $('#register-email').value    = '';
          $('#register-password').value = '';
          $('#register-password-confirm').value = '';

          // Iniciar sesión automáticamente
          setUser({ username, role: 'user', uid: fbUser.uid, email: fbUser.email });
          showScreen('screen-home');
          toast('Cuenta creada, ¡bienvenido ' + username + '!');
        } catch(err) {
          showRegisterError(firebaseErrorMsg(err.code));
        } finally {
          btn.disabled = false;
          btn.textContent = 'Registrarme';
        }
        return;
      }

      // Firebase no está configurado — bloquear registro
      showRegisterError('Error de conexión. Verificá tu conexión a internet e intentá de nuevo.');
    }


    // Edit shift prompt
    function openEditShift(id){
      const arr = loadShifts();
      const s = arr.find(x=>x.id===id);
      if(!s) return;
      const newTime = prompt('Horario', s.time);
      if(newTime===null) return;
      const newPrice = prompt('Precio', s.price);
      if(newPrice===null) return;
      const newSlots = prompt('Cupos', s.slots);
      if(newSlots===null) return;
      s.time = newTime.trim() || s.time;
      s.price = Number(newPrice) || s.price;
      s.slots = Math.max(0, Number(newSlots) || s.slots);
      saveShifts(arr);
      renderShifts();
      toast('Turno actualizado');
    }

    // Booking flow
    let currentBooking = null;
    function openBooking(shift){
      currentBooking = shift;
      const today = new Date();
      const dateLabel = `Hoy, ${today.toLocaleDateString('es-AR', { day:'2-digit', month:'short' })}`;

      $('#booking-shop-name').textContent = shift.shopName || 'Barbería';
      $('#booking-detail-date').textContent = dateLabel;
      $('#booking-detail-time').textContent = shift.time;
      $('#booking-detail-price').textContent = `$${shift.price}`;

      showScreen('screen-book');
    }

    function confirmReservation(note, paymentMethod){
      const arr = loadShifts();
      const s = arr.find(x=>x.id===currentBooking.id);
      // Los turnos de ejemplo (preview/modal) no siempre existen en
      // turnera_shifts; si no está, simplemente no descontamos cupos
      // de esa lista (es un turno simulado de una barbería de muestra).
      if(s){
        if(s.slots<=0){ toast('Turno no disponible'); return; }
        s.slots = s.slots - 1;
        saveShifts(arr);
      }
      const bookings = JSON.parse(localStorage.getItem('turnera_bookings') || '[]');
      bookings.push({
        id: idGen(),
        shiftId: currentBooking.id,
        time: currentBooking.time,
        price: currentBooking.price,
        shopName: currentBooking.shopName || 'Barbería',
        shopEmoji: currentBooking.shopEmoji || '💈',
        date: new Date().toISOString(),
        user: getUser().username,
        paymentMethod,
        note,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('turnera_bookings', JSON.stringify(bookings));

      const lastBooking = bookings[bookings.length - 1];

      // ── Notificación de reserva confirmada ──
      addUserNotification({
        icon: '📅',
        text: `Reserva confirmada en ${lastBooking.shopName} · ${lastBooking.time} · $${lastBooking.price}`,
        time: 'Ahora',
        createdAt: new Date().toISOString()
      });
      flashNavBtn('green');

      // ── Si fue con Mercado Pago: generar comprobante y enviarlo a la barbería ──
      if(paymentMethod === 'mercadopago'){
        const user = getUser();
        const fecha = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
        const hora  = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        const comprobante =
          `✅ *COMPROBANTE DE PAGO — Mercado Pago*
` +
          `━━━━━━━━━━━━━━━━━━━━━━━━
` +
          `👤 Cliente: ${user.username}
` +
          `💈 Barbería: ${lastBooking.shopName}
` +
          `🕐 Turno: ${lastBooking.time}
` +
          `💰 Monto: $${lastBooking.price}
` +
          `📅 Fecha: ${fecha} a las ${hora}
` +
          `🔖 ID: ${lastBooking.id.toUpperCase()}
` +
          `━━━━━━━━━━━━━━━━━━━━━━━━
` +
          `Pago procesado exitosamente ✔`;

        // Inyectar mensaje automático a la bandeja de mensajes de la barbería
        setTimeout(()=>{
          let convs = [];
          try{ convs = JSON.parse(localStorage.getItem('turnera_conversations') || '[]'); }catch(e){}
          // Buscar conversación de esta barbería o usar la primera disponible
          let conv = convs.find(cv => cv.name.toLowerCase().includes(lastBooking.shopName.split(' ')[0].toLowerCase()));
          if(!conv && convs.length > 0) conv = convs[0];
          if(conv){
            const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            conv.messages.push({ from: 'me', text: comprobante, time: now });
            conv.unread = false;
            localStorage.setItem('turnera_conversations', JSON.stringify(convs));
            window.dispatchEvent(new CustomEvent('turnera_msg_incoming'));
          }
          // También notificar al chat del admin
          let adminConvs = [];
          try{ adminConvs = JSON.parse(localStorage.getItem('turnera_conversations_admin') || '[]'); }catch(e){}
          if(adminConvs.length > 0){
            const now = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            adminConvs[0].messages.push({ from: 'them', text: comprobante, time: now });
            adminConvs[0].unread = true;
            localStorage.setItem('turnera_conversations_admin', JSON.stringify(adminConvs));
            window.dispatchEvent(new CustomEvent('turnera_msg_incoming'));
          }
        }, 800);

        // Mostrar comprobante en modal con toast largo
        setTimeout(()=> toast('🧾 Comprobante enviado a la barbería'), 1000);
      }

      currentBooking = null;
      renderShifts();
      showBookingList();
      toast('Reserva confirmada');
    }

    // ============================================================ //
    // Alterna entre la vista de confirmación de un turno puntual y  //
    // la vista de "Mis reservas" dentro de #screen-book, según si   //
    // hay o no un turno pendiente de confirmar (currentBooking).    //
    // ============================================================ //
    function showBookingConfirm(){
      $('#booking-confirm')?.classList.remove('hidden');
      $('#booking-list')?.classList.add('hidden');
    }
    function showBookingList(){
      $('#booking-confirm')?.classList.add('hidden');
      $('#booking-list')?.classList.remove('hidden');
      renderMyBookings();
    }

    function renderMyBookings(){
      const list = $('#my-bookings-list');
      const empty = $('#no-bookings');
      if(!list) return;
      const user = getUser();
      const bookings = JSON.parse(localStorage.getItem('turnera_bookings') || '[]')
        .filter(b => user && b.user === user.username && b.status !== 'cancelled')
        .sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));

      list.innerHTML = '';
      if(bookings.length === 0){
        empty?.classList.remove('hidden');
        return;
      }
      empty?.classList.add('hidden');

      bookings.forEach(b=>{
        const dateLabel = new Date(b.date).toLocaleDateString('es-AR', { day:'2-digit', month:'short' });
        // Estados:
        // 'paid' / 'cash'  → turno normal recién reservado, sin botones
        // 'reminder'       → amarillo activó recordatorio → mostrar Confirmar + Reprogramar
        // 'confirmed'      → el usuario confirmó → badge verde "Confirmado ✓"
        // 'rescheduled'    → reprogramado → badge amarillo, mostrar Confirmar
        // 'cancelled'      → cancelado por rojo → badge rojo, sin botones
        const status = b.status || (b.paymentMethod === 'efectivo' ? 'cash' : 'paid');

        const statusMap = {
          paid:        { cls:'paid',        label:'Pagado' },
          cash:        { cls:'cash',        label:'Efectivo' },
          reminder:    { cls:'rescheduled', label:'Pendiente ⏰' },
          rescheduled: { cls:'rescheduled', label:'Reprogramado 📅' },
          confirmed:   { cls:'paid',        label:'Confirmado ✓' },
          cancelled:   { cls:'cancelled',   label:'Cancelado' },
        };
        const st = statusMap[status] || statusMap.paid;
        const isCancelled  = status === 'cancelled';
        const isNormal     = status === 'paid' || status === 'cash';
        const isReminder   = status === 'reminder';
        const isRescheduled= status === 'rescheduled';
        const isConfirmed  = status === 'confirmed';

        // Clases visuales del contenedor
        let itemCls = 'my-booking-item';
        if(isReminder || isRescheduled) itemCls += ' rescheduled-item';
        if(isCancelled) itemCls += ' cancelled-item';

        // Botones según estado
        let actionButtons = '';
        if(isReminder){
          actionButtons = `
            <div class="booking-actions">
              <button class="booking-action-btn booking-action-confirm" data-id="${b.id}">✓ Confirmar asistencia</button>
              <button class="booking-action-btn booking-action-reschedule" data-id="${b.id}">📅 Reprogramar</button>
            </div>`;
        } else if(isRescheduled){
          actionButtons = `
            <div class="booking-actions">
              <button class="booking-action-btn booking-action-confirm" data-id="${b.id}">✓ Confirmar turno</button>
            </div>`;
        } else if(isCancelled){
          actionButtons = `<div style="font-size:11px;color:#ef4444;margin-top:6px;padding-left:2px">Este turno fue cancelado por la barbería</div>`;
        }
        // isNormal e isConfirmed → sin botones

        const div = document.createElement('div');
        div.className = itemCls;
        div.innerHTML = `
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:${actionButtons ? '6px' : '0'}">
              <span style="font-size:20px;flex-shrink:0">${b.shopEmoji || '💈'}</span>
              <div class="my-booking-info" style="flex:1;min-width:0">
                <div class="my-booking-shop">${b.shopName || 'Barbería'}</div>
                <div class="my-booking-meta">${dateLabel} • ${b.time} • $${b.price}</div>
              </div>
              <div class="my-booking-status ${st.cls}">${st.label}</div>
            </div>
            ${actionButtons}
          </div>
        `;

        // Listeners de botones
        div.querySelector('.booking-action-confirm')?.addEventListener('click', ()=>{
          updateBookingStatus(b.id, 'confirmed');
          toast('Asistencia confirmada ✓');
          renderMyBookings();
        });
        div.querySelector('.booking-action-reschedule')?.addEventListener('click', ()=>{
          openRescheduleModal(b.id);
        });

        list.appendChild(div);
      });
    }

    function updateBookingStatus(bookingId, status){
      const bookings = JSON.parse(localStorage.getItem('turnera_bookings') || '[]');
      const b = bookings.find(x => x.id === bookingId);
      if(b){ b.status = status; localStorage.setItem('turnera_bookings', JSON.stringify(bookings)); }
    }


    // ================================================================ //
    // MODAL DE REPROGRAMACIÓN + CALENDARIO                              //
    // ================================================================ //
    let rescheduleBookingId = null;
    let calSelectedDate = null;
    let calSelectedSlot = null;
    let calCurrentYear  = new Date().getFullYear();
    let calCurrentMonth = new Date().getMonth();

    const AVAILABLE_TIMES = ['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','16:00','17:00'];
    // Días no disponibles (0=Dom, 6=Sáb)
    const UNAVAILABLE_DAYS = [0];

    function openRescheduleModal(bookingId){
      rescheduleBookingId = bookingId;
      calSelectedDate = null;
      calSelectedSlot = null;
      calCurrentYear  = new Date().getFullYear();
      calCurrentMonth = new Date().getMonth();
      const bookings = JSON.parse(localStorage.getItem('turnera_bookings')||'[]');
      const b = bookings.find(x=>x.id===bookingId);
      if(b) $('#rs-subtitle').textContent = `Turno actual: ${b.shopName} · ${b.time}`;
      renderCalendar();
      renderSlots();
      $('#rs-confirm-btn').disabled = true;
      document.getElementById('reschedule-overlay').classList.add('open');
    }

    function closeRescheduleModal(){
      document.getElementById('reschedule-overlay').classList.remove('open');
    }

    function renderCalendar(){
      const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      $('#cal-month-label').textContent = monthNames[calCurrentMonth] + ' ' + calCurrentYear;
      const grid = $('#cal-grid');
      grid.innerHTML = '';
      const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
      dayNames.forEach(d=>{ const el=document.createElement('div'); el.className='cal-day-name'; el.textContent=d; grid.appendChild(el); });

      const firstDay = new Date(calCurrentYear, calCurrentMonth, 1).getDay();
      const daysInMonth = new Date(calCurrentYear, calCurrentMonth+1, 0).getDate();
      const today = new Date(); today.setHours(0,0,0,0);

      for(let i=0;i<firstDay;i++){ const el=document.createElement('div'); el.className='cal-day empty'; grid.appendChild(el); }
      for(let d=1;d<=daysInMonth;d++){
        const date = new Date(calCurrentYear, calCurrentMonth, d);
        const el = document.createElement('div');
        const isPast = date < today;
        const isUnavail = UNAVAILABLE_DAYS.includes(date.getDay());
        const dateStr = date.toISOString().slice(0,10);
        const isSelected = calSelectedDate === dateStr;

        el.className = 'cal-day' + (isPast||isUnavail ? ' past' : ' available') + (isSelected ? ' selected' : '');
        el.textContent = d;
        if(!isPast && !isUnavail){
          el.addEventListener('click', ()=>{
            calSelectedDate = dateStr;
            calSelectedSlot = null;
            renderCalendar();
            renderSlots();
            updateRsConfirmBtn();
          });
        }
        grid.appendChild(el);
      }
    }

    function renderSlots(){
      const container = $('#rs-slots');
      container.innerHTML = '';
      AVAILABLE_TIMES.forEach(t=>{
        const el = document.createElement('div');
        el.className = 'rs-slot' + (calSelectedSlot===t ? ' selected' : '') + (!calSelectedDate ? ' unavailable' : '');
        el.textContent = t;
        el.addEventListener('click', ()=>{
          if(!calSelectedDate) return;
          calSelectedSlot = t;
          renderSlots();
          updateRsConfirmBtn();
        });
        container.appendChild(el);
      });
    }

    function updateRsConfirmBtn(){
      $('#rs-confirm-btn').disabled = !(calSelectedDate && calSelectedSlot);
    }

    // Nav de mes
    document.getElementById('cal-prev').addEventListener('click', ()=>{
      calCurrentMonth--; if(calCurrentMonth<0){calCurrentMonth=11;calCurrentYear--;}
      calSelectedDate=null; calSelectedSlot=null; renderCalendar(); renderSlots(); updateRsConfirmBtn();
    });
    document.getElementById('cal-next').addEventListener('click', ()=>{
      calCurrentMonth++; if(calCurrentMonth>11){calCurrentMonth=0;calCurrentYear++;}
      calSelectedDate=null; calSelectedSlot=null; renderCalendar(); renderSlots(); updateRsConfirmBtn();
    });

    // Confirmar reprogramación
    document.getElementById('rs-confirm-btn').addEventListener('click', ()=>{
      if(!rescheduleBookingId || !calSelectedDate || !calSelectedSlot) return;
      const bookings = JSON.parse(localStorage.getItem('turnera_bookings')||'[]');
      const b = bookings.find(x=>x.id===rescheduleBookingId);
      if(b){
        b.time   = calSelectedSlot;
        b.date   = new Date(calSelectedDate + 'T12:00:00').toISOString();
        b.status = 'rescheduled';
        localStorage.setItem('turnera_bookings', JSON.stringify(bookings));
      }
      closeRescheduleModal();
      renderMyBookings();
      toast('Turno reprogramado para ' + calSelectedDate + ' · ' + calSelectedSlot);
    });

    // Cerrar al tocar fuera
    document.getElementById('reschedule-overlay').addEventListener('click', e=>{
      if(e.target===document.getElementById('reschedule-overlay')) closeRescheduleModal();
    });

        // Accessibility: close modal on backdrop click

    // Keyboard enter to login
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && document.activeElement && ['login-username','login-password'].includes(document.activeElement.id)){
        handleLogin();
      }
      if(e.key === 'Enter' && document.activeElement && ['register-username','register-email','register-password','register-password-confirm'].includes(document.activeElement.id)){
        handleRegister();
      }
    });

    // ================================================================ //
    // NOTIFICACIONES DE USUARIO Y FLASH DEL BOTÓN AVISOS               //
    // ================================================================ //

    /** Persiste una notificación nueva para el usuario en localStorage */
    function addUserNotification(notif){
      const notifs = loadUserNotifications();
      notifs.unshift(notif); // más nueva primero
      if(notifs.length > 20) notifs.length = 20; // máximo 20
      localStorage.setItem('turnera_user_notifs', JSON.stringify(notifs));
    }

    /** Carga las notificaciones persistidas del usuario */
    function loadUserNotifications(){
      try{ return JSON.parse(localStorage.getItem('turnera_user_notifs') || '[]') }
      catch(e){ return [] }
    }

    /**
     * Hace parpadear el botón de Avisos en el color indicado.
     * color: 'green' | 'yellow' | 'red'
     * duration (ms): cuánto dura el parpadeo (default 3000)
     */
    function flashNavBtn(color, duration){
      duration = duration || 3000;
      const btn = document.getElementById('nav-notifications');
      if(!btn) return;
      const cls = 'flash-' + color;
      btn.classList.remove('flash-green','flash-yellow','flash-red');
      // forzar reflow para reiniciar la animación si ya estaba corriendo
      void btn.offsetWidth;
      btn.classList.add(cls);
      clearTimeout(btn._flashTimer);
      btn._flashTimer = setTimeout(()=> btn.classList.remove(cls), duration);
    }


    // ================================================================ //
    // PANEL DE VISUALIZACIÓN — muestra turnos en tiempo real            //
    // Se sincroniza con cada cambio en la sección Editar del admin.     //
    // ================================================================ //
    (function(){
      const overlay   = document.getElementById('viz-modal-overlay');
      const openBtn   = document.getElementById('viz-ext-open-btn');
      const closeBtn  = document.getElementById('viz-modal-close');
      const body      = document.getElementById('viz-body');
      const updated   = document.getElementById('viz-updated');
      let   pollTimer = null;
      let   lastHash  = '';

      function openViz(){
        overlay.classList.add('open');
        renderViz();
        // Poll for changes every 800ms while open
        pollTimer = setInterval(()=> renderViz(), 800);
      }
      function closeViz(){
        overlay.classList.remove('open');
        clearInterval(pollTimer);
      }

      openBtn.addEventListener('click', openViz);
      closeBtn.addEventListener('click', closeViz);
      overlay.addEventListener('click', e=>{ if(e.target===overlay) closeViz(); });

      // Also re-render instantly when admin saves shifts
      window.addEventListener('turnera_shifts_changed', renderViz);

      function getShifts(){
        try{ return JSON.parse(localStorage.getItem('turnera_shifts') || '[]'); }
        catch(e){ return []; }
      }

      function getFirstBarbershop(){
        try{
          const bs = JSON.parse(localStorage.getItem('turnera_barbershops') || '[]');
          return bs[0] || { name: 'Barbería', emoji: '💈', location: '', openTime: '09:00', closeTime: '20:00', rating: 4.8 };
        }catch(e){ return { name: 'Barbería', emoji: '💈', location: '', openTime: '09:00', closeTime: '20:00', rating: 4.8 }; }
      }

      function renderViz(){
        const shifts = getShifts();
        const shop   = getFirstBarbershop();

        // Skip re-render if nothing changed
        const hash = JSON.stringify(shifts);
        if(hash === lastHash) return;
        lastHash = hash;

        const now = new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        updated.textContent = 'Última actualización: ' + now;

        // Sort shifts by time
        const sorted = [...shifts].sort((a,b)=> a.time.localeCompare(b.time));

        body.innerHTML = '';

        // Detail header
        const header = document.createElement('div');
        header.className = 'viz-detail-header';
        header.textContent = shop.emoji || '💈';
        body.appendChild(header);

        const detail = document.createElement('div');
        detail.className = 'viz-detail-body';

        // Shop name + meta
        detail.innerHTML = `
          <div class="viz-detail-name">${escViz(shop.name)}</div>
          <div class="viz-detail-meta">
            ★ ${shop.rating || '4.8'} &nbsp;·&nbsp;
            📍 ${escViz(shop.location || 'Buenos Aires')} &nbsp;·&nbsp;
            🕐 ${shop.openTime || '09:00'} - ${shop.closeTime || '20:00'}
          </div>
          <div class="viz-section-title">Turnos disponibles</div>
        `;
        body.appendChild(detail);

        if(sorted.length === 0){
          const empty = document.createElement('div');
          empty.className = 'viz-empty';
          empty.innerHTML = '😴<br>No hay turnos disponibles.<br>Agregá uno desde Editar.';
          body.appendChild(empty);
          return;
        }

        sorted.forEach(s=>{
          const row = document.createElement('div');
          row.className = 'viz-shift-row';
          row.style.margin = '0 16px 6px';
          row.innerHTML = `
            <div>
              <div class="viz-shift-time">${escViz(s.time)}</div>
              <div class="viz-shift-sub">$${s.price} · ${s.slots} cupos</div>
            </div>
            <div class="viz-shift-badge">Reservar</div>
          `;
          body.appendChild(row);
        });

        // Spacer
        const spacer = document.createElement('div');
        spacer.style.height = '16px';
        body.appendChild(spacer);
      }

      function escViz(t){
        return String(t || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }
    })();
    
    // ================================================================ //
    // PANEL EXTERNO DE PRUEBA - Simulador de mensajes en tiempo real    //
    // Usa localStorage + storage event para sincronizar con la app.     //
    // ================================================================ //
    (function(){
      // ---- Estado del panel externo ----
      let extRole = 'barbershop';  // 'barbershop' o 'client'
      let extUser = null;          // { name, role, avatar }
      let extTargetConvId = null;  // id de la conversación destino
      let extMessages = [];        // historial local del panel

      const STORAGE_KEY_EXT = 'turnera_ext_messages'; // canal de comunicación

      // ---- Refs DOM ----
      const overlay      = document.getElementById('ext-modal-overlay');
      const openBtn      = document.getElementById('ext-open-btn');
      const closeBtn     = document.getElementById('ext-close-btn');
      const chatCloseBtn = document.getElementById('ext-chat-close');
      const loginView    = document.getElementById('ext-view-login');
      const chatView     = document.getElementById('ext-view-chat');
      const loginBtn     = document.getElementById('ext-login-btn');
      const backBtn      = document.getElementById('ext-chat-back');
      const sendBtn      = document.getElementById('ext-send-btn');
      const chatInput    = document.getElementById('ext-chat-input');
      const chatBody     = document.getElementById('ext-chat-body');
      const chatEmpty    = document.getElementById('ext-chat-empty');
      const chatName     = document.getElementById('ext-chat-name');
      const chatAvatar   = document.getElementById('ext-chat-avatar');
      const targetSelect = document.getElementById('ext-target-conv');
      const usernameInput= document.getElementById('ext-username');
      const roleTabs     = document.querySelectorAll('.ext-role-tab');

      // ---- Abrir / cerrar modal ----
      function openModal(){ overlay.classList.add('open'); populateTargets(); }
      function closeModal(){ overlay.classList.remove('open'); }

      openBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      chatCloseBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });

      // ---- Role tabs ----
      roleTabs.forEach(tab=>{
        tab.addEventListener('click', ()=>{
          roleTabs.forEach(t=>t.classList.remove('selected'));
          tab.classList.add('selected');
          extRole = tab.dataset.role;
          populateTargets();
        });
      });

      // ---- Poblar conversaciones disponibles ----
      function populateTargets(){
        // El panel siempre puede escribirle a las conversaciones del usuario normal
        // (turnera_conversations) que son con barberías, o al admin (turnera_conversations_admin)
        // dependiendo del rol seleccionado.
        // Si es Barbería -> puede escribirle al USUARIO (aparece en turnera_conversations del usuario)
        // Si es Cliente -> puede escribirle al ADMIN (aparece en turnera_conversations_admin del admin)
        let conversations = [];
        if(extRole === 'barbershop'){
          // Barberías hablan con usuarios -> conversación en bandeja del usuario
          try{ conversations = JSON.parse(localStorage.getItem('turnera_conversations')) || []; }catch(e){}
        } else {
          // Clientes hablan con el admin -> conversación en bandeja del admin
          try{ conversations = JSON.parse(localStorage.getItem('turnera_conversations_admin')) || []; }catch(e){}
        }
        targetSelect.innerHTML = '';
        if(conversations.length === 0){
          const opt = document.createElement('option');
          opt.value = '';
          opt.textContent = 'No hay conversaciones disponibles';
          targetSelect.appendChild(opt);
        } else {
          conversations.forEach(c=>{
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            targetSelect.appendChild(opt);
          });
        }
      }

      // ---- Login / entrar al chat ----
      loginBtn.addEventListener('click', ()=>{
        const name = usernameInput.value.trim();
        if(!name){ usernameInput.focus(); return; }
        const convId = targetSelect.value;
        if(!convId) return;

        extUser = {
          name,
          role: extRole,
          avatar: extRole === 'barbershop' ? '💈' : '🧔'
        };
        extTargetConvId = convId;

        // Cargar historial existente de esa conversación para mostrarlo
        extMessages = getConvMessages(extTargetConvId, extRole);

        // Nombre de la conversación
        let conversations = [];
        const key = extRole === 'barbershop' ? 'turnera_conversations' : 'turnera_conversations_admin';
        try{ conversations = JSON.parse(localStorage.getItem(key)) || []; }catch(e){}
        const conv = conversations.find(c=>c.id===extTargetConvId);
        chatName.textContent = conv ? conv.name : 'Conversación';
        chatAvatar.textContent = extUser.avatar;

        switchToChat();
        renderExtMessages();
      });

      function switchToChat(){
        loginView.classList.remove('active');
        chatView.classList.add('active');
      }
      function switchToLogin(){
        chatView.classList.remove('active');
        loginView.classList.add('active');
        extUser = null;
        extTargetConvId = null;
        extMessages = [];
      }

      backBtn.addEventListener('click', switchToLogin);

      // ---- Obtener mensajes actuales de la conversación ----
      function getConvMessages(convId, role){
        const key = role === 'barbershop' ? 'turnera_conversations' : 'turnera_conversations_admin';
        try{
          const convs = JSON.parse(localStorage.getItem(key)) || [];
          const conv = convs.find(c=>c.id===convId);
          return conv ? [...conv.messages] : [];
        }catch(e){ return []; }
      }

      // ---- Enviar mensaje ----
      function sendExtMessage(){
        const text = chatInput.value.trim();
        if(!text || !extTargetConvId || !extUser) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});

        // El mensaje viene de "them" desde la perspectiva de la app móvil
        const msg = { from: 'them', text, time: timeStr, _extSender: extUser.name };

        // Actualizar la conversación en localStorage
        const convKey = extRole === 'barbershop' ? 'turnera_conversations' : 'turnera_conversations_admin';
        let convs = [];
        try{ convs = JSON.parse(localStorage.getItem(convKey)) || []; }catch(e){}
        const conv = convs.find(c=>c.id===extTargetConvId);
        if(conv){
          conv.messages.push(msg);
          conv.unread = true;
          localStorage.setItem(convKey, JSON.stringify(convs));

          // Disparar evento storage para que la app móvil lo detecte en tiempo real
          // (en la misma pestaña no se dispara automáticamente, usamos un CustomEvent)
          const detail = { key: convKey, newValue: JSON.stringify(convs) };
          window.dispatchEvent(new CustomEvent('turnera_msg_incoming', { detail }));
        }

        // Mostrar en el panel externo como mensaje enviado
        extMessages.push({ from: 'sent', text, time: timeStr });
        chatInput.value = '';
        renderExtMessages();
      }

      sendBtn.addEventListener('click', sendExtMessage);
      chatInput.addEventListener('keydown', e=>{ if(e.key==='Enter') sendExtMessage(); });

      // ---- Renderizar mensajes en el panel externo ----
      function renderExtMessages(){
        // Rebuild from actual conv to show both sides
        const convKey = extRole === 'barbershop' ? 'turnera_conversations' : 'turnera_conversations_admin';
        let convs = [];
        try{ convs = JSON.parse(localStorage.getItem(convKey)) || []; }catch(e){}
        const conv = convs.find(c=>c.id===extTargetConvId);
        const messages = conv ? conv.messages : [];

        chatBody.innerHTML = '';
        if(messages.length === 0){
          chatBody.appendChild(chatEmpty);
          chatEmpty.style.display = 'flex';
          return;
        }
        chatEmpty.style.display = 'none';

        messages.forEach(m=>{
          const bubble = document.createElement('div');
          // Los mensajes "them" son los que envía el panel (aparecen como enviados aquí)
          // Los mensajes "me" son los que la app envió (aparecen como recibidos aquí)
          const isMine = m.from === 'them';
          bubble.className = 'ext-bubble ' + (isMine ? 'sent' : 'recv');
          bubble.innerHTML = `${escapeHtml(m.text)}<span class="ext-time">${m.time}</span>`;
          chatBody.appendChild(bubble);
        });
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      function escapeHtml(t){
        return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }

      // ---- Detectar mensajes enviados desde la APP hacia el panel ----
      // Cuando la app envía un mensaje (función sendMessage), actualizamos el panel
      window.addEventListener('turnera_msg_incoming', ()=>{
        if(extTargetConvId && chatView.classList.contains('active')){
          renderExtMessages();
        }
        // Refrescar también la bandeja y el chat activo de la app móvil
        if(typeof renderMessagesInbox === 'function'){
          renderMessagesInbox(document.getElementById('messages-search')?.value || '');
        }
        if(typeof updateMessagesDot === 'function') updateMessagesDot();
        if(typeof renderConversation === 'function' && typeof currentConversationId !== 'undefined' && currentConversationId){
          renderConversation();
        }
      });

      // También escuchar cuando la app envía mensajes para actualizarlos en el panel
      const _origSaveConversations = window.saveConversations;
      // Monkey-patch saveConversations para disparar el evento
      // (se define después del init, por eso usamos un observer en el storage)
      const _storageObserver = setInterval(()=>{
        // Observar cambios hechos desde la app al chat activo
        if(extTargetConvId && chatView.classList.contains('active')){
          renderExtMessages();
        }
      }, 800);

      // Patch sendMessage de la app para refrescar el panel en tiempo real
      document.addEventListener('turnera_app_sent', ()=>{
        if(extTargetConvId && chatView.classList.contains('active')){
          setTimeout(renderExtMessages, 50);
        }
      });

    })();

    // ================================================================ //
    // PANEL DE NOTIFICACIONES - Semáforo externo                        //
    // ================================================================ //
    (function(){
      const overlay   = document.getElementById('notif-modal-overlay');
      const openBtn   = document.getElementById('notif-ext-open-btn');
      const closeBtn  = document.getElementById('notif-modal-close');
      const semRed    = document.getElementById('sem-red');
      const semYellow = document.getElementById('sem-yellow');
      const semGreen  = document.getElementById('sem-green');
      const semStatus = document.getElementById('sem-status');

      function openModal(){
        overlay.classList.add('open');
        semStatus.style.color = '';
        const hasBooking = !!getLatestBooking();
        // Atenuar rojo y amarillo si no hay turno activo
        [semRed, semYellow].forEach(l=>{
          l.style.cursor = hasBooking ? 'pointer' : 'not-allowed';
          l.style.opacity = hasBooking ? '' : '0.4';
          l.title = hasBooking ? l.title : 'Reservá un turno primero';
        });
        semStatus.textContent = hasBooking
          ? 'Elegí un color para enviar una notificación'
          : '⚠️ Reservá un turno para usar rojo y amarillo';
        semStatus.style.color = hasBooking ? '' : '#f6b73c';
      }
      function closeModal(){ overlay.classList.remove('open') }

      openBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal() });

      /** Obtiene la última reserva del usuario activo */
      function getLatestBooking(){
        const user = (typeof getUser === 'function') ? getUser() : null;
        if(!user) return null;
        const bookings = JSON.parse(localStorage.getItem('turnera_bookings')||'[]')
          .filter(b => b.user === user.username && b.status !== 'cancelled')
          .sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
        return bookings[0] || null;
      }

      /** Inyecta un mensaje automático de la barbería al usuario */
      function injectBarberMessage(text){
        const booking = getLatestBooking();
        if(!booking) return;
        // Buscar la conversación de la barbería en la bandeja del usuario
        let convs = [];
        try{ convs = JSON.parse(localStorage.getItem('turnera_conversations')||'[]'); }catch(e){}
        // Usar la primera conversación disponible (simulando la barbería del turno)
        let conv = convs.find(c=> c.name.toLowerCase().includes(booking.shopName?.split(' ')[0]?.toLowerCase()));
        if(!conv) conv = convs[0]; // fallback a la primera
        if(!conv) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
        conv.messages.push({ from:'them', text, time: timeStr });
        conv.unread = true;
        localStorage.setItem('turnera_conversations', JSON.stringify(convs));
        // Refrescar bandeja y chat si están abiertos
        window.dispatchEvent(new CustomEvent('turnera_msg_incoming'));
      }

      /** Activa visualmente el semáforo y ejecuta la lógica del color */
      function triggerLight(color){
        // Verde siempre funciona (notificación genérica)
        // Amarillo y Rojo solo funcionan si hay un turno activo reservado
        const booking = getLatestBooking();

        if((color === 'yellow' || color === 'red') && !booking){
          // Sin turno activo: feedback visual pero sin acción
          semStatus.textContent = '⚠️ Primero reservá un turno para simular esta notificación';
          semStatus.style.color = '#f6b73c';
          setTimeout(()=>{
            semStatus.textContent = 'Elegí un color para enviar una notificación';
            semStatus.style.color = '';
          }, 3000);
          return;
        }

        // Encender luz del semáforo
        [semRed, semYellow, semGreen].forEach(l => l.classList.remove('active'));
        const lightMap = { red: semRed, yellow: semYellow, green: semGreen };
        lightMap[color]?.classList.add('active');

        flashNavBtn(color, 3000);

        // ── AMARILLO: recordatorio → estado 'reminder' → botones en Reservar ──
        if(color === 'yellow'){
          semStatus.textContent = '🟡 Recordatorio enviado — revisá Reservar y Mensajes';

          // Cambiar estado del turno a 'reminder' para mostrar botones Confirmar/Reprogramar
          const allBookings = JSON.parse(localStorage.getItem('turnera_bookings')||'[]');
          const bk = allBookings.find(x=>x.id===booking.id);
          if(bk && bk.status !== 'rescheduled' && bk.status !== 'confirmed'){
            bk.status = 'reminder';
            localStorage.setItem('turnera_bookings', JSON.stringify(allBookings));
          }

          // Notificación en Avisos
          addUserNotification({
            icon: '⏰',
            text: `Recordatorio de turno en ${booking.shopName} · ${new Date(booking.date).toLocaleDateString('es-AR',{day:'2-digit',month:'short'})} a las ${booking.time}. Confirmá o reprogramá desde la sección Reservar.`,
            time: 'Ahora',
            createdAt: new Date().toISOString()
          });

          // Mensaje automático de la barbería con delay natural
          setTimeout(()=>{
            injectBarberMessage(
              '¡Hola! 👋 Te recordamos que tenés un turno para las ' + booking.time +
              '. ¿Confirmás que vas a venir? Si necesitás reprogramar, avisanos por acá 📅'
            );
          }, 1000);

          setTimeout(()=>{ if(typeof renderNotifications==='function') renderNotifications(); }, 150);
          setTimeout(()=>{ if(typeof renderMyBookings==='function') renderMyBookings(); }, 200);
        }

        // ── ROJO: cancelación por la barbería → estado 'cancelled' ──
        if(color === 'red'){
          semStatus.textContent = '🔴 Turno cancelado — notificación enviada al usuario';

          // Guardar los datos del turno ANTES de cancelarlo
          // (injectBarberMessage llama a getLatestBooking que filtra cancelados)
          const cancelledTime     = booking.time;
          const cancelledShop     = booking.shopName;
          const cancelledDate     = new Date(booking.date).toLocaleDateString('es-AR',{day:'2-digit',month:'short'});
          const cancelledBookingId= booking.id;

          // Inyectar mensaje ANTES de marcar como cancelado para que getLatestBooking lo encuentre
          setTimeout(()=>{
            injectBarberMessage(
              'Hola, lamentamos informarte que tu turno para las ' + cancelledTime +
              ' fue cancelado. 😔 Disculpá los inconvenientes. Podés reprogramar cuando quieras.'
            );
          }, 1000);

          // Marcar como cancelado (después del mensaje para no romper getLatestBooking)
          setTimeout(()=>{
            const allBookings = JSON.parse(localStorage.getItem('turnera_bookings')||'[]');
            const bk = allBookings.find(x=>x.id===cancelledBookingId);
            if(bk){ bk.status = 'cancelled'; localStorage.setItem('turnera_bookings', JSON.stringify(allBookings)); }
            if(typeof renderMyBookings==='function') renderMyBookings();
          }, 1200);

          // Notificación en Avisos
          addUserNotification({
            icon: '❌',
            text: `Tu turno en ${cancelledShop} del ${cancelledDate} a las ${cancelledTime} fue cancelado por la barbería.`,
            time: 'Ahora',
            createdAt: new Date().toISOString()
          });

          setTimeout(()=>{ if(typeof renderNotifications==='function') renderNotifications(); }, 150);
        }

        // ── VERDE: notificación genérica ──
        if(color === 'green'){
          semStatus.textContent = '🟢 Notificación verde enviada a la app';
        }

        // Apagar semáforo después de 3.5s
        clearTimeout(overlay._semTimer);
        overlay._semTimer = setTimeout(()=>{
          [semRed, semYellow, semGreen].forEach(l => l.classList.remove('active'));
          semStatus.textContent = 'Elegí un color para enviar una notificación';
          semStatus.style.color = '';
        }, 3500);
      }

      semRed.addEventListener('click',    ()=> triggerLight('red'));
      semYellow.addEventListener('click', ()=> triggerLight('yellow'));
      semGreen.addEventListener('click',  ()=> triggerLight('green'));
    })();