$ErrorActionPreference = "Stop"
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $rootDir) { $rootDir = (Get-Location).Path }

function Wrap($title, $desc, $css, $root, $page, $body, $extraHead, $extraScript) {
  if (-not $extraHead) { $extraHead = "" }
  if (-not $extraScript) { $extraScript = "" }
  $icon = $css.Replace("css/style.css", "favicon.svg")
  return @"
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$title</title>
  <meta name="description" content="$desc">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="$css">
  <link rel="icon" href="$icon">
  $extraHead
</head>
<body data-root="$root" data-page="$page">
<a class="skip" href="#main">К содержанию</a>
<div id="site-header"></div>
<main id="main">
$body
</main>
<div id="site-footer"></div>
<script src="${root}js/data.js"></script>
<script src="${root}js/site.js"></script>
<script src="${root}js/catalog.js"></script>
$extraScript
</body>
</html>
"@
}

function Save($rel, $content) {
  $full = Join-Path $rootDir $rel
  $dir = Split-Path $full -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($full, $content, $utf8)
}

$catalogScript = @'
<script>
(function(){
  const box = document.getElementById("catalog");
  const cat = box.dataset.category || "";
  function apply(){
    const fCatEl = document.getElementById("f-cat");
    const fCat = fCatEl ? fCatEl.value : cat;
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
</script>
'@

$filtersAll = @'
  <div class="filters">
    <select id="f-cat"><option value="">Все категории</option><option value="ovoshchi">Овощи</option><option value="frukty">Фрукты</option><option value="yagody">Ягоды</option><option value="zelen">Зелень</option></select>
    <select id="f-season"><option value="">Сезонность</option><option value="zima">Зима</option><option value="vesna">Весна</option><option value="leto">Лето</option><option value="osen">Осень</option></select>
    <select id="f-cal"><option value="">Калибр</option><option value="sredniy">Средний</option><option value="krupnyy">Крупный</option></select>
    <select id="f-pack"><option value="">Упаковка</option><option value="setka">Сетка</option><option value="gofra">Гофрокороб</option><option value="lotok">Лоток</option><option value="yashik">Ящик</option><option value="vakuum">Вакуум</option><option value="meshok">Мешок</option><option value="bigbag">Биг-бэг</option><option value="plenka">Плёнка</option></select>
    <select id="f-sort"><option value="name">По названию</option><option value="price-asc">Цена ↑</option><option value="price-desc">Цена ↓</option></select>
  </div>
'@

$filtersCat = @'
  <div class="filters">
    <select id="f-season"><option value="">Сезонность</option><option value="zima">Зима</option><option value="vesna">Весна</option><option value="leto">Лето</option><option value="osen">Осень</option></select>
    <select id="f-cal"><option value="">Калибр</option><option value="sredniy">Средний</option><option value="krupnyy">Крупный</option></select>
    <select id="f-pack"><option value="">Упаковка</option><option value="setka">Сетка</option><option value="gofra">Гофрокороб</option><option value="lotok">Лоток</option><option value="yashik">Ящик</option><option value="vakuum">Вакуум</option><option value="meshok">Мешок</option><option value="bigbag">Биг-бэг</option><option value="plenka">Плёнка</option></select>
    <select id="f-sort"><option value="name">По названию</option><option value="price-asc">Цена ↑</option><option value="price-desc">Цена ↓</option></select>
  </div>
'@

Save "index.html" (Wrap "ГринЭко — овощи и фрукты оптом с собственных полей" "ООО «ГринЭко»: овощи, фрукты, ягоды и зелень оптом. 1240 га, 28 000 тонн в год, доставка по ЮФО и ЦФО. Актуальный прайс." "css/style.css" "" "home" @'
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
      <p class="muted">ООО «ГринЭко» — агрохозяйство полного цикла: открытый грунт, зимние теплицы, холодильные склады и собственный автопарк. Поставляем сети, оптовикам и HoReCa без перекупщиков.</p>
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
'@ "<script>window.GREENECO.renderCards(document.getElementById('popular'), window.GREENECO.catalog.filter(p => p.popular));</script>" "")

Write-Host "index done"
