(function () {
  const root = document.body.getAttribute("data-root") || "";
  const page = document.body.getAttribute("data-page") || "";
  const C = window.GREENECO.company;
  window.GREENECO.base = root;

  function href(path) {
    if (!path) return root || "./";
    path = String(path).replace(/^\//, "");
    if (path.slice(-1) === "/") path += "index.html";
    return root + path;
  }

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<header class="header" id="header">' +
      '<div class="container header-inner">' +
      '<a class="logo" href="' + href("index.html") + '"><img src="' + href("img/logo.svg") + "?v=" + (window.GREENECO.assetVersion || "") + '" alt="' + C.brand + '" width="56" height="56"><span class="logo-text">' + C.brand + "<small>овощи и фрукты</small></span></a>" +
      '<button class="burger" type="button" aria-label="Меню" id="burger">☰</button>' +
      '<nav class="nav">' +
      '<a href="' + href("index.html") + '">Главная</a>' +
      '<a href="' + href("o-kompanii.html") + '">О компании</a>' +
      '<div class="nav-drop"><a href="' + href("produkciya/") + '">Продукция</a><div class="nav-drop-menu">' +
      '<a href="' + href("produkciya/") + '">Весь каталог</a>' +
      '<a href="' + href("produkciya/ovoshchi/") + '">Овощи</a>' +
      "</div></div>" +
      '<a href="' + href("ceny.html") + '">Цены</a>' +
      '<a href="' + href("sotrudnichestvo.html") + '">Сотрудничество</a>' +
      '<a href="' + href("dostavka.html") + '">Доставка</a>' +
      '<a href="' + href("novosti/") + '">Новости</a>' +
      '<a href="' + href("kontakty.html") + '">Контакты</a>' +
      "</nav>" +
      '<div class="header-cta">' +
      '<a class="header-phone" href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a>" +
      '<button class="btn btn-primary btn-sm js-lead" type="button">Оставить заявку</button>' +
      "</div></div></header>";
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer class="footer"><div class="container">' +
      '<div class="footer-grid">' +
      "<div><h4>" + C.name + "</h4><p>Производитель овощей, фруктов, ягод и зелени. Поставки оптом по ЮФО, ЦФО и соседним регионам.</p>" +
      "<p style=\"margin-top:10px\">ИНН " + C.inn + "<br>КПП " + C.kpp + "<br>ОГРН " + C.ogrn + "</p></div>" +
      "<div><h4>Разделы</h4><ul>" +
      '<li><a href="' + href("produkciya/") + '">Каталог</a></li>' +
      '<li><a href="' + href("ceny.html") + '">Прайс-лист</a></li>' +
      '<li><a href="' + href("sotrudnichestvo.html") + '">Сотрудничество</a></li>' +
      '<li><a href="' + href("dostavka.html") + '">Доставка и оплата</a></li>' +
      "</ul></div>" +
      "<div><h4>Документы</h4><ul>" +
      '<li><a href="' + href("politika-konfidencialnosti.html") + '">Политика конфиденциальности</a></li>' +
      '<li><a href="' + href("polzovatelskoe-soglashenie.html") + '">Пользовательское соглашение</a></li>' +
      '<li><a href="' + href("admin/ceny.html") + '">Обновление цен</a></li>' +
      "</ul></div>" +
      "<div><h4>Контакты</h4><ul>" +
      '<li><a href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a> — продажи</li>" +
      '<li><a href="mailto:' + C.emailSales + '">' + C.emailSales + "</a></li>" +
      '<li><a href="mailto:' + C.email2 + '">' + C.email2 + "</a></li>" +
      '<li><a href="' + C.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
      "</ul></div></div>" +
      '<div class="footer-bottom"><span>© 2021–2026 ' + C.brand + "</span><span>" + C.legalAddress + "</span></div>" +
      "</div></footer>";
  }

  const burger = document.getElementById("burger");
  const headerEl = document.getElementById("header");
  if (burger && headerEl) {
    burger.addEventListener("click", function () {
      headerEl.classList.toggle("open");
    });
  }

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "lead-modal";
  modal.innerHTML =
    '<div class="modal-card"><h2>Заявка на поставку</h2><p class="muted">Отдел продаж свяжется в рабочее время.</p>' +
    '<form class="form js-lead-form" style="margin-top:14px">' +
    '<label>Имя</label><input name="name" required placeholder="Как к вам обращаться">' +
    '<label>Телефон</label><input name="phone" type="tel" required placeholder="+7 (___) ___-__-__">' +
    '<label>Товар</label><input name="product" placeholder="Томаты, яблоки…">' +
    '<label>Объём</label><input name="volume" placeholder="Например, 3 тонны / неделя">' +
    '<label>Комментарий</label><textarea name="comment" rows="3"></textarea>' +
    '<button class="btn btn-primary" type="submit">Отправить</button>' +
    '<button class="btn btn-ghost" type="button" id="lead-close">Закрыть</button>' +
    "</form></div>";
  document.body.appendChild(modal);

  document.querySelectorAll(".js-lead").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const preset = btn.getAttribute("data-product");
      if (preset) modal.querySelector('[name="product"]').value = preset;
      modal.classList.add("open");
    });
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("open");
  });
  document.getElementById("lead-close").addEventListener("click", function () {
    modal.classList.remove("open");
  });

  function handleLead(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const list = JSON.parse(localStorage.getItem("greeneco_leads") || "[]");
        list.push(Object.assign({ at: new Date().toISOString() }, data));
        localStorage.setItem("greeneco_leads", JSON.stringify(list));
      } catch (err) {}
      window.location.href = href("spasibo.html");
    });
  }
  document.querySelectorAll(".js-lead-form").forEach(handleLead);

  window.GREENECO.path = href;
  window.GREENECO.page = page;

  function refreshPriceDates() {
    document.querySelectorAll("[data-price-date]").forEach(function (el) {
      el.textContent = window.GREENECO.priceDate();
    });
  }
  refreshPriceDates();

  var req = document.getElementById("company-requisites");
  if (req) {
    req.innerHTML =
      "<p>" +
      C.name +
      " · ИНН " +
      C.inn +
      " · КПП " +
      C.kpp +
      " · ОГРН " +
      C.ogrn +
      " · ОКПО " +
      C.okpo +
      "</p>" +
      "<p>Юр. адрес: " +
      C.legalAddress +
      "</p>" +
      "<p>Директор: " +
      C.director +
      " (на основании Устава)</p>" +
      "<p>Р/с " +
      C.rs +
      " в " +
      C.bank +
      ", к/с " +
      C.ks +
      ", БИК " +
      C.bik +
      "</p>" +
      '<p>Тел.: <a href="' +
      C.phoneSalesHref +
      '">' +
      C.phoneSales +
      '</a> · <a href="mailto:' +
      C.email +
      '">' +
      C.email +
      '</a> · <a href="mailto:' +
      C.email2 +
      '">' +
      C.email2 +
      "</a></p>";
  }
  document.querySelectorAll(".js-company-address").forEach(function (el) {
    el.innerHTML = C.name + "<br>" + C.legalAddress + "<br>" + C.hours;
  });
  document.querySelectorAll(".js-company-id").forEach(function (el) {
    el.textContent = C.name + ", ИНН " + C.inn + ", КПП " + C.kpp + ", ОГРН " + C.ogrn;
  });

  if (window.GREENECO.whenCatalogReady) {
    window.GREENECO.whenCatalogReady(refreshPriceDates);
    document.addEventListener("greeneco-catalog-updated", refreshPriceDates);
  }
})();
