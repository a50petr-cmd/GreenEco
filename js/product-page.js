(function () {
  var id = document.body.getAttribute("data-product");
  if (!id) return;

  function paint() {
    var p = window.GREENECO.catalog.find(function (x) { return x.id === id; });
    if (!p) return;
    var kg = document.getElementById("p-kg");
    var pack = document.getElementById("p-pack");
    var ton = document.getElementById("p-ton");
    var vol = document.getElementById("p-vol");
    var packName = document.getElementById("p-pack-name");
    if (packName) packName.textContent = p.pack || "";
    if (p.priceOnRequest) {
      if (kg) kg.textContent = "по запросу";
      if (pack) pack.textContent = "по запросу";
      if (ton) ton.textContent = "по запросу";
    } else {
      if (kg) kg.textContent = window.GREENECO.money(p.priceKg);
      if (pack) pack.textContent = window.GREENECO.money(p.pricePack);
      if (ton) ton.textContent = window.GREENECO.money(p.priceTon);
    }
    if (vol) vol.textContent = p.volume;

    var root = window.GREENECO.base || "";
    var imageUrl = p.image || "";
    var pageUrl = p.url || "";
    try {
      if (imageUrl && imageUrl.indexOf("http") !== 0) imageUrl = new URL(root + imageUrl, location.href).href;
      if (pageUrl && pageUrl.indexOf("http") !== 0) pageUrl = new URL(root + pageUrl, location.href).href;
    } catch (err) {}
    var productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      description: (document.querySelector('meta[name="description"]') || {}).content || p.desc || p.name,
      image: imageUrl,
      brand: { "@type": "Brand", name: window.GREENECO.company.brand },
      category: p.categoryName,
    };
    if (!p.priceOnRequest && p.priceKg) {
      productLd.offers = {
        "@type": "Offer",
        url: pageUrl || location.href,
        priceCurrency: "RUB",
        price: String(p.priceKg),
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(p.priceKg),
          priceCurrency: "RUB",
          unitText: "кг",
        },
      };
    }
    var ld = document.getElementById("geo-product");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "geo-product";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(productLd);
  }

  window.GREENECO.whenCatalogReady(paint);
  document.addEventListener("greeneco-catalog-updated", paint);
})();
