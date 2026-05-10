# Cheat-sheet · Clase FoodStore SDD

Guía interna para vos en clase. **No para los alumnos.** Cada slide tiene: qué decir, qué hacer, y a qué tag saltar si el agente demora.

**Total objetivo**: 88 min · margen de 2 min en 90.

---

## Slide 01 · Lo que ya tenés en la mochila — `5 min`

**Qué decir**:
> "La clase pasada instalaron jr-stack. Eso les dejó tres cosas listas — el orchestrator OPSX que coordina el flujo, Engram para memoria y Context7 para docs. Hoy las usamos por primera vez en un proyecto real. No vamos a re-explicarlas, vamos a verlas trabajar."

**Qué hacer**: nada — slide pura.

**Tag de salida**: ninguno.

---

## Slide 02 · Clonar el repo base — `5 min`

**Qué decir**:
> "Les damos un repo base con scaffolding. Estructura, no lógica. Lo que enseñamos no es cómo armar carpetas — eso ya está. Lo que enseñamos es el proceso de pensar y construir un sistema con SDD."

**Qué hacer en vivo**:
```bash
git clone <url-del-repo> foodstore
cd foodstore
git checkout -b clase-en-vivo step-0-clean
ls
```

Mostrar `backend/`, `frontend/`, `docs/`, `README.md`. Abrir `docs/` y mostrar los 3 .txt monolíticos.

**Tag de salida**: `step-0-clean` (estado de partida).

---

## Slide 03 · Instalar las skills — `5 min`

**Qué decir**:
> "Dos skills, una sola vez. find-skills de Vercel Labs sirve para descubrir e instalar más cuando las necesiten. kb-creator es la nuestra. Las skills viven en el agente, no en el repo — se instalan una vez por máquina."

**Qué hacer en vivo**:
```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills
npx skills add https://github.com/{tu-usuario}/kb-creator
```

Mostrar `~/.agents/skills/` con las dos carpetas instaladas (se symlinkean automáticamente a cada agente).

**Tag de salida**: `step-2-skills-installed` (alias de step-0; el repo no cambia con esto).

---

## Slide 04 · Generar la base de conocimiento — `10 min`

**Qué decir**:
> "Le decimos al agente: 'creá la base de conocimiento del proyecto'. Mode A automático porque hay archivos en docs/. Lee, analiza y emite los 10 canónicos. La KB es la fuente de verdad — si algo no está acá, no existe para el agente."

**Qué hacer en vivo**:
- Pedirle al agente: *"creá la base de conocimiento del proyecto"*.
- Mientras corre, abrir `docs/Descripcion.txt` y mostrar el documento fuente.
- Cuando termina, hacer `ls knowledge-base/` y abrir `04_modelo_de_datos.md` para mostrar la calidad.

**Si demora >3 min** → `git checkout step-3-kb-generated` y decir:
> "Esto es lo que el agente termina generando. Tarda un rato porque está analizando 400 líneas de fuente. Sigamos."

**Tag de salida**: `step-3-kb-generated`.

---

## Slide 05 · Inicializar OpenSpec — `3 min`

**Qué decir**:
> "Un comando. Crea openspec/ donde van a vivir specs y changes, más las skills y commands del flujo OPSX para nuestro agente. Después de esto, el agente reinicia y ya tiene /opsx:propose, /opsx:apply, /opsx:archive disponibles."

**Pre-check**: verificar que tengan el CLI instalado. Si alguno no lo tiene:
```bash
npm install -g @fission-ai/openspec@latest
```
Más info en https://openspec.dev/

**Qué hacer en vivo**:
```bash
openspec init --tools opencode,claude
```

Abrir `openspec/config.yaml` para mostrar dónde se va a configurar el contexto. Mostrar también `.claude/commands/opsx/` o `.opencode/commands/`.

**Tag de salida**: `step-4-openspec-init`.

---

## Slide 06 · Configurar AGENTS.md — `5 min`

**Qué decir**:
> "AGENTS.md es lo que el agente lee antes de cada acción no trivial. Stack, dónde está la KB, qué skills tenemos, y reglas duras: no buildear, no commitear sin pedido, conventional commits, tests sin mocks. Con esto, el agente deja de pelearse con vos sobre cómo trabajar."

**Qué hacer en vivo**:
- Crear `AGENTS.md` en raíz pidiéndole al agente: *"creá un AGENTS.md con el stack, la KB en knowledge-base/, las reglas duras y las skills disponibles"*.
- Mostrar el archivo generado.
- También abrir `openspec/config.yaml` y agregar el `context` y `rules` que el agente respeta para los artefactos.

