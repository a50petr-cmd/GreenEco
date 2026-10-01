(function () {
  const KEY = "greeneco_admin_ok";
  const gate = document.getElementById("gate");
  const editor = document.getElementById("editor");
  const login = document.getElementById("login");

  function showEditor() {
    gate.hidden = true;
    editor.hidden = false;
    const overlay = window.GREENECO.getPrices() || {};
    const dateInput = document.getElementById("price-date");
    dateInput.value = window.GREENECO.priceDate();
    const table = document.getElementById("admin-table");
    table.innerHTML =
      "<thead><tr><th>Товар</th><th>₽/кг</th><th>₽/упак</th><th>₽/т</th><th>Объём</th></tr></thead><tbody>" +
      window.GREENECO.products
        .map(function (p) {
          const o = overlay[p.id] || {};
          return (
            "<tr data-id=\"" +
            p.id +
            "\"><td>" +
            p.name +
            "</td><td><input type=\"number\" name=\"kg\" value=\"" +
            (o.priceKg != null ? o.priceKg : p.priceKg) +
            "\"></td><td><input type=\"number\" name=\"pack\" value=\"" +
            (o.pricePack != null ? o.pricePack : p.pricePack) +
            "\"></td><td><input type=\"number\" name=\"ton\" value=\"" +
            (o.priceTon != null ? o.priceTon : p.priceTon) +
            "\"></td><td><input name=\"vol\" value=\"" +
            (o.volume || p.volume) +
            "\"></td></tr>"
          );
        })
        .join("") +
      "</tbody>";
  }

  if (sessionStorage.getItem(KEY) === "1") showEditor();

  login.addEventListener("submit", function (e) {
    e.preventDefault();
    const pin = new FormData(login).get("pin");
    if (String(pin) === "greeneco") {
      sessionStorage.setItem(KEY, "1");
      showEditor();
    } else {
      alert("Неверный код");
    }
  });

  document.getElementById("save").addEventListener("click", function () {
    const data = {};
    document.querySelectorAll("#admin-table tbody tr").forEach(function (tr) {
      data[tr.dataset.id] = {
        priceKg: Number(tr.querySelector('[name="kg"]').value),
        pricePack: Number(tr.querySelector('[name="pack"]').value),
        priceTon: Number(tr.querySelector('[name="ton"]').value),
        volume: tr.querySelector('[name="vol"]').value,
      };
    });
    localStorage.setItem(window.GREENECO.PRICE_KEY, JSON.stringify(data));
    localStorage.setItem(window.GREENECO.DATE_KEY, document.getElementById("price-date").value);
    document.getElementById("admin-msg").textContent = "Сохранено. Обновите страницы каталога и прайса.";
  });

  document.getElementById("reset").addEventListener("click", function () {
    localStorage.removeItem(window.GREENECO.PRICE_KEY);
    localStorage.removeItem(window.GREENECO.DATE_KEY);
    showEditor();
    document.getElementById("admin-msg").textContent = "Базовые цены восстановлены.";
  });
})();
