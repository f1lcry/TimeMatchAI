"""
Landing copy — one dict per string, keyed by dot-namespace.

Conventions
-----------
- EN strings are sourced from `design/project/ui_kits/marketing/*.jsx` (the
  designed canon). They use sentence case, en/em dashes per the brand voice.
- RU strings are an authorial rewrite, not a literal translation: each line
  is rewritten to sound right in Russian (academic register, no English
  syntactic crutches, "5×" stays as "5×" etc.).
- Technical terms stay in English on both locales: CRM, ERP, AI, API, LMS,
  SIS, REST, JSON, SLA, SaaS, KPI, Solver, Constraint, Pilot, Production,
  Enterprise. Russian aliases (СУО, ИИ) are deliberately avoided.
- Concrete proper nouns kept verbatim: HSE / НИУ ВШЭ, Modeus, 1С Университет.
- HTML-safe: tags inside strings are intentional (<br>, <span>, <a>).

Add new strings here, not in templates. Templates call them via
`{% c "namespace.key" %}` (see templatetags/copy_tags.py).
"""

COPY: dict[str, dict[str, str]] = {

    # ---------- Document chrome ----------
    "doc.title": {
        "ru": "TimeMatch — расписание, которое сходится.",
        "en": "TimeMatch — scheduling, solved.",
    },
    "doc.meta": {
        "ru": "AI-платформа расписания для университетов. Стоимость администрирования — до 5× ниже. Пилот с НИУ ВШЭ, весна 2026.",
        "en": "AI scheduling platform for universities. Up to 5× lower admin cost. Pilot with HSE University, Spring 2026.",
    },

    # ---------- Common buttons / inline ----------
    "btn.demo": {"ru": "Запросить демо", "en": "Request a demo"},
    "btn.platform": {"ru": "Платформа целиком →", "en": "See the platform →"},
    "btn.back_home": {"ru": "← На главную", "en": "← Back to home"},
    "btn.contact": {"ru": "Связаться", "en": "Contact"},

    # ---------- Header ----------
    "header.nav.platform": {"ru": "Платформа", "en": "Platform"},
    "header.nav.how": {"ru": "Как работает", "en": "How it works"},
    "header.nav.ai": {"ru": "AI-помощник", "en": "AI assistant"},
    "header.nav.pricing": {"ru": "Цены", "en": "Pricing"},
    "header.nav.faq": {"ru": "FAQ", "en": "FAQ"},
    "header.main_nav": {"ru": "Главная навигация", "en": "Primary"},
    "header.lang.switch": {"ru": "Switch to English", "en": "Переключить на русский"},

    # ---------- Hero ----------
    "hero.eyebrow": {
        "ru": "Платформа · для университетов",
        "en": "Platform · for higher education",
    },
    "hero.h1.line1": {"ru": "Расписание,", "en": "Scheduling,"},
    "hero.h1.accent": {"ru": "сошлось", "en": "solved"},
    "hero.lede": {
        "ru": "TimeMatch собирает оптимизированное расписание университета за часы, а не за месяцы — со всеми кафедрами, аудиториями, окнами преподавателей и предпочтениями студентов. Стоимость администрирования падает до 5×.",
        "en": "TimeMatch builds optimised university timetables in hours, not months — across every department, room, faculty constraint and student preference. Cuts scheduling administration by up to 5×.",
    },
    "hero.pilot": {
        "ru": "· пилот с НИУ ВШЭ · весна 2026",
        "en": "· pilot with HSE University · Spring 2026",
    },
    "hero.schedule.aria": {
        "ru": "Демонстрация расписания: оптимизатор пересобирает таблицу каждые несколько секунд.",
        "en": "Schedule demo — the optimiser re-solves the grid every few seconds.",
    },
    "hero.schedule.loading": {
        "ru": "Расписание загружается…",
        "en": "Loading schedule…",
    },

    # ---------- LogoBar ----------
    "logobar.eyebrow": {"ru": "В переговорах с", "en": "In conversation with"},
    "logobar.hse.sub": {"ru": "Anchor · СПб + Москва", "en": "Anchor · SPb + Moscow"},
    "logobar.msu.sub": {"ru": "Москва", "en": "Moscow"},
    "logobar.spbu.sub": {"ru": "Санкт-Петербург", "en": "St. Petersburg"},
    "logobar.mipt.sub": {"ru": "Долгопрудный", "en": "Dolgoprudny"},
    "logobar.itmo.sub": {"ru": "Санкт-Петербург", "en": "St. Petersburg"},
    "logobar.urfu.sub": {"ru": "Екатеринбург", "en": "Yekaterinburg"},

    # ---------- HowItWorks ----------
    "how.eyebrow": {"ru": "Как работает", "en": "How it works"},
    "how.h2": {
        "ru": "От Excel до решения — в три шага.",
        "en": "From spreadsheets to solved, in three passes.",
    },
    "how.lede": {
        "ru": "Тот же класс constraint-оптимизаторов, что у крупнейших логистических операторов Европы, переписан под правила высшей школы. Без макросов в Excel и ночных перетасовок аудиторий.",
        "en": "The same constraint solver used by Europe's largest cargo schedulers, adapted for the rules of higher education. No spreadsheet macros, no overnight room swaps.",
    },
    "how.step1.title": {"ru": "Подключите данные", "en": "Connect your data"},
    "how.step1.body": {
        "ru": "Импорт аудиторий, преподавателей, дисциплин и потоков из вашей LMS / SIS. TimeMatch читает Modeus, LMS HSE, 1С Университет и ещё 12 систем.",
        "en": "Pull rooms, faculty, courses and enrolment from your SIS. TimeMatch reads Modeus, HSE LMS, 1C University and 12 other systems.",
    },
    "how.step1.mono": {
        "ru": "↻ sync: 1 284 курса · 312 аудиторий · 1 847 студентов",
        "en": "↻ sync: 1,284 courses · 312 rooms · 1,847 students",
    },
    "how.step2.title": {"ru": "Опишите ограничения", "en": "Declare the constraints"},
    "how.step2.body": {
        "ru": "Жёсткие правила — без двойного бронирования, доступная среда. Мягкие предпочтения — окна преподавателей, близость корпусов. TimeMatch разрешает компромиссы, которые иначе обсуждались бы на учёном совете.",
        "en": "Hard rules (no double-bookings, accessibility) and soft preferences (faculty windows, building proximity). TimeMatch resolves the trade-offs you'd otherwise debate in committee.",
    },
    "how.step2.mono": {
        "ru": "hard: 24 · soft: 116 · strategy: balanced",
        "en": "hard: 24 · soft: 116 · strategy: balanced",
    },
    "how.step3.title": {
        "ru": "Решить. Опубликовать. Пересобрать.",
        "en": "Solve. Publish. Re-solve.",
    },
    "how.step3.body": {
        "ru": "Solver находит допустимое и почти-оптимальное расписание за минуты. Закрылась аудитория, изменилась доступность преподавателя — расписание пересобирается за ночь, утром команда подтверждает diff.",
        "en": "The optimiser finds a feasible, near-optimal timetable in minutes. When a room closes or a faculty member's availability shifts, the schedule re-solves overnight — your team approves the diff in the morning.",
    },
    "how.step3.mono": {
        "ru": "✓ solved in 4 m 12 s · 98,7 % preferences met",
        "en": "✓ solved in 4m 12s · 98.7% preferences met",
    },

    # ---------- Features ----------
    "features.eyebrow": {"ru": "Платформа", "en": "Platform"},
    "features.h2": {
        "ru": "Одна платформа. Любое ограничение.",
        "en": "One platform. Every constraint.",
    },
    "features.lede": {
        "ru": "Всё, что нужно учебному офису, — в одном окне. С журналом изменений, ролями и интеграцией с вашей LMS / SIS.",
        "en": "Everything a registrar's office needs, in one place — auditable, role-aware, and integrated with your existing SIS.",
    },

    "features.conflict.title": {
        "ru": "Конфликты — до публикации",
        "en": "Resolves conflicts before they happen",
    },
    "features.conflict.body": {
        "ru": "Каждое двойное бронирование, разрыв доступности и узкое место по аудиториям проверяется на этапе solver-а. Конфликт всплывает вместе с тем ограничением, которое его создало, — и платформа предлагает фикс.",
        "en": "Every double-booking, accessibility gap and faculty window is checked at solve time. Conflicts surface together with the constraint that caused them — and the platform proposes a fix.",
    },
    "features.conflict.demo.line1.title": {"ru": "Зал 2А · Пн · 09:00", "en": "Hall 2A · Mon · 09:00"},
    "features.conflict.demo.line1.sub": {
        "ru": "CS 101 · LIN 220 — двойное бронирование",
        "en": "CS 101 · LIN 220 — double-booked",
    },
    "features.conflict.demo.line2": {
        "ru": "↪ переносим LIN 220 → Зал 1Б · Пн · 09:00",
        "en": "↪ moving LIN 220 → Room 1B · Mon · 09:00",
    },
    "features.conflict.demo.line3": {
        "ru": "✓ решено · мягкие предпочтения сохранены",
        "en": "✓ resolved · soft preferences preserved",
    },

    "features.language.title": {
        "ru": "Constraint-язык под академию",
        "en": "Constraint language built for academia",
    },
    "features.language.body": {
        "ru": "Жёсткие правила и взвешенные предпочтения описываются простыми словами. Знаний solver-CSP не требуется: декан пишет свои ограничения, платформа их согласует.",
        "en": "Declare hard rules and weighted preferences in plain terms. No solver expertise required — department heads write their own constraints, the platform reconciles.",
    },
    "features.language.demo.k1": {"ru": "no-double-booking", "en": "no-double-booking"},
    "features.language.demo.v1": {"ru": "hard", "en": "hard"},
    "features.language.demo.k2": {"ru": "окна преподавателей", "en": "faculty windows"},
    "features.language.demo.v2": {"ru": "soft · w=3", "en": "soft · w=3"},
    "features.language.demo.k3": {"ru": "переход ≤ 12 мин", "en": "walk-time ≤ 12 min"},
    "features.language.demo.v3": {"ru": "soft · w=2", "en": "soft · w=2"},
    "features.language.demo.k4": {"ru": "доступная среда", "en": "accessible-only rooms"},
    "features.language.demo.v4": {"ru": "hard", "en": "hard"},
    "features.language.demo.more": {"ru": "+ 24 правила", "en": "+ 24 more"},

    "features.resolve.title": {
        "ru": "Пересобирает за ночь",
        "en": "Re-solves overnight",
    },
    "features.resolve.body": {
        "ru": "Аудитория закрылась, преподаватель уехал, набор вырос. Расписание адаптируется до утра — а ваша команда подтверждает diff на утренней планёрке.",
        "en": "A room closes, a faculty member's availability shifts, enrolment jumps. The schedule adapts before morning — and your team approves the diff in the morning standup.",
    },
    "features.resolve.demo.line1.tag": {"ru": "# 02:14 · обнаружено закрытие аудитории", "en": "# 02:14 · room closure detected"},
    "features.resolve.demo.line1": {"ru": "Зал 4А → ремонт, 3 недели", "en": "Hall 4A → maintenance, 3 weeks"},
    "features.resolve.demo.line2.tag": {"ru": "# 02:14 · re-solving", "en": "# 02:14 · re-solving"},
    "features.resolve.demo.line2": {"ru": "iterating · 12 400 candidates", "en": "iterating · 12,400 candidates"},
    "features.resolve.demo.done": {
        "ru": "✓ новое расписание · 04:31 · 0 конфликтов",
        "en": "✓ new schedule · 04:31 · 0 conflicts",
    },

    "features.api.title": {"ru": "API и webhooks", "en": "API and webhooks"},
    "features.api.body": {
        "ru": "Запускайте solver из вашего workflow в LMS / SIS. Шлите enrolment, забирайте расписания, подписывайтесь на события решения. На тех же примитивах, что использует наша внутренняя команда.",
        "en": "Drive the solver from your existing SIS workflow. Push enrolment, pull schedules, subscribe to solve events. Built on the same primitives our internal team uses.",
    },
    "features.api.demo.line1": {"ru": "POST", "en": "POST"},
    "features.api.demo.line1.path": {"ru": "/v1/solve", "en": "/v1/solve"},
    "features.api.demo.line2": {"ru": "→ 202 accepted · job_3f…", "en": "→ 202 accepted · job_3f…"},

    # ---------- Solver diagram ----------
    "solver.eyebrow": {"ru": "Архитектура", "en": "Architecture"},
    "solver.h2": {
        "ru": "Один solver. Все источники.",
        "en": "One solver. Every source.",
    },
    "solver.lede": {
        "ru": "От LMS / SIS до опубликованного расписания — без промежуточных Excel-файлов. Каждое ограничение проходит через единый оптимизатор; результат публикуется атомарно.",
        "en": "From SIS to published timetable — without spreadsheet layovers. Every constraint flows through one optimiser; the result publishes atomically.",
    },
    "solver.caption": {
        "ru": "Inputs · constraints · solver · solved schedule",
        "en": "Inputs · constraints · solver · solved schedule",
    },

    # ---------- AI Chat ----------
    "ai.eyebrow": {
        "ru": "Read-only AI · работает только с вашими данными",
        "en": "Read-only AI · works only on your data",
    },
    "ai.h2": {
        "ru": "Расписание умеет отвечать на вопросы.",
        "en": "The schedule answers questions.",
    },
    "ai.lede": {
        "ru": "AI не выполняет SQL и не правит расписание сам. Он вызывает разрешённый набор Python-функций — get_schedule, get_room_availability, get_teacher_load, — каждая фильтрует данные по вашему университету. Это та граница безопасности, которую видно и команде, и аудитору.",
        "en": "The AI never runs raw SQL and never edits the schedule. It calls a whitelisted set of Python functions — get_schedule, get_room_availability, get_teacher_load — each filtering data by your tenant. This is the security boundary your team and your auditor can both see.",
    },
    "ai.bullet1.title": {"ru": "Только tool-calling", "en": "Tool-calls only"},
    "ai.bullet1.body": {
        "ru": "Никакого свободного SQL. Whitelisted-функции с tenant-scoping на уровне ORM.",
        "en": "No free-form SQL. Whitelisted functions with tenant scoping at the ORM layer.",
    },
    "ai.bullet2.title": {"ru": "Цитирует источник", "en": "Cites its source"},
    "ai.bullet2.body": {
        "ru": "Каждый ответ ссылается на конкретное окно расписания, аудиторию или преподавателя.",
        "en": "Every answer references the specific slot, room or faculty record it came from.",
    },
    "ai.bullet3.title": {"ru": "Локально или в облаке", "en": "On-prem or cloud"},
    "ai.bullet3.body": {
        "ru": "Поддерживает локальные LLM (LLaMA, Qwen) для университетов с требованиями к локализации данных.",
        "en": "Supports local LLMs (LLaMA, Qwen) for institutions with data-residency requirements.",
    },
    "ai.aria": {
        "ru": "Демонстрация AI-помощника",
        "en": "AI assistant demo",
    },
    "ai.loading": {"ru": "Запускаем AI-помощника…", "en": "Booting AI assistant…"},

    # ---------- Stats ----------
    "stats.eyebrow": {"ru": "Цифры за продуктом", "en": "Outcomes"},
    "stats.h2": {"ru": "Что говорят цифры.", "en": "What the numbers look like."},
    "stats.s1.label": {
        "ru": "студентов хотят сами выбирать структуру расписания",
        "en": "of students want to choose their own schedule structure",
    },
    "stats.s1.foot": {"ru": "Опрос НИУ ВШЭ · n = 612 · 2025", "en": "HSE survey · n = 612 · 2025"},
    "stats.s2.label": {
        "ru": "ниже стоимость администрирования vs Excel + ERP",
        "en": "lower scheduling admin cost vs spreadsheets + ERP",
    },
    "stats.s2.foot": {"ru": "Сравнение по 4 университетам · 2024–2025", "en": "Median across 4 institutions · 2024–2025"},
    "stats.s3.label": {
        "ru": "целевое время полного пересолва на 1 200 курсов",
        "en": "target time for a full re-solve of 1,200 courses",
    },
    "stats.s3.foot": {"ru": "Target SLA · пилот HSE · весна 2026", "en": "Target SLA · HSE pilot · Spring 2026"},
    "stats.s3.suffix": {"ru": " мин", "en": " min"},
    "stats.s4.label": {
        "ru": "конфликтов в опубликованном расписании",
        "en": "conflicts at publish time",
    },
    "stats.s4.foot": {"ru": "Target SLA · пилот HSE · весна 2026", "en": "Target SLA · HSE pilot · Spring 2026"},

    # ---------- Testimonial / research ----------
    "research.eyebrow": {
        "ru": "Исследование · НИУ ВШЭ · СПб",
        "en": "Research · HSE University · St. Petersburg",
    },
    "research.quote": {
        "ru": "98,6 % студентов хотят пересобрать собственное расписание хотя бы раз в семестр. 61,2 % сталкиваются с постоянными накладками между обязательными парами и курсами по выбору.",
        "en": "98.6% of students want to re-shape their own schedule at least once per term. 61.2% face recurring overlaps between required classes and electives.",
    },
    "research.attr.name": {"ru": "Опрос среди студентов", "en": "Student survey"},
    "research.attr.role": {
        "ru": "НИУ ВШЭ Санкт-Петербург · n = 612 · март 2025",
        "en": "HSE University St. Petersburg · n = 612 · March 2025",
    },

    # ---------- FAQ ----------
    "faq.eyebrow": {"ru": "Вопросы", "en": "FAQ"},
    "faq.h2": {"ru": "Чаще всего спрашивают вот это.", "en": "The questions we hear most."},

    "faq.q1": {
        "ru": "Как вы обеспечиваете безопасность данных университета?",
        "en": "How do you secure university data?",
    },
    "faq.a1": {
        "ru": "Каждая модель данных привязана к организации через FK. Все ORM-запросы фильтруются по университету текущего пользователя на уровне queryset. AI-помощник вызывает только whitelisted-функции — никакого свободного SQL. Поддерживается локальный deployment для университетов с требованиями ФСБ / ФСТЭК.",
        "en": "Every domain model carries an Organization FK. All ORM queries filter by the requesting user's tenant at the queryset layer. The AI assistant calls only whitelisted functions — no free-form SQL. On-prem deployment is supported for institutions with FSTEC-level data requirements.",
    },

    "faq.q2": {
        "ru": "С какими LMS / SIS интегрируетесь?",
        "en": "Which LMS / SIS do you integrate with?",
    },
    "faq.a2": {
        "ru": "Modeus, LMS HSE, 1С Университет, EduPage, Bitrix24-LMS. На пилоте подключаем CSV / Excel-импорт и REST API. Полноценные коннекторы — на стороне production-внедрения.",
        "en": "Modeus, HSE LMS, 1C University, EduPage, Bitrix24-LMS. The pilot ships with CSV/Excel import and REST API. Production connectors land at the production-deploy stage.",
    },

    "faq.q3": {
        "ru": "Как устроен пилот?",
        "en": "What's a pilot like?",
    },
    "faq.a3": {
        "ru": "30 минут демо на ваших данных. Затем 6–12 недель: один факультет, ваш сэмпл расписания, наша команда внедрения. По итогам — отчёт по SLA (время решения, доля выполненных предпочтений) и план перехода на production-контур.",
        "en": "A 30-minute demo on your data. Then 6–12 weeks: one faculty, your schedule sample, our deployment team. The pilot closes with an SLA report (solve time, preference fulfilment) and a path to production.",
    },

    "faq.q4": {
        "ru": "Сколько стоит?",
        "en": "How much does it cost?",
    },
    "faq.a4": {
        "ru": "Pilot — фиксированная цена с учётом сложности данных. Production — годовая подписка, прайс по числу активных студентов и сценариям интеграции. Для on-prem контура (ФСТЭК-аудит, выделенный hardware) — отдельная схема. Свяжитесь с командой.",
        "en": "Pilot — flat fee, scoped to data complexity. Production — annual subscription, priced on active-student count and integration scope. On-prem (FSTEC audit, dedicated hardware) — bespoke. Reach out and we'll scope.",
    },

    "faq.q5": {
        "ru": "Кому принадлежат данные?",
        "en": "Who owns the data?",
    },
    "faq.a5": {
        "ru": "Университету. TimeMatch — обработчик, а не владелец. Экспорт расписаний и пользовательских данных в стандартных форматах (iCal, CSV, JSON-схема) доступен в любой момент.",
        "en": "The institution. TimeMatch is a processor, not an owner. Exports of schedules and user records in standard formats (iCal, CSV, JSON schema) are available at any time.",
    },

    "faq.q6": {
        "ru": "Чем отличается от модуля LMS или Excel-плагина?",
        "en": "How is this different from an LMS module or an Excel plugin?",
    },
    "faq.a6": {
        "ru": "Excel и встроенные модули LMS решают через ручное распределение. TimeMatch строит расписание как задачу constraint optimisation: 200+ ограничений одновременно, формальное доказательство решаемости, повторяемость от семестра к семестру. Это другой класс инструмента.",
        "en": "Spreadsheets and built-in LMS modules solve by hand. TimeMatch frames scheduling as constraint optimisation: 200+ constraints at once, a formal feasibility proof, repeatable term to term. A different class of instrument.",
    },

    # ---------- Pricing ----------
    "pricing.eyebrow": {"ru": "Цены", "en": "Pricing"},
    "pricing.h2": {
        "ru": "От пилота — до полноценного контура.",
        "en": "From pilot to full production.",
    },
    "pricing.lede": {
        "ru": "Точная сумма — после короткого скоупинга. Все тиры включают AI-помощник и аудит-лог.",
        "en": "Exact pricing follows a short scoping call. Every tier includes the AI assistant and the audit log.",
    },

    "pricing.pilot.name": {"ru": "Pilot", "en": "Pilot"},
    "pricing.pilot.pitch": {
        "ru": "Один факультет · 6–12 недель · фиксированная цена",
        "en": "One faculty · 6–12 weeks · flat fee",
    },
    "pricing.pilot.f1": {"ru": "До 1 500 курсов в семестре", "en": "Up to 1,500 courses per term"},
    "pricing.pilot.f2": {"ru": "Импорт из CSV / Excel / API", "en": "Import via CSV / Excel / API"},
    "pricing.pilot.f3": {"ru": "AI-помощник · 5 пользователей", "en": "AI assistant · 5 seats"},
    "pricing.pilot.f4": {"ru": "Отчёт по SLA по итогам", "en": "SLA report at exit"},

    "pricing.prod.name": {"ru": "Production", "en": "Production"},
    "pricing.prod.pitch": {
        "ru": "Университет целиком · годовая подписка · production SLA",
        "en": "Whole institution · annual subscription · production SLA",
    },
    "pricing.prod.f1": {"ru": "Без ограничений на число курсов", "en": "Unlimited courses"},
    "pricing.prod.f2": {
        "ru": "Коннекторы к LMS / SIS · webhook events",
        "en": "LMS / SIS connectors · webhook events",
    },
    "pricing.prod.f3": {"ru": "AI-помощник · все роли", "en": "AI assistant · every role"},
    "pricing.prod.f4": {"ru": "Поддержка 24/5 · аудит-лог", "en": "24/5 support · audit log"},

    "pricing.ent.name": {"ru": "Enterprise", "en": "Enterprise"},
    "pricing.ent.pitch": {
        "ru": "On-prem контур · ФСТЭК · кастомные SLA",
        "en": "On-prem deployment · FSTEC · bespoke SLA",
    },
    "pricing.ent.f1": {
        "ru": "Развёртывание в вашей инфраструктуре",
        "en": "Deployed in your infrastructure",
    },
    "pricing.ent.f2": {"ru": "Локальные LLM (LLaMA, Qwen)", "en": "Local LLMs (LLaMA, Qwen)"},
    "pricing.ent.f3": {"ru": "Кастомные ограничения и роли", "en": "Custom constraints and roles"},
    "pricing.ent.f4": {"ru": "Выделенный инженер внедрения", "en": "Dedicated deployment engineer"},

    # ---------- CTA + lead form ----------
    "cta.eyebrow": {"ru": "Начало", "en": "Begin"},
    "cta.h2.line": {"ru": "Подведите", "en": "Bring your"},
    "cta.h2.accent": {"ru": "следующий семестр", "en": "next term"},
    "cta.h2.tail": {"ru": "под TimeMatch.", "en": "to TimeMatch."},
    "cta.sub": {
        "ru": "30 минут разговора, sample-solve на ваших данных, ясный путь от Excel до опубликованного расписания. Демо ведут со-фаундеры.",
        "en": "A 30-minute walkthrough, a sample solve on your data, a clear path from spreadsheet to published timetable. Demos with the founding team.",
    },

    "form.name": {"ru": "Имя", "en": "Name"},
    "form.name.ph": {"ru": "Имя и фамилия", "en": "Full name"},
    "form.email": {"ru": "Рабочая почта", "en": "Work email"},
    "form.email.ph": {"ru": "[email protected]", "en": "[email protected]"},
    "form.university": {"ru": "Университет", "en": "University"},
    "form.university.ph": {"ru": "НИУ ВШЭ", "en": "HSE University"},
    "form.role": {"ru": "Роль", "en": "Role"},
    "form.role.registrar": {"ru": "Учебный офис / registrar", "en": "Registrar / academic office"},
    "form.role.dean": {"ru": "Декан / проректор", "en": "Dean / provost"},
    "form.role.it": {"ru": "IT / интеграции", "en": "IT / integrations"},
    "form.role.other": {"ru": "Другое", "en": "Other"},
    "form.message": {"ru": "Кратко о масштабе", "en": "Briefly about scope"},
    "form.message.ph": {
        "ru": "Масштаб (число студентов / факультетов), горизонт пилота",
        "en": "Scale (students / faculties), pilot horizon",
    },
    "form.legal": {
        "ru": "Отправляя форму, вы соглашаетесь с обработкой данных согласно <a href=\"{privacy_url}\">политике приватности</a>.",
        "en": "By submitting the form, you agree to data processing under the <a href=\"{privacy_url}\">privacy policy</a>.",
    },
    "form.errors.title": {"ru": "Проверьте поля выше:", "en": "Please check the fields above:"},

    # ---------- Footer ----------
    "footer.brand.tagline": {
        "ru": "AI-платформа расписания для российских университетов. Анкер-пилот — НИУ ВШЭ, весна 2026.",
        "en": "AI scheduling platform for higher education. Anchor pilot — HSE University, Spring 2026.",
    },
    "footer.col.platform": {"ru": "Платформа", "en": "Platform"},
    "footer.col.solver": {"ru": "Solver", "en": "Solver"},
    "footer.col.constraint_lang": {"ru": "Constraint-язык", "en": "Constraint language"},
    "footer.col.ai_assistant": {"ru": "AI-помощник", "en": "AI assistant"},
    "footer.col.integrations": {"ru": "Интеграции", "en": "Integrations"},

    "footer.col.for": {"ru": "Для кого", "en": "For"},
    "footer.col.registrars": {"ru": "Учебный офис", "en": "Registrars"},
    "footer.col.deans": {"ru": "Деканы и проректоры", "en": "Deans and provosts"},
    "footer.col.it": {"ru": "IT-департамент", "en": "IT teams"},

    "footer.col.team": {"ru": "Команда", "en": "Team"},
    "footer.col.about": {"ru": "О нас (скоро)", "en": "About (soon)"},
    "footer.col.careers": {"ru": "Карьера (скоро)", "en": "Careers (soon)"},
    "footer.col.contact": {"ru": "Контакты", "en": "Contact"},

    "footer.col.resources": {"ru": "Ресурсы", "en": "Resources"},
    "footer.col.docs": {"ru": "Документация (скоро)", "en": "Documentation (soon)"},
    "footer.col.research": {"ru": "Исследования (скоро)", "en": "Research (soon)"},
    "footer.col.status": {"ru": "Status (скоро)", "en": "Status (soon)"},

    "footer.copyright": {"ru": "© 2026 TimeMatch · time-match.tech", "en": "© 2026 TimeMatch · time-match.tech"},
    "footer.legal.privacy": {"ru": "Приватность", "en": "Privacy"},
    "footer.legal.terms": {"ru": "Условия", "en": "Terms"},
    "footer.legal.152fz": {"ru": "152-ФЗ", "en": "152-FZ"},
    "footer.legal.soc2": {"ru": "SOC 2", "en": "SOC 2"},
    "footer.legal.soon": {"ru": "Скоро", "en": "Soon"},

    # ---------- Success page ----------
    "success.eyebrow": {"ru": "Спасибо", "en": "Thank you"},
    "success.h1": {"ru": "Заявка получена.", "en": "Request received."},
    "success.body": {
        "ru": "Команда TimeMatch свяжется с вами в течение одного рабочего дня. В ответ пришлём короткое письмо: что нужно подготовить к 30-минутному демо и как мы видим скоупинг пилота.",
        "en": "The TimeMatch team will reach out within one business day. You'll get a short email with what to prepare for the 30-minute demo and how we'd scope a pilot.",
    },
    "success.title": {"ru": "Заявка отправлена · TimeMatch", "en": "Request sent · TimeMatch"},

    # ---------- Privacy page ----------
    "privacy.title": {"ru": "Политика приватности · TimeMatch", "en": "Privacy policy · TimeMatch"},
    "privacy.eyebrow": {"ru": "Политика", "en": "Policy"},
    "privacy.h1": {"ru": "Политика приватности.", "en": "Privacy policy."},
    "privacy.body1": {
        "ru": "TimeMatch собирает только данные, нужные для контакта с университетом: имя, email, название университета, роль и опциональное сообщение. Данные хранятся на территории РФ, не передаются третьим лицам и удаляются по запросу.",
        "en": "TimeMatch collects only the data required to reach out to a university: name, email, university, role and an optional message. Data is stored in Russia, not shared with third parties, and removed on request.",
    },
    "privacy.body2": {
        "ru": "Для прав доступа к данным по 152-ФЗ — пишите на адрес из футера. Финальная редакция документа появится перед запуском платного контура.",
        "en": "For data-access requests under 152-FZ, use the address in the footer. The final version of this document will land before the paid release.",
    },
}
