// Pinta el catálogo a partir de datos/tienda.json.
// Para añadir o cambiar productos solo hay que editar ese JSON.

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });

function enlaceContacto(tienda, texto) {
  if (tienda.whatsapp) {
    return `https://wa.me/${tienda.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
  }
  if (tienda.instagram) {
    return `https://ig.me/m/${tienda.instagram.replace(/^@/, "")}`;
  }
  return "#";
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

function tarjeta(p, tienda) {
  const texto = tienda.mensaje_pedido.replace("{producto}", p.nombre);
  const colores = (p.colores || []).map(c => `<span>${escapar(c)}</span>`).join("");
  return `
    <article class="tarjeta">
      <div class="foto">
        <img src="${escapar(p.foto)}" alt="${escapar(p.nombre)} de crochet" loading="lazy">
        ${p.personalizable ? '<span class="sello">Personalizable</span>' : ""}
      </div>
      <div class="cuerpo">
        <h3>${escapar(p.nombre)}</h3>
        <div class="precio">${p.desde ? "<small>desde</small> " : ""}${euros.format(p.precio)}</div>
        <p>${escapar(p.descripcion)}</p>
        ${colores ? `<div class="colores">${colores}</div>` : ""}
        <a class="boton" href="${enlaceContacto(tienda, texto)}" target="_blank" rel="noopener">Lo quiero</a>
      </div>
    </article>`;
}

function pintar(tienda, categoria) {
  const rejilla = document.querySelector(".rejilla");
  const lista = tienda.productos
    .filter(p => categoria === "Todo" || p.categoria === categoria)
    .sort((a, b) => (b.destacado === true) - (a.destacado === true));
  rejilla.innerHTML = lista.map(p => tarjeta(p, tienda)).join("") ||
    "<p>Pronto habrá novedades en esta categoría.</p>";
}

function filtros(tienda) {
  const caja = document.querySelector(".filtros");
  ["Todo", ...tienda.categorias].forEach((cat, i) => {
    const b = document.createElement("button");
    b.textContent = cat;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.addEventListener("click", () => {
      caja.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", "false"));
      b.setAttribute("aria-selected", "true");
      pintar(tienda, cat);
    });
    caja.appendChild(b);
  });
}

function textosGenerales(tienda) {
  document.title = `${tienda.marca} · Flores de crochet hechas a mano`;
  document.querySelectorAll("[data-marca]").forEach(e => (e.textContent = tienda.marca));
  document.querySelectorAll("[data-ciudad]").forEach(e => (e.textContent = tienda.ciudad));
  document.querySelectorAll("[data-lema]").forEach(e => (e.textContent = tienda.lema));
  document.querySelectorAll('[data-contacto="encargo"]').forEach(a => {
    a.href = enlaceContacto(tienda, tienda.mensaje_encargo);
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll('[data-contacto="instagram"]').forEach(a => {
    if (tienda.instagram) {
      a.href = `https://instagram.com/${tienda.instagram.replace(/^@/, "")}`;
      a.target = "_blank"; a.rel = "noopener";
    } else {
      (a.closest("[data-solo-instagram]") || a).remove();
    }
  });
}

fetch("datos/tienda.json")
  .then(r => r.json())
  .then(tienda => {
    textosGenerales(tienda);
    filtros(tienda);
    pintar(tienda, "Todo");
  })
  .catch(() => {
    document.querySelector(".rejilla").innerHTML = "<p>No se ha podido cargar el catálogo.</p>";
  });
