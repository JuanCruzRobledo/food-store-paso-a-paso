# Food Store — Documento maestro de la clase

> **Instrucciones para Claude Web**
>
> Este documento es la fuente de verdad de una clase práctica de 1 hora y 30 minutos sobre desarrollo de software con **Spec-Driven Development (SDD)** usando **OPSX**, **Claude Code/OpenCode** y dos skills custom (`kb-creator`, `roadmap-generator`).
>
> Generá **dos documentos Word** a partir de este .md:
>
> 1. **Documento para alumnos** — usá únicamente la **PARTE 1**. Formato: trabajo práctico universitario formal, con tabla de contenidos, tipografía Inter o Calibri, headings con jerarquía, tablas formateadas, code blocks con fuente monoespaciada (Consolas/JetBrains Mono). Portada con título, materia, fecha y autor en blanco.
> 2. **Documento para el docente** — usá únicamente la **PARTE 2**. Formato: cheat-sheet operativo, denso, con timing, prompts textuales y comandos. Tipografía sans-serif, headings sutiles, tablas con bordes finos.
>
> Mantené todos los comandos en *code blocks*, todas las tablas como tablas Word nativas y los headers con jerarquía clara para generar TOC automático.

---

## Tabla de contenidos

- **Parte 1 · Trabajo Práctico (alumnos)**
  - 1.1 Objetivos del trabajo
  - 1.2 Marco teórico
  - 1.3 Prerequisitos
  - 1.4 Materiales y recursos
  - 1.5 Consignas (1 a 10)
  - 1.6 Entrega esperada
  - 1.7 Autoevaluación
  - 1.8 Glosario
  - 1.9 Recursos y links
- **Parte 2 · Guía del docente**
  - 2.1 Setup pre-clase
  - 2.2 Plan minuto a minuto
  - 2.3 Comandos en orden
  - 2.4 Tags para saltos en el tiempo
  - 2.5 Plan B y troubleshooting
  - 2.6 Atajos del deck
  - 2.7 Prompts canónicos al agente

---
---

# PARTE 1 · TRABAJO PRÁCTICO

## Food Store — De documentos a sistema real con SDD

**Tema**: desarrollo guiado por especificaciones (SDD) usando OPSX como orchestrator y un agente de IA como ejecutor.
**Duración estimada**: 1 hora y 30 minutos en clase + práctica adicional en casa.
**Modalidad**: práctica guiada con repositorio base provisto.

---

## 1.1 Objetivos del trabajo

Al finalizar este trabajo práctico el alumno será capaz de:

1. **Diferenciar** vibe coding de Spec-Driven Development y argumentar técnicamente por qué SDD es preferible para sistemas no triviales.
2. **Aplicar** el flujo OPSX (`explore → propose → apply → archive`) para gestionar cambios en un proyecto real.
3. **Construir** una base de conocimiento estructurada que sirva como fuente de verdad para humanos y agentes.
4. **Trazar** un roadmap de implementación con dependencias técnicas explícitas y justificadas.
5. **Implementar** un cambio (change) end-to-end: propuesta, diseño, especificación, tareas, código, tests y archivo.
6. **Configurar** un entorno de trabajo donde el agente de IA respeta reglas del proyecto definidas por el humano.

---

## 1.2 Marco teórico

### 1.2.1 Vibe coding vs Spec-Driven Development

**Vibe coding** es la práctica de pegar requerimientos sueltos a un chat de IA y aceptar lo que sale. El modelo decide la arquitectura, el orden de implementación, los nombres y las dependencias. El humano corrige a posteriori, sin un plan trazado previamente.

| Característica | Vibe coding | SDD |
|----------------|-------------|-----|
| Quién decide la arquitectura | El modelo de IA | El humano |
| Existencia de specs | No | Sí, viven con el código |
| Trazabilidad de decisiones | No existe | Cada decisión documentada |
| Onboarding de nuevos miembros | Lectura de código | Lectura de specs y artefactos |
| Reproducibilidad | Imposible | Cada change es una unidad reproducible |
| Cuándo falla | Nadie sabe por qué | Las specs indican el contrato roto |

**Spec-Driven Development (SDD)** invierte el flujo: el humano y la IA primero se ponen de acuerdo en *qué* construir (specs), *por qué* (proposals) y *cómo* (designs), y solo después escriben código. Las specs viven en el repositorio junto al código y evolucionan con él.

### 1.2.2 OPSX: el orchestrator

**OPSX** es un protocolo de cuatro acciones que estructura cualquier cambio en un proyecto:

| Acción | Para qué |
|--------|----------|
| `/opsx:explore` | Pensar antes de comprometerse a un cambio. Investigar el código, leer la KB, plantear opciones. **Opcional**. |
| `/opsx:propose` | Crear el change con todos sus artefactos: propuesta, diseño, especificaciones, tareas. |
| `/opsx:apply` | Implementar las tareas del change una por una. |
| `/opsx:archive` | Cerrar el change: sincronizar las specs principales del proyecto con los deltas, mover el change a la carpeta de archivo. |

Cada change vive en `openspec/changes/<nombre-del-change>/` con cuatro archivos canónicos:

| Archivo | Contenido |
|---------|-----------|
| `proposal.md` | Qué se cambia y por qué. Una a dos páginas. |
| `design.md` | Cómo se implementa. Decisiones técnicas con justificación, riesgos, trade-offs. |
| `specs/<capability>/spec.md` | Especificaciones de comportamiento (Requirements + Scenarios). |
| `tasks.md` | Checklist de tareas atómicas con checkboxes para tracking. |

### 1.2.3 La base de conocimiento como contrato

La **base de conocimiento (KB)** es lo que el agente lee antes de cada acción no trivial. Si una decisión no está en la KB, no existe para el agente. Una KB clara es lo que separa SDD de vibe coding.

La KB del proyecto vive en `knowledge-base/` (raíz del repo) y contiene 10 archivos canónicos numerados, cada uno con un rol específico:

| # | Archivo | Contenido |
|---|---------|-----------|
| 01 | `01_vision_y_objetivos.md` | Propósito del sistema, alcance, fuera de alcance. |
| 02 | `02_descripcion_general.md` | Stack tecnológico y arquitectura general. |
| 03 | `03_actores_y_roles.md` | Actores, RBAC, permisos. |
| 04 | `04_modelo_de_datos.md` | Entidades, relaciones, ERD. |
| 05 | `05_reglas_de_negocio.md` | Reglas codificadas por dominio. |
| 06 | `06_funcionalidades.md` | Historias de usuario por épica. |
| 07 | `07_flujos_principales.md` | Flujos extremo a extremo (auth, pedido, pago, etc.). |
| 08 | `08_arquitectura_propuesta.md` | Patrones, estructura de directorios, seguridad. |
| 09 | `09_decisiones_y_supuestos.md` | Decisiones documentadas y supuestos inferidos. |
| 10 | `10_preguntas_abiertas.md` | Inconsistencias y preguntas pendientes. |

### 1.2.4 Roles humano-agente

