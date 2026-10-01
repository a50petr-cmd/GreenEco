const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = __dirname;
const dataSrc = fs.readFileSync(path.join(rootDir, "js", "data.js"), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(dataSrc, sandbox);
const PRODUCTS = sandbox.window.GREENECO.products;
const NEWS = sandbox.window.GREENECO.news;

function wrap({ title, desc, css, root, page, body, extraHead = "", extraScript = "" }) {
  const icon = css.replace("css/style.css", "favicon.svg");
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${css}">
  <link rel="icon" href="${icon}">
  ${extraHead}
</head>
<body data-root="${root}" data-page="${page}">
<a class="skip" href="#main">К содержанию</a>
<div id="site-header"></div>
<main id="main">
${body}
</main>
<div id="site-footer"></div>
<script src="${root}js/data.js"></script>
<script src="${root}js/site.js"></script>
<script src="${root}js/catalog.js"></script>
${extraScript}
</body>
</html>
`;
}

function write(rel, content) {
  const full = path.join(rootDir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

write(
  "index.html",
  wrap({
    title: "ГринЭко — овощи и фрукты оптом с собственных полей",
    desc: "ООО «ГРИН ЭКО»: овощи, фрукты, ягоды и зелень оптом. 1240 га, 28 000 тонн в год, доставка по ЮФО и ЦФО. Актуальный прайс.",
    css: "css/style.css",
    root: "",
    page: "home",
    extraScript: `<script>window.GREENECO.renderCards(document.getElementById("popular"), window.GREENECO.catalog.filter(p => p.popular));</script>`,
    body: `
<section class="hero" style="background-image:url('img/photos/hero.jpg')">
  <div class="container hero-inner">
    <span class="eyebrow">Производитель · Краснодарский край</span>
    <h1>ГринЭко</h1>
    <p class="lead">Овощи и фрукты с собственных полей — оптом, без посредников. С поля на склад клиента за 24–48 часов.</p>
    <div class="hero-actions">
      <button class="btn btn-primary js-lead" type="button">Оставить заявку</button>
      <a class="btn btn-ghost" href="ceny.html">Прайс-лист</a>
    </div>
  </div>
</section>
<section>
  <div class="container grid-2">
    <div>
      <p class="section-kicker">О компании</p>
      <h2>Растим сами, фасуем сами, возим своей логистикой</h2>
      <p class="muted">ООО «ГРИН ЭКО» — агрохозяйство полного цикла: открытый грунт, зимние теплицы, холодильные склады и собственный автопарк. Поставляем сети, оптовикам и HoReCa без перекупщиков.</p>
      <div class="stats">
        <div class="stat"><b>1 240</b><span>гектаров полей и садов</span></div>
        <div class="stat"><b>28 000</b><span>тонн продукции в год</span></div>
        <div class="stat"><b>14</b><span>лет на рынке</span></div>
      </div>
      <p style="margin-top:18px"><a class="btn btn-dark" href="o-kompanii.html">Подробнее о производстве</a></p>
    </div>
    <img src="img/photos/greenhouse.jpg" alt="Теплицы ГринЭко" style="border-radius:24px;height:100%;object-fit:cover;min-height:320px">
  </div>
</section>
<section style="padding-top:0">
  <div class="container">
    <p class="section-kicker">Каталог</p>
    <h2>Категории продукции</h2>
    <div class="cat-grid" style="margin-top:20px">
      <a class="cat-card" href="produkciya/ovoshchi/"><img src="img/photos/ovoshchi.jpg" alt="Овощи"><span>Овощи</span></a>
      <a class="cat-card" href="produkciya/frukty/"><img src="img/photos/frukty.jpg" alt="Фрукты"><span>Фрукты</span></a>
      <a class="cat-card" href="produkciya/yagody/"><img src="img/photos/yagody.jpg" alt="Ягоды"><span>Ягоды</span></a>
      <a class="cat-card" href="produkciya/zelen/"><img src="img/photos/zelen.jpg" alt="Зелень"><span>Зелень</span></a>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <p class="section-kicker">Прайс</p>
    <h2>Популярные позиции</h2>
    <p class="muted">Оптовая цена за килограмм. Розница и мелкий опт — в полном прайсе.</p>
    <div class="card-grid" id="popular" style="margin-top:20px"></div>
  </div>
</section>
<section style="padding-top:0">
  <div class="container">
    <p class="section-kicker">Почему мы</p>
    <h2>Преимущества для опта</h2>
    <div class="adv-grid" style="margin-top:20px">
      <article class="adv-card"><span class="tag">Поля</span><h3>Собственные поля</h3><p class="muted">Контроль сорта, полива и сроков сбора. Нет зависимости от чужого сырья.</p></article>
      <article class="adv-card"><span class="tag">Цена</span><h3>Без посредников</h3><p class="muted">Прямой контракт с производителем: прозрачная цена и стабильный объём.</p></article>
      <article class="adv-card"><span class="tag">Логистика</span><h3>Доставка</h3><p class="muted">Свой автопарк рефрижераторов и партнёрские ТК. ЮФО, ЦФО, Поволжье.</p></article>
      <article class="adv-card"><span class="tag">Качество</span><h3>Сертификаты</h3><p class="muted">Декларации EAC, протоколы ГОСТ, партия сопровождается документами.</p></article>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div class="price-banner">
      <div>
        <p class="eyebrow">Актуальные цены</p>
        <h2 style="color:#fff">Прайс обновлён <span data-price-date></span></h2>
        <p>Опт / мелкий опт / розница. Скачивание в Excel и PDF — на странице цен.</p>
      </div>
      <a class="btn btn-primary" href="ceny.html">Открыть полный прайс</a>
    </div>
  </div>
</section>
<section>
  <div class="container grid-2">
    <div>
      <p class="section-kicker">География</p>
      <h2>Куда возим</h2>
      <p class="muted">База — Краснодарский край. Регулярные рейсы в Центральный округ. Самовывоз со склада в ст. Динской.</p>
      <div class="regions">
        <span>Краснодарский край</span><span>Ростовская обл.</span><span>Ставропольский край</span>
        <span>Воронеж</span><span>Москва и МО</span><span>Тула</span><span>Волгоград</span><span>Астрахань</span>
      </div>
    </div>
    <iframe class="map-embed" title="Карта поставок" src="https://yandex.ru/map-widget/v1/?ll=38.975313%2C45.035470&z=6"></iframe>
  </div>
</section>
<section style="padding-top:0">
  <div class="container">
    <p class="section-kicker">Клиенты</p>
    <h2>Партнёры</h2>
    <div class="logo-grid" style="margin-top:16px">
      <div class="partner"><img src="img/partners/magnit.svg" alt="Магнит" width="200" height="40"></div>
      <div class="partner"><img src="img/partners/pyaterochka.svg" alt="Пятёрочка" width="56" height="56"></div>
      <div class="partner"><img src="img/partners/chizhik.svg" alt="Чижик" width="70" height="52"></div>
      <div class="partner"><img src="img/partners/perekrestok.png" alt="Перекрёсток" width="200" height="48"></div>
      <div class="partner"><img src="img/partners/lenta.png" alt="Лента" width="200" height="48"></div>
      <div class="partner"><img src="img/partners/metro.svg" alt="METRO" width="120" height="56"></div>
      <div class="partner"><img src="img/partners/verny.png" alt="Верный" width="180" height="56"></div>
      <div class="partner"><img src="img/partners/dixy.svg" alt="Дикси" width="180" height="48"></div>
    </div>
  </div>
</section>
<section>
  <div class="container contact-split">
    <div class="panel" style="padding:28px">
      <p class="section-kicker">Заявка</p>
      <h2>Рассчитаем поставку</h2>
      <form class="form js-lead-form" style="margin-top:16px">
        <label>Имя</label><input name="name" required>
        <label>Телефон</label><input name="phone" type="tel" required>
        <label>Товар</label><input name="product" placeholder="Категория или позиция">
        <label>Объём</label><input name="volume" placeholder="Тонны / недели">
        <button class="btn btn-primary" type="submit">Отправить заявку</button>
      </form>
    </div>
    <div>
      <h2>Контакты</h2>
      <p><a href="tel:+79281221355">+7 (928) 122-13-55</a></p>
      <p><a href="mailto:grineko.ooo@mail.ru">grineko.ooo@mail.ru</a></p>
      <p><a href="mailto:kompaniagrineko@yandex.ru">kompaniagrineko@yandex.ru</a></p>
      <p><a href="https://wa.me/79281221355" target="_blank" rel="noopener">WhatsApp</a></p>
      <p class="muted" style="margin-top:12px">ООО «ГРИН ЭКО»<br>123182, г. Москва, Волоколамское ш., д. 24 к. 1, помещ. 699<br>Пн–Сб: 8:00–18:00</p>
    </div>
  </div>
</section>
`,
  })
);

write(
  "o-kompanii.html",
  wrap({
    title: "О компании ГринЭко — поля, теплицы, склады",
    desc: "История, миссия, мощности, технологии выращивания, сертификаты EAC и ГОСТ, команда и реквизиты ООО «ГРИН ЭКО».",
    css: "css/style.css",
    root: "",
    page: "about",
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="index.html">Главная</a> / О компании</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">О компании</h1>
  <p class="muted">Хозяйство полного цикла на Кубани: от семян до фуры на рампе клиента.</p>
</div></div>
<section><div class="container grid-2">
  <div>
    <p class="section-kicker">История и миссия</p>
    <h2>С 2012 года выращиваем еду, которой не стыдно поставить своё имя</h2>
    <p class="muted">ГринЭко начинался с 80 гектаров овощного севооборота в Динском районе. Сегодня это 1 240 га открытого грунта, 18 га теплиц и холодильный комплекс на 4 500 тонн. Миссия — короткая цепочка «поле — склад — полка», без потери свежести и без лишней наценки.</p>
  </div>
  <img src="img/photos/field.jpg" alt="Поля" style="border-radius:24px">
</div></section>
<section style="padding-top:0"><div class="container">
  <h2>Производственные мощности</h2>
  <div class="adv-grid" style="margin-top:16px">
    <article class="adv-card"><h3>Теплицы 18 га</h3><p class="muted">Зимний томат, огурец, салат и зелень. Капельный полив, климат-контроль.</p></article>
    <article class="adv-card"><h3>Склады 4 500 т</h3><p class="muted">Камеры 0…+12 °C, зона РГС для яблока, экспедиция 24/7 в сезон.</p></article>
    <article class="adv-card"><h3>Техника</h3><p class="muted">Комбайны, линии мойки и калибровки, 14 рефрижераторов 20 т.</p></article>
    <article class="adv-card"><h3>Фасовка</h3><p class="muted">Сетка, гофра, лоток, вакуум, биг-бэг — под бриф сети.</p></article>
  </div>
</div></section>
<section><div class="container grid-2">
  <div>
    <h2>Технологии и качество</h2>
    <p class="muted">Интегрированная защита растений, лабораторный входной контроль партий, HACCP на фасовке. Калибровка по весу и диаметру, отбраковка визуальных дефектов. Каждая отгрузка — декларация соответствия, протокол и ТТН.</p>
    <p style="margin-top:12px"><strong>Сертификаты:</strong> декларации EAC, соответствие ГОСТ, протоколы на нитраты и пестициды. Органическая линейка — по отдельному запросу (участки без синтетических СЗР).</p>
  </div>
  <div class="panel" style="padding:24px">
    <h3>Документы к партии</h3>
    <ul class="muted" style="margin:12px 0 0 18px">
      <li>Декларация EAC / добровольный сертификат</li>
      <li>Протокол испытаний</li>
      <li>Накладная и счёт-фактура (с НДС / без НДС)</li>
      <li>Карантинный сертификат при межрегиональной перевозке</li>
    </ul>
  </div>
</div></section>
<section style="padding-top:0"><div class="container">
  <h2>Команда</h2>
  <div class="team" style="margin-top:16px">
    <article><h3>Ирина Волкова</h3><p class="muted">Коммерческий директор. Контракты с сетями и график отгрузок.</p></article>
    <article><h3>Павел Седин</h3><p class="muted">Главный агроном. Севооборот, защита растений, качество сбора.</p></article>
    <article><h3>Марина Ким</h3><p class="muted">Руководитель логистики. Рейсы, температура, слоты на складах.</p></article>
  </div>
</div></section>
<section><div class="container">
  <h2>Фотогалерея производства</h2>
  <div class="gallery" style="margin-top:16px">
    <img src="img/photos/hero.jpg" alt="Поле">
    <img src="img/photos/greenhouse.jpg" alt="Теплица">
    <img src="img/photos/harvest.jpg" alt="Урожай">
    <img src="img/photos/logistics.jpg" alt="Логистика">
    <img src="img/photos/garden.jpg" alt="Сад">
    <img src="img/photos/zelen.jpg" alt="Зелень">
  </div>
</div></section>
<section style="padding-top:0"><div class="container panel" style="padding:28px">
  <h2>Реквизиты</h2>
  <p>ООО «ГРИН ЭКО» · ИНН 2348042571 · КПП 773401001 · ОГРН 1212300006049 · ОКПО 47145444</p>
  <p>Юр. адрес: 123182, город Москва, Волоколамское ш., д. 24 к. 1, помещ. 699</p>
  <p>Директор: Татьяна Михайловна Суханова (на основании Устава)</p>
  <p>Р/с 40702810926210002713 в ФИЛИАЛЕ «РОСТОВСКИЙ» АО «АЛЬФА-БАНК», к/с 30101810500000000207, БИК 046015207</p>
  <p>Тел.: <a href="tel:+79281221355">+7 (928) 122-13-55</a> · <a href="mailto:grineko.ooo@mail.ru">grineko.ooo@mail.ru</a> · <a href="mailto:kompaniagrineko@yandex.ru">kompaniagrineko@yandex.ru</a></p>
</div></section>
`,
  })
);

