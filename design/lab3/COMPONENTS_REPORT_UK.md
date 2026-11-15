# SmartBasket — матеріал для розділу 3 звіту ЛР3

Дата: 15.11.2026. Документацію винесено з Figma; у файлі залишено редаговану бібліотеку, візуальні патерни та екрани.

Figma: https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-4644

## 3.1. Атомарні елементи

Основою є наявна колекція **SmartBasket · Foundations**: 53 змінні для кольорів, відступів, радіусів і розмірів контролів. Типографіка використовує десять спільних стилів Inter з підтримкою кирилиці. Нових незалежних палітр для екранів не створювали.

- Кнопки S — 44 px, M — 48 px; типи Primary, Secondary та Text.
- Input із постійним label, значенням і helper/error text; Inline quantity для редагування кількості.
- Checkbox та Switch: обраний/необраний варіант і стани взаємодії.
- 26 редагованих векторних іконок Lucide, сітка 24×24 px, stroke 2; Icon button має область 44×44 px.
- Badge передає статус через іконку, текст і колір; Tag використовується для вибору фільтра.
- Text — типографічний атом для повторного використання текстових стилів.

Кольорові заливки та обводки прив’язані до Variables; padding і gap — до spacing-токенів; тексти — до Text styles. Фіксована геометрія іконки чи екрана не підміняє шкалу відступів. Відстані між демонстраційними наборами на полотні є організацією аркуша, а не UI-відступами застосунку.

## 3.2. Складні компоненти

Побудовано картки набору, продукту, результату каталогу та пропозиції магазину; рядок кошика; списки; шапку, таб-бар і контекстне меню; форми набору й продукту; модальне вікно; діалог перегляду кошика; панелі налаштувань і підсумок. Складні елементи повторно використовують атоми й ті самі Foundations.

Product row показує назву, кількість, ціну, підсумок та іконкову дію. Store card відокремлює повну пропозицію від неповної. Basket row містить одиницю виміру, поле кількості та суму. Settings panel має варіанти для мови, міста й магазинів.

### Інвентар бібліотеки

| Набір | Variants | Осі та значення |
|---|---:|---|
| Text | 10 | Style: H1, H2, H3, H4, H5, H6, Body, Body S, Caption, Button |
| Inline quantity | 8 | State: Default, Hover, Pressed, Focus, Disabled, Error, Loading, Empty |
| Product image | 3 | State: Default, Loading, Error |
| Page intro | 1 | State: Default |
| Summary | 3 | Tone: Default, Success, Error |
| Catalog card | 5 | State: Default, Selected, Disabled, Loading, Error |
| Basket row | 5 | State: Default, Focus, Error, Loading, Empty |
| Menu item | 5 | State: Default, Hover, Pressed, Focus, Disabled |
| Menu | 4 | State: Default, Loading, Error, Empty |
| Empty state | 3 | State: Empty, Error, Loading |
| Status bar | 1 | Mode: Default |
| Settings panel | 3 | Section: Language, City, Stores |
| Set form | 4 | State: Default, Loading, Error, Empty |
| Product form | 4 | State: Default, Loading, Error, Empty |
| Modal | 4 | State: Default, Loading, Error, Empty |
| Review basket | 4 | State: Complete, Incomplete, Loading, Error |
| Header | 5 | Mode: List, Detail, Search, Cart, Settings |
| Nav item | 10 | Selected: False, True; State: Default, Hover, Pressed, Focus, Disabled |
| Bottom navigation | 5 | Active: Home, Sets, Compare, Cart, Settings |
| Product row | 4 | State: Default, Loading, Error, Empty |
| Set card | 5 | State: Default, Loading, Error, Empty, MenuOpen |
| Store card | 4 | State: Complete, Incomplete, Loading, Error |
| List | 4 | State: Default, Loading, Error, Empty |
| Badge | 5 | Tone: Success, Error, Warning, Info, Best |
| Alert | 4 | Tone: Success, Error, Warning, Info |
| Snackbar | 2 | State: Default, Error |
| Input | 8 | State: Default, Hover, Pressed, Focus, Disabled, Error, Loading, Empty |
| Checkbox | 10 | Selected: False, True; State: Default, Hover, Pressed, Focus, Disabled |
| Switch | 10 | Selected: False, True; State: Default, Hover, Pressed, Focus, Disabled |
| Tag | 10 | Selected: False, True; State: Default, Hover, Pressed, Focus, Disabled |
| Quantity stepper | 8 | State: Default, Hover, Pressed, Focus, Disabled, Error, Loading, Empty |
| Search | 5 | State: Default, Focus, Loading, Error, Empty |
| Button/S | 18 | Type: Primary, Secondary, Text; State: Default, Hover, Pressed, Focus, Disabled, Loading |
| Button/M | 18 | Type: Primary, Secondary, Text; State: Default, Hover, Pressed, Focus, Disabled, Loading |
| Icon button | 6 | State: Default, Hover, Pressed, Focus, Disabled, Loading |

