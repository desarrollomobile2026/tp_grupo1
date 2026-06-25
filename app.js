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

      // ── Configurar sesión solo por pestaña (no persiste al cerrar el navegador) ──
      // Esto hace que Firebase NO restaure la sesión automáticamente al abrir la app.
      // El usuario siempre tiene que ingresar manualmente con su email y contraseña.
      setPersistence(auth, browserSessionPersistence).catch(e =>
        console.warn('[Firebase] setPersistence error:', e)
      );

      // Solo usamos onAuthStateChanged para detectar cuando se cierra sesión externamente
      onAuthStateChanged(auth, (fbUser) => {
        if(!fbUser){
          // Si Firebase cierra la sesión (ej: token expirado), limpiamos la app también
          if(typeof getUser === 'function' && getUser()){
            if(typeof setUser === 'function') setUser(null);
            if(typeof showScreen === 'function') showScreen('screen-login');
          }
        }
      });

      // ── REGISTRO: crea el usuario en Auth + guarda perfil en Firestore ──
      window.firebaseRegister = async (email, password, displayName) => {
        // 1. Crear usuario en Firebase Authentication
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;

        // 2. Guardar displayName en Auth (opcional, para referencia)
        if(displayName){
          await updateProfile(fbUser, { displayName });
        }

        // 3. Crear documento en Firestore colección "usuarios"
        //    Estructura: { nombre, email, rol, creadoEn }
        //    Para hacer admin: cambiá "rol" a "admin" desde Firestore Console
        await setDoc(doc(db, 'usuarios', fbUser.uid), {
          nombre:    displayName || email.split('@')[0],
          email:     email,
          rol:       'user',   // ← cambiá a "admin" en Firestore Console para dar acceso admin
          creadoEn:  new Date().toISOString()
        });

        return cred;
      };

      // ── LOGIN: autentica y lee el rol desde Firestore ──
      window.firebaseLogin = async (email, password) => {
        const cred   = await signInWithEmailAndPassword(auth, email, password);
        const profile = await loadUserProfile(cred.user);
        // Adjuntar el perfil al resultado para que handleLogin lo use directamente
        cred._profile = profile;
        return cred;
      };

      // ── LOGOUT ──
      window.firebaseLogout = () => signOut(auth);

      console.log('[Firebase] ✓ Authentication + Firestore conectados');
    }