const catalogScript = `<script>
(function(){
  const box = document.getElementById("catalog");
  const cat = box.dataset.category || "";
  let list = window.GREENECO.catalog.filter(p => !cat || p.category === cat);
  function apply(){
    const fCat = document.getElementById("f-cat")?.value || cat;
    const season = document.getElementById("f-season").value;
    const cal = document.getElementById("f-cal").value;
    const pack = document.getElementById("f-pack").value;
    const sort = document.getElementById("f-sort").value;
    let rows = window.GREENECO.catalog.filter(p => {
      if (cat && p.category !== cat) return false;
      if (!cat && fCat && p.category !== fCat) return false;
      if (season && !(p.seasonKeys||[]).includes(season)) return false;
      if (cal && !(p.caliberKeys||[]).includes(cal)) return false;
      if (pack && !(p.packKeys||[]).includes(pack)) return false;
      return true;
    });
    if (sort === "price-asc") rows.sort((a,b)=>a.priceKg-b.priceKg);
    if (sort === "price-desc") rows.sort((a,b)=>b.priceKg-a.priceKg);
    if (sort === "name") rows.sort((a,b)=>a.name.localeCompare(b.name, "ru"));
    window.GREENECO.renderCards(box, rows);
  }
  ["f-cat","f-season","f-cal","f-pack","f-sort"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", apply);
  });
  apply();
})();
</script>`;

