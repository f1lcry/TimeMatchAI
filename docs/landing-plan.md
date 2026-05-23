# TimeMatch — Landing Page Implementation Plan

## Context

В репозитории `TimeMatchAI` есть готовая дизайн-система от Daniel Popov (Claude Design): полный набор токенов в `design/project/colors_and_type.css`, brand guide в `design/project/README.md`, ассеты (логотипы, grid-pattern SVG), и **готовая React/JSX-сборка лендинга** в `design/project/ui_kits/marketing/` — 11 компонентов, рендерится через Babel-in-browser. Шаблон визуально мощный (editorial-академический тон в духе Linear/Stripe + JSTOR), с одной signature-анимацией (re-solve расписания каждые 2.8 с).

Но шаблон не годится "как есть": в нём фиктивные данные (Trinity College Dublin, Síle Murphy, "28 EU universities", "MARCH 2026") и нет реальной story TimeMatch (HSE как anchor, российский рынок, реальная стата из исследований 61.2 / 84.5 / 98.6 %, шесть конкретных со-фаундеров). Плюс задача — **поразить команду и партнёров продвинутостью**, то есть базового шаблона мало: нужны интерактивные wow-механики поверх него.

Repo — engineering demo для pitch deck (не production). Architectural invariants (`docs/architecture.md`) требуют Django 5 как основной стек, multi-tenancy для product cabinet, и landing-app как первый видимый deliverable. Этот план кладёт первый камень всей репо-структуры — Django scaffold + landing — и через wow-лендинг работает на убедительность продукта для команды и инвесторов.

## Подход (зафиксированные решения)

- **Стек:** Django 5 + Python 3.13 + `uv` как package manager. Гибрид: структурные секции на Django templates, **React-острова** только для двух интерактивных кусков (Schedule и AI Chat). React+ReactDOM пресобираются через `esbuild` (zero config, fast) в один bundle, лежащий в `static/landing/js/`. Никакого Babel-in-browser.
- **Контент:** двуязычный RU/EN, RU — default (`LANGUAGE_CODE='ru'`). Полный i18n через Django gettext с дня 1 — все строки в `{% trans %}` / `{% blocktrans %}`, оба `.po` файла (`ru/LC_MESSAGES/django.po` и `en/LC_MESSAGES/django.po`) готовы и скомпилированы в `.mo`. Переключатель языка в Header работает с момента деплоя.
- **Данные:**
  - LogoBar: HSE как anchor + 4-5 топ-вузов РФ (МГУ, СПбГУ, МФТИ, ИТМО, УрФУ) с eyebrow "В переговорах с" вместо "Adopted by registrars at".
  - Stats: гибрид 2 + 2. Две рыночные цифры (84.5 % хотят выбирать расписание / "до 5× дешевле ERP") + две продуктовые "цели пилота" (например, "≤ 5 мин на solve", "0 конфликтов на публикации") с мелким дисклеймером "Target SLA, пилот HSE весна 2026".
  - Все плейсхолдеры из шаблона (Trinity / Síle Murphy / EU-universities / "MARCH 2026") выкидываем. Testimonial — либо ректор/проректор HSE (если есть согласие — placeholder с пометкой `<!-- TODO: подтвердить цитату -->`), либо заменяем секцию на блок "Что говорят наши исследования" с короткой выжимкой.
- **Wow-механики (все 4):**
  1. **Интерактивная Schedule-grid** (React-остров): сохраняем авто re-solve каждые 2.8 с, добавляем drag-and-drop ячеек, при коллизии — citron-обводка + лейбл "Конфликт", кнопка "Re-solve" решает оптимизатор-имитацию (timer-based shuffle) с staggered анимацией. На mobile (`pointer: coarse`) drag отключаем, оставляем только авто.
  2. **AI Chat preview** (React-остров, отдельная секция): окно чата, юзер задаёт вопрос ("Когда у второго потока 3 курса лекции по матану?"), AI печатает ответ с typewriter-эффектом, в ответе — мини-таблица расписания. 3-4 преднастроенных Q/A в loop. Демонстрирует второй ключевой инвариант продукта (read-only AI с tool-calling).
  3. **Scroll-triggered анимации** (vanilla JS + IntersectionObserver): stagger-reveal заголовков и карточек (translateY + opacity, 200ms ease-out), count-up цифр в Stats при попадании в viewport, "прорисовывание" hairline-разделителей через `clip-path`. Полностью CSS-only где возможно; `prefers-reduced-motion` уважаем.
  4. **Custom SVG + grid-pattern parallax** (vanilla CSS/JS): фоновая `grid-pattern.svg` в hero и Stats двигается медленнее скролла (3D translate в `will-change: transform`); между секциями — кастомная SVG-диаграмма "constraint solver" (узлы + анимированные стрелки `stroke-dasharray`), которую можно навести и подсветить.
