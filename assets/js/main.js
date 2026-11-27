(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  function emailOk(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(field, input, message) {
    field.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    var err = field.querySelector(".field-error");
    if (err) {
      err.textContent = message;
      err.id = err.id || input.id + "-error";
      input.setAttribute("aria-describedby", err.id);
    }
  }

  function clearError(field, input) {
    field.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
  }

  function validateInput(input) {
    var field = input.closest(".field");
    if (!field) return true;
    var value = (input.value || "").trim();
    var required = input.hasAttribute("required") || input.getAttribute("aria-required") === "true";
    if (required && !value) {
      showError(field, input, "This field is required.");
      return false;
    }
    if (input.type === "email" && value && !emailOk(value)) {
      showError(field, input, "Please enter a valid email address.");
      return false;
    }
    if (!required && !value) {
      clearError(field, input);
      return true;
    }
    if (value) clearError(field, input);
    return true;
  }

  function bindLiveValidation(form) {
    form.setAttribute("novalidate", "novalidate");
    form.querySelectorAll("input, textarea").forEach(function (input) {
      if (input.name === "_honey") return;
      input.addEventListener("blur", function () { validateInput(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field") && input.closest(".field").classList.contains("is-invalid")) {
          validateInput(input);
        }
      });
    });
  }

  function formIsValid(form) {
    var ok = true;
    form.querySelectorAll("input, textarea").forEach(function (input) {
      if (input.name === "_honey") return;
      if (!validateInput(input)) ok = false;
    });
    var success = form.querySelector(".form-success");
    if (!ok) {
      if (success) success.classList.remove("is-visible");
      var first = form.querySelector(".field.is-invalid input, .field.is-invalid textarea");
      if (first) first.focus();
    }
    return ok;
  }

  var ML_URL = "https://assets.mailerlite.com/jsonp/2786436/forms/205075135578768908/subscribe";

  document.querySelectorAll("form.signup-form").forEach(function (form) {
    bindLiveValidation(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formIsValid(form)) return;
      var btn = form.querySelector('button[type="submit"]');
      var success = form.querySelector(".form-success");
      if (btn) btn.disabled = true;
      var body = new URLSearchParams();
      form.querySelectorAll("input").forEach(function (input) {
        if (input.name && input.name !== "_honey") body.append(input.name, input.value);
      });
      fetch(ML_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "Accept": "application/json" },
        body: body.toString()
      }).then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.success) {
            if (success) {
              success.classList.add("is-visible");
              success.textContent = "Thank you. Your email has been added to the list. If a confirmation email arrives, please follow it to finish signing up.";
            }
            form.reset();
          } else {
            var msg = "We could not add that email just now. You can also write to hello@d1digitals.com.";
            if (data && data.errors) {
              try { msg = JSON.stringify(data.errors); } catch (err) {}
              if (data.errors.fields && data.errors.fields.email) {
                msg = data.errors.fields.email[0] || msg;
              }
            }
            if (success) {
              success.classList.add("is-visible");
              success.textContent = msg;
            }
          }
        })
        .catch(function () {
          if (success) {
            success.classList.add("is-visible");
            success.textContent = "We could not reach the email list just now. You can write to hello@d1digitals.com instead.";
          }
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  });

  document.querySelectorAll("form.contact-form").forEach(function (form) {
    bindLiveValidation(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formIsValid(form)) return;
      var btn = form.querySelector('button[type="submit"]');
      var success = form.querySelector(".form-success");
      if (btn) btn.disabled = true;
      var payload = {
        name: (form.querySelector("#c-name") || {}).value || "",
        email: (form.querySelector("#c-email") || {}).value || "",
        message: (form.querySelector("#c-msg") || {}).value || "",
        _subject: "D1 Digitals website message",
        _template: "table",
        _captcha: "false"
      };
      fetch("https://formsubmit.co/ajax/hello@d1digitals.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
        .then(function (data) {
          var ok = data && (data.success === "true" || data.success === true || data.ok);
          var text = (data && (data.message || data.next)) || "";
          if (ok) {
            if (success) {
              success.classList.add("is-visible");
              success.textContent = "Thank you. Your message was sent to hello@d1digitals.com.";
            }
            form.reset();
          } else if (text && /activat|confirm|verify/i.test(String(text))) {
            if (success) {
              success.classList.add("is-visible");
              success.textContent = "The contact form is waiting for a one-time activation email at hello@d1digitals.com. Until that link is opened, please write to hello@d1digitals.com directly.";
            }
          } else {
            window.location.href = "mailto:hello@d1digitals.com?subject=" +
              encodeURIComponent("D1 Digitals website message") +
              "&body=" + encodeURIComponent(payload.message + "\n\nFrom: " + payload.name + " <" + payload.email + ">");
          }
        })
        .catch(function () {
          window.location.href = "mailto:hello@d1digitals.com?subject=" +
            encodeURIComponent("D1 Digitals website message");
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  });

  /* Simple client-side search over pages and products */
  var SEARCH_INDEX = [
    { title: "Start here", url: "index.html", blurb: "Homepage, free guides, and a quiet place to begin." },
    { title: "Free guides", url: "index.html#free-guides", blurb: "The First 3 Days, Start Here: One Gentle Page, and A Gentle Holiday Survival Plan." },
    { title: "The First 3 Days", url: "index.html#free-guides", blurb: "A free guide for the first hours and days." },
    { title: "Start Here: One Gentle Page", url: "index.html#free-guides", blurb: "A free single page for difficult days." },
    { title: "A Gentle Holiday Survival Plan v2.0", url: "index.html#free-guides", blurb: "A free small plan for a gathering or holiday." },
    { title: "Shop", url: "shop.html", blurb: "Practical grief-support pages and journals." },
    { title: "Memory Well", url: "shop.html#memory-well", blurb: "A keepsake journal for stories, details, and photographs. Listed at $12." },
    { title: "I'm Still His Father…", url: "shop.html#still-his-father", blurb: "A guided workbook after violent loss. Listed at $14." },
    { title: "I'm Still His Dad: The Complete Book", url: "shop.html#still-his-dad", blurb: "A 203-page guided book for fathers living with loss. Listed at $19." },
    { title: "Father's Pair", url: "shop.html#fathers-pair", blurb: "I'm Still His Father… together with I'm Still His Dad. Listed at $24." },
    { title: "Complete Set", url: "shop.html#complete-set", blurb: "A grouping of several D1 resources. Listed at $34." },
    { title: "Our story", url: "our-story.html", blurb: "Why D1 exists, in Daniel's published words." },
    { title: "Contact", url: "contact.html", blurb: "Write to Daniel at hello@d1digitals.com." },
    { title: "Privacy policy", url: "privacy-policy.html", blurb: "How D1 Digitals LLC handles email, messages, and payments." }
  ];

  var searchToggle = document.querySelector(".search-toggle");
  var searchBox = document.getElementById("site-search-box");
  var searchInput = document.getElementById("site-search");
  var searchResults = document.getElementById("search-results");

  function openSearch(open) {
    if (!searchBox || !searchToggle) return;
    if (open) {
      searchBox.hidden = false;
      searchToggle.setAttribute("aria-expanded", "true");
      if (searchInput) searchInput.focus();
    } else {
      searchBox.hidden = true;
      searchToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (searchToggle && searchBox) {
    searchToggle.addEventListener("click", function () {
      openSearch(searchBox.hidden);
    });
    document.addEventListener("click", function (e) {
      if (!searchBox.hidden && !e.target.closest(".search-panel")) openSearch(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") openSearch(false);
    });
  }

  function renderResults(query) {
    if (!searchResults) return;
    var q = (query || "").trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!q) return;
    var matches = SEARCH_INDEX.filter(function (item) {
      return (item.title + " " + item.blurb).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);
    if (!matches.length) {
      var empty = document.createElement("li");
      empty.className = "search-empty";
      empty.textContent = "No matching pages. Try “Memory Well” or “contact”.";
      searchResults.appendChild(empty);
      return;
    }
    matches.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      a.setAttribute("role", "option");
      a.innerHTML = item.title + "<small>" + item.blurb + "</small>";
      li.appendChild(a);
      searchResults.appendChild(li);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () { renderResults(searchInput.value); });
  }
})();