function filters(showCat) {
  return `<div class="filters">
    ${showCat ? `<select id="f-cat"><option value="">Все категории</option><option value="ovoshchi">Овощи</option><option value="frukty">Фрукты</option><option value="yagody">Ягоды</option><option value="zelen">Зелень</option></select>` : ""}
    <select id="f-season"><option value="">Сезонность</option><option value="zima">Зима</option><option value="vesna">Весна</option><option value="leto">Лето</option><option value="osen">Осень</option></select>
    <select id="f-cal"><option value="">Калибр</option><option value="sredniy">Средний</option><option value="krupnyy">Крупный</option></select>
    <select id="f-pack"><option value="">Упаковка</option><option value="setka">Сетка</option><option value="gofra">Гофрокороб</option><option value="lotok">Лоток</option><option value="yashik">Ящик</option><option value="vakuum">Вакуум</option><option value="meshok">Мешок</option><option value="bigbag">Биг-бэг</option><option value="plenka">Плёнка</option></select>
    <select id="f-sort"><option value="name">По названию</option><option value="price-asc">Цена ↑</option><option value="price-desc">Цена ↓</option></select>
  </div>`;
}

write(
  "produkciya/index.html",
  wrap({
    title: "Каталог продукции ГринЭко — овощи, фрукты, ягоды, зелень оптом",
    desc: "Полный каталог производителя ГринЭко. Фильтры по категории, сезону, калибру и упаковке. Актуальные оптовые цены.",
    css: "../css/style.css",
    root: "../",
    page: "catalog",
    extraScript: catalogScript,
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../index.html">Главная</a> / Продукция</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Каталог продукции</h1>
  <p class="muted">Овощи, фрукты, ягоды и зелень с поля. Цены — опт, дата обновления на карточке.</p>
  ${filters(true)}
</div></div>
<section><div class="container"><div class="card-grid" id="catalog" data-category=""></div></div></section>
`,
  })
);

const cats = [
  { id: "ovoshchi", name: "Овощи", seo: "Овощи оптом от производителя ГринЭко: томаты, огурцы, картофель, морковь, капуста, лук, перец." },
  { id: "frukty", name: "Фрукты", seo: "Фрукты оптом: яблоки, груши, сливы с садов Кубани. Калибровка и холодильник." },
  { id: "yagody", name: "Ягоды", seo: "Ягоды оптом: клубника и малина утреннего сбора, охлаждение 2 часа." },
  { id: "zelen", name: "Зелень", seo: "Зелень оптом круглый год: укроп, петрушка, салат, лук зелёный." },
];

cats.forEach((c) => {
  write(
    `produkciya/${c.id}/index.html`,
    wrap({
      title: `${c.name} оптом — ГринЭко`,
      desc: c.seo,
      css: "../../css/style.css",
      root: "../../",
      page: "category",
      extraScript: catalogScript,
      body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../../index.html">Главная</a> / <a href="../">Продукция</a> / ${c.name}</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">${c.name} оптом</h1>
  <p class="muted">${c.seo}</p>
  ${filters(false)}
</div></div>
<section><div class="container"><div class="card-grid" id="catalog" data-category="${c.id}"></div></div></section>
`,
    })
  );
});