- **Lead-form:** полная Django-форма. Поля: имя, email, университет, роль (registrar/dean/IT/other через `select`), сообщение. CSRF. Запись в `LeadRequest` модель + email-уведомление через Django `send_mail` на sales-контакт (settings constant, в dev — console backend). После submit — success-страница в editorial-стиле.
- **Privacy page:** обязательна юридически, раз собираем PII. Минимальная Django-вьюшка + шаблон с placeholder-текстом и пометкой `<!-- TODO: финальный юридический текст от Daniel Potekhin -->`. Terms / GDPR / SOC 2 в футере — dead-link с `title="Скоро"` и `aria-disabled`.

## Архитектура файлов

```
TimeMatchAI/
├── pyproject.toml                          # uv, Django 5.x, python-dotenv (минимум)
├── uv.lock
├── manage.py
├── .env.example                            # SECRET_KEY, DEBUG, SALES_EMAIL, DATABASE_URL
├── .gitignore                              # +__pycache__, *.pyc, .env, db.sqlite3, node_modules, static/landing/dist
├── config/
│   ├── __init__.py
│   ├── asgi.py
│   ├── wsgi.py
│   ├── urls.py                             # include('apps.landing.urls'), i18n_patterns, static в DEBUG
│   └── settings/
│       ├── __init__.py
│       ├── base.py                         # INSTALLED_APPS, MIDDLEWARE (+LocaleMiddleware), TEMPLATES, STATIC, i18n
│       ├── dev.py                          # DEBUG=True, console email, sqlite
│       └── prod.py                         # заглушка, минимум на read
├── apps/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   └── (Organization/Membership пока не нужны — добавим в скоупе scheduler-фазы)
│   └── landing/
│       ├── __init__.py
│       ├── apps.py
│       ├── models.py                       # LeadRequest (name, email, university, role, message, created_at)
│       ├── forms.py                        # LeadRequestForm (ModelForm, RU labels через _())
│       ├── views.py                        # home(), lead_create(), lead_success(), privacy(), set_language wrapper
│       ├── urls.py                         # '' → home, 'lead/' → POST, 'lead/thanks/' → success, 'privacy/' → privacy
│       ├── admin.py                        # LeadRequestAdmin (read-only list, фильтры)
│       ├── emails.py                       # notify_sales(lead) — Django send_mail
│       ├── migrations/
│       │   └── 0001_initial.py
│       ├── templates/
│       │   └── landing/
│       │       ├── base.html               # <html>, head с CSS-токенами + bundles, header/footer includes
│       │       ├── home.html               # extends base, инклюдит все секционные partials
│       │       ├── privacy.html
│       │       ├── lead_success.html
│       │       └── _partials/
│       │           ├── _header.html        # nav + RU/EN toggle (form POST в /i18n/setlang/)
│       │           ├── _hero.html          # h1 "Расписание, решено." + Schedule-grid mount (<div data-island="schedule">)
│       │           ├── _logobar.html       # HSE + 5 RU вузов
│       │           ├── _how_it_works.html  # 3 шага
│       │           ├── _features.html      # 2x2 grid + inline-demos (статика, CSS-only)
│       │           ├── _ai_chat.html       # AI Chat секция (<div data-island="ai-chat">)
│       │           ├── _stats.html         # тёмная, 2+2 цифры, data-countup-from/to атрибуты
│       │           ├── _testimonial.html
│       │           ├── _faq.html           # 5-6 вопросов, <details> + JS-enhancement
│       │           ├── _pricing.html       # Pilot / Production / Enterprise, без сумм
│       │           ├── _cta.html
│       │           ├── _footer.html
│       │           └── _solver_diagram.html  # вставка кастомной SVG-диаграммы между Features и AI Chat
│       └── locale/
│           ├── ru/LC_MESSAGES/django.{po,mo}
│           └── en/LC_MESSAGES/django.{po,mo}
├── static/
│   └── landing/
│       ├── css/
│       │   ├── tokens.css                  # symlink или copy из design/project/colors_and_type.css
│       │   ├── base.css                    # reset, body, focus-visible, container, generic helpers
│       │   ├── sections.css                # стили секций (paddings, grids, h2/h3 sizes)
│       │   ├── motion.css                  # @keyframes, .reveal-on-scroll, parallax classes, prefers-reduced-motion
│       │   └── components.css              # buttons, eyebrow, cards, faq accordion, pricing, forms
│       ├── js/
│       │   ├── src/                        # source for esbuild
│       │   │   ├── islands/
│       │   │   │   ├── schedule.jsx        # портирован из ScheduleGrid.jsx, расширен drag+conflict+resolve
│       │   │   │   └── aiChat.jsx          # новый: typewriter, 3-4 Q/A loop, mini-table
│       │   │   ├── vanilla/
│       │   │   │   ├── reveal.js           # IntersectionObserver stagger
│       │   │   │   ├── countup.js          # numeric tween на stats
│       │   │   │   ├── parallax.js         # grid-pattern translate + diagram hover
│       │   │   │   ├── header.js           # sticky+blur при scroll
│       │   │   │   └── faq.js              # details enhancement, focus-trap
│       │   │   └── main.js                 # entry: импортирует все vanilla модули, монтирует React-острова через document.querySelectorAll('[data-island]')
│       │   └── dist/                       # output esbuild (gitignore'нуть)
│       │       ├── main.js
│       │       └── main.css                # если esbuild соберёт CSS из tokens; иначе CSS вручную
│       ├── img/                            # symlink / copy из design/project/assets/
│       │   ├── logo.svg
│       │   ├── logo-inverse.svg
│       │   ├── monogram.svg
│       │   ├── favicon.svg
│       │   ├── grid-pattern.svg
│       │   ├── grid-pattern-dark.svg
│       │   └── universities/               # HSE.svg + MSU.svg + SPbU.svg + MIPT.svg + ITMO.svg + UrFU.svg (заглушки serif-набранным текстом)
│       └── svg/
│           └── solver-diagram.svg          # кастомная диаграмма constraint solver (узлы + стрелки)
├── package.json                            # esbuild как devDependency
├── build.mjs                               # esbuild config: entry static/landing/js/src/main.js → dist/main.js
└── README.md                               # обновить: команды dev (uv run manage.py runserver, npm run build, makemessages)
```