La regla de oro de SDD es: **el humano dirige, el agente ejecuta**. El humano:

- Decide la arquitectura.
- Define las reglas del proyecto.
- Valida cada artefacto antes de pasar al siguiente.
- Resuelve ambigüedades y preguntas abiertas.

El agente:

- Genera artefactos siguiendo el formato esperado.
- Lee la KB y las reglas antes de proponer.
- Implementa tareas atómicas a partir del checklist.
- Reporta lo hecho con honestidad.

---

## 1.3 Prerequisitos

Antes de iniciar el trabajo práctico el alumno debe tener instalado y verificado lo siguiente. Estos pasos se cubrieron en la clase anterior; si algo falta, instalarlo antes de continuar.

### 1.3.1 Stack base

| Herramienta | Versión mínima | Comando de verificación |
|-------------|----------------|--------------------------|
| Git | 2.40 | `git --version` |
| Node.js | 18.x | `node --version` |
| Python | 3.11 | `python --version` |
| PostgreSQL | 15 | `psql --version` |
| Go | 1.24 (para JR-Stack) | `go version` |

### 1.3.2 JR-Stack instalado en el agente

JR-Stack debe estar instalado y configurado para tu agente de IA preferido (Claude Code, OpenCode, Cursor, etc.). Verificación:

```bash
jr-stack version
```

Si falla, seguir la guía de instalación: https://github.com/JuanCruzRobledo/jr-stack

### 1.3.3 OpenSpec CLI

OpenSpec es el motor de specs. Instalación global:

```bash
npm install -g @fission-ai/openspec@latest
openspec --version
```

Documentación oficial: https://openspec.dev/

### 1.3.4 Cuenta de GitHub

Recomendada para clonar el repositorio base. No es obligatoria si el repo se descarga como ZIP.

---

## 1.4 Materiales y recursos

### 1.4.1 Repositorio base del proyecto

```
https://github.com/JuanCruzRobledo/RepositorioBaseFoodStore-SDD
```

Este repositorio contiene:

- **`docs/`** con 3 archivos `.txt` que describen el sistema (visión, arquitectura, historias de usuario).
- **`backend/`** vacío con `.gitkeep` (será scaffolded durante el TP).
- **`frontend/`** vacío con `.gitkeep` (íd.).
- **`README.md`** con setup base.
- **Branch `clase-demo`** con 9 tags pre-cocinados que muestran el estado del repo en cada paso del TP. Sirve como referencia.

### 1.4.2 Skills custom usadas

| Skill | Repositorio | Para qué |
|-------|-------------|----------|
| `kb-creator` | `https://github.com/JuanCruzRobledo/kb-creator` | Genera la base de conocimiento estructurada. |
| `roadmap-generator` | `https://github.com/JuanCruzRobledo/roadmap-generator` | Genera el roadmap de changes. |
| `find-skills` (Vercel Labs) | `https://github.com/vercel-labs/skills` | Buscar e instalar skills del marketplace. |

### 1.4.3 Documentos fuente del sistema

En `docs/` se encuentran tres documentos que describen Food Store en lenguaje natural:

- **`Descripcion.txt`** — visión, objetivos, actores principales, stack tecnológico.
- **`Integrador.txt`** — arquitectura en capas, ERD completo, API REST, patrones de diseño.
- **`Historias_de_usuario.txt`** — US-000 a US-076 con criterios de aceptación y reglas de negocio.

Estos documentos son la **fuente de verdad inicial** del sistema. La skill `kb-creator` los procesa y emite la KB estructurada.

---

## 1.5 Consignas

Cada consigna está pensada para resolverse en clase con apoyo del docente. Si el agente demora más de lo razonable en una acción, se puede saltar al tag pre-cocinado correspondiente y continuar con el siguiente paso.

> **Importante**: trabajá de forma incremental. No avances al siguiente paso si el actual no quedó verificado.

---

### Consigna 1 — Configurar el entorno y clonar el repositorio base

**Objetivo**: dejar el repositorio listo en tu máquina y validar que la estructura inicial es la esperada.

**Acción**:

1. Verificá que tenés todos los prerequisitos instalados (sección 1.3).
2. Cloná el repositorio base:

   ```bash
   git clone https://github.com/JuanCruzRobledo/RepositorioBaseFoodStore-SDD foodstore
   cd foodstore
   ```

3. Inspeccioná la estructura inicial:

   ```bash
   ls
   ```

   Deberías ver: `backend/`, `frontend/`, `docs/`, `.gitignore`, `README.md`.

4. Abrí `docs/` y leé los tres archivos `.txt`. **No es necesario memorizarlos** — solo entender qué tipo de información describen.

**Resultado esperado**: repositorio clonado, estructura visible, los tres documentos fuente leídos.

**Concepto clave**: el repositorio base **no contiene lógica de negocio**. Solo provee la estructura y los documentos fuente. Toda la lógica se construirá durante el TP usando SDD.

**Posibles errores**:

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `git clone` pide credenciales | Repo privado o sin acceso | Verificar URL pública. |
| `cd foodstore` falla | Carpeta no creada | Verificar mensaje de `git clone`. |

---

### Consigna 2 — Instalar las skills del proyecto

**Objetivo**: dejar disponibles para tu agente las skills necesarias para el TP.

**Acción**:

1. Instalá las dos skills custom:

   ```bash
   npx skills add https://github.com/JuanCruzRobledo/kb-creator
   npx skills add https://github.com/JuanCruzRobledo/roadmap-generator
   ```

2. Opcionalmente, instalá `find-skills` para futuros proyectos:

   ```bash
   npx skills add https://github.com/vercel-labs/skills --skill find-skills
   ```

3. Verificá que las skills quedaron instaladas:

   ```bash
   ls ~/.agents/skills/
   ```

   Deberías ver las carpetas `kb-creator/` y `roadmap-generator/`.

**Resultado esperado**: ambas skills aparecen en `~/.agents/skills/` y son detectadas por tu agente.

**Concepto clave**: las skills viven en `~/.agents/skills/` (carpeta del usuario, no del repositorio) y se symlinkean automáticamente a cada agente compatible (Claude Code, OpenCode, Cursor, Cline, etc.). **Se instalan una vez por máquina** y quedan disponibles para todos tus proyectos.

**Posibles errores**:

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `npx skills add` falla por timeout | Red lenta | Reintentar o verificar conexión. |
| `ls ~/.agents/skills/` no muestra nada | Path distinto en tu sistema | Probar `ls .agents/skills/` desde home. |

---

### Consigna 3 — Generar la base de conocimiento

**Objetivo**: convertir los tres documentos fuente en una base de conocimiento estructurada y navegable.

**Acción**:

1. Asegurate de estar en la raíz del repositorio.
2. Pedile al agente que ejecute la skill `kb-creator` con el siguiente prompt:

   > **Prompt**: "Creá la base de conocimiento del proyecto a partir de los documentos en `docs/`."