**Разом: 35 component sets, 208 variants і 26 окремих компонентів іконок.**

## 3.3. Стани

| Стан | Візуальне рішення | Приклади |
|---|---|---|
| Default | Основний вигляд без поточної взаємодії | Button, Input, Checkbox, Switch |
| Hover | Зміна фону/межі; primary-кнопка темнішає за допомогою шарів на існуючих токенах | Button, Input, Tag, Menu item |
| Pressed | Сильніший акцент фону або обводки | Button, Icon button, Inline quantity |
| Focus | Помітна синя обводка | Input, Button, Checkbox, Switch |
| Disabled | Сірий фон/текст і недоступна дія | Button, Input, Checkbox, Switch |
| Error | Червона обводка та повідомлення; наприклад, кількість 0 | Input, Quantity stepper, Product form, Basket row |
| Loading | Спінер і повідомлення очікування | Button, Search, List, форми, діалог |
| Empty | Пояснення відсутності даних і наступний крок | List, Search, Set card, Empty state |

Стани оформлено як native variants. Для неінтерактивних елементів (Text, Badge, інформаційний підсумок) не створювали штучних hover/error-станів без змісту. Контейнери мають потрібні стани даних, а вкладені кнопки та поля — власні стани взаємодії. Focus у Figma є візуальним варіантом; реальне клавіатурне керування, введення даних і обертання спінера забезпечує застосунок.

## 3.4. UI-патерни

### Патерн 1 — пошук і фільтрація

**Задача:** знайти потрібний продукт, звузити результати за магазинами й указати точну кількість.

**Компоненти:** Search, Tag, Catalog card, Quantity stepper, Button; для відсутності результатів — Search/Empty зі скиданням фільтрів.

**Поведінка:** у застосунку запит і вибрані магазини визначають результати; обраний продукт позначено check. Для порожньої вибірки показано явне повідомлення та дію «Скинути фільтри». У Figma наведено пошук рису, обраний результат і альтернативний стан запиту «Авокадо» без результатів.

### Патерн 2 — валідація форми та зворотний зв’язок

**Задача:** зберегти коректний продукт і кількість, не втратити введені дані під час помилки.

**Компоненти:** Product form, Input, Quantity stepper, Button, Snackbar.

**Поведінка:** помилка кількості 0 показана біля поля; після виправлення доступне повторне збереження. Loading показує очікування; результат підтверджується повідомленням. Візуальний приклад у Figma: Error → Default → «Продукт додано». Окремий стандартний Snackbar підтримує дизайн Undo після видалення. Реальну валідацію й збереження виконує вебзастосунок.

### Патерн 3 — порівняння повних кошиків

**Задача:** обрати вигідний магазин, не сприйнявши дешевий неповний кошик за найкращий.

**Компоненти:** Store card, Badge, Basket row, Summary, Review basket, Button.

**Поведінка:** ATB має 2 із 3 продуктів; 143 грн — неповна сума, без бейджа «Найвигідніше». Varus має всі 3 продукти, 238 грн і бейдж найвигіднішого повного кошика серед вибраних магазинів. Перед підтвердженням користувач перевіряє склад. Дизайн неповного діалогу показує відсутній товар і повернення до порівняння. Дані демонстраційні; реального замовлення чи оплати немає.

### Правила do / don’t для звіту

| Елемент | Do | Don’t |
|---|---|---|
| Кнопки | Одна головна дія в контексті; стабільний розмір під час loading | Кілька конкуруючих Primary поруч |
| Поля | Постійний label; помилка поруч із полем; введені дані залишаються видимими | Використовувати тільки placeholder замість label |
| Іконки | Клікабельна зона 44×44, зрозуміла назва дії у реалізації | Робити інтерактивною лише область 24×24 |
| Статуси | Поєднувати текст, іконку та колір | Передавати наявність лише кольором |
| Картки | Переносити довгі назви, зберігати ціну й одиницю видимими | Накладати текст на дії чи підсумок |
| Кошики | Порівнювати повні склади; окремо позначати пропущені товари | Давати Best Value неповній пропозиції |
| Діалоги | Показувати зрозуміле повернення/скасування; у застосунку утримувати й повертати фокус | Імітувати реальну купівлю демоданими |

## 3.6. Ключові екрани з компонентів