## Ключевые технические решения

- **Дизайн-токены переиспользуем 1:1.** `static/landing/css/tokens.css` — копия `design/project/colors_and_type.css`. Никаких новых цветов и шрифтов. Все секции читают только `--tm-*` переменные.
- **React-острова mount через `data-island`.** В `main.js` после DOMContentLoaded — `document.querySelectorAll('[data-island="schedule"]').forEach(el => createRoot(el).render(<ScheduleGrid />))`. То же для AI Chat. Server-rendered Django передаёт начальные пропсы через `data-props` JSON-атрибут (для AI Chat — массив RU/EN сценариев в зависимости от текущей локали).
- **Локализация JS-строк.** Используем Django `JavaScriptCatalog` view, монтируем в `<script src="{% url 'javascript-catalog' %}">` перед main bundle. React-острова используют `gettext()`/`ngettext()` из глобала. Альтернатива (если хочется проще) — прокинуть локализованные строки через `data-props` в DOM.
- **Schedule-grid (расширение шаблона).**
  - Сохраняем структуру 5×5, color-coded предметы из existing `COURSES`.
  - Делаем ячейки `draggable=true`. На `dragstart` сохраняем `{day, slot, courseIdx}`, на `dragover` подсвечиваем target ячейку через ghost-border citron, на `drop` — если target занят, считаем коллизию (две карточки на одном слоте → красный border `--tm-danger` + лейбл "Конфликт" + кнопка появляется "Re-solve").
  - "Re-solve" — анимация: все конфликтные ячейки одновременно "пересаживаются" в свободные слоты (CSS-transition 360ms ease-out), последний шаг — citron-вспышка matched-ячейки.
  - На `@media (pointer: coarse)` или `prefers-reduced-motion: reduce` — drag/animations отключены, оставляем static + 1 цикл re-solve.