function schema(p, root) {
  const url = "https://greeneco.ru/" + p.url.replace(/\\/g, "/");
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc,
    image: p.image,
    brand: { "@type": "Brand", name: "ГринЭко" },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: p.priceKg,
      unitText: "кг",
      availability: "https://schema.org/InStock",
      url,
      priceValidUntil: "2026-10-31",
    },
  })}</script>`;
}

PRODUCTS.forEach((p) => {
  const file = p.url;
  write(
    file,
    wrap({
      title: `${p.seo} — ${p.name} от ГринЭко`,
      desc: `${p.name} оптом: ${p.variety}. ${p.desc} Цена от ${p.priceKg} ₽/кг.`,
      css: "../../../css/style.css",
      root: "../../../",
      page: "product",
      extraHead: schema(p),
      extraScript: `<script>
(function(){
  const p = window.GREENECO.catalog.find(x => x.id === "${p.id}");
  if (!p) return;
  document.getElementById("p-kg").textContent = window.GREENECO.money(p.priceKg);
  document.getElementById("p-pack").textContent = window.GREENECO.money(p.pricePack);
  document.getElementById("p-ton").textContent = window.GREENECO.money(p.priceTon);
  document.getElementById("p-vol").textContent = p.volume;
})();
</script>`,
      body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../../../index.html">Главная</a> / <a href="../../">Продукция</a> / <a href="../">${p.categoryName}</a> / ${p.name}</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">${p.name} оптом</h1>
  <p class="muted">${p.seo}. Сорт, калибр, упаковка и актуальная цена.</p>
</div></div>
<section><div class="container product-layout">
  <img src="../../../${p.image}" alt="${p.name}" style="border-radius:24px;width:100%;height:420px;object-fit:cover">
  <div>
    <span class="tag">${p.categoryName}</span>
    <p style="margin-top:12px">${p.desc}</p>
    <div class="product-meta">
      <div><span class="muted">Сорт</span><strong>${p.variety}</strong></div>
      <div><span class="muted">Калибр</span><strong>${p.caliber}</strong></div>
      <div><span class="muted">Упаковка</span><strong>${p.pack}</strong></div>
      <div><span class="muted">Хранение</span><strong>${p.storage}</strong></div>
      <div><span class="muted">Срок годности</span><strong>${p.shelf}</strong></div>
      <div><span class="muted">Сезон</span><strong>${p.season}</strong></div>
      <div><span class="muted">Доступный объём</span><strong id="p-vol">${p.volume}</strong></div>
    </div>
    <p class="price"><span id="p-kg">${p.priceKg} ₽</span> <small>/ кг опт</small></p>
    <p class="muted">Упаковка: <span id="p-pack">${p.pricePack} ₽</span> · тонна: <span id="p-ton">${p.priceTon} ₽</span></p>
    <p class="muted" style="margin:8px 0">Цена обновлена <span data-price-date></span></p>
    <div class="hero-actions">
      <button class="btn btn-primary js-lead" type="button" data-product="${p.name}">Оставить заявку</button>
      <a class="btn btn-dark" href="../../../ceny.html">Запросить прайс</a>
    </div>
  </div>
</div></section>
`,
    })
  );
});

