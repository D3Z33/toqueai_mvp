
async function boot(){
  const q = document.getElementById('q-landing');
  const grid = document.getElementById('grid-landing');
  const res = await fetch('data/products.json'); const data = await res.json();
  function render(items){
    grid.innerHTML='';
    for(const p of items.slice(0,8)){
      const div = document.createElement('div'); div.className='item';
      div.innerHTML = `
        <img src="assets/img/produtos/${p.code}.jpg" alt="${p.name}">
        <div class="meta">
          <div style="color:#8bb9ff;font-family:ui-monospace">${p.code}</div>
          <div style="font-weight:800;margin:6px 0 2px">${p.name}</div>
          <div style="color:#9cb0d0;font-size:14px">Carro: ${p.car_brand} · Categoria: ${p.category}</div>
          <div style="margin-top:10px"><a class="btn" href="p/${p.code}.html">Abrir peça</a></div>
        </div>`;
      grid.appendChild(div);
    }
    if(items.length===0) grid.innerHTML = '<div class="card">Nada encontrado.</div>';
  }
  function filter(){
    const t = (q.value||'').toLowerCase();
    const filtered = data.filter(p => 
      p.code.toLowerCase().includes(t)||p.name.toLowerCase().includes(t)||
      p.car_brand.toLowerCase().includes(t)||p.vehicle.toLowerCase().includes(t)||
      p.category.toLowerCase().includes(t)||p.brand.toLowerCase().includes(t)
    );
    render(filtered);
  }
  q.addEventListener('input', filter);
  render(data);
}
window.addEventListener('DOMContentLoaded', boot);
