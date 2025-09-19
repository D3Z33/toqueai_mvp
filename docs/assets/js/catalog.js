
function groupBy(arr, key){ return arr.reduce((acc,cur)=>((acc[cur[key]]=(acc[cur[key]]||[]).concat(cur)),acc),{}); }
function getParam(name){ const u = new URL(location.href); return u.searchParams.get(name); }
async function boot(){
  const res = await fetch('../data/products.json'); const data = await res.json();
  const q = document.getElementById('q'); const content = document.getElementById('content');
  const brandParam = getParam('brand');
  const byBrand = groupBy(data, 'car_brand');
  const brands = Object.keys(byBrand).sort();
  function renderGrouped(map, onlyBrand){
    content.innerHTML='';
    (onlyBrand ? [onlyBrand] : brands).forEach(brand=>{
      const list = map[brand]||[];
      if(!list.length) return;
      const sec = document.createElement('section'); sec.className='brand-group'; sec.id=brand;
      sec.innerHTML = `<h2 class="section-title">${brand}</h2><div class="grid"></div>`;
      const grid = sec.querySelector('.grid');
      list.forEach(p=>{
        const card = document.createElement('div'); card.className='item';
        card.innerHTML = `
          <img src="../assets/img/produtos/${p.code}.jpg" alt="${p.name}">
          <div class="meta">
            <div style="color:#8bb9ff;font-family:ui-monospace">${p.code}</div>
            <div style="font-weight:800;margin:6px 0 2px">${p.name}</div>
            <div style="color:#9cb0d0;font-size:14px">Categoria: ${p.category}</div>
            <div style="margin-top:10px"><a class="btn" href="../p/${p.code}.html">Abrir peça</a></div>
          </div>`;
        grid.appendChild(card);
      });
      content.appendChild(sec);
    });
    if(onlyBrand){ document.getElementById(onlyBrand)?.scrollIntoView({behavior:'smooth'}); }
  }
  function renderFlat(items){
    content.innerHTML = '<section class="brand-group"><h2 class="section-title">Resultados</h2><div class="grid" id="flat"></div></section>';
    const grid = document.getElementById('flat');
    items.forEach(p=>{
      const card = document.createElement('div'); card.className='item';
      card.innerHTML = `
        <img src="../assets/img/produtos/${p.code}.jpg" alt="${p.name}">
        <div class="meta">
          <div style="color:#8bb9ff;font-family:ui-monospace">${p.code}</div>
          <div style="font-weight:800;margin:6px 0 2px">${p.name}</div>
          <div style="color:#9cb0d0;font-size:14px">Carro: ${p.car_brand} · Categoria: ${p.category}</div>
          <div style="margin-top:10px"><a class="btn" href="../p/${p.code}.html">Abrir peça</a></div>
        </div>`;
      grid.appendChild(card);
    });
    if(items.length===0) grid.innerHTML = '<div class="card">Nada encontrado.</div>';
  }
  renderGrouped(byBrand, brandParam);
  function onSearch(){
    const t = q.value.toLowerCase().trim();
    if(!t){ renderGrouped(byBrand, brandParam); return; }
    const flat = data.filter(p =>
      p.code.toLowerCase().includes(t)||p.name.toLowerCase().includes(t)||
      p.car_brand.toLowerCase().includes(t)||p.category.toLowerCase().includes(t)||
      p.vehicle.toLowerCase().includes(t)||p.brand.toLowerCase().includes(t)
    );
    renderFlat(flat);
  }
  q.addEventListener('input', onSearch);
}
window.addEventListener('DOMContentLoaded', boot);
