(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var I = window.PBCRUN_I18N;
    if (!I) return;

    var currentLang = I.detectLang();
    var langBar = document.getElementById("lang-bar");
    var article = document.getElementById("privacy-content");
    var back = document.getElementById("back-link");
    var home = document.getElementById("footer-home");

    function renderPrivacy(lang) {
      if (!article) return;
      var h1 = document.createElement("h1");
      h1.id = "privacy-h1";
      h1.textContent = I.t(lang, "privacy_title");

      article.innerHTML = "";
      article.appendChild(h1);

      var lead = document.createElement("p");
      lead.className = "lead";
      lead.textContent = I.t(lang, "privacy_intro");
      article.appendChild(lead);

      for (var i = 1; i <= 14; i++) {
        var h2 = document.createElement("h2");
        h2.textContent = I.t(lang, "privacy_s" + i + "_title");
        var p = document.createElement("p");
        p.textContent = I.t(lang, "privacy_s" + i + "_body");
        article.appendChild(h2);
        article.appendChild(p);
      }
    }

    function setLang(code) {
      currentLang = I.applyDocumentLang(code);
      I.applyI18n(document, currentLang);
      I.updateLangBarPressed(langBar, currentLang);
      document.title = "PBCRun — " + I.t(currentLang, "privacy_title");
      renderPrivacy(currentLang);
      var href = "/?lang=" + encodeURIComponent(currentLang);
      if (back) {
        back.href = href;
        back.textContent = "← " + I.t(currentLang, "privacy_back");
      }
      if (home) home.href = href;
    }

    I.buildLangBar(langBar, currentLang, setLang);
    setLang(currentLang);
  });
})();
