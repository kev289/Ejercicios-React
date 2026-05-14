# Ejercicio práctico: Estado global con Context API en React

## Objetivo

Construir una aplicación sencilla en React que permita gestionar un estado global de usuario autenticado utilizando **Context API**.

El propósito del ejercicio es practicar cómo compartir información entre componentes sin usar `props` manualmente en múltiples niveles, evitando el **prop drilling**.

---

## Descripción general

La aplicación debe manejar un estado global llamado `user`, que representa al usuario autenticado.

Cuando no exista un usuario autenticado, la aplicación debe mostrar un mensaje indicando que no se ha iniciado sesión.

Cuando el usuario inicie sesión, la información debe estar disponible globalmente para distintos componentes como la barra de navegación, el perfil de usuario y las vistas protegidas.

Cuando el usuario cierre sesión, el estado global debe limpiarse y la interfaz debe actualizarse automáticamente.

---

## Requerimientos base

### 1. Crear un contexto de usuario

Debes crear un contexto llamado `UserContext`.

Este contexto debe manejar un estado global llamado `user`.

El estado inicial de `user` debe ser:

```js
null;
```

El contexto debe exponer al menos las siguientes funciones:

```js
login(userData);
logout();
```

---

### 2. Crear un `UserProvider`

Debes crear un componente `UserProvider` que envuelva la aplicación principal.

Este proveedor debe compartir con los componentes hijos:

- `user`
- `login`
- `logout`

Opcionalmente, también puede compartir estados derivados como:

- `isAuthenticated`
- `isLoading`
- `error`

---

### 3. Crear los componentes mínimos

La aplicación debe incluir al menos los siguientes componentes:

#### `Navbar`

Debe mostrar un mensaje diferente dependiendo de si hay o no un usuario autenticado.

Ejemplo:

```txt
No has iniciado sesión
```

o:

```txt
Bienvenido, Ana
```

#### `LoginButton`

Debe simular el inicio de sesión.

Al hacer clic, debe guardar un usuario con datos como:

```js
{
  name: "Ana Pérez",
  email: "ana@example.com",
  role: "student"
}
```

#### `UserProfile`

Debe mostrar la información del usuario autenticado si existe.

Debe mostrar al menos:

- nombre
- email
- rol

Si no hay usuario autenticado, debe mostrar un mensaje adecuado.

#### `LogoutButton`

Debe cerrar la sesión.

Al hacer clic, el estado global `user` debe volver a ser `null`.

---

## Comportamiento esperado

La aplicación debe cumplir con el siguiente flujo:

1. Al cargar inicialmente, no debe existir un usuario autenticado.
2. La interfaz debe mostrar un mensaje como:

```txt
No has iniciado sesión
```

3. Al hacer clic en el botón de login, debe guardarse un usuario en el estado global.
4. Los componentes que consumen el contexto deben actualizarse automáticamente.
5. Al hacer clic en el botón de logout, el usuario debe eliminarse del estado global.
6. La interfaz debe volver al estado inicial.

---

## Funcionalidades extras

Para obtener una mejor evaluación, implementa al menos **3** de los siguientes puntos extra.

### 1. Persistencia en `localStorage`

El usuario autenticado debe mantenerse después de recargar la página.

Requerimientos:

- Al iniciar sesión, guardar el usuario en `localStorage`.
- Al cargar la aplicación, recuperar el usuario almacenado.
- Al cerrar sesión, eliminar el usuario de `localStorage`.

> Nota: no guardes información sensible real en `localStorage`.

---

### 2. Crear un custom hook `useUser`

Crea un hook personalizado llamado `useUser` para consumir el contexto.

Ejemplo de uso esperado:

```js
const { user, login, logout } = useUser();
```

El hook debe validar que se use dentro de `UserProvider`.

Si se usa fuera del proveedor, debe lanzar un error claro, por ejemplo:

```txt
useUser debe usarse dentro de un UserProvider
```