write(
  "ceny.html",
  wrap({
    title: "Прайс-лист ГринЭко — актуальные оптовые цены на овощи и фрукты",
    desc: "Таблица цен опт / мелкий опт / розница. Скачать прайс Excel и PDF. Условия оплаты и подписка на обновления.",
    css: "css/style.css",
    root: "",
    page: "prices",
    extraScript: `<script src="js/prices.js"></script>`,
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="index.html">Главная</a> / Цены</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Прайс-лист</h1>
  <p class="muted">Актуально на <strong data-price-date></strong>. Цены франко-склад Динская, НДС 10% включён в опт по запросу.</p>
  <div class="hero-actions" style="margin-top:16px">
    <button class="btn btn-primary" type="button" id="dl-csv">Скачать Excel (CSV)</button>
    <button class="btn btn-dark" type="button" id="dl-pdf">Версия для PDF / печати</button>
  </div>
</div></div>
<section><div class="container">
  <div class="table-wrap"><table id="price-table"></table></div>
  <div class="contact-split" style="margin-top:32px">
    <div class="panel" style="padding:24px">
      <h2>Оплата и отсрочка</h2>
      <p class="muted">Безналичный расчёт с НДС и без НДС (УСН для части партий — уточняйте). Для новых клиентов — предоплата 50–100%. Постоянным — отсрочка 7–14 банковских дней после подписания договора и страхового депозита.</p>
    </div>
    <div class="panel" style="padding:24px">
      <h2>Подписка на прайс</h2>
      <form class="form js-lead-form">
        <input type="hidden" name="product" value="Подписка на прайс">
        <label>Имя</label><input name="name" required>
        <label>Телефон или email</label><input name="phone" required>
        <label>Комментарий</label><textarea name="comment" rows="2" placeholder="Куда присылать обновления"></textarea>
        <button class="btn btn-primary" type="submit">Подписаться</button>
      </form>
    </div>
  </div>
</div></section>
`,
  })
);

write(
  "sotrudnichestvo.html",
  wrap({
    title: "Условия сотрудничества — ГринЭко опт",
    desc: "Минимальные партии, доставка, упаковка, документы и сезонный календарь продукции ГринЭко.",
    css: "css/style.css",
    root: "",
    page: "coop",
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="index.html">Главная</a> / Сотрудничество</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Условия сотрудничества</h1>
  <p class="muted">Прозрачные правила для сетей, оптовиков и HoReCa.</p>
</div></div>
<section><div class="container adv-grid">
  <article class="adv-card"><h3>Оптовые поставки</h3><p class="muted">Минимальная партия: от 500 кг по позиции или сборный паллет от 1 тонны. Для ягод — от 50 кг. График отгрузок фиксируем на неделю вперёд.</p></article>
  <article class="adv-card"><h3>Доставка</h3><p class="muted">Свой рефрижератор по ЮФО и ЦФО. Транспортные компании — Деловые Линии, ПЭК — для дальних регионов. Температурный лист в пути.</p></article>
  <article class="adv-card"><h3>Упаковка</h3><p class="muted">Сетка, гофрокороб, плёнка, вакуум, лоток, биг-бэг. СТМ и этикетка сети — от 10 дней после макета.</p></article>
  <article class="adv-card"><h3>Документы</h3><p class="muted">ТТН, УПД, декларации, протоколы, карантин. ЭДО: Диадок / СБИС.</p></article>
</div></section>
<section style="padding-top:0"><div class="container">
  <h2>Сезонный календарь</h2>
  <p class="muted" style="margin-bottom:12px">Зелёным отмечена доступность основной массы объёма.</p>
  <div class="calendar">
    <span class="head">Культура</span>
    ${["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"].map((m)=>`<span class="head">${m}</span>`).join("")}
    ${[
      ["Томат", [1,1,1,1,1,1,1,1,1,1,1,1]],
      ["Огурец", [0,0,1,1,1,1,1,1,1,1,1,0]],
      ["Картофель", [1,1,1,1,0,0,1,1,1,1,1,1]],
      ["Морковь", [1,1,1,0,0,1,1,1,1,1,1,1]],
      ["Яблоко", [1,1,1,1,1,0,0,1,1,1,1,1]],
      ["Клубника", [0,0,0,0,1,1,1,1,1,1,0,0]],
      ["Зелень", [1,1,1,1,1,1,1,1,1,1,1,1]],
    ].map(([name, months]) => `<span>${name}</span>` + months.map((on)=>`<span class="${on?"on":""}">${on?"●":"—"}</span>`).join("")).join("")}
  </div>
  <p style="margin-top:24px"><button class="btn btn-primary js-lead" type="button">Стать клиентом</button></p>
</div></section>
`,
  })
);

