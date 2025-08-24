
const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

// Year
$('#year').textContent = new Date().getFullYear();

// Theme toggle (persist)
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const saved = localStorage.getItem('theme');
if(saved==='light'){ root.classList.add('light'); }
themeToggle.addEventListener('click',()=>{
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Mobile menu toggle
$('#menuToggle').addEventListener('click',()=>{
  const m = $('.menu');
  m.style.display = m.style.display==='flex' ? 'none' : 'flex';
});

// Toasts
const toast = $('#toast');
$$('[data-toast]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    toast.textContent = btn.dataset.toast;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 3000);
  });
});

// Lightbox
const lightbox = $('#lightbox');
const lightImg  = $('#lightbox img');
const lightClose= $('#lightbox .close');
$$('.gallery a').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    lightImg.src = a.href;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
lightClose.addEventListener('click',()=>{
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
});
lightbox.addEventListener('click',(e)=>{
  if(e.target===lightbox){ lightClose.click(); }
});

// Blog render
async function renderBlog(){
  try{
    const res = await fetch('data/blog.json');
    const posts = await res.json();
    const list = $('#blogList');
    const tpl = $('#blogItemTpl');
    const search = $('#blogSearch');
    function draw(items){
      list.innerHTML='';
      items.forEach(p=>{
        const node = tpl.content.cloneNode(true);
        $('.b-title',node).textContent = p.title;
        $('.b-date',node).textContent = new Date(p.date).toLocaleDateString('az-AZ');
        $('.b-excerpt',node).textContent = p.excerpt;
        $('.read-more',node).addEventListener('click',()=>{
          const body = `${p.content}\n\nTarix: ${p.date}`;
          openModal(p.title, body);
        });
        list.appendChild(node);
      });
    }
    draw(posts);
    search.addEventListener('input',()=>{
      const q = search.value.toLowerCase();
      const filtered = posts.filter(p => (p.title+p.excerpt+p.content).toLowerCase().includes(q));
      draw(filtered);
    });
  }catch(e){
    console.error('Blog load error', e);
  }
}
renderBlog();

// Simple modal using toast styles
function openModal(title, body){
  const box = document.createElement('div');
  box.style.position='fixed'; box.style.inset='0'; box.style.background='rgba(0,0,0,.6)';
  box.style.display='grid'; box.style.placeItems='center'; box.style.zIndex='70';
  const card = document.createElement('div');
  card.className='card'; card.style.maxWidth='720px'; card.style.padding='22px';
  const h = document.createElement('h3'); h.textContent = title;
  const p = document.createElement('p'); p.textContent = body;
  const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent='Bağla';
  btn.addEventListener('click',()=> document.body.removeChild(box));
  card.append(h,p,btn); box.append(card); document.body.appendChild(box);
}

// Build GitHub Issue link based on current repo (best-effort)
(function setIssueLink(){
  const a = $('#issueBtn');
  // If hosted on GitHub Pages: username.github.io/repo or username.github.io
  const host = location.host;
  let repoPath = location.pathname.split('/').filter(Boolean)[0] || '';
  if(host.includes('github.io')){
    const user = host.split('.')[0];
    const repo = repoPath || user; // if root site, repo == user.github.io
    a.href = `https://github.com/${user}/${repo}/issues/new?title=Əlaqə&body=Salam!`;
  }else{
    a.href = 'https://github.com/new';
  }
})();

// Smooth scroll
$$('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
