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
    var enterForm = document.getElementById("enter-form");
    var inviteForm = document.getElementById("invite-form");
    var enterFields = document.getElementById("enter-fields");
    var requestFields = document.getElementById("request-fields");
    var successBlock = document.getElementById("success-block");
    var card = document.getElementById("card");
    var enterStatus = document.getElementById("enter-status");
    var formStatus = document.getElementById("form-status");
    var enterBtn = document.getElementById("enter-btn");
    var submitBtn = document.getElementById("submit-btn");
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
      var consentLabel = document.querySelector('label[for="consent"]');
      if (consentLabel) {
        var span = consentLabel.querySelector("[data-i18n='consent']");
        if (span) span.textContent = I.t(currentLang, "consent");
      }
    }

    I.buildLangBar(langBar, currentLang, setLang);
    setLang(currentLang);

    function showEnter() {
      card.classList.remove("is-success");
      if (enterFields) {
        enterFields.hidden = false;
        enterFields.classList.remove("is-hidden");
      }
      if (requestFields) {
        requestFields.hidden = true;
        requestFields.classList.add("is-hidden");
      }
      if (successBlock) {
        successBlock.hidden = true;
        successBlock.classList.add("is-hidden");
      }
      var email = document.getElementById("enter-email");
      if (email) email.focus();
    }

    function showRequest() {
      card.classList.remove("is-success");
      if (enterFields) {
        enterFields.hidden = true;
        enterFields.classList.add("is-hidden");
      }
      if (requestFields) {
        requestFields.hidden = false;
        requestFields.classList.remove("is-hidden");
      }
      if (successBlock) {
        successBlock.hidden = true;
        successBlock.classList.add("is-hidden");
      }
      var email = document.getElementById("email");
      if (email) email.focus();
    }

    function showSuccess() {
      if (enterFields) {
        enterFields.hidden = true;
        enterFields.classList.add("is-hidden");
      }
      if (requestFields) {
        requestFields.hidden = true;
        requestFields.classList.add("is-hidden");
      }
      if (successBlock) {
        successBlock.hidden = false;
        successBlock.classList.remove("is-hidden");
      }
      card.classList.add("is-success");
    }

    var showRequestBtn = document.getElementById("show-request");
    var showEnterBtn = document.getElementById("show-enter");
    var successBack = document.getElementById("success-back");
    if (showRequestBtn) showRequestBtn.addEventListener("click", showRequest);
    if (showEnterBtn) showEnterBtn.addEventListener("click", showEnter);
    if (successBack) successBack.addEventListener("click", showEnter);

    try {
      if (new URLSearchParams(window.location.search).get("need_code") === "1") {
        showEnter();
      }
    } catch (e) {}

    // If already has access, offer quick path
    try {
      if (localStorage.getItem("pbcrun_access")) {
        // stay on landing; they can re-enter or go to /app manually
      }
    } catch (e) {}

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

    function setStatus(el, msg, kind) {
      if (!el) return;
      el.textContent = msg || "";
      el.className = "status" + (kind ? " " + kind : "");
    }

    function getUtm(param) {
      try {
        return new URLSearchParams(window.location.search).get(param) || "";
      } catch (e) {
        return "";
      }
    }

    // --- Enter with code ---
    if (enterForm) {
      enterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = (enterForm.email.value || "").trim();
        var code = (enterForm.code.value || "").trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setStatus(enterStatus, I.t(currentLang, "err_email"), "error");
          enterForm.email.focus();
          return;
        }
        if (!code) {
          setStatus(enterStatus, I.t(currentLang, "err_code"), "error");
          enterForm.code.focus();
          return;
        }

        enterBtn.disabled = true;
        setStatus(enterStatus, I.t(currentLang, "entering") || I.t(currentLang, "sending"));

        fetch("/api/redeem", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            code: code,
            language: currentLang,
            website: enterForm.website ? enterForm.website.value : ""
          })
        })
          .then(function (res) {
            return res.json().then(function (body) {
              return { ok: res.ok, status: res.status, body: body };
            });
          })
          .then(function (result) {
            if (result.ok && result.body && result.body.ok) {
              try {
                localStorage.setItem(
                  "pbcrun_access",
                  JSON.stringify({
                    email: email,
                    token: result.body.token || "",
                    at: Date.now()
                  })
                );
              } catch (err) {}
              window.location.href = result.body.redirect || "/app";
              return;
            }
            var msg =
              (result.body && result.body.error) ||
              (result.status === 401
                ? I.t(currentLang, "err_code_invalid")
                : I.t(currentLang, "err_generic"));
            setStatus(enterStatus, msg, "error");
            enterBtn.disabled = false;
          })
          .catch(function () {
            setStatus(enterStatus, I.t(currentLang, "err_network"), "error");
            enterBtn.disabled = false;
          });
      });
    }

    // --- Request invitation (waitlist) ---
    if (inviteForm) {
      inviteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = (inviteForm.email.value || "").trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setStatus(formStatus, I.t(currentLang, "err_email"), "error");
          inviteForm.email.focus();
          return;
        }
        if (!inviteForm.consent.checked) {
          setStatus(formStatus, I.t(currentLang, "err_consent"), "error");
          inviteForm.consent.focus();
          return;
        }

        submitBtn.disabled = true;
        setStatus(formStatus, I.t(currentLang, "sending"));

        var payload = {
          email: email,
          name: (inviteForm.name.value || "").trim(),
          consent: true,
          language: currentLang,
          source: getUtm("utm_source") || "landing",
          utm_source: getUtm("utm_source"),
          utm_medium: getUtm("utm_medium"),
          utm_campaign: getUtm("utm_campaign"),
          referrer: document.referrer || "",
          page_url: window.location.href,
          website: inviteForm.website ? inviteForm.website.value : ""
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
              setStatus(formStatus, "");
              try {
                localStorage.setItem("pbcrun_invite_requested", email);
              } catch (err) {}
              showSuccess();
              return;
            }
            var msg = (result.body && result.body.error) || I.t(currentLang, "err_generic");
            setStatus(formStatus, msg, "error");
            submitBtn.disabled = false;
          })
          .catch(function () {
            setStatus(formStatus, I.t(currentLang, "err_network"), "error");
            submitBtn.disabled = false;
          });
      });
    }
  });
})();