**Si demora** → `git checkout step-5-agents-configured`. Mostrar el `AGENTS.md` y `openspec/config.yaml` ya armados.

**Tag de salida**: `step-5-agents-configured`.

---

## Slide 07 · Trazar el roadmap — `10 min`

**Qué decir**:
> "Acá no se escribe ni una línea de código. Se decide el orden y el porqué. La skill roadmap-generator lee la KB, identifica las capacidades, infiere dependencias técnicas, y emite openspec/roadmap.md. Auth antes que recursos protegidos, datos antes que CRUD, integraciones al final."

**Qué hacer en vivo**:
- Pedirle al agente: *"generá el roadmap del proyecto"*.
- Cuando termina, abrir `openspec/roadmap.md` y mostrar la tabla.
- Recorrer 2-3 dependencias en voz alta para mostrar el "por qué".

**Si demora** → `git checkout step-6-roadmap-done`.

**Tag de salida**: `step-6-roadmap-done`.

---

## Slide 08 · us-000-setup de punta a punta — `40 min`

**Qué decir** (intro):
> "El primer change. Tres comandos OPSX, tres etapas. Acá se ve el ciclo completo: planificar, construir, archivar. Es el ciclo que van a repetir 9 veces más para tener Food Store entero."

### Sub-fase 1 — `/opsx:propose us-000-setup` (~12 min)
- *"propone el change us-000-setup"*.
- Mientras corre, abrir el archivo `tasks.md` cuando aparezca y recorrer el listado.
- Mostrar `proposal.md`, `design.md`, `specs/{capability}/spec.md`.
- Validar con `openspec validate us-000-setup`.

**Si demora >5 min** → `git checkout step-7a-proposed`. Decir: *"Esto es el resultado típico — proposal, design, 4 specs y tasks. Va a generar de 200 a 400 líneas de planificación."*

### Sub-fase 2 — `/opsx:apply us-000-setup` (~20 min)
- *"aplicá el change us-000-setup"*.
- El agente va escribiendo archivos. Hay que esperar.
- Cuando termina, mostrar la estructura `backend/app/{domain,application,infrastructure,presentation}/`, los stores en `frontend/src/shared/stores/`, los tests.
- **Acá la mejor jugada es hacer salto de tiempo**: dejar que arranque, pasar al tag y mostrar el resultado en lugar de esperar 20 min. Decir: *"el agente está terminando esto, así queda al final, miremos el resultado para no perder tiempo"*.

**Salto seguro**: `git stash && git checkout step-7b-applied`.

### Sub-fase 3 — `/opsx:archive us-000-setup -y` (~3 min)
- *"archivá el change us-000-setup"*.
- Mostrar el output: change movido a `openspec/changes/archive/2026-XX-XX-us-000-setup/`, specs sincronizados en `openspec/specs/`.
- Cerrar mostrando `openspec list` (cero changes activos = listo para el siguiente).

**Tag de salida**: `step-7c-archived`.

---

## Slide 09 · Lo que se llevan — `5 min`

**Qué decir**:
> "No se llevan código de Food Store — se llevan el método. Una forma de trabajar. Dos skills reusables en cualquier proyecto. Y el hábito de escribir specs antes de tocar el editor. El método se aprende usándolo. Tomen su propio proyecto, corran kb-creator, generen el roadmap, y propongan el primer change."

**Qué hacer**: nada — slide de cierre.

**Cierre fuerte**: *"La diferencia entre vibe coding y SDD no es el agente — es ustedes. Ustedes deciden la arquitectura. El agente la ejecuta."*

---

## Plan B si algo se rompe en vivo

| Síntoma | Plan B |
|---------|--------|
| El agente no responde | `git stash && git checkout step-N` y seguir con la slide siguiente. |
| `npx skills add` falla por red | "Hagamos como si las hubiéramos instalado, lo importante es ver qué hacen" → ir al tag step-3 directamente. |
| `openspec init` falla | `git checkout step-4-openspec-init`, mostrar la estructura. |
| El timer se va | Saltar slide 6 (AGENTS.md) — solo mencionarlo y saltar al tag step-5. |
| Pregunta larga de un alumno | "Excelente pregunta, lo respondo al final con tiempo" — no romper el ritmo. |

---

## Atajos de teclado del deck

| Tecla | Acción |
|-------|--------|
| `→` / `Espacio` / `PageDown` | Siguiente slide |
| `←` / `PageUp` | Slide anterior |
| `Home` | Primera slide |
| `End` | Última slide |
| `F` | Toggle focus mode (oculta el rail) |

El deck recuerda en `localStorage` la última slide vista — si recargás, vuelve donde estabas.
