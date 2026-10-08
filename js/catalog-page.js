(function () {
  const box = document.getElementById("catalog");
  if (!box) return;
  const cat = box.dataset.category || "";
  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value : "";
  }
  function apply() {
    const fCat = val("f-cat") || cat;
    const season = val("f-season");
    const cal = val("f-cal");
    const pack = val("f-pack");
    const sort = val("f-sort") || "name";
    var rows = (window.GREENECO.catalog || []).filter(function (p) {
      if (cat && p.category !== cat) return false;
      if (!cat && fCat && p.category !== fCat) return false;
      if (season && (p.seasonKeys || []).indexOf(season) === -1) return false;
      if (cal && (p.caliberKeys || []).indexOf(cal) === -1) return false;
      if (pack && (p.packKeys || []).indexOf(pack) === -1) return false;
      return true;
    });
    function priceOf(p) {
      if (!p || p.priceOnRequest || p.priceKg == null) return null;
      return p.priceKg;
    }
    if (sort === "price-asc" || sort === "price-desc") {
      rows.sort(function (a, b) {
        var pa = priceOf(a);
        var pb = priceOf(b);
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1;
        if (pb == null) return -1;
        return sort === "price-asc" ? pa - pb : pb - pa;
      });
    }
    if (sort === "name") rows.sort(function (a, b) { return a.name.localeCompare(b.name, "ru"); });
    window.GREENECO.renderCards(box, rows);
  }
  ["f-cat", "f-season", "f-cal", "f-pack", "f-sort"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("change", apply);
  });
  window.GREENECO.whenCatalogReady(apply);
  document.addEventListener("greeneco-catalog-updated", apply);
})();
