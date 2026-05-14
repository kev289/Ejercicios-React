# REACT

## Instalacion 

```bash
    bun create vite@latest
```

## Ejecucion

- Entrar a la carpeta que quieras con:

```bash
    cd [Carpeta]
```

- Correr con:

```bash
    bun dev
```

## Estructura

- `src/context/`: Aqui esta `UserContext.tsx` con el estado global y el provider.
- `src/hooks/`: Aqui esta `useUser.ts`, un hook para no estar llamando a useContext a cada rato.
- `src/components/`: Aqui estan los componentes visuales como Navbar, el perfil y los botones.

## Como funciona el contexto

Basicamente creamos el contexto con `createContext`. Toda la logica del login y logout la metimos en el `UserProvider`. Luego envolvemos `App.tsx` con ese provider para que toda la aplicacion tenga acceso a los datos del usuario.

Para usarlo, los componentes solo llaman a `const { user } = useUser()` y ya tienen los datos sin tener que estarlos pasando por props.

---

## Preguntas 

### 1. Que problema resuelve Context API en React?
Evita el "prop drilling", que es cuando tienes que pasar props por un monton de componentes hijos que ni siquiera usan esa informacion, solo para que llegue al componente final que si la necesita.

### 2. Cuando usarias Context API y cuando no?
- **Si lo usaria**: Para cosas globales como los datos del usuario, el tema oscuro/claro o el idioma.
- **No lo usaria**: Para estados que cambian muy rapido (como escribir en un input) o estados que solo le importan a un solo componente.

### 3. Que hace el componente Provider?
Es el que "provee" los datos. Se pone arriba de todo y cualquier componente hijo que este dentro de el puede leer esos datos.

### 4. Para que sirve useContext?
Es el hook que usamos dentro de un componente para "leer" la informacion que el Provider esta mandando. 

### 5. Que riesgos tiene usar Context API para estados que cambian mucho?
Que cada vez que el valor del contexto cambia, todos los componentes que lo usan se vuelven a renderizar. Si cambia muy rapido la aplicacion se puede poner lenta.

### 6. Por que hacer un custom hook como useUser?
Para que el codigo quede mas limpio y no tener que importar useContext y UserContext en todos los archivos. Ademas sirve para mandar un error si alguien se equivoca y lo intenta usar fuera del provider.

### 7. Diferencia entre estado local y global?
- **Local**: Solo le importa a un componente (ej. si un menu de opciones esta abierto o cerrado).
- **Global**: Le importa a varios componentes a la vez (ej. el nombre del usuario logueado que sale en el navbar y tambien en su vista de perfil).