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
      '<a class="logo" href="' + href("index.html") + '"><img src="' + href("img/logo.svg") + "?v=" + (window.GREENECO.assetVersion || "") + '" alt="' + C.brand + '" width="36" height="36"><span class="logo-text">' + C.brand + "</span></a>" +
      '<button class="burger" type="button" aria-label="Меню" aria-expanded="false" aria-controls="header" id="burger"><span aria-hidden="true">☰</span></button>' +
      '<nav class="nav">' +
      '<a class="nav-phone" href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a>" +
      '<a href="' + href("ceny.html") + '">Цены</a>' +
      '<a href="' + href("dostavka.html") + '">Доставка</a>' +
      '<a href="' + href("o-kompanii.html") + '">О компании</a>' +
      '<a href="' + href("kontakty.html") + '">Контакты</a>' +
      "</nav>" +
      '<div class="header-cta">' +
      '<a class="header-phone" href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a>" +
      '<button class="btn btn-dark btn-sm js-lead" type="button">Заявка</button>' +
      "</div></div></header>";
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer class="footer"><div class="container">' +
      '<div class="footer-grid">' +
      "<div><h4>" + C.name + "</h4><p>Капуста, картофель, морковь и лук. Сезонные яблоки — по запросу. " + C.deliveryRegions + ".</p>" +
      "<p style=\"margin-top:10px\">ИНН " + C.inn + "<br>КПП " + C.kpp + "<br>ОГРН " + C.ogrn + "</p></div>" +
      "<div><h4>Разделы</h4><ul>" +
      '<li><a href="' + href("ceny.html") + '">Цены</a></li>' +
      '<li><a href="' + href("dostavka.html") + '">Доставка</a></li>' +
      '<li><a href="' + href("o-kompanii.html") + '">О компании</a></li>' +
      '<li><a href="' + href("kontakty.html") + '">Контакты</a></li>' +
      "</ul></div>" +
      "<div><h4>Документы</h4><ul>" +
      '<li><a href="' + href("politika-konfidencialnosti.html") + '">Политика конфиденциальности</a></li>' +
      '<li><a href="' + href("obrabotka-personalnyh-dannyh.html") + '">Обработка персональных данных</a></li>' +
      '<li><a href="' + href("politika-cookies.html") + '">Политика cookie</a></li>' +
      '<li><a href="' + href("polzovatelskoe-soglashenie.html") + '">Пользовательское соглашение</a></li>' +
      "</ul></div>" +
      "<div><h4>Контакты</h4><ul>" +
      '<li><a href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a> — продажи</li>" +
      '<li><a href="mailto:' + C.emailSales + '">' + C.emailSales + "</a></li>" +
      '<li><a href="' + C.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
      "</ul></div></div>" +
      '<div class="footer-bottom"><span>© 2021–2026 ' + C.brand + "</span><span>Юридический адрес: " + C.legalAddress + "</span></div>" +
      "</div></footer>";
  }

  const burger = document.getElementById("burger");
  const headerEl = document.getElementById("header");
  if (burger && headerEl) {
    burger.addEventListener("click", function () {
      var open = headerEl.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "lead-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "lead-modal-title");
  modal.innerHTML =
    '<div class="modal-card"><h2 id="lead-modal-title">Заявка на поставку</h2><p class="muted">Отдел продаж свяжется в рабочее время.</p>' +
    '<form class="form js-lead-form" id="lead-modal-form" style="margin-top:14px">' +
    '<label for="modal-name">Имя</label><input id="modal-name" name="name" required autocomplete="name" placeholder="Как к вам обращаться">' +
    '<label for="modal-phone">Телефон</label><input id="modal-phone" name="phone" type="tel" inputmode="numeric" required autocomplete="tel" placeholder="+7 (926) 923-29-29">' +
    '<label for="modal-city">Город</label><input id="modal-city" name="city" autocomplete="address-level2" placeholder="Краснодар, Ростов, Москва…">' +
    '<label for="modal-org">Организация</label><input id="modal-org" name="organization" autocomplete="organization" placeholder="Название компании">' +
    '<label for="modal-product">Товар</label><input id="modal-product" name="product" placeholder="Лук, картофель, морковь…">' +
    '<label for="modal-volume">Объём</label><input id="modal-volume" name="volume" placeholder="Например, 3 тонны / неделя">' +
    '<input type="text" name="_honey" class="lead-honey" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<p class="js-lead-error" role="alert" hidden></p>' +
    '<button class="btn btn-primary" type="submit">Отправить</button>' +
    '<button class="btn btn-ghost" type="button" id="lead-close">Закрыть</button>' +
    "</form></div>";
  document.body.appendChild(modal);

  function openLeadModal() {
    modal.classList.add("open");
    var first = modal.querySelector("#modal-name");
    if (first) first.focus();
  }
  document.querySelectorAll(".js-lead").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const preset = btn.getAttribute("data-product");
      if (preset) modal.querySelector('[name="product"]').value = preset;
      openLeadModal();
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("open")) modal.classList.remove("open");
    if (headerEl && headerEl.classList.contains("open")) {
      headerEl.classList.remove("open");
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) modal.classList.remove("open");
  });
  document.getElementById("lead-close").addEventListener("click", function () {
    modal.classList.remove("open");
  });

  function backupLead(data) {
    try {
      const list = JSON.parse(localStorage.getItem("greeneco_leads") || "[]");
      list.push(Object.assign({ at: new Date().toISOString() }, data));
      localStorage.setItem("greeneco_leads", JSON.stringify(list));
    } catch (err) {}
  }

  function ensureLeadExtras(form) {
    if (!form.querySelector('[name="_honey"]')) {
      const honey = document.createElement("input");
      honey.type = "text";
      honey.name = "_honey";
      honey.className = "lead-honey";
      honey.tabIndex = -1;
      honey.autocomplete = "off";
      honey.setAttribute("aria-hidden", "true");
      honey.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0";
      form.appendChild(honey);
    }
    if (!form.querySelector('[name="consent"]')) {
      const label = document.createElement("label");
      label.className = "consent";
      label.innerHTML =
        '<input type="checkbox" name="consent" value="да" required>' +
        "<span>Даю согласие на обработку персональных данных и их передачу сервису FormSubmit, чтобы заявка пришла на почту компании. " +
        '<a href="' + href("obrabotka-personalnyh-dannyh.html") + '">Обработка персональных данных</a>, ' +
        '<a href="' + href("politika-konfidencialnosti.html") + '">политика конфиденциальности</a>.</span>';
      label.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });
      const submit = form.querySelector('[type="submit"]');
      form.insertBefore(label, submit || null);
    }
    if (!form.querySelector(".js-lead-error")) {
      const err = document.createElement("p");
      err.className = "js-lead-error";
      err.setAttribute("role", "alert");
      err.hidden = true;
      err.style.color = "#b42318";
      err.style.fontSize = "0.9rem";
      err.style.margin = "8px 0";
      const submit = form.querySelector('[type="submit"]');
      form.insertBefore(err, submit || null);
    }
  }

  function handleLead(form) {
    ensureLeadExtras(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      if (String(fd.get("_honey") || "").trim()) return;

      const data = Object.fromEntries(fd.entries());
      delete data._honey;

      const errEl = form.querySelector(".js-lead-error");
      const submitBtn = form.querySelector('[type="submit"]');
      const submitLabel = submitBtn ? submitBtn.textContent : "";
      const consent = form.querySelector('[name="consent"]');

      function showError(msg) {
        if (errEl) {
          errEl.textContent = msg;
          errEl.hidden = false;
        }
      }

      if (!consent || !consent.checked) {
        showError("Поставьте отметку о согласии на обработку персональных данных.");
        return;
      }

      var phoneInput = form.querySelector('[name="phone"]');
      if (phoneInput && phoneDigits(phoneInput.value).length !== 10) {
        showError("Введите телефон полностью, например +7 (926) 923-29-29.");
        phoneInput.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка…";
      }
      if (errEl) errEl.hidden = true;

      const to = C.leadEmail || C.email2 || "kompaniagrineko@yandex.ru";
      const payload = Object.assign({}, data, {
        _subject: "Заявка с сайта «" + C.brand + "»",
        _captcha: "false",
        _template: "table",
        _url: location.href,
        page: page || document.title,
        sent_at: new Date().toISOString(),
      });

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(to), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().catch(function () {
            return { success: "false", message: "Некорректный ответ сервера" };
          });
        })
        .then(function (res) {
          const ok = res && (res.success === true || res.success === "true");
          if (!ok) {
            throw new Error((res && res.message) || "Ошибка отправки");
          }
          backupLead(data);
          window.location.href = href("spasibo.html");
        })
        .catch(function (err) {
          backupLead(data);
          const msg = String((err && err.message) || err || "");
          if (/activation|activate/i.test(msg)) {
            showError(
              "Первый раз нужно подтвердить почту: откройте письмо от FormSubmit на " +
                to +
                " и нажмите «Activate Form». Затем отправьте заявку снова."
            );
          } else {
            showError(
              "Не удалось отправить заявку автоматически. Позвоните " +
                C.phoneSales +
                " или напишите на " +
                to +
                "."
            );
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
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
    var reqEmail = C.requisitesEmail || C.emailSales || "kompaniagrineko@yandex.ru";
    function reqLine(label, value) {
      return '<p class="req-line">' + label + " — " + value + "</p>";
    }
    req.innerHTML =
      '<p class="req-line">' +
      C.name +
      "</p>" +
      reqLine("ИНН/КПП", C.inn + "/" + C.kpp) +
      reqLine("ОГРН", C.ogrn) +
      reqLine("ОКПО", C.okpo) +
      reqLine("Юридический адрес", C.legalAddress) +
      reqLine("Расчётный счёт", C.rs) +
      reqLine("Корсчёт", C.ks) +
      reqLine("Банк", C.bank + ", БИК " + C.bik) +
      reqLine("Телефон", '<a href="' + C.phoneSalesHref + '">' + C.phoneSales + "</a>") +
      reqLine("Эл. почта", '<a href="mailto:' + reqEmail + '">' + reqEmail + "</a>") +
      reqLine("Директор", C.director + ", действует на основании Устава");
  }
  document.querySelectorAll(".js-company-address").forEach(function (el) {
    el.textContent = C.legalAddress;
  });
  document.querySelectorAll(".js-company-id").forEach(function (el) {
    el.textContent = C.name + ", ИНН " + C.inn + ", КПП " + C.kpp + ", ОГРН " + C.ogrn;
  });
  document.querySelectorAll(".js-warehouse-note").forEach(function (el) {
    el.textContent = C.warehouseNote || C.warehouse;
  });

  function cookieChoice() {
    try {
      return localStorage.getItem("greeneco_cookie_ok") || "";
    } catch (err) {
      return "";
    }
  }

  function applyMaps() {
    const allow = cookieChoice() === "all";
    document.querySelectorAll(".js-warehouse-map").forEach(function (el) {
      const src = el.getAttribute("data-map-src") || C.mapEmbed || "";
      if (src) el.setAttribute("data-map-src", src);
      const prev = el.previousElementSibling;
      const hold = prev && prev.classList && prev.classList.contains("map-hold") ? prev : null;
      if (allow && src) {
        if (el.getAttribute("src") !== src) el.setAttribute("src", src);
        el.hidden = false;
        if (hold) hold.remove();
        return;
      }
      el.removeAttribute("src");
      el.hidden = true;
      if (!hold) {
        const box = document.createElement("div");
        box.className = "map-hold";
        box.innerHTML =
          "<p>Карта склада в Дербенте откроется после согласия на cookie Яндекса.</p>" +
          '<button class="btn btn-dark btn-sm" type="button">Показать карту</button>';
        box.querySelector("button").addEventListener("click", function () {
          setCookieChoice("all");
        });
        el.parentNode.insertBefore(box, el);
      }
    });
  }

  function setCookieChoice(value) {
    try {
      localStorage.setItem("greeneco_cookie_ok", value);
    } catch (err) {}
    const bar = document.getElementById("cookie-bar");
    if (bar) bar.remove();
    syncCookieOffset();
    applyMaps();
    applyMetrika();
  }

  function syncCookieOffset() {
    var bar = document.getElementById("cookie-bar");
    if (!bar) {
      document.body.classList.remove("has-cookie");
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.classList.add("has-cookie");
    document.body.style.paddingBottom = bar.offsetHeight + "px";
  }

  function metrikaTagPresent() {
    for (var j = 0; j < document.scripts.length; j++) {
      if ((document.scripts[j].src || "").indexOf("mc.yandex.ru/metrika/tag.js") !== -1) return true;
    }
    return false;
  }

  function applyMetrika() {
    if (window.__greenecoMetrika || metrikaTagPresent()) {
      window.__greenecoMetrika = true;
      return;
    }
    if (cookieChoice() !== "all") return;
    var id = String(window.GREENECO.metrikaId || "");
    if (!id) return;
    window.__greenecoMetrika = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) return; }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=" + id, "ym");
    window.ym(id, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }

  function mountCookieBar() {
    if (cookieChoice() || document.getElementById("cookie-bar")) return;
    const bar = document.createElement("div");
    bar.id = "cookie-bar";
    bar.className = "cookie-bar";
    bar.innerHTML =
      '<p>Мы сохраняем ваш выбор по cookie. Карта склада открывается только после согласия. Яндекс.Метрика считает посещения. ' +
      '<a href="' + href("politika-cookies.html") + '">Политика cookie</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-ghost btn-sm" id="cookie-need">Только необходимые</button>' +
      '<button type="button" class="btn btn-dark btn-sm" id="cookie-all">Принять</button>' +
      "</div>";
    var headerMount = document.getElementById("site-header");
    if (headerMount && headerMount.parentNode) headerMount.parentNode.insertBefore(bar, headerMount.nextSibling);
    else document.body.insertBefore(bar, document.body.firstChild);
    document.getElementById("cookie-need").addEventListener("click", function () {
      setCookieChoice("necessary");
    });
    document.getElementById("cookie-all").addEventListener("click", function () {
      setCookieChoice("all");
    });
    syncCookieOffset();
  }

  applyMaps();
  applyMetrika();
  mountCookieBar();
  window.addEventListener("resize", syncCookieOffset);
  const cookieReset = document.getElementById("cookie-reset");
  if (cookieReset) {
    cookieReset.addEventListener("click", function () {
      try {
        localStorage.removeItem("greeneco_cookie_ok");
      } catch (err) {}
      const note = document.getElementById("cookie-reset-note");
      if (note) note.hidden = false;
      applyMaps();
      applyMetrika();
      mountCookieBar();
    });
  }

  if (window.GREENECO.whenCatalogReady) {
    window.GREENECO.whenCatalogReady(refreshPriceDates);
    document.addEventListener("greeneco-catalog-updated", refreshPriceDates);
  }

  document.querySelectorAll("form").forEach(function (form, formIndex) {
    form.querySelectorAll("label").forEach(function (label, labelIndex) {
      if (label.classList.contains("consent") || label.htmlFor) return;
      var field = label.nextElementSibling;
      if (!field || !/^(INPUT|TEXTAREA|SELECT)$/.test(field.tagName)) return;
      if (!field.id) field.id = "field-" + formIndex + "-" + (field.name || labelIndex);
      label.htmlFor = field.id;
      if (field.name === "name") field.setAttribute("autocomplete", "name");
      if (field.name === "phone") field.setAttribute("autocomplete", "tel");
    });
  });

  function phoneDigits(raw) {
    var source = String(raw || "");
    var digits = source.replace(/\D/g, "");
    var hasPlus = source.indexOf("+") !== -1;
    if (digits.length >= 11 && (digits.charAt(0) === "7" || digits.charAt(0) === "8")) digits = digits.slice(1);
    else if (hasPlus && digits.charAt(0) === "7") digits = digits.slice(1);
    return digits.slice(0, 10);
  }

  function formatPhone(raw) {
    var digits = phoneDigits(raw);
    var out = "+7";
    if (!digits) return "+7 ";
    out += " (" + digits.slice(0, Math.min(3, digits.length));
    if (digits.length < 3) return out;
    out += ")";
    if (digits.length === 3) return out;
    out += " " + digits.slice(3, Math.min(6, digits.length));
    if (digits.length <= 6) return out;
    out += "-" + digits.slice(6, Math.min(8, digits.length));
    if (digits.length <= 8) return out;
    out += "-" + digits.slice(8, 10);
    return out;
  }

  function bindPhoneMask(input) {
    if (!input || input.getAttribute("data-phone-mask")) return;
    input.setAttribute("data-phone-mask", "1");
    input.type = "tel";
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("autocomplete", "tel");
    input.setAttribute("maxlength", "18");
    input.placeholder = "+7 (926) 923-29-29";
    if (!String(input.value || "").trim()) input.value = "+7 ";

    input.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var collapsed = start === end;
      if ((e.key === "Backspace" || e.key === "Delete") && collapsed && start < 3) {
        e.preventDefault();
        return;
      }
      if (e.key === "Backspace" && collapsed && start > 0 && !/\d/.test(input.value.charAt(start - 1))) {
        e.preventDefault();
        paint(phoneDigits(input.value).slice(0, -1));
        return;
      }
      var nav = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "Home", "End"];
      if (nav.indexOf(e.key) !== -1) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });

    function paint(raw) {
      var next = formatPhone(raw);
      input.value = next;
      if (typeof input.setSelectionRange === "function") {
        var pos = Math.max(3, next.length);
        input.setSelectionRange(pos, pos);
      }
    }

    input.addEventListener("input", function () {
      paint(input.value);
    });
    input.addEventListener("paste", function (e) {
      var clip = e.clipboardData || window.clipboardData;
      if (!clip) return;
      e.preventDefault();
      paint(clip.getData("text") || "");
    });
    input.addEventListener("focus", function () {
      if (!String(input.value || "").trim()) input.value = "+7 ";
      if (typeof input.setSelectionRange === "function" && input.selectionStart < 3) {
        var end = input.value.length;
        input.setSelectionRange(end, end);
      }
    });
  }

  document.querySelectorAll('input[name="phone"]').forEach(bindPhoneMask);

  var crumbs = document.querySelector(".crumbs");
  if (crumbs && !document.getElementById("geo-breadcrumbs")) {
    var items = [];
    var position = 1;
    crumbs.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var url = href;
      try { url = new URL(href, location.href).href; } catch (err) {}
      items.push({
        "@type": "ListItem",
        position: position,
        name: a.textContent.replace(/\s+/g, " ").trim(),
        item: url,
      });
      position += 1;
    });
    var currentName = "";
    crumbs.childNodes.forEach(function (node) {
      if (node.nodeType !== 3) return;
      var text = node.textContent.replace(/\//g, "").trim();
      if (text) currentName = text;
    });
    if (currentName) {
      var canon = document.querySelector('link[rel="canonical"]');
      items.push({
        "@type": "ListItem",
        position: position,
        name: currentName,
        item: canon ? canon.getAttribute("href") : location.href,
      });
    }
    if (items.length > 1) {
      var crumbScript = document.createElement("script");
      crumbScript.type = "application/ld+json";
      crumbScript.id = "geo-breadcrumbs";
      crumbScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      });
      document.head.appendChild(crumbScript);
    }
  }
})();
