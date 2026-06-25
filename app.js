  // ================================================================
    // FIREBASE AUTHENTICATION + FIRESTORE
    // ================================================================
    // INSTRUCCIONES:
    //   1. Entrá a console.firebase.google.com
    //   2. Habilitá Authentication → Sign-in method → Email/Contraseña
    //   3. Habilitá Firestore Database → Crear base de datos → Modo prueba
    //   4. En ⚙️ Configuración → Tus apps → Web → copiá firebaseConfig
    //   5. Pegá los valores reales abajo reemplazando los "TU_..."
    //
    // ¿Cómo funciona el rol admin?
    //   - Al registrarte → Firestore guarda { nombre, email, rol: "user" }
    //   - Para hacer admin a alguien: en Firestore Console, abrí la colección
    //     "usuarios" → buscá el documento con el UID → cambiá "rol" a "admin"
    //   - La próxima vez que ese usuario inicie sesión, la app lee "admin" de
    //     Firestore y lo trata como admin automáticamente, en cualquier dispositivo
    // ================================================================

    import { initializeApp }
      from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
             signOut, onAuthStateChanged, updateProfile,
             setPersistence, browserSessionPersistence }
      from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    import { getFirestore, doc, setDoc, getDoc }
      from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    // ── Pegá acá tu firebaseConfig ──
    const firebaseConfig = {
      apiKey:            "AIzaSyDYhZSsmbin4UQQszXQ6oE7M9N6TncE_Mk",
      authDomain:        "barberia-8bb25.firebaseapp.com",
      projectId:         "barberia-8bb25",
      storageBucket:     "barberia-8bb25.firebasestorage.app",
      messagingSenderId: "890840367860",
      appId:             "1:890840367860:web:d47bb51f456b373a0a94a1",
      measurementId:     "G-Q3WNQ5B00C"
    };

    const isConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("TU_");

    if(!isConfigured){
      console.warn('[Firebase] ⚠ firebaseConfig no configurado — la app funciona en modo local');
    } else {

      const app  = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db   = getFirestore(app);

      // ── Leer perfil del usuario desde Firestore ──
      // Devuelve { username, role, uid, email } o null si no existe el doc
      async function loadUserProfile(fbUser){
        try {
          const snap = await getDoc(doc(db, 'usuarios', fbUser.uid));
          if(snap.exists()){
            const data = snap.data();
            return {
              username: data.nombre || fbUser.displayName || fbUser.email.split('@')[0],
              role:     data.rol    || 'user',
              uid:      fbUser.uid,
              email:    fbUser.email
            };
          }
        } catch(e){
          console.warn('[Firestore] No se pudo leer el perfil:', e.message);
        }
        // Fallback si no existe el documento todavía
        return {
          username: fbUser.displayName || fbUser.email.split('@')[0],
          role:     'user',
          uid:      fbUser.uid,
          email:    fbUser.email
        };
        }
    };
}

if (btnClose) btnClose.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// 6. FLUJO DE COMPRA (Conversion Funnel)
function agregarAlCarrito() {
    const producto = todosLosProductos.find(p => p.id === productoActualId);
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito(); 
        modal.style.display = "none";
    }
}

function actualizarVistaCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('precio-total');
    if (!lista || !totalElemento) return;

    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<div class="carrito-vacio-msg"><p>Tu carrito está vacío 🛒</p></div>';
        totalElemento.innerText = '$0';
        return;
    }

    carrito.forEach((prod, index) => {
        total += Number(prod.precio);
        const item = document.createElement('div');
        item.className = 'item-carrito';
        item.innerHTML = `
            <img src="${prod.foto_url || 'https://via.placeholder.com/200'}">
            <div class="item-carrito-desc">
                <h4>${prod.nombre}</h4>
                <p>$${prod.precio}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar-item">🗑️</button>
        `;
        lista.appendChild(item);
    });
    totalElemento.innerText = `$${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito no contiene productos activos para procesar.");
        return;
    }
    alert("¡Orden procesada con éxito! Gracias por tu compra.");
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarVistaCarrito();
    cambiarPantalla('inicio');
}

// 7. MOTOR DE BUSQUEDA INTERNO (Internal Search Optimization)
if (buscador) {
    buscador.oninput = (e) => {
        const texto = e.target.value.toLowerCase();
        if (texto.length > 0) {
            document.getElementById('view-inicio').style.display = 'none';
            document.getElementById('view-productos').style.display = 'block';
        }
        const filtrados = todosLosProductos.filter(p => p.nombre.toLowerCase().includes(texto));
        contenedor.innerHTML = '';
        filtrados.forEach(p => renderizarCard(p.id, p));
    };
}

// 8. GESTIÓN DE CATÁLOGO (Funciones de Administrador)
function abrirModalAgregar() {
    modalAgregar.style.display = 'flex';
    if (categoriaActual) {
        document.getElementById('add-categoria').value = categoriaActual;
    }
}

function cerrarModalAgregar() {
    modalAgregar.style.display = 'none';
    document.getElementById('add-nombre').value = '';
    document.getElementById('add-precio').value = '';
    document.getElementById('add-foto').value = '';
    document.getElementById('add-desc').value = '';
}

function guardarNuevoProducto() {
    const nombre = document.getElementById('add-nombre').value;
    const precio = document.getElementById('add-precio').value;
    const categoria = document.getElementById('add-categoria').value;
    const foto = document.getElementById('add-foto').value;
    const desc = document.getElementById('add-desc').value;

    if (!nombre || !precio) {
        alert("Por favor, complete los campos mandatorios (Nombre y Precio).");
        return;
    }

    db.collection("productos").add({
        nombre: nombre,
        precio: Number(precio), 
        categoria: categoria,
        foto_url: foto || 'https://via.placeholder.com/200', 
        descripcion: desc,
        likes: 0 
    })
    .then(() => {
        cerrarModalAgregar();
    })
    .catch((error) => console.error("Error al persistir el alta de producto:", error));
}

function eliminarProducto(id, event) {
    event.stopPropagation(); // Evita el efecto burbuja en la UX

    const confirmacion = confirm("¿Está seguro de eliminar definitivamente este ítem del catálogo general?");
    if (confirmacion) {
        db.collection("productos").doc(id).delete()
        .catch((error) => console.error("Error de eliminación en base de datos:", error));
    }
}

// INICIALIZACIÓN GLOBAL
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarDestacados();
});