(function(){
  function show(msg){
    var main = document.getElementById("main");
    if(!main) return;
    main.innerHTML =
      '<div class="card">' +
      '<div class="h2">Site error</div>' +
      '<div class="small" style="white-space:pre-wrap">' + msg + '</div>' +
      '<div class="small" style="margin-top:10px">Fix: hard refresh (Ctrl+F5). If still here, copy this message.</div>' +
      '</div>';
  }

  window.addEventListener("error", function(e){
    var where = (e.filename ? (" | " + e.filename + ":" + e.lineno) : "");
    show("JavaScript error: " + e.message + where);
  });

  window.addEventListener("unhandledrejection", function(e){
    var r = e.reason;
    var msg = (r && r.message) ? r.message : String(r);
    show("Promise rejection: " + msg);
  });

  // If nothing renders after 1.5s, show a hint
  setTimeout(function(){
    var top = document.getElementById("topbar");
    if(top && top.children.length === 0){
      show("Nothing rendered. Likely site.js didn't run OR data.js failed to load.\n\nNext: run these in PowerShell:\n(iwr https://sheeraz786-prog.github.io/data.js).StatusCode\n(iwr https://sheeraz786-prog.github.io/site.js).StatusCode");
    }
  }, 1500);
})();