3. La skill detectará automáticamente que hay archivos en `docs/` y entrará en **modo silencioso** (Mode A). Generará 10 archivos canónicos más un `README.md` índice en `knowledge-base/`.

4. Verificá el resultado:

   ```bash
   ls knowledge-base/
   ```

   Deberías ver los 10 archivos numerados (`01_vision_y_objetivos.md` a `10_preguntas_abiertas.md`) más `README.md`.

5. Abrí `knowledge-base/04_modelo_de_datos.md` y `knowledge-base/06_funcionalidades.md` para inspeccionar la calidad del análisis automático.

**Resultado esperado**: 11 archivos en `knowledge-base/` con contenido coherente.

**Concepto clave**: la KB es un **contrato fijo** de 10 archivos canónicos. La skill garantiza que siempre estén los mismos archivos con la misma numeración, independientemente del proyecto. Esto permite que skills y herramientas posteriores (como `roadmap-generator`) sepan exactamente dónde buscar información.

**Para reflexionar**:

- ¿Qué archivo lee primero el agente cuando va a proponer un change relacionado con autenticación?
- ¿Y para un change de modelo de datos?
- ¿Cómo decidirías si una decisión técnica es nueva (va en `09_decisiones_y_supuestos.md`) o un supuesto inferido?

---

### Consigna 4 — Inicializar OpenSpec en el proyecto

**Objetivo**: instalar la estructura de OpenSpec en el repositorio y configurar el flujo OPSX para tu agente.

**Acción**:

1. Ejecutá:

   ```bash
   openspec init --tools opencode,claude
   ```

   Si usás solo uno de los agentes, ajustá el flag (`--tools claude` o `--tools opencode`).

2. Inspeccioná lo que se creó:

   ```bash
   ls
   ```

   Deberían aparecer las carpetas nuevas: `openspec/`, `.claude/`, `.opencode/`.

3. Reiniciá tu agente (cerrar y abrir Claude Code/OpenCode) para que cargue los comandos OPSX recién instalados.

4. Verificá que los comandos están disponibles. En Claude Code, escribí `/` y deberías ver:
   - `/opsx:explore`
   - `/opsx:propose`
   - `/opsx:apply`
   - `/opsx:archive`

**Resultado esperado**: estructura OpenSpec creada y comandos OPSX disponibles en el agente.

**Concepto clave**: `openspec init` no toca tu código. Solo crea infraestructura para gestionar specs y changes. La carpeta `openspec/specs/` queda vacía hasta que archives tu primer change.

**Estructura generada**:

```
openspec/
├── config.yaml          configuración del proyecto
├── specs/               specs principales (vacío inicialmente)
└── changes/             changes activos

.claude/                 comandos y skills OPSX para Claude Code
└── commands/opsx/

.opencode/               comandos y skills OPSX para OpenCode
└── commands/
```

---

### Consigna 5 — Configurar AGENTS.md y openspec/config.yaml

**Objetivo**: definir las reglas del proyecto que el agente debe respetar siempre.

**Acción**:

1. Pedile al agente que cree `AGENTS.md` en la raíz:

   > **Prompt**: "Creá `AGENTS.md` en la raíz con: el stack tecnológico del proyecto, la ubicación de la base de conocimiento (`knowledge-base/`), las reglas duras del proyecto (no buildear automático, no commitear sin pedido, conventional commits sin Co-Authored-By, tests sin mocks de DB, schemas con `extra='forbid'`), y la lista de skills disponibles."

2. Inspeccioná el archivo generado y validá que contiene los puntos pedidos.

3. Editá `openspec/config.yaml` para agregar contexto y reglas por artefacto:

   ```yaml
   schema: spec-driven

   context: |
     Food Store — e-commerce de productos alimenticios.
     Stack: FastAPI + SQLModel + PostgreSQL (backend), React + TypeScript + Vite (frontend).
     Convenciones: Conventional Commits, kebab-case para changes, prefijo us-NNN-.
     KB en knowledge-base/. Reglas en AGENTS.md.

   rules:
     proposal:
       - Referenciar las US implementadas (formato US-NNN).
       - Listar dependencias de la KB que respaldan la propuesta.
       - Incluir sección "Non-goals" explícita.
     design:
       - Documentar patrones aplicados con referencia a 08_arquitectura_propuesta.md.
       - Explicitar decisiones tomadas con formato DD-NN.
       - Listar variables de entorno nuevas si las hay.
     tasks:
       - Tareas atómicas de 30 a 60 minutos.
       - Cada tarea referencia el archivo de la KB que la respalda.
       - Tests primero (TDD) en lógica de dominio.
   ```

**Resultado esperado**: `AGENTS.md` creado y `openspec/config.yaml` completado.

**Concepto clave**: `AGENTS.md` y `openspec/config.yaml` son **reglas operativas**. La KB es **información del dominio**. La diferencia es importante:

- KB → "qué construimos".
- AGENTS.md / config.yaml → "cómo trabajamos".

El agente lee ambas antes de cada acción.

**Para reflexionar**:

- ¿Por qué la regla "no buildear automático" es importante?
- ¿Qué pasaría si AGENTS.md no menciona el stack?

---

### Consigna 6 — Trazar el roadmap de implementación

**Objetivo**: producir un mapa completo de los changes necesarios para construir Food Store, con dependencias técnicas y justificaciones.

**Acción**:

1. Pedile al agente que ejecute la skill `roadmap-generator`:

   > **Prompt**: "Generá el roadmap completo del proyecto leyendo la base de conocimiento."

2. La skill verificará pre-condiciones (`knowledge-base/` existe, `openspec/` existe), leerá los archivos canónicos relevantes, inferirá dependencias y emitirá `openspec/roadmap.md`.

3. Abrí `openspec/roadmap.md` y verificá que contiene:
   - Una tabla con todos los changes ordenados.
   - Para cada change: nombre, funcionalidad, US implementadas, dependencias, justificación.
   - Una sugerencia del primer change a ejecutar.

**Resultado esperado**: `openspec/roadmap.md` con 9 a 11 changes ordenados.

**Para reflexionar**:

- ¿Por qué `us-001-auth` depende de `us-000-setup`?
- ¿Por qué `us-006-pagos-mercadopago` está al final, después de `us-005-pedidos`?
- ¿Qué dos changes podrían trabajarse en paralelo si tuvieras dos personas?

**Concepto clave**: el roadmap **no es código**. Es **planificación**. Acá no se escribe una sola línea de implementación. Se decide el orden y, sobre todo, el **por qué** de cada dependencia.

---

### Consigna 7 — Proponer el primer change (`us-000-setup`)

**Objetivo**: generar los cuatro artefactos canónicos del primer change usando el flujo OPSX.

**Acción**:

1. Pedile al agente que proponga el change:

   > **Prompt**: `/opsx:propose us-000-setup`
   >
   > o, en lenguaje natural: "Proponé el change us-000-setup según el roadmap."

