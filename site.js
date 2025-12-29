(function(){
  const PAGES = [
    { href:"index.html", label:"Home" },
    { href:"publications.html", label:"Publications" },
    { href:"experience.html", label:"Experience" }
  ];

  function el(tag, attrs, html){
    const x = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(k => x.setAttribute(k, attrs[k]));
    if(html) x.innerHTML = html;
    return x;
  }

  function renderNav(activeHref){
    const top = document.getElementById("topbar");
    if(!top) return;
    top.innerHTML = "";
    const left = el("div", {class:"brand"}, SITE.person.name);
    const nav  = el("div", {class:"nav"});
    PAGES.forEach(function(p){
      const cls = (p.href === activeHref) ? "active" : "";
      const a = el("a", {href:p.href, class:cls}, p.label);
      nav.appendChild(a);
    });
    top.appendChild(left);
    top.appendChild(nav);
  }

  function renderSidebar(){
    const sb = document.getElementById("sidebar");
    if(!sb) return;
    sb.innerHTML = "";

    const card = el("div", {class:"card"});
    const avatar = el("div", {class:"avatar"}, "Photo");
    card.appendChild(avatar);

    card.appendChild(el("div", {class:"h1"}, SITE.person.name));
    card.appendChild(el("div", {class:"small"}, SITE.person.role + ", " + SITE.person.org));
    card.appendChild(el("div", {class:"small"}, SITE.tagline || ""));

    card.appendChild(el("hr", {class:"hr"}));

    const links = el("div", {class:"small"});
    links.innerHTML =
      "<div><b>Email:</b> " + SITE.person.email + "</div>" +
      "<div style=\"margin-top:8px\">" +
      "<a target=\"_blank\" rel=\"noopener\" href=\"" + SITE.person.scholar + "\">Google Scholar</a> &nbsp;|&nbsp; " +
      "<a target=\"_blank\" rel=\"noopener\" href=\"" + SITE.person.linkedin + "\">LinkedIn</a> &nbsp;|&nbsp; " +
      "<a target=\"_blank\" rel=\"noopener\" href=\"" + SITE.person.github + "\">GitHub</a> &nbsp;|&nbsp; " +
      "<a target=\"_blank\" rel=\"noopener\" href=\"" + SITE.person.cv + "\">CV</a>" +
      "</div>";
    card.appendChild(links);

    const chips = el("div", {class:"chips"});
    const kws = (SITE.sections && SITE.sections.keywords) ? SITE.sections.keywords : [];
    kws.slice(0,10).forEach(function(k){ chips.appendChild(el("span",{class:"chip"}, k)); });
    card.appendChild(chips);

    sb.appendChild(card);
  }

  function pubCard(p){
    const wrap = el("div", {class:"pub"});
    const cover = el("div", {class:"cover"});
    if(p.cover){
      cover.style.backgroundImage = "url(" + p.cover + ")";
      cover.style.backgroundSize = "cover";
      cover.style.backgroundPosition = "center";
    }
    const body = el("div");

    body.appendChild(el("div", {class:"pubtitle"}, p.title));
    body.appendChild(el("div", {class:"pmeta"}, p.authors + "<br><b>" + p.venue + "</b>, " + p.year + " • " + p.type));

    const tags = (p.tags || []).map(function(t){ return "<span class=\"chip\">" + t + "</span>"; }).join(" ");
    body.appendChild(el("div", {class:"chips"}, tags));

    const L = p.links || {};
    const linkParts = [];
    if(L.pdf && L.pdf !== "#") linkParts.push("<a target=\"_blank\" rel=\"noopener\" href=\"" + L.pdf + "\">PDF</a>");
    if(L.doi && L.doi !== "#") linkParts.push("<a target=\"_blank\" rel=\"noopener\" href=\"" + L.doi + "\">DOI</a>");
    if(L.code) linkParts.push("<a target=\"_blank\" rel=\"noopener\" href=\"" + L.code + "\">Code</a>");
    body.appendChild(el("div", {class:"plinks small"}, linkParts.join(" ")));

    wrap.appendChild(cover);
    wrap.appendChild(body);
    return wrap;
  }

  function renderHome(){
    const main = document.getElementById("main");
    if(!main) return;
    main.innerHTML = "";

    main.appendChild(el("div",{class:"h2"},"About"));
    (SITE.bio || []).forEach(function(line){ main.appendChild(el("p",{}, line)); });

    main.appendChild(el("div",{class:"h2"},"Highlights"));
    const ul = el("ul",{class:"list"});
    (SITE.highlights || []).forEach(function(h){ ul.appendChild(el("li",{}, h)); });
    main.appendChild(ul);

    main.appendChild(el("div",{class:"h2"},"Education / Training"));
    const edu = el("ul",{class:"list"});
    (SITE.education || []).forEach(function(e){
      edu.appendChild(el("li",{}, "<b>" + e.inst + "</b> — " + e.degree + " — " + e.years + " — " + e.where));
    });
    main.appendChild(edu);

    main.appendChild(el("div",{class:"h2"},"Selected Publications"));
    (SITE.publications || []).filter(function(x){return x.selected;}).slice(0,3)
      .forEach(function(p){ main.appendChild(pubCard(p)); });

    main.appendChild(el("div",{class:"footer"},"© " + (new Date()).getFullYear() + " " + SITE.person.name + " • GitHub Pages"));
  }

  function renderExperience(){
    const main = document.getElementById("main");
    if(!main) return;
    main.innerHTML = "";

    main.appendChild(el("div",{class:"h2"},"Professional Experience"));
    const ul = el("ul",{class:"list"});
    (SITE.experience || []).forEach(function(x){
      const details = (x.details || []).map(function(d){ return "<div class=\"small\">• " + d + "</div>"; }).join("");
      ul.appendChild(el("li",{}, "<b>" + x.when + "</b> — <b>" + x.title + "</b>, " + x.org + " (" + x.where + ")" + (details ? "<div style=\"margin-top:6px\">" + details + "</div>" : "")));
    });
    main.appendChild(ul);

    main.appendChild(el("div",{class:"h2"},"Awards"));
    const aw = el("ul",{class:"list"});
    (SITE.awards || []).forEach(function(a){
      aw.appendChild(el("li",{}, "<b>" + a.year + "</b> — " + a.name + " — <span class=\"small\">" + (a.note || "") + "</span>"));
    });
    main.appendChild(aw);

    main.appendChild(el("div",{class:"footer"},"Last updated: " + (new Date()).toISOString().slice(0,10)));
  }

  function renderPublications(){
    const main = document.getElementById("main");
    if(!main) return;
    main.innerHTML = "";

    main.appendChild(el("div",{class:"h2"},"Publications"));
    main.appendChild(el("div",{class:"small"},"Full list: <a target=\"_blank\" rel=\"noopener\" href=\"" + SITE.person.scholar + "\">Google Scholar</a>"));

    const filters = el("div",{class:"filters"});
    const btnSel = el("button",{class:"btn active", type:"button"},"Selected");
    const btnYr  = el("button",{class:"btn", type:"button"},"By year");
    const btnTag = el("button",{class:"btn", type:"button"},"By topic");
    [btnSel,btnYr,btnTag].forEach(function(b){ filters.appendChild(b); });
    main.appendChild(filters);

    const out = el("div",{id:"pubOut"});
    main.appendChild(out);

    function setActive(activeBtn){
      [btnSel,btnYr,btnTag].forEach(function(b){ b.classList.remove("active"); });
      activeBtn.classList.add("active");
    }

    function renderSelected(){
      out.innerHTML = "";
      (SITE.publications || []).filter(function(p){return p.selected;})
        .sort(function(a,b){return b.year-a.year;})
        .forEach(function(p){ out.appendChild(pubCard(p)); });
    }

    function renderByYear(){
      out.innerHTML = "";
      const yrs = Array.from(new Set((SITE.publications || []).map(function(p){return p.year;}))).sort(function(a,b){return b-a;});
      yrs.forEach(function(y){
        out.appendChild(el("div",{class:"h2"}, String(y)));
        (SITE.publications || []).filter(function(p){return p.year===y;}).forEach(function(p){ out.appendChild(pubCard(p)); });
      });
    }

    function renderByTopic(){
      out.innerHTML = "";
      const tagMap = new Map();
      (SITE.publications || []).forEach(function(p){
        (p.tags || []).forEach(function(t){
          if(!tagMap.has(t)) tagMap.set(t, []);
          tagMap.get(t).push(p);
        });
      });
      Array.from(tagMap.keys()).sort().forEach(function(t){
        out.appendChild(el("div",{class:"h2"}, t));
        tagMap.get(t).sort(function(a,b){return b.year-a.year;}).forEach(function(p){ out.appendChild(pubCard(p)); });
      });
    }

    btnSel.onclick = function(){ setActive(btnSel); renderSelected(); };
    btnYr.onclick  = function(){ setActive(btnYr);  renderByYear(); };
    btnTag.onclick = function(){ setActive(btnTag); renderByTopic(); };

    renderSelected();
    main.appendChild(el("div",{class:"footer"},"Tip: edit publications only in <b>data.js</b>."));
  }

  document.addEventListener("DOMContentLoaded", function(){
    const mode = document.body.getAttribute("data-page") || "home";
    const active = (mode==="home") ? "index.html" : (mode==="pubs") ? "publications.html" : "experience.html";
    renderNav(active);
    renderSidebar();
    if(mode==="home") renderHome();
    if(mode==="pubs") renderPublications();
    if(mode==="exp")  renderExperience();
  });
})();
