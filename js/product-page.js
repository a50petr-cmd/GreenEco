(function () {
  var id = document.body.getAttribute("data-product");
  if (!id) return;
  var p = window.GREENECO.catalog.find(function (x) { return x.id === id; });
  if (!p) return;
  var kg = document.getElementById("p-kg");
  var pack = document.getElementById("p-pack");
  var ton = document.getElementById("p-ton");
  var vol = document.getElementById("p-vol");
  if (kg) kg.textContent = window.GREENECO.money(p.priceKg);
  if (pack) pack.textContent = window.GREENECO.money(p.pricePack);
  if (ton) ton.textContent = window.GREENECO.money(p.priceTon);
  if (vol) vol.textContent = p.volume;
})();
