(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var I = window.PBCRUN_I18N;
    if (!I) return;

    var TARGET = new Date("2026-08-07T00:00:00-07:00").getTime();
    var currentLang = I.detectLang();
    var langBar = document.getElementById("lang-bar");
    var form = document.getElementById("invite-form");
    var statusEl = document.getElementById("form-status");
    var btn = document.getElementById("submit-btn");
    var card = document.getElementById("card");
    var consentPrivacy = document.getElementById("consent-privacy-link");
    var footerPrivacy = document.getElementById("footer-privacy");

    function setLang(code) {
      currentLang = I.applyDocumentLang(code);
      I.applyI18n(document, currentLang);
      I.updateLangBarPressed(langBar, currentLang);
      document.title = I.t(currentLang, "title");
      if (consentPrivacy) {
        consentPrivacy.textContent = I.t(currentLang, "consent_link");
        consentPrivacy.href = "/privacy?lang=" + encodeURIComponent(currentLang);
      }
      if (footerPrivacy) {
        footerPrivacy.href = "/privacy?lang=" + encodeURIComponent(currentLang);
      }
      // Rebuild consent label: body text + link
      var consentLabel = document.querySelector('label[for="consent"]');
      if (consentLabel) {
        var span = consentLabel.querySelector("[data-i18n='consent']");
        if (span) span.textContent = I.t(currentLang, "consent");
      }
    }

    I.buildLangBar(langBar, currentLang, setLang);
    setLang(currentLang);

    function pad(n) {
      n = Math.max(0, n | 0);
      return n < 10 ? "0" + n : String(n);
    }

    function tick() {
      var now = Date.now();
      var diff = Math.max(0, TARGET - now);
      var secs = Math.floor(diff / 1000);
      var days = Math.floor(secs / 86400);
      secs -= days * 86400;
      var hours = Math.floor(secs / 3600);
      secs -= hours * 3600;
      var mins = Math.floor(secs / 60);
      secs -= mins * 60;

      document.getElementById("cd-days").textContent = String(days);
      document.getElementById("cd-hours").textContent = pad(hours);
      document.getElementById("cd-mins").textContent = pad(mins);
      document.getElementById("cd-secs").textContent = pad(secs);

      var sr = document.getElementById("countdown-sr");
      if (sr) {
        // Update screen-reader summary ~ every minute only to reduce chatter
        var key = days + ":" + hours + ":" + mins;
        if (sr.getAttribute("data-key") !== key) {
          sr.setAttribute("data-key", key);
          sr.textContent =
            I.t(currentLang, "until") +
            ": " +
            days +
            " " +
            I.t(currentLang, "days") +
            ", " +
            hours +
            " " +
            I.t(currentLang, "hours") +
            ", " +
            mins +
            " " +
            I.t(currentLang, "mins");
        }
      }
    }

    tick();
    setInterval(tick, 1000);

    function setStatus(msg, kind) {
      statusEl.textContent = msg || "";
      statusEl.className = "status" + (kind ? " " + kind : "");
    }

    function getUtm(param) {
      try {
        return new URLSearchParams(window.location.search).get(param) || "";
      } catch (e) {
        return "";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.email.value || "").trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus(I.t(currentLang, "err_email"), "error");
        form.email.focus();
        return;
      }
      if (!form.consent.checked) {
        setStatus(I.t(currentLang, "err_consent"), "error");
        form.consent.focus();
        return;
      }

      btn.disabled = true;
      setStatus(I.t(currentLang, "sending"));

      var payload = {
        email: email,
        name: (form.name.value || "").trim(),
        attending: form.attending.value || "",
        platform: form.platform.value || "both",
        consent: true,
        language: currentLang,
        source: getUtm("utm_source") || "landing",
        utm_source: getUtm("utm_source"),
        utm_medium: getUtm("utm_medium"),
        utm_campaign: getUtm("utm_campaign"),
        referrer: document.referrer || "",
        page_url: window.location.href,
        website: form.website ? form.website.value : ""
      };

      fetch("/api/subscribe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok && result.body && result.body.ok) {
            card.classList.add("is-success");
            setStatus("");
            try {
              localStorage.setItem("pbcrun_invite_requested", email);
            } catch (e) {}
            var success = document.getElementById("success-block");
            if (success) success.focus && success.setAttribute("tabindex", "-1");
            return;
          }
          var msg = (result.body && result.body.error) || I.t(currentLang, "err_generic");
          setStatus(msg, "error");
          btn.disabled = false;
        })
        .catch(function () {
          setStatus(I.t(currentLang, "err_network"), "error");
          btn.disabled = false;
        });
    });

    try {
      if (localStorage.getItem("pbcrun_invite_requested")) {
        card.classList.add("is-success");
      }
    } catch (e) {}
  });
})();
