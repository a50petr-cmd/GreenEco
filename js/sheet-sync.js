(function () {
  var G = window.GREENECO;
  if (!G) return;

  G._catalogReady = false;

  G.whenCatalogReady = function (cb) {
    if (G._catalogReady) cb();
    else document.addEventListener("greeneco-catalog-ready", cb, { once: true });
  };

  G.refreshCatalog = function () {
    G.catalog = G.applyPrices(G.products);
    document.dispatchEvent(new CustomEvent("greeneco-catalog-updated"));
  };

  var PRODUCT_COLS = [
    { col: 2, id: "luk" },
    { col: 3, id: "kartofel" },
    { col: 4, id: "morkov" },
    { col: 5, id: "kapusta" },
  ];

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = "";
    var inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else inQuotes = false;
        } else field += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        if (row.some(function (cell) { return String(cell).trim(); })) rows.push(row);
        row = [];
      } else field += c;
    }
    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  function cell(rows, rowIdx, colIdx) {
    var r = rows[rowIdx];
    if (!r || colIdx >= r.length) return "";
    return String(r[colIdx] || "").trim();
  }

  function parsePrice(raw) {
    if (!raw) return NaN;
    var n = parseFloat(String(raw).replace(/\s/g, "").replace(",", "."));
    return isNaN(n) ? NaN : n;
  }

  function packWeightKg(packText) {
    var m = String(packText || "").match(/(\d+(?:[.,]\d+)?)\s*кг/i);
    if (!m) return 25;
    return parseFloat(m[1].replace(",", ".")) || 25;
  }

  function applySheetRows(rows) {
    if (rows.length < 11) return false;

    PRODUCT_COLS.forEach(function (spec) {
      var p = G.products.find(function (x) { return x.id === spec.id; });
      if (!p) return;

      var fullName = cell(rows, 1, spec.col);
      var packForWeight = cell(rows, 2, spec.col);
      var packExtra = cell(rows, 7, spec.col);
      if (packExtra) packForWeight = packForWeight ? packForWeight + " " + packExtra : packExtra;
      var shelf = cell(rows, 3, spec.col);
      var storage = cell(rows, 4, spec.col);
      var priceKg = parsePrice(cell(rows, 8, spec.col));

      if (fullName) {
        p.desc = fullName;
        var dot = fullName.indexOf(".");
        p.variety = dot > 0 ? fullName.slice(0, dot).trim() : fullName.slice(0, 120);
      }
      if (shelf) p.shelf = shelf;
      if (storage) p.storage = storage;
      if (!isNaN(priceKg)) {
        var w = packWeightKg(packForWeight || p.pack);
        p.priceKg = priceKg;
        p.pricePack = Math.round(priceKg * w);
        p.priceTon = Math.round(priceKg * 1000);
      }
    });

    return true;
  }

  function applyOfferCopy() {
    G.products.forEach(function (p) {
      if (p.priceOnRequest) p.volume = "объём по запросу";
      else {
        p.pack = "сетка 25 кг";
        p.volume = "от 20 т/день";
      }
    });
  }

  function finish() {
    applyOfferCopy();
    G._catalogReady = true;
    G.refreshCatalog();
    document.dispatchEvent(new Event("greeneco-catalog-ready"));
  }

  var url = G.catalogSheetUrl;
  if (!url) {
    finish();
    return;
  }

  fetch(url, { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("sheet");
      return res.text();
    })
    .then(function (text) {
      applySheetRows(parseCsv(text));
    })
    .catch(function () {})
    .finally(finish);
})();