- **AI Chat preview.**
  - Окно в стиле macOS chrome (как ScheduleGrid), но контент — chat-message list.
  - Цикл из 3-4 преднастроенных пар: user-message появляется (slide-in), AI message набирается типографически (`setInterval` по 1-2 символа, ~25 ms tick), в конце — встроенная мини-таблица расписания (3-4 строки).
  - Курсор-блёстка `▎` после последнего набранного символа.
  - В loop'е после показа всех сценариев — 2 сек паузы, начинаем сначала.
- **Stats count-up.**
  - Каждое значение в `<span data-countup-to="84.5" data-countup-from="0" data-countup-suffix="%">0</span>`.
  - При intersection — `requestAnimationFrame`-tween 800ms ease-out, обновляет textContent.
  - Tabular-nums гарантирует, что цифры не дёргают layout.
- **Parallax.**
  - `.parallax-grid::before` — псевдоэлемент с `background-image: url(grid-pattern.svg)`, `will-change: transform`. JS на scroll читает `getBoundingClientRect()` и пишет `--scroll-offset` в CSS-переменную; псевдоэлемент использует `transform: translate3d(0, calc(var(--scroll-offset) * 0.3), 0)`.
  - `requestAnimationFrame`-throttle. На `prefers-reduced-motion: reduce` — отключаем.
- **Solver-diagram (custom SVG).**
  - Inline SVG в `_solver_diagram.html`. Узлы (5-6 кружков "Rooms / Faculty / Courses / Constraints / Schedule") соединены `<path>` стрелками. Stroke-dasharray анимирован через `<animate>` SMIL или CSS `@keyframes` — стрелки "рисуются" слева направо при scroll-reveal.
  - На hover узла — увеличение radius + citron-fill через `:hover` CSS.
- **i18n c дня 1.**
  - `LANGUAGE_CODE = 'ru'`, `LANGUAGES = [('ru', 'Russian'), ('en', 'English')]`, `LOCALE_PATHS = [BASE_DIR / 'apps/landing/locale']`.
  - `MIDDLEWARE` включает `django.middleware.locale.LocaleMiddleware` после `SessionMiddleware`.
  - URL prefix: `i18n_patterns(path('', include('apps.landing.urls')), prefix_default_language=False)` — RU без префикса (`/`), EN — `/en/`.
  - `set_language` view стандартный, POST из header-переключателя.
  - Все строки в шаблонах через `{% load i18n %}{% trans "Расписание, решено." %}`. Длинные блоки через `{% blocktrans %}`.
  - `manage.py makemessages -l ru -l en`, заполнить `.po` вручную (текст пишу я в плане-импл, при выполнении), `manage.py compilemessages`.
- **LeadRequest модель.**
  ```python
  class LeadRequest(models.Model):
      name = models.CharField(max_length=120)
      email = models.EmailField()
      university = models.CharField(max_length=200)
      role = models.CharField(max_length=32, choices=ROLE_CHOICES)
      message = models.TextField(blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      # без organization FK — лиды живут до tenant-onboarding
      class Meta:
          ordering = ['-created_at']
  ```
- **Email notification.**
  - В dev: `EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'`.
  - В prod: settings hook, реальные параметры из `.env` (отложено до первого деплоя).
  - `SALES_EMAIL` константа в settings — placeholder `sales@time-match.tech`, при имплементации подтвердить адрес.
- **Шрифты:** Google Fonts `@import` из tokens.css работает как есть. Производительность для лендинга-демо приемлема; pre-host в `static/landing/fonts/` оптимизация на следующую итерацию.

## Информационная архитектура (порядок секций на странице)