write(
  "dostavka.html",
  wrap({
    title: "Доставка и оплата — ГринЭко",
    desc: "Способы доставки, сроки, самовывоз со склада в Динской, безнал с НДС и без НДС, условия для постоянных клиентов.",
    css: "css/style.css",
    root: "",
    page: "delivery",
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="index.html">Главная</a> / Доставка и оплата</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Доставка и оплата</h1>
</div></div>
<section><div class="container contact-split">
  <div>
    <h2>Способы и сроки</h2>
    <ul class="muted" style="margin:12px 0 0 18px;display:grid;gap:8px">
      <li>Краснодарский край — 4–12 часов своим бортом</li>
      <li>Ростов, Ставрополь, Волгоград — 12–24 часа</li>
      <li>Воронеж, Тула, Москва — 24–36 часов, рейс 2 раза в неделю</li>
      <li>Другие регионы — ТК, 2–5 суток, температурный режим согласовываем</li>
    </ul>
    <h2 style="margin-top:28px">Самовывоз</h2>
    <p class="muted">Склад: ст. Динская, ул. Промышленная, 14. Погрузка с 7:00 до 17:00. Нужна заявка на слот за сутки. Въезд по пропускам, есть весовая.</p>
    <iframe class="map-embed" style="margin-top:12px" title="Склад" src="https://yandex.ru/map-widget/v1/?ll=39.226%2C45.215&z=12&text=%D0%94%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%9F%D1%80%D0%BE%D0%BC%D1%8B%D1%88%D0%BB%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%2014"></iframe>
  </div>
  <div>
    <article class="adv-card"><h3>Оплата</h3><p class="muted">Безналичный расчёт. НДС 10% на продовольствие либо отгрузка без НДС — зависит от партии и договора. Счёт действителен 1 рабочий день в высокий сезон.</p></article>
    <article class="adv-card" style="margin-top:12px"><h3>Постоянным клиентам</h3><p class="muted">Приоритет слота на складе, фиксация объёма на 7 дней, отсрочка до 14 дней, персональный менеджер и еженедельный прайс в мессенджер.</p></article>
    <article class="adv-card" style="margin-top:12px"><h3>Стоимость доставки</h3><p class="muted">По ЮФО часто включена в опт от 5 тонн. По ЦФО — отдельной строкой или в цене товара. Считаем в заявке.</p></article>
  </div>
</div></section>
`,
  })
);

write(
  "kontakty.html",
  wrap({
    title: "Контакты ГринЭко — офис, склад, отдел продаж",
    desc: "Адрес офиса в Краснодаре и склада в Динской, телефоны продаж и бухгалтерии, WhatsApp, Telegram, форма обратной связи и реквизиты.",
    css: "css/style.css",
    root: "",
    page: "contacts",
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="index.html">Главная</a> / Контакты</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Контакты</h1>
</div></div>
<section><div class="container contact-split">
  <div>
    <p><strong>Адрес:</strong> 123182, город Москва, Волоколамское ш., д. 24 к. 1, помещ. 699</p>
    <p>Телефон: <a href="tel:+79281221355">+7 (928) 122-13-55</a></p>
    <p>Email: <a href="mailto:grineko.ooo@mail.ru">grineko.ooo@mail.ru</a>, <a href="mailto:kompaniagrineko@yandex.ru">kompaniagrineko@yandex.ru</a></p>
    <p><a href="https://wa.me/666666">WhatsApp</a> · <a href="https://t.me/greeneco_sales">Telegram</a></p>
    <p class="muted">Пн–Сб 8:00–18:00</p>
    <h2 style="margin-top:24px">Реквизиты</h2>
    <p class="muted">ООО «ГРИН ЭКО», ИНН 2348042571, КПП 773401001, ОГРН 1212300006049</p>
    <iframe class="map-embed" style="margin-top:16px" title="Офис" src="https://yandex.ru/map-widget/v1/?ll=38.975313%2C45.035470&z=15"></iframe>
  </div>
  <div class="panel" style="padding:28px">
    <h2>Форма обратной связи</h2>
    <form class="form js-lead-form" style="margin-top:12px">
      <label>Имя</label><input name="name" required>
      <label>Телефон</label><input name="phone" type="tel" required>
      <label>Тема</label><input name="product" placeholder="Поставка / документы / другое">
      <label>Сообщение</label><textarea name="comment" rows="4"></textarea>
      <button class="btn btn-primary" type="submit">Отправить</button>
    </form>
  </div>
</div></section>
`,
  })
);

