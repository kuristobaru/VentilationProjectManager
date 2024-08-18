# Proyecto VPM 🚀

Bienvenido al proyecto VPM. A continuación, encontrarás las instrucciones necesarias para iniciar el proyecto y levantar la base de datos.

### Requisitos 📋

- Node.js (v18 o superior)
- `pnpm`
- Docker

### Instalación de pnpm

Si aún no tienes `pnpm` instalado, puedes instalarlo globalmente usando `npm`:

```bash
npm install -g pnpm
```

### Instalación de las Dependencias

Usa `pnpm` para instalar todas las dependencias necesarias del proyecto:

```bash
pnpm install
```

### Inicia el Proyecto 🏃

Para iniciar el proyecto, ejecuta:

```bash
pnpm run dev
```

## Base de Datos 🗄️

### Crear y Levantar el Contenedor

1. Asegúrate de tener Docker instalado. Puedes descargar Docker desde [aquí](https://www.docker.com/get-started).

2. Crea un archivo `Dockerfile` en el directorio del proyecto backend con el siguiente contenido:

   ```dockerfile
   FROM node:21.6.0
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

3. Construye la imagen de Docker:

   ```bash
   docker build -t nombre-de-tu-imagen .
   ```

4. Levanta el contenedor:

   ```bash
   docker run -d -p 5000:5000 nombre-de-tu-imagen
   ```

5. Verifica que el contenedor esté corriendo:

   ```bash
   docker ps
   ```

   Deberías ver tu contenedor corriendo en la lista.

### 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/tu_proyecto.git
cd tu_proyecto
```