---

### 3. Manejo de roles

Agrega soporte para roles de usuario.

Roles sugeridos:

- `admin`
- `student`
- `guest`

La interfaz debe mostrar contenido diferente según el rol del usuario.

Ejemplos:

```txt
Panel de administración
```

```txt
Panel del estudiante
```

```txt
Vista de invitado
```

---

### 4. Simulación de estado de carga

La función `login` debe simular una operación asincrónica.

Debe existir un estado global llamado `isLoading`.

Mientras se ejecuta el login, la interfaz debe mostrar un mensaje como:

```txt
Iniciando sesión...
```

---

### 5. Manejo de errores

Simula casos de error al iniciar sesión.

Puedes validar, por ejemplo:

- email vacío
- nombre vacío
- rol inválido
- fallo simulado de autenticación

El error debe mostrarse en pantalla y estar correctamente gestionado desde el contexto.

Ejemplo:

```txt
El email es obligatorio
```

---

### 6. Separación por módulos

Organiza el código de forma clara y mantenible.

Estructura sugerida:

```txt
src/
  context/
    UserContext.jsx
  hooks/
    useUser.js
  components/
    Navbar.jsx
    LoginButton.jsx
    LogoutButton.jsx
    UserProfile.jsx
    RoleContent.jsx
    ProtectedView.jsx
  App.jsx
  main.jsx
```

---

### 7. Protección básica de vistas

Crea un componente `ProtectedView`.

Este componente solo debe mostrar su contenido si existe un usuario autenticado.

Si no hay usuario, debe mostrar:

```txt
Debes iniciar sesión para ver este contenido
```

Ejemplo de uso:

```jsx
<ProtectedView>
  <p>Contenido privado</p>
</ProtectedView>
```

---

## Preguntas técnicas obligatorias

Además del código, responde las siguientes preguntas en este mismo `README.md`.

Las respuestas deben ser claras, concretas y técnicamente correctas.

### 1. ¿Qué problema resuelve Context API en React?

---

### 2. ¿Cuándo usarías Context API y cuándo no?

Menciona al menos:

- dos casos donde Context API sea una buena opción
- un caso donde Context API podría no ser la mejor herramienta

---

### 3. ¿Qué hace el componente `Provider` dentro de Context API?

Explica cómo permite compartir valores con los componentes hijos.

---

### 4. ¿Para qué sirve `useContext`?

Explica cómo un componente puede consumir datos del contexto usando este hook.

---

### 5. ¿Qué riesgos tiene usar Context API para manejar estados que cambian constantemente?

Explica el impacto en re-renderizados y rendimiento.

---

### 6. ¿Por qué puede ser útil crear un custom hook como `useUser`?

Explica cómo mejora la legibilidad, reutilización y validación del uso correcto del contexto.

---

### 7. ¿Qué diferencia hay entre estado local y estado global?

Da un ejemplo concreto de cuándo usarías cada uno.

---

## Restricciones técnicas

- Usar **React Context API**.
- No usar Redux, Zustand, MobX ni otra librería de manejo de estado global.
- Evitar prop drilling.
- Separar el contexto en un archivo propio.
- Usar componentes funcionales.
- Usar hooks.
- No guardar información sensible real en `localStorage`.
- Mantener el código limpio, legible y modular.

---

## Entregable

Debes entregar el proyecto en un repositorio.

El proyecto debe incluir este archivo `README.md` con:

- instrucciones para ejecutar el proyecto
- descripción breve de la estructura
- explicación de cómo está implementado el contexto
- explicación de cómo los componentes consumen el estado global
- respuestas a las preguntas técnicas obligatorias

---

## Instrucciones para ejecutar el proyecto

Completa esta sección según la herramienta utilizada para crear el proyecto.

Ejemplo con Vite:

```bash
npm install
npm run dev
```

Ejemplo con Create React App:

```bash
npm install
npm start
```

---