2. El agente generará en orden:
   - `openspec/changes/us-000-setup/proposal.md` (qué y por qué).
   - `openspec/changes/us-000-setup/design.md` (cómo).
   - `openspec/changes/us-000-setup/specs/<capability>/spec.md` (uno por cada capability nueva — esperado: `monorepo-structure`, `repository-pattern`, `error-handling`, `input-validation`).
   - `openspec/changes/us-000-setup/tasks.md` (checklist atómica).

3. Validá que el change está bien formado:

   ```bash
   openspec validate us-000-setup
   ```

   La salida debe ser: `Change 'us-000-setup' is valid`.

4. Leé los cuatro artefactos. Identificá:
   - En `proposal.md`: la sección "Non-goals" (qué **no** se hace en este change).
   - En `design.md`: las decisiones técnicas con formato `DD-NN`.
   - En `specs/.../spec.md`: cómo se escriben los `Requirements` con `Scenarios` (formato Given/When/Then).
   - En `tasks.md`: el desglose en grupos numerados con checkboxes.

**Resultado esperado**: cuatro artefactos generados, validate exitoso, comprensión de cada artefacto.

**Concepto clave**: la propuesta **debe ser revisada por el humano antes del apply**. Si algo no cuadra (un design questionable, una decisión sin justificación, una task demasiado grande), corregilo ahora — todavía no hay código.

**Para reflexionar**:

- ¿Qué tienen en común todos los `Scenarios` del spec `error-handling`?
- ¿Por qué los specs usan `SHALL` y no `should`?

---

### Consigna 8 — Aplicar el change (implementar las tareas)

**Objetivo**: ejecutar la implementación del change tarea por tarea.

**Acción**:

1. Pedile al agente que aplique el change:

   > **Prompt**: `/opsx:apply us-000-setup`
   >
   > o: "Aplicá el change us-000-setup, tarea por tarea."

2. El agente recorrerá `tasks.md` y, por cada tarea sin marcar:
   - Si es de tipo "Test (TDD)": escribirá el test primero.
   - Implementará el código.
   - Marcará la tarea como `[x]` en `tasks.md`.

3. Revisá lo que se generó. Esperás algo similar a:
   - `backend/app/{domain,application,infrastructure,presentation}/` con módulos `__init__.py` y archivos clave.
   - `backend/requirements.txt` con dependencias pinneadas.
   - `backend/alembic/` con migración inicial.
   - `backend/tests/` con tests para `BaseRepository` y `UnitOfWork`.
   - `frontend/src/{app,features,entities,shared}/` con los stores Zustand y el cliente Axios.
   - `frontend/package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`.

4. Verificá que el backend levanta:

   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate          # Windows
   # source .venv/bin/activate     # Linux/Mac

   pip install -r requirements.txt
   cp .env.example .env             # completar DATABASE_URL real

   alembic upgrade head
   uvicorn app.main:app --reload
   ```

   Probá `http://localhost:8000/health` — debería devolver `{"status": "ok"}`.

5. Verificá que el frontend levanta:

   ```bash
   cd frontend
   npm install
   cp .env.example .env             # completar VITE_API_URL
   npm run dev
   ```

   Abrí `http://localhost:5173` — debería renderizar una página inicial vacía.

**Resultado esperado**: backend en `:8000` con `/health` OK, frontend en `:5173` renderizando, tests pasando.

**Concepto clave**: el `apply` es la **única fase donde se escribe código**. Todo lo anterior fue planificación. Notá cómo cada tarea remite a un archivo de la KB (`ref: KB 08`, `ref: KB 04`) — la trazabilidad es bidireccional.

**Para reflexionar**:

- ¿Cuántas líneas de código produjo el agente en este change? ¿Cuántos archivos?
- ¿Qué porcentaje del trabajo total fue planificación versus implementación?

---

### Consigna 9 — Archivar el change

**Objetivo**: cerrar el change sincronizando los specs principales del proyecto con los deltas del change.

**Acción**:

1. Ejecutá:

   ```bash
   openspec archive us-000-setup -y
   ```

2. Inspeccioná el output:
   - El change se mueve a `openspec/changes/archive/<YYYY-MM-DD>-us-000-setup/`.
   - Los specs principales se crean o actualizan en `openspec/specs/<capability>/spec.md` con los `ADDED Requirements`.

3. Verificá la estructura final:

   ```bash
   ls openspec/specs/
   ls openspec/changes/
   ```

   En `specs/` deberías ver las cuatro capabilities (`monorepo-structure`, `repository-pattern`, `error-handling`, `input-validation`).
   En `changes/` solo debería quedar la subcarpeta `archive/`.

**Resultado esperado**: change archivado, specs principales pobladas, listas para usarse como referencia en futuros changes.

**Concepto clave**: las specs principales (`openspec/specs/`) son **acumulativas**. Cada change que archivás agrega o modifica requirements ahí. Con el tiempo, `openspec/specs/` se convierte en la **especificación viva del sistema completo**.

**Para reflexionar**:

- ¿Qué quedó conservado al archivar?
- ¿Qué se descartó?
- Si tuvieras que retomar el proyecto en seis meses, ¿dónde mirarías primero?

---

### Consigna 10 — Reflexión final

**Objetivo**: consolidar lo aprendido y proyectarlo a tus propios proyectos.

**Acción**: respondé en un texto corto (200 a 400 palabras):

1. ¿Cuál es el siguiente change que harías según el roadmap, y por qué?
2. ¿Qué decisión del `design.md` de `us-000-setup` te parece la más controvertida y por qué?
3. ¿En qué tipo de proyecto (de los tuyos o ajenos) aplicarías este flujo, y dónde **no** lo aplicarías?
4. Identificá un punto de fricción que tuviste durante el TP y describí cómo lo resolverías la próxima vez.

**Concepto clave**: SDD no es una receta — es una disciplina. Funciona muy bien en sistemas de complejidad media-alta donde la trazabilidad importa. En scripts puntuales o experimentos rápidos puede ser overkill.

---

## 1.6 Entrega esperada

Al final del trabajo práctico debés tener en tu repositorio:

| Item | Ubicación | Verificación |
|------|-----------|--------------|
| Base de conocimiento completa | `knowledge-base/` | 11 archivos `.md` |
| OpenSpec inicializado | `openspec/` y `.claude/` o `.opencode/` | Comandos OPSX disponibles |
| Reglas del proyecto | `AGENTS.md` y `openspec/config.yaml` | Ambos archivos completos |
| Roadmap | `openspec/roadmap.md` | Tabla con 9 a 11 changes |
| Change `us-000-setup` archivado | `openspec/changes/archive/YYYY-MM-DD-us-000-setup/` | Cuatro artefactos completos |
| Specs principales | `openspec/specs/` | Cuatro capabilities con requirements |
| Backend funcional | `backend/` | `/health` responde 200 |
| Frontend funcional | `frontend/` | `/` renderiza shell |
| Tests pasando | `backend/tests/` | `pytest` exitoso |
| Reflexión final | Documento aparte | 200 a 400 palabras |

---

## 1.7 Autoevaluación

Marcá cada item al completarlo. Si no podés marcar todos, identificá qué te falta y volvé a la consigna correspondiente.

