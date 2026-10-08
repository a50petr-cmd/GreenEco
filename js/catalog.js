(function () {
  const root = window.GREENECO.base != null ? window.GREENECO.base : (document.body.getAttribute("data-root") || "");

  function money(n) {
    return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
  }

  function asset(url) {
    if (!url || url.indexOf("http") === 0) return url;
    var v = window.GREENECO.assetVersion || "1";
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=" + v;
  }

  window.GREENECO.renderCards = function (el, list) {
    if (!el) return;
    el.innerHTML = list
      .map(function (p) {
        return (
          '<article class="product-card">' +
          '<img src="' + asset(p.image.indexOf("http") === 0 ? p.image : root + p.image) + '" alt="' + p.name + '" loading="lazy">' +
          '<div class="body"><span class="tag">' + p.categoryName + "</span>" +
          " <h3 style=\"margin:8px 0\"><a href=\"" + root + p.url + '">' + p.name + "</a></h3>" +
          '<p class="muted" style="min-height:44px">' + p.variety + "</p>" +
          (p.priceOnRequest
            ? '<p class="price">по запросу</p>'
            : '<p class="price">' + money(p.priceKg) + " <small>/ кг · опт</small></p>") +
          '<p class="muted" style="font-size:.8rem;margin:6px 0">Обновлено ' + window.GREENECO.priceDate() + "</p>" +
          '<button class="btn btn-dark btn-sm js-lead" type="button" data-product="' + p.name + '">Оставить заявку</button>' +
          "</div></article>"
        );
      })
      .join("");
    el.querySelectorAll(".js-lead").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const modal = document.getElementById("lead-modal");
        modal.querySelector('[name="product"]').value = btn.getAttribute("data-product");
        modal.classList.add("open");
      });
    });
  };

  window.GREENECO.money = money;

  window.GREENECO.renderTodayPrices = function (table) {
    if (!table) return;
    var list = window.GREENECO.catalog || [];
    table.innerHTML =
      "<thead><tr><th>Товар</th><th>Цена</th><th>Фасовка</th><th>Объём</th></tr></thead><tbody>" +
      list
        .map(function (p) {
          var price = p.priceOnRequest ? "по запросу" : money(p.priceKg) + " / кг";
          return (
            "<tr><td><a href=\"" +
            root +
            p.url +
            "\">" +
            p.name +
            "</a></td><td>" +
            price +
            "</td><td>" +
            (p.pack || "—") +
            "</td><td>" +
            (p.volume || "—") +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody>";
  };
})();