1. **Header** (sticky) — logo · Платформа · Как работает · Для регистраторов · Цены · FAQ · `[Войти]` · `[Запросить демо]` · `RU | EN`
2. **Hero** — eyebrow "Платформа · для высшего образования" / h1 "Расписание, решено." (citron-подчёркивание на "решено") / lead text / 2 CTA / mono-строка "· пилот с НИУ ВШЭ · весна 2026" / interactive Schedule-grid под текстом
3. **LogoBar** — eyebrow "В переговорах с" / 6 университетов (HSE выделен fill ink, остальные — outline)
4. **HowItWorks** — h2 "От таблиц до решения за три прохода." / 3 шага с mono-снипетами
5. **Features** — h2 "Одна платформа. Все ограничения." / 2×2 grid с inline-демо (как в шаблоне, но переведено)
6. **Solver diagram** (новая, между Features и AI Chat) — кастомная SVG-визуализация constraint solver, eyebrow "Архитектура"
7. **AI Chat** (новая секция, React-остров) — eyebrow "Read-only AI · работает только с вашими данными" / h2 "Расписание умеет отвечать на вопросы." / chat-окно справа / 3-4 примера запросов слева
8. **Stats** (тёмная) — eyebrow "Цифры за продуктом" / 4 числа (2 рыночных + 2 целевых) с count-up
9. **Testimonial** (опционально, с placeholder-цитатой HSE) или короткий research-блок
10. **FAQ** — accordion из 5-6 вопросов (безопасность, СУО-интеграции, формат пилота, сроки, стоимость, кто владеет данными)
11. **Pricing** — 3 тира карточками (Pilot / Production / Enterprise), без сумм, "связаться с командой"
12. **CTA** (тёмная) — h2 "Подведите следующий семестр к TimeMatch." / lead-form здесь или ссылка на отдельную страницу
13. **Footer** — 5 колонок (бренд + Платформа / Для / Команда / Ресурсы) + копирайт + ссылки (Privacy активная, остальные disabled)

## Верификация

После реализации проверяю последовательно:

- **Django sanity.** `uv run python manage.py check` — без ошибок. `uv run python manage.py runserver` — открывается `http://localhost:8000/`, отдаётся home page без 500.
- **Сборка JS.** `node build.mjs` (или `npm run build`) — собирается `static/landing/js/dist/main.js` без warnings. Размер бандла под 100 КБ gzipped (React+ReactDOM ~ 45 КБ + код).
- **Локализация.** Открыть `/` → весь UI на русском. Открыть `/en/` → весь UI на английском. Переключатель в header переключает и сохраняет language cookie. `django-admin makemessages` не находит пропущенных строк.
- **Wow-механики (manual в браузере):**
  - Hero: Schedule-grid авто-перетасовывает ячейки каждые ~3 сек, drag работает (desktop), коллизия подсвечивается красным, кнопка "Re-solve" появляется и решает.
  - AI Chat: цикл из вопросов/ответов идёт, typewriter печатает, mini-table рендерится в ответе.
  - Stats: при scroll вниз цифры считают от 0 до целевого значения (count-up).
  - Parallax: фоновая grid-pattern в hero двигается медленнее, чем контент.
  - Solver-diagram: стрелки прорисовываются при появлении в viewport.
  - `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS media) — все анимации отключены, контент читаем.
- **Lead-form.** Заполнить форму → submit → редирект на success-страницу → в консоли Django видно отправленный email на sales-адрес → в `/admin/landing/leadrequest/` строка появилась.
- **Адаптивность.** DevTools на 375 px (iPhone) — все секции читаемы, нет горизонтального скролла, Schedule-grid в авто-режиме без drag, header в мобильном варианте.
- **A11y минимум.** Tab по странице — focus visible на каждом интерактивном элементе. Lighthouse Accessibility ≥ 90.
- **HSE как anchor проверка.** В LogoBar HSE первый и визуально выделен, в hero mono-строка упоминает HSE, в testimonial (если есть) — HSE, в FAQ "Кто ваш anchor-партнёр?" — HSE.

После реализации показываю команде на `http://localhost:8000/` и `/en/` для validation.

## Out of scope (явно)

- Реальная Privacy/Terms/GDPR/SOC 2 копия — placeholder + TODO от Daniel Potekhin.
- Production SMTP / реальный sales-адрес — placeholder в settings, подтвердить.
- Реальные логотипы вузов в PNG/SVG (используем serif-typeset placeholder в стиле шаблона).
- Реальная фотография testimonial-человека (инициалы в круге, как в шаблоне).
- Скриншоты реального продукта (продукта ещё нет — Schedule-grid и AI Chat сами являются "скриншотами").
- Django apps `core` (Organization, Membership), `directory`, `scheduler`, `ai_chat` — этот план только про `landing`. Создаём только `apps/core` как пустой app для будущей multi-tenancy, без моделей.
- CI, тесты, deploy. После того как лендинг живой — отдельная задача.