| Екран | Основні компоненти бібліотеки |
|---|---|---|
| [01 · Головна](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-4906) | Status bar, Header, Page intro, Summary, Button/M, Text, Bottom navigation |
| [02 · Мої набори](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-4975) | Status bar, Header, Page intro, Button/M, Set card ×2, Bottom navigation |
| [03 · Деталі набору](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-5084) | Status bar, Header, Page intro, Product row ×3, Button/M, Bottom navigation |
| [04 · Додати продукт](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-5211) | Status bar, Header, Page intro, Search, Tag ×4, Catalog card, Quantity stepper, Button/M, Bottom navigation |
| [05 · Порівняння магазинів](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-5330) | Status bar, Header, Page intro, Text, Store card ×2, Badge, Bottom navigation |
| [06 · Кошик](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-5423) | Status bar, Header, Page intro, Basket row ×3, Inline quantity, Summary, Bottom navigation |
| [07 · Налаштування](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-5544) | Status bar, Header, Settings panel ×3, Input, Checkbox, Button/S, Bottom navigation |

Додатково показано три альтернативні екрани наборів: Empty, Error, Loading. Основні екрани — 430×936 px; шапка й навігація відокремлені від вертикально прокручуваного вмісту. На екрані додавання продукту активним лишається розділ «Набори», оскільки дія виконується всередині набору.

### Узгоджені демонстраційні суми

| Контекст | Розрахунок | Разом |
|---|---|---:|
| Орієнтовний набір | 1,5 кг пластівців ×60 + 2 л молока ×45 + 10 яєць ×7 | 250 грн |
| Повний кошик Varus | Пластівці 3×28 + молоко 2×43 + яйця 1×68 | 238 грн |
| Неповний кошик ATB | Пластівці 3×26 + яйця 1×65; молоко відсутнє | 143 грн |

Ціни взято з демонстраційних даних готового застосунку, а не з актуальних прайсів магазинів.

## Перевірка реалізації

- На семи основних екранах перевірено 199 instances: усі посилаються на бібліотеку SmartBasket / ЛР3.
- На цих екранах немає текстів чи векторів поза instances. Структурні Frame є контейнерами Auto Layout.
- Не знайдено неприв’язаних SOLID-заливок/обводок, padding/gap без Variables, сторонніх шрифтів або текстів без Text styles.
- Перевірено всю активну бібліотеку: 1932 вузли, 447 текстових вузлів; після виправлень не знайдено виходів за межі батьківських контейнерів.
- Візуально оглянуто головну, набори, деталі, каталог, порівняння, кошик, налаштування й три патерни.
- Окремі аркуші документації, навігаційні пояснення та описи активних компонентів вилучені з Figma; старі змістовні макети збережені в архіві.

Це структурна й візуальна перевірка розділу 3. Вона не є заявою про повний аудит WCAG, повну функціональність усіх переходів Figma Prototype або завершення всієї лабораторної.

## Використання AI для цього етапу

| Дата | Інструмент | Запит коротко | Результат | Перевірено |
|---|---|---|---|
| 15.11.2026 | Codex + Figma Scripter | Доповнити атоми, складні компоненти, variants, три UI-патерни, зібрати 5–7 екранів; документацію винести у звіт | 35 наборів / 208 variants / 26 іконок; 7 основних і 4 альтернативні екрани; 3 візуальні патерни; цей текст для звіту | Агент перевірив зв’язки, токени, типографіку, геометрію та демонстраційні суми; перевірка командою й викладачем не заявляється |

Основні виправлення агента після генерації: службові SVG-заливки прив’язано до Variables; усунено спільні текстові defaults, що підміняли ATB даними Varus; виправлено внутрішні розміри Auto Layout і висоти горизонтальних карток/рядів; узгоджено підсумки неповного кошика з демокаталогом; контекст каталогу лишено в табі наборів.

Під час додаткового налаштування міжекранного переходу одна операція Scripter зависла та була зупинена; збережені макети перевірено й завершено окремо. Це не приховується як нібито повністю перевірений інтерактивний прототип.

Файли доказів: phase3-audit-final.json, phase3-library-final.json, phase3-semantic-result.json. Знімки: smartbasket-home-sets-native.png, smartbasket-detail-catalog-native.png, smartbasket-cart-settings-native.png, smartbasket-ui-patterns-native.png.


### Уточнення інтерфейсу 15.11.2026

У картці набору основна кнопка стала вужчою; поруч розміщено ⋯. Меню містить
«Редагувати», «Копіювати» та «Видалити». У вебзастосунку всі три дії працюють,
підтримуються клавіатура, Escape, закриття поза меню й повернення фокуса.
У Figma додано Set card/MenuOpen і окремий instance-based екран
[Набори · Меню дій](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=220-6300).
Прибрано зайву кнопку на головній, пояснювальний абзац порівняння та
демонстраційні підписи з актуальних UI-екранів. Прикладні дані й обмеження
інтеграції залишаються описаними в технічній документації.

Після змін: 35 наборів, 208 variants, 199 вкладених instances на семи основних
екранах. Перевірка кольорів, відступів, стилів тексту та зв’язків instances — без
помилок. Окремо збережено `set-actions-audit.json` та знімки вебзастосунку/Figma.