- [ ] Cloné el repositorio base.
- [ ] Instalé las skills `kb-creator` y `roadmap-generator`.
- [ ] Generé `knowledge-base/` con 11 archivos.
- [ ] Inicialicé OpenSpec y verifiqué que los comandos OPSX están disponibles en mi agente.
- [ ] Creé `AGENTS.md` y completé `openspec/config.yaml`.
- [ ] Generé `openspec/roadmap.md` con todos los changes.
- [ ] Propuse `us-000-setup` con los cuatro artefactos canónicos.
- [ ] Validé el change con `openspec validate`.
- [ ] Apliqué el change y el agente generó el código del scaffolding.
- [ ] El backend levanta y `/health` responde 200.
- [ ] El frontend levanta y renderiza la página inicial.
- [ ] Archivé el change y las specs principales se sincronizaron.
- [ ] Puedo explicar el flujo OPSX a otro estudiante en menos de cinco minutos.
- [ ] Escribí la reflexión final.

---

## 1.8 Glosario

| Término | Significado |
|---------|-------------|
| **SDD** | Spec-Driven Development. Práctica de escribir specs antes que código. |
| **OPSX** | Orchestrator que coordina el flujo `explore → propose → apply → archive`. |
| **TDD** | Test-Driven Development. Escribir tests antes que la implementación. |
| **RBAC** | Role-Based Access Control. Permisos basados en roles. |
| **FSD** | Feature-Sliced Design. Arquitectura frontend por features. |
| **UoW** | Unit of Work. Patrón de transacción atómica multi-repositorio. |
| **RFC 7807** | Estándar para representar errores HTTP en formato `application/problem+json`. |
| **change** | Unidad atómica de cambio en OPSX (proposal + design + specs + tasks). |
| **capability** | Capacidad del sistema documentada en una spec. |
| **delta spec** | Modificación a una spec principal (ADDED, MODIFIED, REMOVED, RENAMED). |
| **KB** | Knowledge Base. Conjunto estructurado de documentación del proyecto. |
| **vibe coding** | Antipatrón: pegar requerimientos sueltos a un chat y aceptar lo que sale. |

---

## 1.9 Recursos y links

| Recurso | URL |
|---------|-----|
| Presentación: instalación de JR-Stack | https://instalaci-n-stack.vercel.app/ |
| Presentación: esta clase | https://food-store-paso-a-paso.vercel.app/ |
| Repositorio base (con branch `clase-demo` y tags) | https://github.com/JuanCruzRobledo/RepositorioBaseFoodStore-SDD |
| Skill `kb-creator` | https://github.com/JuanCruzRobledo/kb-creator |
| Skill `roadmap-generator` | https://github.com/JuanCruzRobledo/roadmap-generator |
| JR-Stack | https://github.com/JuanCruzRobledo/jr-stack |
| OpenSpec | https://openspec.dev/ |
| find-skills (Vercel Labs) | https://github.com/vercel-labs/skills |

---
---

# PARTE 2 · GUÍA DEL DOCENTE

Esta parte es **operativa**. No teoría. Está pensada para tener abierta en una segunda pantalla durante la clase. Contiene los prompts textuales, los tags pre-cocinados y los planes B.

---

## 2.1 Setup pre-clase (checklist 30 min antes)

| # | Item | Verificación |
|---|------|--------------|
| 1 | Notebook con cargador conectado | Energía suficiente para 1h45m |
| 2 | Conexión a internet estable | `ping github.com` |
| 3 | Repo `RepositorioBaseFoodStore-SDD` clonado en `~/foodstore-demo/` | `cd ~/foodstore-demo && git status` |
| 4 | Branch en `main`, working tree limpio | `git status` reporta nothing to commit |
| 5 | Tags traídos del remoto | `git fetch --tags && git tag -l` muestra los 9 tags |
| 6 | Agente IA abierto y respondiendo | Probar con un prompt corto |
| 7 | OpenSpec CLI funcional | `openspec --version` |
| 8 | Las dos skills instaladas | `ls ~/.agents/skills/` muestra `kb-creator/` y `roadmap-generator/` |
| 9 | Postgres corriendo (para el apply final) | `pg_isready` |
| 10 | Deck abierto en navegador | `https://food-store-paso-a-paso.vercel.app/` |
| 11 | Esta guía abierta en otra pantalla / impresa | — |
| 12 | Cronómetro visible | Para mantener timing |

**Si algo de la lista no está OK**, no arranques la clase. Resolvelo primero.

---

## 2.2 Plan minuto a minuto

**Tiempo total objetivo**: 88 minutos. Dejás 2 de margen sobre los 90.

### Slide 1 (5 min) · Lo que ya tenés en la mochila

**Qué decir**:

> "La clase pasada instalamos JR-Stack en sus agentes. Eso les dejó tres cosas listas: el orchestrator OPSX que coordina el flujo, Engram para memoria persistente y Context7 para docs al día. Hoy las usamos en un proyecto real. No las re-explicamos — las vemos trabajar."

**Acción**: ninguna. Slide pura.

**Pregunta a la clase** (opcional, 30 segundos): "¿quién instaló JR-Stack la clase pasada y lo verificó?". Si hay manos abajo, pediles que lo hagan ahora antes de avanzar.

**Tag de salto**: no aplica.

---

### Slide 2 (5 min) · Clonar el repo base

**Qué decir**:

> "Les damos un repo con scaffolding. Estructura, no lógica. Lo que enseñamos no es cómo armar carpetas — eso ya está. Lo que enseñamos es el proceso de pensar y construir un sistema con SDD."

**Comando en vivo** (ejecutar uno por uno):

```bash
git clone https://github.com/JuanCruzRobledo/RepositorioBaseFoodStore-SDD foodstore-clase
cd foodstore-clase
ls
```

Mostrar `backend/`, `frontend/`, `docs/`, `README.md`. Abrir `docs/Descripcion.txt` brevemente (no leer entero).

**Tag de salto**: `step-0-clean`.

**Plan B**: si la red falla, abrir el repo ya clonado en `~/foodstore-demo/`.

---

### Slide 3 (5 min) · Instalar las skills

**Qué decir**:

> "Dos skills, una sola vez. find-skills sirve para buscar más cuando las necesitemos. kb-creator es la nuestra: convierte documentos fuente en una base de conocimiento estructurada. Las skills viven en el agente, no en el repo."

**Comandos en vivo**:

```bash
npx skills add https://github.com/JuanCruzRobledo/kb-creator
npx skills add https://github.com/JuanCruzRobledo/roadmap-generator
```

Verificar:

```bash
ls ~/.agents/skills/
```

**Tag de salto**: `step-2-skills-installed` (alias de `step-0-clean`; el repo no cambia con esto).

**Plan B**: si `npx skills add` falla por timeout, decir: "asumamos que ya están instaladas, lo importante es entender qué hacen" y pasar a la siguiente slide.

---

### Slide 4 (10 min) · Generar la base de conocimiento

**Qué decir**:

