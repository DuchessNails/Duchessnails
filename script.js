const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const languageButtons = document.querySelectorAll(".language-button");
const form = document.getElementById("bookingForm");
const paymentLink = document.getElementById("paymentLink");
const yearElement = document.getElementById("year");
const dateInput = document.getElementById("date");

let currentLanguage = localStorage.getItem("duchessLanguage") || "fr";

/* =========================
   MOBILE NAVIGATION
========================= */

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      currentLanguage === "fr"
        ? isOpen
          ? "Fermer le menu"
          : "Ouvrir le menu"
        : isOpen
          ? "Close navigation"
          : "Open navigation"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   LANGUAGE SWITCHER
========================= */

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "fr";

  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
    const translatedText = element.dataset[currentLanguage];

    if (translatedText !== undefined) {
      element.textContent = translatedText;
    }
  });

  document
    .querySelectorAll("[data-placeholder-fr][data-placeholder-en]")
    .forEach((element) => {
      const placeholder =
        currentLanguage === "fr"
          ? element.dataset.placeholderFr
          : element.dataset.placeholderEn;

      if (placeholder !== undefined) {
        element.placeholder = placeholder;
      }
    });

  document.querySelectorAll("[data-alt-fr][data-alt-en]").forEach((image) => {
    const alternativeText =
      currentLanguage === "fr"
        ? image.dataset.altFr
        : image.dataset.altEn;

    if (alternativeText !== undefined) {
      image.alt = alternativeText;
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const metaDescription = document.getElementById("metaDescription");

  if (metaDescription) {
    metaDescription.content =
      currentLanguage === "fr"
        ? metaDescription.dataset.fr
        : metaDescription.dataset.en;
  }

  document.title =
    currentLanguage === "fr"
      ? "Duchessnails | Prothésiste ongulaire à Gagny"
      : "Duchessnails | Nail Studio in Gagny";

  if (mainNav) {
    mainNav.setAttribute(
      "aria-label",
      currentLanguage === "fr"
        ? "Navigation principale"
        : "Main navigation"
    );
  }

  if (menuButton) {
    const isOpen = mainNav?.classList.contains("open");

    menuButton.setAttribute(
      "aria-label",
      currentLanguage === "fr"
        ? isOpen
          ? "Fermer le menu"
          : "Ouvrir le menu"
        : isOpen
          ? "Close navigation"
          : "Open navigation"
    );
  }

  const languageSwitcher = document.querySelector(".language-switcher");

  if (languageSwitcher) {
    languageSwitcher.setAttribute(
      "aria-label",
      currentLanguage === "fr"
        ? "Choisir la langue"
        : "Choose language"
    );
  }

  const floatingWhatsApp = document.querySelector(".floating-whatsapp");

  if (floatingWhatsApp) {
    floatingWhatsApp.setAttribute(
      "aria-label",
      currentLanguage === "fr"
        ? "Contacter Duchessnails sur WhatsApp"
        : "Contact Duchessnails on WhatsApp"
    );
  }

  localStorage.setItem("duchessLanguage", currentLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

/* =========================
   BOOKING FORM
========================= */

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const serviceSelect = document.getElementById("service");
    const selectedService =
      serviceSelect.options[serviceSelect.selectedIndex].text;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const notes = document.getElementById("notes").value.trim();

    const message =
      currentLanguage === "fr"
        ? [
            "Bonjour Duchessnails, je souhaite demander un rendez-vous.",
            "",
            `Nom : ${name}`,
            `Prestation : ${selectedService}`,
            `Date souhaitée : ${date}`,
            `Heure souhaitée : ${time}`,
            `Design / remarques : ${notes || "Aucune"}`,
            "",
            "Je comprends qu’un acompte non remboursable de 5 € est nécessaire pour confirmer le rendez-vous."
          ].join("\n")
        : [
            "Hello Duchessnails, I would like to request an appointment.",
            "",
            `Name: ${name}`,
            `Service: ${selectedService}`,
            `Preferred date: ${date}`,
            `Preferred time: ${time}`,
            `Design / notes: ${notes || "None"}`,
            "",
            "I understand that a €5 non-refundable deposit is required to secure the appointment."
          ].join("\n");

    const whatsappUrl = `https://wa.me/33634261455?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener");
  });
}

/* =========================
   PAYMENT LINK
========================= */

if (paymentLink) {
  paymentLink.addEventListener("click", (event) => {
    const paymentUrl = paymentLink.getAttribute("href");

    if (!paymentUrl || paymentUrl === "#") {
      event.preventDefault();

      const alertMessage =
        currentLanguage === "fr"
          ? "Le lien de paiement sécurisé de 5 € n’a pas encore été ajouté. Veuillez contacter Duchessnails sur WhatsApp pour réserver."
          : "The secure €5 payment link has not been added yet. Please contact Duchessnails on WhatsApp to book.";

      alert(alertMessage);
    }
  });
}

/* =========================
   DATE AND FOOTER
========================= */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (dateInput) {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() - timezoneOffset)
    .toISOString()
    .split("T")[0];

  dateInput.min = localDate;
}

/* =========================
   INITIAL LANGUAGE
========================= */

setLanguage(currentLanguage);
