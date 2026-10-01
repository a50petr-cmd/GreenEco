(function () {
  const products = window.GREENECO.applyPrices(window.GREENECO.products);
  const money = window.GREENECO.money;
  const table = document.getElementById("price-table");
  if (table) {
    table.innerHTML =
      "<thead><tr><th>Товар</th><th>Категория</th><th>Опт, ₽/кг</th><th>Мелкий опт, ₽/кг</th><th>Розница, ₽/кг</th><th>Опт, ₽/т</th><th>Объём</th></tr></thead><tbody>" +
      products
        .map(function (p) {
          const small = Math.round(p.priceKg * 1.12);
          const retail = Math.round(p.priceKg * 1.35);
          return (
            "<tr><td><a href=\"" +
            p.url +
            "\">" +
            p.name +
            "</a></td><td>" +
            p.categoryName +
            "</td><td>" +
            money(p.priceKg) +
            "</td><td>" +
            money(small) +
            "</td><td>" +
            money(retail) +
            "</td><td>" +
            money(p.priceTon) +
            "</td><td>" +
            p.volume +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody>";
  }

  function csv() {
    const rows = [["Товар", "Категория", "Опт кг", "Мелкий опт кг", "Розница кг", "Опт тонна", "Объём", "Дата"]];
    const date = window.GREENECO.priceDate();
    products.forEach(function (p) {
      rows.push([
        p.name,
        p.categoryName,
        p.priceKg,
        Math.round(p.priceKg * 1.12),
        Math.round(p.priceKg * 1.35),
        p.priceTon,
        p.volume,
        date,
      ]);
    });
    const blob = new Blob(["\ufeff" + rows.map((r) => r.join(";")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GreenEco-price-" + date.replace(/\./g, "-") + ".csv";
    a.click();
  }

  const dl = document.getElementById("dl-csv");
  if (dl) dl.addEventListener("click", csv);
  const pdf = document.getElementById("dl-pdf");
  if (pdf) pdf.addEventListener("click", function () { window.print(); });
})();