> "Le decimos al agente: 'creá la base de conocimiento del proyecto'. Como hay archivos en docs/, entra en modo silencioso: lee, analiza, emite los 10 canónicos. La KB es la fuente de verdad — si algo no está acá, no existe para el agente."

**Prompt al agente** (textual):

> Creá la base de conocimiento del proyecto a partir de los documentos en docs/.

**Mientras el agente trabaja** (1 a 3 minutos):

- Abrí `docs/Descripcion.txt` y mostrá un fragmento.
- Recordá a la clase que esto reemplaza horas de armar carpetas y plantillas a mano.

**Cuando termina**:

```bash
ls knowledge-base/
```

Abrir `knowledge-base/04_modelo_de_datos.md` brevemente para mostrar la calidad.

**Tag de salto**: `step-3-kb-generated`.

**Plan B**: si el agente demora más de 3 minutos:

```bash
git stash
git checkout step-3-kb-generated
```

Decir: "esto es lo que termina generando — son ~2000 líneas de KB. Sigamos."

---

### Slide 5 (3 min) · Inicializar OpenSpec

**Qué decir**:

> "Un comando. Crea openspec/ donde van a vivir specs y changes, más las skills y commands del flujo OPSX para nuestro agente. Después, el agente reinicia y ya tiene /opsx:propose, /opsx:apply, /opsx:archive."

**Comando en vivo**:

```bash
openspec init --tools opencode,claude --force
```

Mostrar lo que se creó:

```bash
ls
ls openspec/
ls .claude/commands/opsx/
```

Mencionar que **hay que reiniciar el agente** para que cargue los comandos. En clase, asumir que ya está reiniciado o saltar al tag.

**Tag de salto**: `step-4-openspec-init`.

---

### Slide 6 (5 min) · Configurar AGENTS.md

**Qué decir**:

> "AGENTS.md es lo que el agente lee antes de cada acción no trivial. Stack, dónde está la KB, qué skills tenemos, y reglas duras: no buildear, no commitear sin pedido, conventional commits, tests sin mocks. Con esto, el agente deja de pelearse con vos sobre cómo trabajar."

**Prompt al agente**:

> Creá `AGENTS.md` en la raíz con: stack tecnológico (FastAPI + SQLModel + Postgres backend, React + TS + Vite frontend), referencia a la KB en `knowledge-base/`, las skills disponibles (`kb-creator`, `roadmap-generator`, `find-skills`), y las reglas duras del proyecto: no buildear automático, no commitear sin pedido explícito, Conventional Commits sin Co-Authored-By, tests sin mocks de DB, schemas con `extra='forbid'`, snake_case Python, PascalCase componentes React.

**Después**, completá `openspec/config.yaml` manualmente (ver Parte 1 §1.5 Consigna 5 para el contenido).

**Tag de salto**: `step-5-agents-configured`.

---

### Slide 7 (10 min) · Trazar el roadmap

**Qué decir**:

> "Acá no se escribe ni una línea de código. Se decide el orden y el porqué. La skill roadmap-generator lee la KB, identifica capacidades, infiere dependencias técnicas y emite openspec/roadmap.md."

**Prompt al agente**:

> Generá el roadmap completo del proyecto leyendo la base de conocimiento.

**Cuando termina**:

```bash
cat openspec/roadmap.md
```

o abrirlo en el editor. Recorrer dos o tres dependencias en voz alta para mostrar el "por qué":

- "us-001-auth depende de us-000-setup porque necesita el BaseRepository ya creado."
- "us-006-pagos-mercadopago depende de us-007-pedidos porque el pago se asocia a un pedido existente."

**Tag de salto**: `step-6-roadmap-done`.

---

### Slide 8 (40 min) · us-000-setup de punta a punta

Esta es la slide larga. Tres sub-fases.

#### Sub-fase 8.1 · Propose (12 min)

**Qué decir**:

> "Primer comando del flujo. Va a generar cuatro artefactos: proposal, design, specs y tasks. Es planificación pura — todavía no hay código."

**Prompt al agente**:

> /opsx:propose us-000-setup

o, si el agente no reconoce el comando:

> Proponé el change us-000-setup según el roadmap. Generá proposal, design, specs y tasks.

**Cuando termina**:

```bash
openspec validate us-000-setup
```

Abrir y recorrer:

- `openspec/changes/us-000-setup/proposal.md` — sección "What Changes" + "Non-goals".
- `openspec/changes/us-000-setup/design.md` — sección "Decisions" con `DD-NN`.
- `openspec/changes/us-000-setup/tasks.md` — recorrer un par de grupos de tareas.

**Tag de salto**: `step-7a-proposed`.

**Plan B**: si demora más de 5 minutos, salto al tag y decí: "Esto es el resultado típico — proposal, design, 4 specs y tasks. El agente genera entre 200 y 400 líneas de planificación."

#### Sub-fase 8.2 · Apply (20 min)

**Qué decir**:

> "Ahora sí — con el plan firme, el agente implementa tarea por tarea. Tests primero en lógica de dominio (TDD), después la implementación."

**Prompt al agente**:

> /opsx:apply us-000-setup

o:

> Aplicá el change us-000-setup, tarea por tarea. Marcá cada tarea como completada en tasks.md.

**Recomendación fuerte**: hacé el salto al tag desde el principio, con esta narrativa:

> "El agente está empezando a generar archivos. Va a tardar entre 15 y 25 minutos en completar las 35 tareas. En lugar de mirarlo trabajar, vamos a saltar al resultado para no romper el ritmo. Acá lo dejamos andando, pasamos al final."

**Comando**:

```bash
git stash                                    # guarda lo anterior
git checkout step-7b-applied                 # salto al estado final
ls backend/app/                              # mostrar estructura backend
ls frontend/src/                             # mostrar estructura frontend
ls backend/tests/                            # mostrar tests
```

Recorrer brevemente:

- `backend/app/infrastructure/repositories/base.py` — `BaseRepository[T]`.
- `backend/app/infrastructure/uow.py` — `UnitOfWork`.
- `frontend/src/shared/stores/cartStore.ts` — un store Zustand.

**Tag de salto**: `step-7b-applied`.

#### Sub-fase 8.3 · Archive (3 min)

**Qué decir**:

> "Última fase. El change ya está implementado. Archivar significa: mover los artefactos a la carpeta archive y sincronizar las specs principales del proyecto."

**Comando en vivo**:

```bash
openspec archive us-000-setup -y
```

Mostrar el output:

```bash
ls openspec/changes/             # archive/
ls openspec/changes/archive/      # YYYY-MM-DD-us-000-setup/
ls openspec/specs/                # las 4 capabilities
```

**Cierre fuerte**:

> "Listo el primer change. Quedan ocho más. Cada uno se hace exactamente igual: propose, apply, archive. La diferencia entre vibe coding y SDD no es el agente — es ustedes. Ustedes deciden la arquitectura, el agente la ejecuta."

**Tag de salto**: `step-7c-archived`.

---

### Slide 9 (5 min) · Lo que se llevan