write(
  "novosti/index.html",
  wrap({
    title: "Новости ГринЭко — сезон, цены, агроновости",
    desc: "Сезонные обновления, новые позиции, изменения цен и новости хозяйства ГринЭко.",
    css: "../css/style.css",
    root: "../",
    page: "news",
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../index.html">Главная</a> / Новости</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">Новости и блог</h1>
</div></div>
<section><div class="container news-grid">
${NEWS.map(
  (n) => `<article class="news-card"><img src="${n.image}" alt=""><div class="body"><span class="tag">${n.date}</span><h3 style="margin:8px 0"><a href="${n.id}.html">${n.title}</a></h3><p class="muted">${n.excerpt}</p></div></article>`
).join("")}
</div></section>
`,
  })
);

const newsBodies = {
  "sborn-yablok-2026": `<p>Открыли съём Галы и Голдена. Калибр 65–85 мм, цвет от 50%. Отгрузка из РГС и «с дерева» под график сети. Объём — до 200 т в неделю. Заявки принимает отдел продаж.</p>`,
  "novye-teplicy": `<p>Четыре гектара зимнего блока вышли на режим. Это снимает просадку томата и зелени в декабре–марте. Клиентам с годовыми контрактами подтверждаем объёмы на зиму до 15 октября.</p>`,
  "ceny-oktyabr": `<p>С 1 октября действует новый прайс: томат и перец скорректированы после похолодания, морковь — после массовой уборки. Актуальная таблица в разделе «Цены». Подписчикам прайс уходит в WhatsApp в день обновления.</p>`,
  "logistika-cfo": `<p>Запустили регулярный рейс Краснодар — Воронеж — Тула — Москва дважды в неделю. Сборный груз от паллеты. Температура в кузове логируется. Слоты на рампы в МО бронируем заранее.</p>`,
};

NEWS.forEach((n) => {
  write(
    `novosti/${n.id}.html`,
    wrap({
      title: `${n.title} — ГринЭко`,
      desc: n.excerpt,
      css: "../css/style.css",
      root: "../",
      page: "article",
      body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../index.html">Главная</a> / <a href="./">Новости</a> / ${n.title}</p>
  <p class="tag">${n.date}</p>
  <h1 style="font-family:Fraunces,serif;font-size:clamp(2rem,4vw,3rem)">${n.title}</h1>
</div></div>
<section><div class="container" style="max-width:760px">
  <img src="${n.image}" alt="" style="border-radius:20px;margin-bottom:20px;width:100%;max-height:380px;object-fit:cover">
  ${newsBodies[n.id]}
  <p style="margin-top:20px"><button class="btn btn-primary js-lead" type="button">Оставить заявку</button></p>
</div></section>
`,
    })
  );
});

