(function () {
  const money = window.GREENECO.money;
  const table = document.getElementById("price-table");

  function renderTable() {
    if (!table) return;
    const products = window.GREENECO.catalog || window.GREENECO.applyPrices(window.GREENECO.products);
    table.innerHTML =
      "<thead><tr><th>Товар</th><th>Цена, ₽/кг</th><th>Фасовка</th><th>Отгрузка в день</th></tr></thead><tbody>" +
      products
        .map(function (p) {
          var price = p.priceOnRequest ? "по запросу" : money(p.priceKg);
          return (
            "<tr><td><a href=\"" +
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
  }

  function csv() {
    const products = window.GREENECO.catalog || window.GREENECO.applyPrices(window.GREENECO.products);
    const rows = [["Товар", "Цена кг", "Фасовка", "Отгрузка в день", "Дата"]];
    const date = window.GREENECO.priceDate();
    products.forEach(function (p) {
      rows.push([
        p.name,
        p.priceOnRequest ? "по запросу" : p.priceKg,
        p.pack || "",
        p.volume || "",
        date,
      ]);
    });
    const blob = new Blob(["\ufeff" + rows.map((r) => r.join(";")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GreenEco-price-" + date.replace(/\./g, "-") + ".csv";
    a.click();
  }

  if (window.GREENECO.whenCatalogReady) {
    window.GREENECO.whenCatalogReady(renderTable);
    document.addEventListener("greeneco-catalog-updated", renderTable);
  } else renderTable();

  const dl = document.getElementById("dl-csv");
  if (dl) dl.addEventListener("click", csv);
  const pdf = document.getElementById("dl-pdf");
  if (pdf) pdf.addEventListener("click", function () { window.print(); });
})();