**Qué decir**:

> "No se llevan código de Food Store — se llevan el método. Tres cosas: una forma de trabajar (SDD con OPSX), dos skills reusables en cualquier proyecto, y el hábito de escribir specs antes de tocar el editor. El método se aprende usándolo. Tomen su propio proyecto, corran kb-creator, generen el roadmap, propongan el primer change."

**Acción**: slide pura.

**Tag de salto**: no aplica.

---

### Slide 10 (2 min) · Recursos

**Qué decir**:

> "Acá tienen todos los links de la clase: las dos presentaciones, los tres repos del proyecto, las tres herramientas. Cada uno tiene su QR — sáquenle foto al que les sirva. Las skills se instalan con un solo comando y quedan disponibles en cualquier proyecto futuro."

**Acción**: dejar la slide en pantalla 1 a 2 minutos. Aprovechar para responder preguntas finales.

---

## 2.3 Comandos en orden (chuleta)

Para tener a mano si querés ejecutar todo manualmente sin saltar a tags.

```bash
# Paso 2 · Clonar
git clone https://github.com/JuanCruzRobledo/RepositorioBaseFoodStore-SDD foodstore-clase
cd foodstore-clase

# Paso 3 · Skills (una vez por máquina)
npx skills add https://github.com/JuanCruzRobledo/kb-creator
npx skills add https://github.com/JuanCruzRobledo/roadmap-generator

# Paso 4 · Generar KB (al agente, no comando shell)
# Prompt: "Creá la base de conocimiento del proyecto a partir de los documentos en docs/."

# Paso 5 · Inicializar OpenSpec
openspec init --tools opencode,claude --force

# Paso 6 · AGENTS.md (al agente)
# Prompt: ver Slide 6 más arriba

# Paso 7 · Roadmap (al agente)
# Prompt: "Generá el roadmap completo del proyecto leyendo la base de conocimiento."

# Paso 8.1 · Propose (al agente)
# Prompt: "/opsx:propose us-000-setup"

# Validar
openspec validate us-000-setup

# Paso 8.2 · Apply (al agente)
# Prompt: "/opsx:apply us-000-setup"

# Paso 8.3 · Archive (CLI directo)
openspec archive us-000-setup -y
```

---

## 2.4 Tags para saltos en el tiempo

Los 9 tags están en el branch `clase-demo` del repo público. Antes de la clase:

```bash
cd ~/foodstore-demo
git fetch --tags
git checkout clase-demo
git tag -l   # debería mostrar los 9 tags
```

### Tabla de tags

| Tag | Estado del repo | Usar cuando... |
|-----|------------------|----------------|
| `step-0-clean` | Recién clonado, sin generar nada | Querés volver al inicio |
| `step-2-skills-installed` | Idéntico a step-0 (las skills van global) | Después de slide 3 |
| `step-3-kb-generated` | KB completa en `knowledge-base/` | Si Slide 4 demora |
| `step-4-openspec-init` | `openspec/`, `.claude/`, `.opencode/` creados | Si Slide 5 demora (raro) |
| `step-5-agents-configured` | `AGENTS.md` y `config.yaml` listos | Si Slide 6 demora |
| `step-6-roadmap-done` | `openspec/roadmap.md` generado | Si Slide 7 demora |
| `step-7a-proposed` | `us-000-setup` con sus 4 artefactos | Si propose demora >5 min |
| `step-7b-applied` | `us-000-setup` implementado (54 archivos) | **Saltar acá casi siempre en clase** |
| `step-7c-archived` | `us-000-setup` archivado, specs sincronizadas | Para mostrar el estado final |

### Comandos de salto

```bash
# Salto seguro (preserva trabajo en progreso)
git stash
git checkout <tag>

# Volver al estado completo
git checkout clase-demo

# Recuperar lo guardado
git stash pop
```

### Tabla de "qué tag corresponde a qué slide"

| Slide | Tag a usar si demora |
|-------|----------------------|
| 1 | — |
| 2 | `step-0-clean` |
| 3 | `step-2-skills-installed` |
| 4 | `step-3-kb-generated` |
| 5 | `step-4-openspec-init` |
| 6 | `step-5-agents-configured` |
| 7 | `step-6-roadmap-done` |
| 8 (propose) | `step-7a-proposed` |
| 8 (apply) | `step-7b-applied` |
| 8 (archive) | `step-7c-archived` |
| 9-10 | — |

---

## 2.5 Plan B y troubleshooting

### Si algo se rompe en vivo

| Síntoma | Plan B |
|---------|--------|
| El agente no responde por 30+ segundos | Cancelar, ir al tag siguiente, decir: "el agente está tardando, miremos el resultado para no perder ritmo". |
| `npx skills add` falla por red | Decir: "asumamos instaladas, lo importante es entender qué hacen". Saltar al tag step-2. |
| `openspec init` falla | `git checkout step-4-openspec-init`. |
| Pregunta larga de un alumno en medio de un comando | "Excelente pregunta, la respondo cuando termine este comando." |
| Backend no levanta tras apply | No insistir en clase. "El setup local toma su tiempo, pueden completarlo en casa siguiendo el README." |
| Frontend no compila | Idem. |
| Conexión a internet caída | Asegurate de tener el repo y los tags ya en local. La mayoría de los pasos funcionan offline. Lo único que requiere red: `npx skills add`. |
| Postgres no conecta | Asegurate antes de la clase. Si falla, salta al tag step-7c-archived y decí: "asumamos DB conectada". |
| El timer va atrasado en slide 7 | Saltar slide 6 (AGENTS.md) — solo mencionarlo y saltar al tag step-5. |
| El timer va atrasado en slide 8 | Hacer el salto al tag step-7b apenas arranca el apply, no esperar 20 minutos. |
| Alumnos no entienden un concepto | Tomá nota y respondé al final. No frenes el flujo principal. |

### Preguntas frecuentes que pueden aparecer en clase

| Pregunta | Respuesta corta |
|----------|------------------|
| "¿Por qué no usamos ChatGPT directo?" | Porque ChatGPT no tiene OPSX, no escribe en el filesystem como agente, y no tiene acceso a las skills. La diferencia es agente vs chat. |
| "¿Esto sirve para JavaScript / Go / Rust?" | Sí. SDD es agnóstico al stack. La KB y el roadmap se adaptan al dominio. |
| "¿Cuánto tarda armar un sistema completo así?" | Más que vibe coding al principio, mucho menos en el largo plazo (mantenimiento, onboarding, debugging). |
| "¿El agente puede equivocarse?" | Sí. Por eso vos validás cada artefacto antes del siguiente. SDD asume que el agente se equivoca y agrega checkpoints. |
| "¿Las skills son privadas o públicas?" | Las nuestras son públicas en GitHub. Pueden hacer las suyas con `/skill-creator`. |
| "¿Puedo usar esto en mi trabajo real?" | Si tu equipo te deja usar agentes de IA, sí. Lo único privado es el código de tu proyecto — la metodología es transferible. |
| "¿Qué pasa si dos personas trabajan en changes distintos en paralelo?" | Cada change vive en su carpeta. Si no comparten capabilities, no hay conflicto al archivar. |