write(
  "politika-konfidencialnosti.html",
  wrap({
    title: "Политика конфиденциальности — ГринЭко",
    desc: "Политика обработки персональных данных ООО «ГРИН ЭКО».",
    css: "css/style.css",
    root: "",
    page: "legal",
    body: `<div class="page-hero"><div class="container"><h1 style="font-family:Fraunces,serif">Политика конфиденциальности</h1></div></div>
<section><div class="container" style="max-width:800px">
<p>ООО «ГРИН ЭКО» (ИНН 2348042571) обрабатывает персональные данные, которые вы оставляете в формах сайта: имя, телефон, email, состав заявки.</p>
<p style="margin-top:12px">Цели: обработка запросов на поставку, направление прайса, связь по договору. Основание — согласие субъекта и исполнение преддоговорных действий.</p>
<p style="margin-top:12px">Данные не передаются третьим лицам, кроме перевозчиков и операторов ЭДО в рамках сделки. Срок хранения заявок — 3 года. Вы можете запросить удаление на grineko.ooo@mail.ru или kompaniagrineko@yandex.ru.</p>
</div></section>`,
  })
);

write(
  "polzovatelskoe-soglashenie.html",
  wrap({
    title: "Пользовательское соглашение — ГринЭко",
    desc: "Условия использования сайта ГринЭко.",
    css: "css/style.css",
    root: "",
    page: "legal",
    body: `<div class="page-hero"><div class="container"><h1 style="font-family:Fraunces,serif">Пользовательское соглашение</h1></div></div>
<section><div class="container" style="max-width:800px">
<p>Сайт носит информационный характер. Цены и объёмы не являются публичной офертой (ст. 437 ГК РФ) и подтверждаются счётом.</p>
<p style="margin-top:12px">Запрещено автоматизированно копировать прайс для перепродажи без договора. Фотографии и тексты — собственность ГринЭко.</p>
<p style="margin-top:12px">Споры решаются путём переговоров, затем в суде по месту нахождения ООО «ГРИН ЭКО».</p>
</div></section>`,
  })
);

write(
  "spasibo.html",
  wrap({
    title: "Спасибо за заявку — ГринЭко",
    desc: "Заявка получена.",
    css: "css/style.css",
    root: "",
    page: "thanks",
    body: `<section><div class="container" style="padding:80px 0;text-align:center;max-width:640px">
<h1 style="font-family:Fraunces,serif;font-size:2.4rem">Заявка отправлена</h1>
<p class="muted" style="margin:16px 0 24px">Менеджер отдела продаж перезвонит в рабочие часы (пн–сб 8:00–18:00). Если вопрос срочный — звоните <a href="tel:666666">+7 (928) 122-13-55</a>.</p>
<a class="btn btn-primary" href="index.html">На главную</a>
<a class="btn btn-dark" href="ceny.html">Смотреть прайс</a>
</div></section>`,
  })
);

write(
  "admin/ceny.html",
  wrap({
    title: "Админка цен — ГринЭко",
    desc: "Обновление оптовых цен менеджером.",
    css: "../css/style.css",
    root: "../",
    page: "admin",
    extraScript: `<script src="../js/admin.js"></script>`,
    body: `
<div class="page-hero"><div class="container">
  <p class="crumbs"><a href="../index.html">Главная</a> / Админка цен</p>
  <h1 style="font-family:Fraunces,serif">Обновление цен</h1>
  <p class="muted">Код доступа менеджера: <strong>greeneco</strong>. Цены сохраняются в браузере и сразу видны на сайте.</p>
</div></div>
<section><div class="container">
  <div class="admin-bar" id="gate">
    <form class="form" id="login" style="max-width:320px">
      <label>Код</label><input name="pin" type="password" required>
      <button class="btn btn-primary" type="submit">Войти</button>
    </form>
  </div>
  <div id="editor" hidden>
    <p class="muted">Дата обновления: <input id="price-date" type="text" style="padding:8px 10px;border-radius:10px;border:1px solid var(--line)"></p>
    <div class="table-wrap" style="margin-top:12px"><table id="admin-table"></table></div>
    <p style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" id="save">Сохранить</button>
      <button class="btn btn-dark" type="button" id="reset">Сбросить к базовым</button>
    </p>
    <p class="muted" id="admin-msg"></p>
  </div>
</div></section>
`,
  })
);

write(
  "robots.txt",
  `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://greeneco.ru/sitemap.xml
`
);

const urls = [
  "",
  "o-kompanii.html",
  "produkciya/",
  "produkciya/ovoshchi/",
  "produkciya/frukty/",
  "produkciya/yagody/",
  "produkciya/zelen/",
  "ceny.html",
  "sotrudnichestvo.html",
  "dostavka.html",
  "novosti/",
  "kontakty.html",
  "politika-konfidencialnosti.html",
  "polzovatelskoe-soglashenie.html",
  ...PRODUCTS.map((p) => p.url),
  ...NEWS.map((n) => "novosti/" + n.id + ".html"),
];

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://greeneco.ru/${u}</loc></url>`).join("\n")}
</urlset>
`
);

console.log("Generated", PRODUCTS.length, "products and site pages");
