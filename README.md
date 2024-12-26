# app-massive-loads

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Este proyecto está construido utilizando [Vite](https://vitejs.dev/) como herramienta de construcción y [React](https://reactjs.org/) como biblioteca para construir interfaces de usuario.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada).
- [pnpm](https://pnpm.io/) (opcional, si deseas usar este gestor de paquetes en lugar de npm o yarn).

Puedes verificar si tienes instalados Node.js y pnpm ejecutando los siguientes comandos:

```bash
node -v
pnpm -v
```

Si no tienes `pnpm`, puedes instalarlo globalmente con:

```bash
npm install -g pnpm
```

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone "https://github.com/simjaMalkeinu/app-massive-loads.git"
   ```

2. Entra en el directorio del proyecto:

   ```bash
   cd "app-massive-loads"
   ```

3. Instala las dependencias:

   Si usas `pnpm`:
   ```bash
   pnpm install
   ```

   Si usas `npm`:
   ```bash
   npm install
   ```

   Si usas `yarn`:
   ```bash
   yarn install
   ```

## Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

Si usas `pnpm`:
```bash
pnpm dev
```

Si usas `npm`:
```bash
npm run dev
```

Si usas `yarn`:
```bash
yarn dev
```

El servidor de desarrollo estará disponible en [http://localhost:5173](http://localhost:5173) por defecto.

## Compilación para Producción

Para construir el proyecto para producción, ejecuta:

Si usas `pnpm`:
```bash
pnpm build
```

Si usas `npm`:
```bash
npm run build
```

Si usas `yarn`:
```bash
yarn build
```

Esto generará los archivos optimizados en el directorio `dist`.

## Vista Previa de Producción

Para hacer una vista previa del proyecto compilado, ejecuta:

Si usas `pnpm`:
```bash
pnpm preview
```

Si usas `npm`:
```bash
npm run preview
```

Si usas `yarn`:
```bash
yarn preview
```

El servidor estará disponible en [http://localhost:4173](http://localhost:4173) por defecto.

## Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo.
- `build`: Genera los archivos para producción.
- `preview`: Inicia un servidor local para previsualizar los archivos generados.

## Estructura del Proyecto

```
.
├── public           # Archivos estáticos
├── src              # Código fuente
│   ├── assets       # Recursos como imágenes o estilos
│   │   └── react.svg
│   ├── components   # Componentes de React
│   │   ├── ExcelPreview.jsx
│   │   ├── ExcelUploader.jsx
│   │   ├── InputFile.jsx
│   │   ├── List.jsx
│   │   ├── Loader.jsx
│   │   ├── Nav.jsx
│   │   ├── Pagination.jsx
│   │   └── Table.jsx
│   ├── context      # Contexto global para la aplicación
│   │   └── authContext.jsx
│   ├── css          # Archivos de estilos
│   │   ├── App.css
│   │   └── index.css
│   ├── js           # Scripts JavaScript
│   │   └── main.js
│   ├── pages        # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Register.jsx
│   │   └── UploadFile.jsx
│   ├── routes       # Configuración de rutas
│   │   ├── listroutes.jsx
│   │   └── privateRoutes.jsx
│   ├── App.jsx      # Componente principal
│   └── main.jsx     # Punto de entrada
├── package.json     # Dependencias y scripts
├── vite.config.js   # Configuración de Vite
```

## Contribución

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio y envía un pull request con tus cambios.

## Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).