---

## 2.6 Atajos del deck

| Tecla | Acción |
|-------|--------|
| `→` / `Espacio` / `PageDown` | Siguiente slide |
| `←` / `PageUp` | Slide anterior |
| `Home` | Primera slide |
| `End` | Última slide |
| `F` | Toggle focus mode (oculta el rail lateral) |

El deck recuerda en `localStorage` la última slide vista. Si recargás el navegador, vuelve donde estabas.

**URL del deck deployado**: `https://food-store-paso-a-paso.vercel.app/`

---

## 2.7 Prompts canónicos al agente

Tener estos a mano para copy-paste en clase. Están en español neutro.

### Prompt para Slide 4 (generar KB)

> Creá la base de conocimiento del proyecto a partir de los documentos en `docs/`.

### Prompt para Slide 6 (AGENTS.md)

> Creá `AGENTS.md` en la raíz con: stack tecnológico (FastAPI + SQLModel + Postgres backend, React + TypeScript + Vite frontend), referencia a la KB en `knowledge-base/`, las skills disponibles (`kb-creator`, `roadmap-generator`, `find-skills`), y las reglas duras del proyecto: no buildear automático, no commitear sin pedido explícito, Conventional Commits sin Co-Authored-By, tests sin mocks de DB, schemas con `extra='forbid'`, snake_case Python, PascalCase componentes React.

### Prompt para Slide 7 (roadmap)

> Generá el roadmap completo del proyecto leyendo la base de conocimiento.

### Prompt para Slide 8.1 (propose)

> /opsx:propose us-000-setup

### Prompt para Slide 8.2 (apply)

> /opsx:apply us-000-setup

### Prompt para Slide 8.3 (archive)

> /opsx:archive us-000-setup

(o el comando shell directo: `openspec archive us-000-setup -y`)

---

## 2.8 Cómo cerrar la clase

Tres cosas concretas para que se lleven:

1. **Práctica en casa**: cada uno debe replicar el flujo en un proyecto propio. Aunque sea uno chico.
2. **Compartir**: pedir que pongan el link de su roadmap.md en el grupo de la materia.
3. **Próxima clase**: anunciá qué viene si hay siguiente clase, o cómo seguir si fue la última.

**Frase de cierre sugerida**:

> "El método se aprende usándolo. Una clase no alcanza — necesitan implementar al menos un change end-to-end en un proyecto suyo para que esto se les quede. Empiecen mañana."

---

## 2.9 Después de la clase (opcional, 10 min)

- Subir el repo de la clase a GitHub para que los alumnos puedan ver el resultado final.
- Compartir el link del deck deployado y del cheat-sheet.
- Anotar qué funcionó y qué no para iteraciones futuras.
- Recopilar feedback puntual: ¿en qué slide se perdieron más?

---
---

# Apéndice · Información complementaria

## A.1 Por qué los 9 tags

Los 9 tags fueron pre-cocinados durante el ensayo previo a la clase. Cada uno representa un estado del repositorio en un punto del flujo. La estrategia de "salto en el tiempo" permite mantener la narrativa de la clase aunque el agente demore: en lugar de esperar 20 minutos viéndolo trabajar, mostrás el resultado y seguís.

Esto también beneficia a los alumnos: si después de la clase quieren revisar cómo queda el repo en un paso específico, hacen `git checkout step-N-...` y lo ven.

## A.2 Convenciones de nombres en el TP

- **Changes**: `kebab-case`, prefijo `usX-NNN-` cuando mapean a una US (`us-001-auth`, `us-005-pedidos`). Prefijo `infra-` para changes transversales (`infra-observability`).
- **Capabilities**: `kebab-case`, descriptivos (`error-handling`, `repository-pattern`, `monorepo-structure`).
- **Tareas**: numeradas por grupo (`1.1`, `1.2`, `2.1`, etc.), atómicas, de 30 a 60 minutos cada una.

## A.3 Estructura final esperada del repositorio

```
foodstore/
├── .claude/                       comandos OPSX para Claude Code
├── .opencode/                     comandos OPSX para OpenCode
├── AGENTS.md                      reglas del proyecto para el agente
├── docs/                          documentos fuente (.txt)
├── knowledge-base/                base de conocimiento generada
│   ├── 01_vision_y_objetivos.md
│   ├── 02_descripcion_general.md
│   ├── ...
│   ├── 10_preguntas_abiertas.md
│   └── README.md
├── openspec/
│   ├── config.yaml                contexto + reglas por artefacto
│   ├── roadmap.md                 mapa de changes
│   ├── specs/                     specs principales (acumulativas)
│   │   ├── error-handling/spec.md
│   │   ├── input-validation/spec.md
│   │   ├── monorepo-structure/spec.md
│   │   └── repository-pattern/spec.md
│   └── changes/
│       └── archive/
│           └── 2026-XX-XX-us-000-setup/
│               ├── proposal.md
│               ├── design.md
│               ├── specs/
│               │   ├── error-handling/spec.md
│               │   ├── input-validation/spec.md
│               │   ├── monorepo-structure/spec.md
│               │   └── repository-pattern/spec.md
│               └── tasks.md
├── backend/
│   ├── app/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   │   ├── db/session.py
│   │   │   ├── repositories/base.py
│   │   │   └── uow.py
│   │   ├── presentation/
│   │   │   ├── exceptions/handlers.py
│   │   │   ├── dependencies/auth.py
│   │   │   └── schemas/base.py
│   │   ├── db/seed.py
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── entities/
│   │   ├── shared/
│   │   │   ├── api/client.ts
│   │   │   └── stores/
│   │   │       ├── authStore.ts
│   │   │       ├── cartStore.ts
│   │   │       ├── uiStore.ts
│   │   │       └── userStore.ts
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── README.md
├── README.md
└── .gitignore
```

## A.4 Próximos changes del roadmap (no se hacen en esta clase)

| Change | Funcionalidad | Tiempo estimado solo |
|--------|---------------|----------------------|
| `us-001-auth` | JWT + RBAC + refresh tokens + rate limiting | 4-6 horas |
| `us-002-categorias` | CRUD jerárquico + ingredientes | 2-3 horas |
| `us-003-productos` | Catálogo + stock + M2M | 3-4 horas |
| `us-004-perfil` | Ver/editar perfil + cambio password | 1-2 horas |
| `us-005-direcciones` | CRUD direcciones + predeterminada | 1-2 horas |
| `us-006-carrito` | Estado client-side + personalización | 2 horas |
| `us-007-pedidos` | UoW + FSM + audit trail + listados | 5-7 horas |
| `us-008-pagos-mp` | Integración MercadoPago + webhook IPN | 4-5 horas |
| `us-009-admin` | Panel admin + métricas + control total | 3-4 horas |

**Total estimado para sistema completo**: 25 a 35 horas de trabajo guiado por SDD.

---

**Fin del documento maestro.**
