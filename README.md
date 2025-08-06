<!-- markdownlint-disable MD030 -->

<p align="center">
<img width="400" src="./packages/ui/src/assets/images/conectaGPT.png" alt="ConectaGPT - Construye Agentes de IA, Visualmente">
</p>

<div align="center">

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.md)
[![Node.js](https://img.shields.io/badge/Node.js-18.15.0+-green.svg)](https://nodejs.org/)
[![Spanish](https://img.shields.io/badge/Idioma-Español-red.svg)](#)

[Español](#) | [English](./README-EN.md)

</div>

<h3>Construye Agentes de IA, Visualmente</h3>

## 🌟 Acerca de ConectaGPT

**ConectaGPT** nace como un proyecto open source fork de FlowiseAI, que busca **reducir la brecha al acceso y manipulación de agentes de IA para personas de habla hispana y con poco contexto técnico**.

### 🎯 Nuestra Misión

Democratizar el acceso a la inteligencia artificial mediante:

-   **Interfaz completamente en español**: Navegación, configuración y documentación
-   **Experiencia simplificada**: Diseñado para usuarios sin conocimientos técnicos avanzados
-   **Comunidad hispanohablante**: Soporte y recursos en español
-   **Accesibilidad**: Eliminando barreras idiomáticas y técnicas

### 🚀 ¿Qué es ConectaGPT?

ConectaGPT es una plataforma visual que te permite construir y gestionar agentes de IA sin necesidad de programar. Con una interfaz intuitiva de arrastrar y soltar, puedes:

-   🤖 Crear chatbots inteligentes
-   🔗 Conectar múltiples servicios de IA
-   📚 Procesar documentos y bases de conocimiento
-   🛠️ Integrar herramientas especializadas
-   📊 Monitorear y analizar conversaciones

## 📚 Tabla de Contenidos

-   [⚡ Inicio Rápido](#-inicio-rápido)
-   [🐳 Docker](#-docker)
-   [👨‍💻 Desarrolladores](#-desarrolladores)
-   [🌱 Variables de Entorno](#-variables-de-entorno)
-   [📖 Documentación](#-documentación)
-   [🌐 Auto-hosting](#-auto-hosting)
-   [🙋 Soporte](#-soporte)
-   [🙌 Contribuir](#-contribuir)
-   [📄 Licencia](#-licencia)

## ⚡ Inicio Rápido

Descarga e instala [NodeJS](https://nodejs.org/es/download) >= 18.15.0

1. Clona el repositorio de ConectaGPT

    ```bash
    git clone https://github.com/tu-usuario/conectaGPT.git
    cd conectaGPT
    ```

2. Instala las dependencias

    ```bash
    pnpm install
    ```

3. Construye el proyecto

    ```bash
    pnpm build
    ```

4. Inicia ConectaGPT

    ```bash
    pnpm start
    ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🐳 Docker

### Docker Compose

1. Clona el proyecto ConectaGPT
2. Ve a la carpeta `docker` en la raíz del proyecto
3. Copia el archivo `.env.example`, pégalo en la misma ubicación y renómbralo a `.env`
4. Ejecuta `docker compose up -d`
5. Abre [http://localhost:3000](http://localhost:3000)
6. Puedes detener los contenedores con `docker compose stop`

### Imagen Docker

1. Construye la imagen localmente:

    ```bash
    docker build --no-cache -t conectagpt .
    ```

2. Ejecuta la imagen:

    ```bash
    docker run -d --name conectagpt -p 3000:3000 conectagpt
    ```

3. Detén la imagen:

    ```bash
    docker stop conectagpt
    ```

## 👨‍💻 Desarrolladores

ConectaGPT tiene 4 módulos diferentes en un único repositorio mono:

-   `server`: Backend de Node.js para servir la lógica de API
-   `ui`: Frontend de React con interfaz completamente en español
-   `components`: Integraciones de nodos de terceros
-   `api-documentation`: Documentación API swagger-ui auto-generada

### Prerequisite

-   Install [PNPM](https://pnpm.io/installation)
    ```bash
    npm i -g pnpm
    ```

### Setup

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/conectaGPT.git
    ```

2.  Ve a la carpeta del repositorio:

    ```bash
    cd conectaGPT
    ```

3.  Instala todas las dependencias de todos los módulos:

    ```bash
    pnpm install
    ```

4.  Construye todo el código:

    ```bash
    pnpm build
    ```

    <details>
    <summary>Exit code 134 (JavaScript heap out of memory)</summary>  
      Si obtienes este error al ejecutar el script `build`, intenta aumentar el tamaño del heap de Node.js y ejecuta el script nuevamente:

        export NODE_OPTIONS="--max-old-space-size=4096"
        pnpm build

    </details>

5.  Inicia la aplicación:

    ```bash
    pnpm start
    ```

    Ahora puedes acceder a la aplicación en [http://localhost:3000](http://localhost:3000)

6.  Para construcción de desarrollo:

    -   Crea un archivo `.env` y especifica el `VITE_PORT` (consulta `.env.example`) en `packages/ui`
    -   Crea un archivo `.env` y especifica el `PORT` (consulta `.env.example`) en `packages/server`
    -   Ejecuta:

        ```bash
        pnpm dev
        ```

    Cualquier cambio en el código recargará la aplicación automáticamente en [http://localhost:8080](http://localhost:8080)

## 🌱 Variables de Entorno

ConectaGPT soporta diferentes variables de entorno para configurar tu instancia. Puedes especificar las siguientes variables en el archivo `.env` dentro de la carpeta `packages/server`. Lee [más información](./CONTRIBUTING.md#-variables-de-entorno)

## 📖 Documentación

Puedes ver la documentación de ConectaGPT en el repositorio oficial.

## 🌐 Auto-hosting

Despliega ConectaGPT auto-hospedado en tu infraestructura existente. Soportamos varios tipos de despliegue:

-   AWS
-   Azure
-   Digital Ocean
-   GCP
-   Alibaba Cloud
-   <details>
      <summary>Others</summary>

    -   Railway
    -   Render
    -   HuggingFace Spaces
    -   Elestio
    -   Sealos
    -   RepoCloud

      </details>

## ☁️ ConectaGPT Cloud

Por ahora, ConectaGPT está disponible únicamente como proyecto open source en GitHub. No contamos con una plataforma cloud dedicada.

## 🙋 Soporte

Siente libre de hacer cualquier pregunta, reportar problemas y solicitar nuevas funcionalidades en las [Discusiones](https://github.com/tu-usuario/conectaGPT/discussions) del repositorio.

## 🙌 Contribuir

Gracias a todos los increíbles contribuidores de ConectaGPT y el proyecto original FlowiseAI.

Consulta la [Guía de Contribución](CONTRIBUTING.md) para más información sobre cómo contribuir al proyecto.

## 📄 License

Source code in this repository is made available under the [Apache License Version 2.0](LICENSE.md).
