# Створення компонентів SmartBasket у Scripter

Скрипт: `smartbasket-components.scripter.js`. Ціль — LMV_lab3,
сторінка `03 Компоненти та екрани` (`0:1`).

## Запуск

1. Відкрийте `scripter-launcher.html` у Chrome і натисніть **Копіювати скрипт**.
2. У файлі LMV_lab3 відкрийте Scripter, натисніть **+** для нового скрипта.
3. Вставте скопійований код у редактор і натисніть **Ctrl+Enter** або **▶**.

Скрипт містить top-level await, який підтримує Scripter. Не запускайте його
в DevTools браузера: потрібне середовище Figma Plugin API.

## Що має з’явитися

- 23 component sets, разом 156 native variants.
- 22 компоненти іконок Lucide з векторними шарами, 24×24 px, stroke 2.
- Buttons S/M: Primary, Secondary, Text; 6 станів на кожен тип.
- Input, Icon button, Checkbox, Switch, Badge, Tag, Quantity stepper, Search.
- Product row, Set card, Store card, List, Alert, Snackbar.
- Header, Nav item, Bottom navigation з п’ятьма вкладками.
- Set form, Product form, Modal, Review basket.
- Текстові стилі Inter та прив’язки кольорів, відступів і радіусів до Variables.
- Component properties Label / Icon для відповідних компонентів.
- Native interactions між hover/pressed/selected variants, переходи 150 мс.
- Окремий аркуш документації та component descriptions: стани, do/don’t,
  довгий текст, помилки та три UI-патерни.

Наявні компоненти й екрани не видаляються та не перезаписуються. Нові компоненти
отримують префікс `SmartBasket / ЛР3 /` та розміщуються праворуч від наявного
вмісту. Наявна колекція `SmartBasket · Foundations` використовується повторно;
відсутні токени додаються. Повторний запуск використовує завершені component sets
цього скрипта, не додаючи їх ще раз. Неповний набір зупиняє запуск із поясненням.

## Перевірка після запуску

У output Scripter мають бути `errors: []`, `iconCount: 22`,
`totalVariants: 156`, IDs наборів і документації. Це структурна перевірка.
Далі перевірте компоненти при масштабі 100%, тексти, переноси, Variables та
роботу variant interactions у Present. `Focus` — окремий візуальний варіант;
обертання loading-іконки та керування клавіатурним фокусом виконує застосунок.

Цей скрипт не позначає всю лабораторну виконаною: складання та перевірка
актуальних екранів із instances і два повні сценарії прототипу залишаються
окремим кроком. Не заявляти завершений імпорт до фактичного запуску й огляду.

## Фактична перевірка підготовленого файлу

JavaScript syntax — пройдено. TypeScript checkJs проти PluginAPI typings із
Figma skill — пройдено. Виконання всередині цільового Figma й візуальна перевірка
поки не підтверджені: Scripter у вбудованому браузері не завантажується, а Chrome
не підключений до інструментів керування цього чату.
