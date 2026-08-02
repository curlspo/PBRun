/**
 * PBCRun landing + privacy i18n
 * Languages: en, it, de, fr, es, ru, ar, ja, ko, zh
 */
window.PBCRUN_I18N = (function () {
  var LANGS = [
    { code: "en", label: "EN", dir: "ltr", htmlLang: "en" },
    { code: "it", label: "IT", dir: "ltr", htmlLang: "it" },
    { code: "de", label: "DE", dir: "ltr", htmlLang: "de" },
    { code: "fr", label: "FR", dir: "ltr", htmlLang: "fr" },
    { code: "es", label: "ES", dir: "ltr", htmlLang: "es" },
    { code: "ru", label: "RU", dir: "ltr", htmlLang: "ru" },
    { code: "ar", label: "العربية", dir: "rtl", htmlLang: "ar" },
    { code: "ja", label: "日本語", dir: "ltr", htmlLang: "ja" },
    { code: "ko", label: "한국어", dir: "ltr", htmlLang: "ko" },
    { code: "zh", label: "中文", dir: "ltr", htmlLang: "zh-Hans" }
  ];

  var LANG_KEY = "pbcrun_lang";

  // Shared privacy policy (structured). Full legal text in each language.
  // Operator: PBCRun (pbcrun.com). Contact: privacy@pbcrun.com (fallback jhollidayesq@gmail.com)

  var T = {};

  function baseLanding(extra) {
    return Object.assign(
      {
        skip: "Skip to main content",
        lang_label: "Language",
        title: "PBCRun — Request an Invitation",
        wordmark_aria: "PBCRun home",
        eyebrow: "Car Week 2026",
        headline_line1: "Your Companion Guide",
        headline_to: "to",
        headline_place: "Pebble Beach",
        days: "Days",
        hours: "Hours",
        mins: "Mins",
        secs: "Secs",
        until: "Until Car Week begins",
        countdown_aria: "Countdown until Car Week begins",
        request_title: "Request Invitation",
        email: "Email",
        email_ph: "you@domain.com",
        name: "Name",
        optional: "(optional)",
        name_ph: "Your name",
        attending: "At Car Week 2026?",
        select: "Select…",
        attending_yes: "Yes — I’ll be there",
        attending_maybe: "Maybe",
        attending_no: "Following from afar",
        platform: "Interested in",
        platform_both: "iPhone app & web",
        platform_ios: "iPhone app",
        platform_web: "Web guide",
        consent: "I agree to be contacted about PBCRun early access and I have read the Privacy Policy.",
        consent_link: "Privacy Policy",
        cta: "Request Invitation",
        hint: "Join the list for early access before Car Week",
        success_title: "You’re on the list",
        success_body: "Thanks — we’ll email your invitation when access opens.",
        footer: "PBCRun is an unofficial guide not affiliated with the Pebble Beach Concours d’Elegance.",
        privacy_link: "Privacy Policy",
        err_email: "Please enter a valid email address.",
        err_consent: "Please agree and review the Privacy Policy so we can email your invitation.",
        sending: "Sending…",
        err_generic: "Something went wrong. Please try again.",
        err_network: "Network error. Check your connection and try again.",
        privacy_title: "Privacy Policy",
        privacy_back: "Back to invitation",
        privacy_updated: "Last updated: August 1, 2026",
        privacy_effective: "Effective date: August 1, 2026"
      },
      extra || {}
    );
  }

  // English privacy sections (source of truth)
  var privacyEn = {
    privacy_intro:
      "This Privacy Policy describes how PBCRun (“PBCRun,” “we,” “us,” or “our”) collects, uses, discloses, and protects personal information when you use pbcrun.com, related pages, and our invitation waitlist (the “Services”). PBCRun is an independent, unofficial companion guide related to Monterey Car Week / Pebble Beach area events. We are not affiliated with the Pebble Beach Concours d’Elegance, Pebble Beach Company, or any official Car Week organizer.",
    privacy_s1_title: "1. Who we are (controller)",
    privacy_s1_body:
      "The data controller for personal information collected through the Services is the operator of PBCRun at pbcrun.com. For privacy requests, email privacy@pbcrun.com (or jhollidayesq@gmail.com if that mailbox is not yet active). If you are in the European Economic Area (EEA), United Kingdom, or Switzerland, that operator is the controller under the GDPR / UK GDPR.",
    privacy_s2_title: "2. Information we collect",
    privacy_s2_body:
      "We may collect: (a) Identifiers and contact data you provide — email address (required for the waitlist), name (optional), and similar contact details; (b) Preference data — whether you plan to attend Car Week, platform interest (iOS/web), language preference; (c) Technical and usage data — IP address, browser type, user agent, referrer URL, pages visited, approximate location derived from IP, and timestamps; (d) Marketing source data — UTM parameters and campaign tags if present in the link you used; (e) Communications — messages you send us. We do not require an account to join the waitlist. We do not intentionally collect sensitive personal information (as defined under California law) or special-category data (GDPR) for the waitlist.",
    privacy_s3_title: "3. How we use information (purposes)",
    privacy_s3_body:
      "We use personal information to: operate the waitlist and send invitations or product updates you requested; respond to inquiries; maintain security and prevent abuse/spam; analyze aggregate traffic to improve the site; comply with law; and establish, exercise, or defend legal claims. We do not use waitlist data for automated decision-making that produces legal or similarly significant effects.",
    privacy_s4_title: "4. Legal bases (GDPR / UK GDPR)",
    privacy_s4_body:
      "Where the GDPR or UK GDPR applies, we process data based on: (a) Consent — when you submit the invitation form and agree to be contacted (Art. 6(1)(a)); (b) Legitimate interests — securing the site, preventing fraud, and limited analytics that do not override your rights (Art. 6(1)(f)); (c) Legal obligation — when we must retain or disclose information to comply with law (Art. 6(1)(c)). You may withdraw consent at any time by emailing us; withdrawal does not affect prior lawful processing.",
    privacy_s5_title: "5. California notice at collection (CCPA / CPRA)",
    privacy_s5_body:
      "If you are a California resident, we collect the categories of personal information listed in Section 2 for the business purposes in Section 3. We do not sell personal information and we do not “share” personal information for cross-context behavioral advertising as those terms are defined under the CCPA/CPRA. We do not use or disclose sensitive personal information for purposes that require a right to limit under the CPRA. We retain waitlist data for as long as needed to provide early access and related communications, then delete or de-identify it within a reasonable period after the 2026 Car Week season (or sooner if you request deletion), unless a longer period is required by law or for legitimate security/legal needs.",
    privacy_s6_title: "6. Your privacy rights",
    privacy_s6_body:
      "Depending on where you live, you may have rights to: access/know the personal information we hold; correct inaccuracies; delete personal information; obtain a portable copy; restrict or object to certain processing; withdraw consent; and lodge a complaint with a supervisory authority (EEA/UK). California residents additionally have rights to know, delete, correct, and to non-discrimination for exercising rights, and to opt out of sale/sharing (we do not sell or share as defined). To exercise rights, email privacy@pbcrun.com with “Privacy Request” in the subject and enough detail to verify your identity (e.g., the email you used on the waitlist). We will respond within the time required by applicable law (generally 45 days under CCPA, extendable as permitted; without undue delay and within one month under GDPR, extendable as permitted).",
    privacy_s7_title: "7. Sharing and processors",
    privacy_s7_body:
      "We use service providers (processors) that help us host the website, process forms, store waitlist records, and operate infrastructure (for example, hosting and DNS providers such as Vercel, and repository/issue tooling used to store waitlist entries). They may process data only on our instructions and for our purposes. We may disclose information if required by law, legal process, or to protect rights, safety, and security. We do not sell your email list.",
    privacy_s8_title: "8. International transfers",
    privacy_s8_body:
      "We and our providers may process data in the United States and other countries. Where required, we rely on appropriate safeguards for transfers from the EEA/UK/Switzerland (such as Standard Contractual Clauses) or your consent where applicable.",
    privacy_s9_title: "9. Cookies and similar technologies",
    privacy_s9_body:
      "We use strictly necessary storage such as localStorage to remember your language preference and whether you already requested an invitation on this device. We do not use third-party advertising cookies on the invitation page. Your browser may allow you to clear site data. Essential preferences may not work if storage is blocked.",
    privacy_s10_title: "10. Security",
    privacy_s10_body:
      "We implement reasonable administrative and technical measures appropriate to the nature of a waitlist site (HTTPS, access controls on admin tools, spam honeypots). No method of transmission or storage is 100% secure.",
    privacy_s11_title: "11. Children",
    privacy_s11_body:
      "The Services are not directed to children under 16 (or under 13 where that is the applicable standard). We do not knowingly collect personal information from children. If you believe a child provided information, contact us and we will delete it.",
    privacy_s12_title: "12. Do Not Track",
    privacy_s12_body:
      "Some browsers send “Do Not Track” signals. Our invitation site does not respond to DNT signals in a differentiated way because we do not run cross-site advertising tracking on this page.",
    privacy_s13_title: "13. Changes",
    privacy_s13_body:
      "We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Material changes will be highlighted when appropriate.",
    privacy_s14_title: "14. Contact",
    privacy_s14_body:
      "Privacy requests and questions: privacy@pbcrun.com (or jhollidayesq@gmail.com). Website: https://pbcrun.com. Please do not send passwords or sensitive ID documents unless we specifically request them for verification."
  };

  T.en = baseLanding(privacyEn);

  // --- Other languages: landing + full privacy ---

  T.it = baseLanding(
    Object.assign(
      {
        skip: "Vai al contenuto principale",
        lang_label: "Lingua",
        title: "PBCRun — Richiedi un invito",
        eyebrow: "Car Week 2026",
        headline_line1: "La tua guida di compagnia",
        headline_to: "a",
        headline_place: "Pebble Beach",
        days: "Giorni",
        hours: "Ore",
        mins: "Min",
        secs: "Sec",
        until: "All’inizio della Car Week",
        countdown_aria: "Conto alla rovescia fino all’inizio della Car Week",
        request_title: "Richiedi invito",
        email: "Email",
        email_ph: "tu@email.com",
        name: "Nome",
        optional: "(facoltativo)",
        name_ph: "Il tuo nome",
        attending: "Alla Car Week 2026?",
        select: "Seleziona…",
        attending_yes: "Sì — ci sarò",
        attending_maybe: "Forse",
        attending_no: "Seguo da lontano",
        platform: "Mi interessa",
        platform_both: "App iPhone e web",
        platform_ios: "App iPhone",
        platform_web: "Guida web",
        consent: "Accetto di essere contattato per l’accesso anticipato a PBCRun e di aver letto l’Informativa sulla privacy.",
        consent_link: "Informativa sulla privacy",
        cta: "Richiedi invito",
        hint: "Iscriviti per l’accesso anticipato prima della Car Week",
        success_title: "Sei in lista",
        success_body: "Grazie — ti invieremo l’invito quando l’accesso sarà aperto.",
        footer: "PBCRun è una guida non ufficiale non affiliata al Pebble Beach Concours d’Elegance.",
        privacy_link: "Informativa sulla privacy",
        err_email: "Inserisci un indirizzo email valido.",
        err_consent: "Accetta e consulta l’Informativa sulla privacy per ricevere l’invito.",
        sending: "Invio…",
        err_generic: "Qualcosa è andato storto. Riprova.",
        err_network: "Errore di rete. Controlla la connessione e riprova.",
        privacy_title: "Informativa sulla privacy",
        privacy_back: "Torna all’invito",
        privacy_updated: "Ultimo aggiornamento: 1 agosto 2026",
        privacy_effective: "Data di efficacia: 1 agosto 2026",
        privacy_intro:
          "La presente Informativa sulla privacy descrive come PBCRun (“PBCRun”, “noi”) raccoglie, utilizza, comunica e protegge i dati personali quando usi pbcrun.com, le pagine collegate e la lista d’attesa per gli inviti (i “Servizi”). PBCRun è una guida indipendente e non ufficiale legata alla Monterey Car Week / eventi nell’area di Pebble Beach. Non siamo affiliati al Pebble Beach Concours d’Elegance, alla Pebble Beach Company o a organizzatori ufficiali della Car Week.",
        privacy_s1_title: "1. Titolare del trattamento",
        privacy_s1_body:
          "Il titolare dei dati personali raccolti tramite i Servizi è l’operatore di PBCRun su pbcrun.com. Per richieste privacy: privacy@pbcrun.com (oppure jhollidayesq@gmail.com se non ancora attivo). Nell’EEE, Regno Unito o Svizzera tale operatore è il titolare ai sensi del GDPR / UK GDPR.",
        privacy_s2_title: "2. Dati che raccogliamo",
        privacy_s2_body:
          "Possiamo raccogliere: (a) dati di contatto che fornisci — email (obbligatoria per la lista), nome (facoltativo); (b) preferenze — partecipazione alla Car Week, interesse iOS/web, lingua; (c) dati tecnici — IP, browser, user agent, referrer, pagine visitate, posizione approssimativa da IP, timestamp; (d) sorgenti di marketing — parametri UTM; (e) comunicazioni che ci invii. Non richiediamo un account per la lista. Non raccogliamo intenzionalmente dati sensibili o categorie particolari per la lista d’attesa.",
        privacy_s3_title: "3. Finalità",
        privacy_s3_body:
          "Usiamo i dati per gestire la lista e inviare inviti/aggiornamenti richiesti; rispondere alle richieste; sicurezza e anti-abuso; analisi aggregate; adempiere obblighi di legge; tutelare diritti legali. Non usiamo i dati della lista per decisioni automatizzate con effetti giuridici significativi.",
        privacy_s4_title: "4. Basi giuridiche (GDPR)",
        privacy_s4_body:
          "Ove applicabile il GDPR: (a) consenso — invio del modulo e accordo ad essere contattati (art. 6(1)(a)); (b) legittimo interesse — sicurezza, prevenzione frodi, analytics limitati (art. 6(1)(f)); (c) obbligo legale (art. 6(1)(c)). Puoi revocare il consenso in qualsiasi momento scrivendoci.",
        privacy_s5_title: "5. Avviso California (CCPA/CPRA)",
        privacy_s5_body:
          "Se sei residente in California, raccogliamo le categorie della Sezione 2 per le finalità della Sezione 3. Non vendiamo dati personali e non “condividiamo” dati per pubblicità comportamentale cross-context ai sensi del CCPA/CPRA. Conserviamo i dati della lista per il tempo necessario all’accesso anticipato e alle comunicazioni collegate, poi li cancelliamo o anonimizziamo in un periodo ragionevole dopo la stagione Car Week 2026 (o prima su richiesta), salvo obblighi di legge.",
        privacy_s6_title: "6. I tuoi diritti",
        privacy_s6_body:
          "A seconda della residenza puoi avere diritti di accesso, rettifica, cancellazione, portabilità, limitazione/opposizione, revoca del consenso e reclamo all’autorità. I residenti in California hanno anche diritti CCPA/CPRA (incluso il non subire discriminazioni). Scrivi a privacy@pbcrun.com con oggetto “Privacy Request”. Risponderemo nei termini di legge.",
        privacy_s7_title: "7. Condivisione e responsabili",
        privacy_s7_body:
          "Usiamo fornitori (hosting, DNS, strumenti di archiviazione della lista, es. Vercel e tooling repository) che trattano i dati per nostre istruzioni. Possiamo divulgare dati se richiesto dalla legge o per tutelare diritti e sicurezza. Non vendiamo la tua lista email.",
        privacy_s8_title: "8. Trasferimenti internazionali",
        privacy_s8_body:
          "Noi e i fornitori possiamo trattare dati negli Stati Uniti e in altri Paesi. Ove richiesto, usiamo garanzie adeguate (es. Clausole contrattuali standard) o il tuo consenso.",
        privacy_s9_title: "9. Cookie e tecnologie simili",
        privacy_s9_body:
          "Usiamo archiviazione strettamente necessaria (localStorage) per lingua e stato della richiesta di invito. Non usiamo cookie pubblicitari di terze parti sulla pagina invito.",
        privacy_s10_title: "10. Sicurezza",
        privacy_s10_body:
          "Adottiamo misure ragionevoli (HTTPS, controlli admin, honeypot anti-spam). Nessun sistema è sicuro al 100%.",
        privacy_s11_title: "11. Minori",
        privacy_s11_body:
          "I Servizi non sono destinati a minori di 16 anni (o 13 dove applicabile). Non raccogliamo consapevolmente dati di minori.",
        privacy_s12_title: "12. Do Not Track",
        privacy_s12_body:
          "Non rispondiamo in modo differenziato ai segnali DNT perché non eseguiamo tracciamento pubblicitario cross-site su questa pagina.",
        privacy_s13_title: "13. Modifiche",
        privacy_s13_body:
          "Possiamo aggiornare questa informativa. Pubblicheremo la versione aggiornata con la data di “Ultimo aggiornamento”.",
        privacy_s14_title: "14. Contatti",
        privacy_s14_body:
          "Richieste privacy: privacy@pbcrun.com (o jhollidayesq@gmail.com). Sito: https://pbcrun.com."
      },
      {}
    )
  );

  // For remaining languages I'll use compact but complete privacy translations
  function pack(landing, privacy) {
    return baseLanding(Object.assign({}, landing, privacy));
  }

  T.de = pack(
    {
      skip: "Zum Hauptinhalt springen",
      lang_label: "Sprache",
      title: "PBCRun — Einladung anfordern",
      eyebrow: "Car Week 2026",
      headline_line1: "Ihr Begleitführer",
      headline_to: "für",
      headline_place: "Pebble Beach",
      days: "Tage",
      hours: "Std.",
      mins: "Min.",
      secs: "Sek.",
      until: "Bis zum Start der Car Week",
      countdown_aria: "Countdown bis zum Beginn der Car Week",
      request_title: "Einladung anfordern",
      email: "E-Mail",
      email_ph: "sie@email.com",
      name: "Name",
      optional: "(optional)",
      name_ph: "Ihr Name",
      attending: "Bei der Car Week 2026?",
      select: "Auswählen…",
      attending_yes: "Ja — ich bin da",
      attending_maybe: "Vielleicht",
      attending_no: "Von weitem dabei",
      platform: "Interesse an",
      platform_both: "iPhone-App & Web",
      platform_ios: "iPhone-App",
      platform_web: "Web-Guide",
      consent: "Ich bin einverstanden, über PBCRun Early Access kontaktiert zu werden, und habe die Datenschutzrichtlinie gelesen.",
      consent_link: "Datenschutzrichtlinie",
      cta: "Einladung anfordern",
      hint: "Auf die Liste für Early Access vor der Car Week",
      success_title: "Sie sind auf der Liste",
      success_body: "Danke — wir senden Ihre Einladung, sobald der Zugang geöffnet ist.",
      footer: "PBCRun ist ein inoffizieller Guide und nicht mit dem Pebble Beach Concours d’Elegance verbunden.",
      privacy_link: "Datenschutz",
      err_email: "Bitte eine gültige E-Mail-Adresse eingeben.",
      err_consent: "Bitte zustimmen und die Datenschutzrichtlinie prüfen.",
      sending: "Wird gesendet…",
      err_generic: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
      err_network: "Netzwerkfehler. Verbindung prüfen und erneut versuchen.",
      privacy_title: "Datenschutzrichtlinie",
      privacy_back: "Zurück zur Einladung",
      privacy_updated: "Zuletzt aktualisiert: 1. August 2026",
      privacy_effective: "Gültig ab: 1. August 2026"
    },
    {
      privacy_intro:
        "Diese Datenschutzrichtlinie beschreibt, wie PBCRun („wir“) personenbezogene Daten erhebt, nutzt, offenlegt und schützt, wenn Sie pbcrun.com, zugehörige Seiten und unsere Einladungs-Warteliste (die „Dienste“) nutzen. PBCRun ist ein unabhängiger, inoffizieller Begleitguide zu Monterey Car Week / Events im Raum Pebble Beach. Wir sind nicht mit dem Pebble Beach Concours d’Elegance, der Pebble Beach Company oder offiziellen Car-Week-Veranstaltern verbunden.",
      privacy_s1_title: "1. Verantwortlicher",
      privacy_s1_body:
        "Verantwortlicher für über die Dienste erhobene Daten ist der Betreiber von PBCRun unter pbcrun.com. Datenschutzanfragen: privacy@pbcrun.com (oder jhollidayesq@gmail.com). Im EWR/UK/Schweiz ist dieser Betreiber der Verantwortliche nach GDPR/UK GDPR.",
      privacy_s2_title: "2. Welche Daten wir erheben",
      privacy_s2_body:
        "Wir können erheben: (a) Kontaktdaten — E-Mail (Pflicht für die Liste), Name (optional); (b) Präferenzen — Teilnahme, Plattform, Sprache; (c) technische Daten — IP, Browser, User-Agent, Referrer, Seiten, ungefähre Lage per IP, Zeitstempel; (d) Marketing-Quellen — UTM; (e) Ihre Nachrichten. Kein Konto erforderlich. Keine bewusste Erhebung sensibler/besonderer Kategorien für die Warteliste.",
      privacy_s3_title: "3. Zwecke",
      privacy_s3_body:
        "Betrieb der Warteliste und Versand angeforderter Einladungen/Updates; Anfragen beantworten; Sicherheit/Missbrauchsschutz; aggregierte Analysen; Rechtspflichten; Rechtsverteidigung. Keine automatisierten Entscheidungen mit erheblicher Wirkung.",
      privacy_s4_title: "4. Rechtsgrundlagen (GDPR)",
      privacy_s4_body:
        "Soweit GDPR gilt: Einwilligung (Art. 6 Abs. 1 lit. a); berechtigte Interessen an Sicherheit und begrenzter Analyse (lit. f); rechtliche Verpflichtung (lit. c). Einwilligung jederzeit widerrufbar.",
      privacy_s5_title: "5. Kalifornien (CCPA/CPRA)",
      privacy_s5_body:
        "Für Einwohner Kaliforniens erheben wir die Kategorien in Abschnitt 2 zu den Zwecken in Abschnitt 3. Wir verkaufen keine personenbezogenen Daten und „teilen“ sie nicht für cross-context Werbung im Sinne des CCPA/CPRA. Speicherung so lange wie für Early Access nötig, danach Löschung/Anonymisierung in angemessener Frist nach der Saison 2026, sofern kein längerer gesetzlicher Grund.",
      privacy_s6_title: "6. Ihre Rechte",
      privacy_s6_body:
        "Je nach Wohnsitz: Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Einschränkung/Widerspruch, Widerruf, Beschwerde bei Aufsichtsbehörde; in Kalifornien zusätzlich CCPA/CPRA-Rechte. E-Mail an privacy@pbcrun.com mit Betreff „Privacy Request“.",
      privacy_s7_title: "7. Weitergabe und Auftragsverarbeiter",
      privacy_s7_body:
        "Hosting/DNS/Speicher-Dienstleister (z. B. Vercel, Repository-Tools) verarbeiten Daten in unserem Auftrag. Offenlegung nur bei Rechtspflicht oder zum Schutz von Rechten/Sicherheit. Kein Verkauf Ihrer E-Mail-Liste.",
      privacy_s8_title: "8. Internationale Übermittlungen",
      privacy_s8_body:
        "Verarbeitung in den USA und anderen Ländern möglich. Bei Bedarf geeignete Garantien (z. B. Standardvertragsklauseln) oder Einwilligung.",
      privacy_s9_title: "9. Cookies",
      privacy_s9_body:
        "Notwendiger localStorage für Sprache und Einladungsstatus. Keine Drittanbieter-Werbe-Cookies auf der Einladungsseite.",
      privacy_s10_title: "10. Sicherheit",
      privacy_s10_body: "Angemessene Maßnahmen (HTTPS, Admin-Zugangskontrollen, Spam-Schutz). Keine absolute Sicherheit.",
      privacy_s11_title: "11. Kinder",
      privacy_s11_body: "Nicht an Kinder unter 16 (bzw. 13) gerichtet. Keine wissentliche Erhebung von Kinderdaten.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "Keine differenzierte DNT-Reaktion; kein Cross-Site-Werbe-Tracking auf dieser Seite.",
      privacy_s13_title: "13. Änderungen",
      privacy_s13_body: "Aktualisierungen werden auf dieser Seite mit neuem Datum veröffentlicht.",
      privacy_s14_title: "14. Kontakt",
      privacy_s14_body: "privacy@pbcrun.com (oder jhollidayesq@gmail.com). Website: https://pbcrun.com."
    }
  );

  T.fr = pack(
    {
      skip: "Aller au contenu principal",
      lang_label: "Langue",
      title: "PBCRun — Demander une invitation",
      eyebrow: "Car Week 2026",
      headline_line1: "Votre guide compagnon",
      headline_to: "à",
      headline_place: "Pebble Beach",
      days: "Jours",
      hours: "Heures",
      mins: "Min",
      secs: "Sec",
      until: "Jusqu’au début de la Car Week",
      countdown_aria: "Compte à rebours jusqu’au début de la Car Week",
      request_title: "Demander une invitation",
      email: "E-mail",
      email_ph: "vous@email.com",
      name: "Nom",
      optional: "(facultatif)",
      name_ph: "Votre nom",
      attending: "À la Car Week 2026 ?",
      select: "Choisir…",
      attending_yes: "Oui — j’y serai",
      attending_maybe: "Peut-être",
      attending_no: "Je suis de loin",
      platform: "Intéressé par",
      platform_both: "App iPhone et web",
      platform_ios: "App iPhone",
      platform_web: "Guide web",
      consent: "J’accepte d’être contacté pour l’accès anticipé PBCRun et j’ai lu la Politique de confidentialité.",
      consent_link: "Politique de confidentialité",
      cta: "Demander une invitation",
      hint: "Rejoignez la liste pour un accès anticipé avant la Car Week",
      success_title: "Vous êtes sur la liste",
      success_body: "Merci — nous vous enverrons l’invitation dès l’ouverture de l’accès.",
      footer: "PBCRun est un guide non officiel non affilié au Pebble Beach Concours d’Elegance.",
      privacy_link: "Confidentialité",
      err_email: "Veuillez saisir une adresse e-mail valide.",
      err_consent: "Veuillez accepter et consulter la Politique de confidentialité.",
      sending: "Envoi…",
      err_generic: "Une erreur s’est produite. Réessayez.",
      err_network: "Erreur réseau. Vérifiez la connexion et réessayez.",
      privacy_title: "Politique de confidentialité",
      privacy_back: "Retour à l’invitation",
      privacy_updated: "Dernière mise à jour : 1 août 2026",
      privacy_effective: "Date d’effet : 1 août 2026"
    },
    {
      privacy_intro:
        "La présente Politique décrit comment PBCRun (« nous ») collecte, utilise, divulgue et protège les données personnelles lorsque vous utilisez pbcrun.com, les pages associées et notre liste d’attente d’invitation (les « Services »). PBCRun est un guide compagnon indépendant et non officiel lié à la Monterey Car Week / événements de la région de Pebble Beach.",
      privacy_s1_title: "1. Responsable du traitement",
      privacy_s1_body:
        "Le responsable est l’opérateur de PBCRun sur pbcrun.com. Demandes : privacy@pbcrun.com (ou jhollidayesq@gmail.com). Dans l’EEE/Royaume-Uni/Suisse, il est le responsable au sens du RGPD / UK GDPR.",
      privacy_s2_title: "2. Données collectées",
      privacy_s2_body:
        "Nous pouvons collecter : coordonnées (e-mail obligatoire, nom facultatif) ; préférences (présence, plateforme, langue) ; données techniques (IP, navigateur, referrer, pages, horodatages) ; UTM ; vos messages. Pas de compte requis. Pas de collecte intentionnelle de données sensibles pour la liste.",
      privacy_s3_title: "3. Finalités",
      privacy_s3_body:
        "Gérer la liste et envoyer invitations/mises à jour demandées ; répondre ; sécurité ; analyses agrégées ; obligations légales ; défense de droits. Pas de décisions automatisées à effets juridiques importants.",
      privacy_s4_title: "4. Bases légales (RGPD)",
      privacy_s4_body:
        "Consentement (art. 6(1)(a)) ; intérêts légitimes de sécurité et d’analyses limitées (f) ; obligation légale (c). Retrait du consentement possible à tout moment.",
      privacy_s5_title: "5. Avis Californie (CCPA/CPRA)",
      privacy_s5_body:
        "Résidents de Californie : catégories de la section 2 pour les finalités de la section 3. Nous ne vendons pas et ne « partageons » pas les données pour publicité comportementale cross-context. Conservation puis suppression/anonymisation dans un délai raisonnable après la saison 2026, sauf obligation légale.",
      privacy_s6_title: "6. Vos droits",
      privacy_s6_body:
        "Accès, rectification, effacement, portabilité, limitation/opposition, retrait du consentement, réclamation ; droits CCPA pour la Californie. Écrire à privacy@pbcrun.com — objet « Privacy Request ».",
      privacy_s7_title: "7. Partage et sous-traitants",
      privacy_s7_body:
        "Hébergeurs et outils (ex. Vercel, stockage de la liste) traitent les données pour nos instructions. Divulgation si exigée par la loi ou pour la sécurité. Pas de vente de liste e-mail.",
      privacy_s8_title: "8. Transferts internationaux",
      privacy_s8_body: "Traitement possible aux États-Unis et ailleurs, avec garanties appropriées si requis.",
      privacy_s9_title: "9. Cookies",
      privacy_s9_body: "localStorage nécessaire pour la langue et l’état d’invitation. Pas de cookies publicitaires tiers sur cette page.",
      privacy_s10_title: "10. Sécurité",
      privacy_s10_body: "Mesures raisonnables (HTTPS, contrôles admin, anti-spam). Aucune sécurité absolue.",
      privacy_s11_title: "11. Enfants",
      privacy_s11_body: "Non destinés aux moins de 16 ans (ou 13). Pas de collecte volontaire auprès d’enfants.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "Pas de réponse différenciée au DNT ; pas de tracking publicitaire cross-site ici.",
      privacy_s13_title: "13. Modifications",
      privacy_s13_body: "Mises à jour publiées sur cette page avec nouvelle date.",
      privacy_s14_title: "14. Contact",
      privacy_s14_body: "privacy@pbcrun.com (ou jhollidayesq@gmail.com). Site : https://pbcrun.com."
    }
  );

  T.es = pack(
    {
      skip: "Saltar al contenido principal",
      lang_label: "Idioma",
      title: "PBCRun — Solicitar invitación",
      eyebrow: "Car Week 2026",
      headline_line1: "Tu guía de compañía",
      headline_to: "a",
      headline_place: "Pebble Beach",
      days: "Días",
      hours: "Horas",
      mins: "Min",
      secs: "Seg",
      until: "Hasta que empiece la Car Week",
      countdown_aria: "Cuenta regresiva hasta el inicio de la Car Week",
      request_title: "Solicitar invitación",
      email: "Correo",
      email_ph: "tu@email.com",
      name: "Nombre",
      optional: "(opcional)",
      name_ph: "Tu nombre",
      attending: "¿En la Car Week 2026?",
      select: "Elegir…",
      attending_yes: "Sí — estaré allí",
      attending_maybe: "Quizá",
      attending_no: "Sigo desde lejos",
      platform: "Me interesa",
      platform_both: "App iPhone y web",
      platform_ios: "App iPhone",
      platform_web: "Guía web",
      consent: "Acepto que me contacten sobre el acceso anticipado a PBCRun y he leído la Política de privacidad.",
      consent_link: "Política de privacidad",
      cta: "Solicitar invitación",
      hint: "Únete a la lista para acceso anticipado antes de la Car Week",
      success_title: "Estás en la lista",
      success_body: "Gracias — te enviaremos la invitación cuando se abra el acceso.",
      footer: "PBCRun es una guía no oficial no afiliada al Pebble Beach Concours d’Elegance.",
      privacy_link: "Privacidad",
      err_email: "Introduce un correo electrónico válido.",
      err_consent: "Acepta y revisa la Política de privacidad.",
      sending: "Enviando…",
      err_generic: "Algo salió mal. Inténtalo de nuevo.",
      err_network: "Error de red. Comprueba la conexión e inténtalo de nuevo.",
      privacy_title: "Política de privacidad",
      privacy_back: "Volver a la invitación",
      privacy_updated: "Última actualización: 1 de agosto de 2026",
      privacy_effective: "Fecha de vigencia: 1 de agosto de 2026"
    },
    {
      privacy_intro:
        "Esta Política describe cómo PBCRun («nosotros») recopila, usa, divulga y protege la información personal cuando usas pbcrun.com, páginas relacionadas y nuestra lista de espera de invitaciones (los «Servicios»). PBCRun es una guía independiente y no oficial relacionada con Monterey Car Week / eventos del área de Pebble Beach.",
      privacy_s1_title: "1. Responsable",
      privacy_s1_body:
        "El responsable es el operador de PBCRun en pbcrun.com. Solicitudes: privacy@pbcrun.com (o jhollidayesq@gmail.com). En el EEE/Reino Unido/Suiza es el responsable según el RGPD / UK GDPR.",
      privacy_s2_title: "2. Información que recopilamos",
      privacy_s2_body:
        "Podemos recopilar: contacto (correo obligatorio, nombre opcional); preferencias; datos técnicos (IP, navegador, referrer, páginas, marcas de tiempo); UTM; tus mensajes. No se requiere cuenta. No recopilamos intencionadamente datos sensibles para la lista.",
      privacy_s3_title: "3. Finalidades",
      privacy_s3_body:
        "Operar la lista y enviar invitaciones/actualizaciones solicitadas; responder; seguridad; análisis agregados; cumplir la ley; defender derechos. Sin decisiones automatizadas con efectos jurídicos significativos.",
      privacy_s4_title: "4. Bases legales (RGPD)",
      privacy_s4_body:
        "Consentimiento (art. 6(1)(a)); intereses legítimos de seguridad y analítica limitada (f); obligación legal (c). Puede retirar el consentimiento en cualquier momento.",
      privacy_s5_title: "5. Aviso de California (CCPA/CPRA)",
      privacy_s5_body:
        "Residentes de California: categorías de la sección 2 para fines de la sección 3. No vendemos ni «compartimos» datos para publicidad conductual cross-context. Conservación y luego eliminación/anonimización en un plazo razonable tras la temporada 2026, salvo obligación legal.",
      privacy_s6_title: "6. Sus derechos",
      privacy_s6_body:
        "Acceso, corrección, eliminación, portabilidad, limitación/oposición, retirar consentimiento, reclamo; derechos CCPA en California. Escriba a privacy@pbcrun.com con asunto «Privacy Request».",
      privacy_s7_title: "7. Compartición y encargados",
      privacy_s7_body:
        "Proveedores de hosting/DNS/almacenamiento (p. ej. Vercel) tratan datos según nuestras instrucciones. Divulgación si la ley lo exige o por seguridad. No vendemos su lista de correos.",
      privacy_s8_title: "8. Transferencias internacionales",
      privacy_s8_body: "Tratamiento en EE. UU. y otros países, con salvaguardas adecuadas cuando proceda.",
      privacy_s9_title: "9. Cookies",
      privacy_s9_body: "localStorage necesario para idioma y estado de invitación. Sin cookies publicitarias de terceros en esta página.",
      privacy_s10_title: "10. Seguridad",
      privacy_s10_body: "Medidas razonables (HTTPS, controles de administración, anti-spam). Ningún sistema es 100 % seguro.",
      privacy_s11_title: "11. Menores",
      privacy_s11_body: "No dirigido a menores de 16 (o 13). No recopilamos a sabiendas datos de niños.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "Sin respuesta diferenciada a DNT; sin tracking publicitario cross-site aquí.",
      privacy_s13_title: "13. Cambios",
      privacy_s13_body: "Actualizaciones publicadas en esta página con nueva fecha.",
      privacy_s14_title: "14. Contacto",
      privacy_s14_body: "privacy@pbcrun.com (o jhollidayesq@gmail.com). Sitio: https://pbcrun.com."
    }
  );

  T.ru = pack(
    {
      skip: "Перейти к основному содержимому",
      lang_label: "Язык",
      title: "PBCRun — Запросить приглашение",
      eyebrow: "Car Week 2026",
      headline_line1: "Ваш гид-компаньон",
      headline_to: "по",
      headline_place: "Pebble Beach",
      days: "Дни",
      hours: "Часы",
      mins: "Мин",
      secs: "Сек",
      until: "До начала Car Week",
      countdown_aria: "Обратный отсчёт до начала Car Week",
      request_title: "Запросить приглашение",
      email: "Эл. почта",
      email_ph: "you@domain.com",
      name: "Имя",
      optional: "(необязательно)",
      name_ph: "Ваше имя",
      attending: "На Car Week 2026?",
      select: "Выберите…",
      attending_yes: "Да — буду на месте",
      attending_maybe: "Возможно",
      attending_no: "Слежу издалека",
      platform: "Интересует",
      platform_both: "Приложение iPhone и веб",
      platform_ios: "Приложение iPhone",
      platform_web: "Веб-гид",
      consent: "Я согласен(на) на связь о раннем доступе к PBCRun и ознакомился(ась) с Политикой конфиденциальности.",
      consent_link: "Политика конфиденциальности",
      cta: "Запросить приглашение",
      hint: "Вступите в список раннего доступа до Car Week",
      success_title: "Вы в списке",
      success_body: "Спасибо — мы пришлём приглашение, когда откроется доступ.",
      footer: "PBCRun — неофициальный гид, не связанный с Pebble Beach Concours d’Elegance.",
      privacy_link: "Конфиденциальность",
      err_email: "Введите корректный адрес email.",
      err_consent: "Подтвердите согласие и ознакомьтесь с Политикой конфиденциальности.",
      sending: "Отправка…",
      err_generic: "Что-то пошло не так. Попробуйте снова.",
      err_network: "Ошибка сети. Проверьте соединение и попробуйте снова.",
      privacy_title: "Политика конфиденциальности",
      privacy_back: "Назад к приглашению",
      privacy_updated: "Последнее обновление: 1 августа 2026 г.",
      privacy_effective: "Дата вступления в силу: 1 августа 2026 г."
    },
    {
      privacy_intro:
        "Настоящая Политика описывает, как PBCRun («мы») собирает, использует, раскрывает и защищает персональные данные при использовании pbcrun.com, связанных страниц и списка ожидания приглашений («Сервисы»). PBCRun — независимый неофициальный гид, связанный с Monterey Car Week / событиями в районе Pebble Beach.",
      privacy_s1_title: "1. Контролёр данных",
      privacy_s1_body:
        "Контролёр — оператор PBCRun на pbcrun.com. Запросы: privacy@pbcrun.com (или jhollidayesq@gmail.com). В ЕЭЗ/Великобритании/Швейцарии — контролёр по GDPR / UK GDPR.",
      privacy_s2_title: "2. Какие данные мы собираем",
      privacy_s2_body:
        "Можем собирать: контакты (email обязателен, имя по желанию); предпочтения; технические данные (IP, браузер, referrer, страницы, метки времени); UTM; ваши сообщения. Аккаунт не требуется. Мы не собираем намеренно чувствительные/особые категории для списка ожидания.",
      privacy_s3_title: "3. Цели",
      privacy_s3_body:
        "Ведение списка и отправка запрошенных приглашений/обновлений; ответы; безопасность; агрегированная аналитика; соблюдение закона; защита прав. Без автоматизированных решений с существенными правовыми последствиями.",
      privacy_s4_title: "4. Правовые основания (GDPR)",
      privacy_s4_body:
        "Согласие (ст. 6(1)(a)); законные интересы безопасности и ограниченной аналитики (f); юридическая обязанность (c). Согласие можно отозвать в любое время.",
      privacy_s5_title: "5. Уведомление для Калифорнии (CCPA/CPRA)",
      privacy_s5_body:
        "Для жителей Калифорнии: категории раздела 2 для целей раздела 3. Мы не продаём и не «передаём» данные для cross-context рекламы. Хранение, затем удаление/обезличивание в разумный срок после сезона 2026, если закон не требует дольше.",
      privacy_s6_title: "6. Ваши права",
      privacy_s6_body:
        "Доступ, исправление, удаление, переносимость, ограничение/возражение, отзыв согласия, жалоба; права CCPA в Калифорнии. Пишите на privacy@pbcrun.com с темой «Privacy Request».",
      privacy_s7_title: "7. Передача и обработчики",
      privacy_s7_body:
        "Провайдеры хостинга/DNS/хранения (например Vercel) обрабатывают данные по нашим указаниям. Раскрытие — по закону или для безопасности. Список email не продаём.",
      privacy_s8_title: "8. Международные передачи",
      privacy_s8_body: "Обработка в США и других странах; при необходимости — надлежащие гарантии.",
      privacy_s9_title: "9. Файлы cookie",
      privacy_s9_body: "Необходимый localStorage для языка и статуса заявки. Без сторонней рекламы на этой странице.",
      privacy_s10_title: "10. Безопасность",
      privacy_s10_body: "Разумные меры (HTTPS, доступ к админке, антиспам). Абсолютной защиты нет.",
      privacy_s11_title: "11. Дети",
      privacy_s11_body: "Не предназначено для лиц младше 16 (или 13). Не собираем данные детей сознательно.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "Нет отдельной реакции на DNT; нет cross-site рекламного трекинга здесь.",
      privacy_s13_title: "13. Изменения",
      privacy_s13_body: "Обновления публикуются на этой странице с новой датой.",
      privacy_s14_title: "14. Контакты",
      privacy_s14_body: "privacy@pbcrun.com (или jhollidayesq@gmail.com). Сайт: https://pbcrun.com."
    }
  );

  T.ar = pack(
    {
      skip: "تخطّ إلى المحتوى الرئيسي",
      lang_label: "اللغة",
      title: "PBCRun — اطلب دعوة",
      eyebrow: "أسبوع السيارات 2026",
      headline_line1: "دليلك المرافق",
      headline_to: "إلى",
      headline_place: "بيبل بيتش",
      days: "أيام",
      hours: "ساعات",
      mins: "دقائق",
      secs: "ثوانٍ",
      until: "حتى بداية أسبوع السيارات",
      countdown_aria: "العد التنازلي حتى بداية أسبوع السيارات",
      request_title: "اطلب دعوة",
      email: "البريد الإلكتروني",
      email_ph: "you@domain.com",
      name: "الاسم",
      optional: "(اختياري)",
      name_ph: "اسمك",
      attending: "هل ستحضر أسبوع السيارات 2026؟",
      select: "اختر…",
      attending_yes: "نعم — سأكون هناك",
      attending_maybe: "ربما",
      attending_no: "أتابع من بعيد",
      platform: "مهتم بـ",
      platform_both: "تطبيق iPhone والويب",
      platform_ios: "تطبيق iPhone",
      platform_web: "دليل الويب",
      consent: "أوافق على التواصل معي بشأن الوصول المبكر إلى PBCRun وقد قرأت سياسة الخصوصية.",
      consent_link: "سياسة الخصوصية",
      cta: "اطلب دعوة",
      hint: "انضم إلى القائمة للوصول المبكر قبل أسبوع السيارات",
      success_title: "أنت على القائمة",
      success_body: "شكرًا — سنرسل دعوتك عندما يُفتح الوصول.",
      footer: "PBCRun دليل غير رسمي وغير تابع لـ Pebble Beach Concours d’Elegance.",
      privacy_link: "الخصوصية",
      err_email: "يرجى إدخال بريد إلكتروني صالح.",
      err_consent: "يرجى الموافقة ومراجعة سياسة الخصوصية.",
      sending: "جارٍ الإرسال…",
      err_generic: "حدث خطأ. حاول مرة أخرى.",
      err_network: "خطأ في الشبكة. تحقق من الاتصال وحاول مرة أخرى.",
      privacy_title: "سياسة الخصوصية",
      privacy_back: "العودة إلى الدعوة",
      privacy_updated: "آخر تحديث: 1 أغسطس 2026",
      privacy_effective: "تاريخ السريان: 1 أغسطس 2026"
    },
    {
      privacy_intro:
        "توضح سياسة الخصوصية هذه كيف يجمع PBCRun («نحن») المعلومات الشخصية ويستخدمها ويفصح عنها ويحميها عند استخدامك pbcrun.com والصفحات ذات الصلة وقائمة انتظار الدعوات («الخدمات»). PBCRun دليل مرافق مستقل وغير رسمي مرتبط بـ Monterey Car Week / فعاليات منطقة Pebble Beach.",
      privacy_s1_title: "1. المسؤول عن المعالجة",
      privacy_s1_body:
        "المسؤول هو مشغّل PBCRun على pbcrun.com. لطلبات الخصوصية: privacy@pbcrun.com (أو jhollidayesq@gmail.com). في المنطقة الاقتصادية الأوروبية/المملكة المتحدة/سويسرا يُعد المسؤول بموجب GDPR / UK GDPR.",
      privacy_s2_title: "2. المعلومات التي نجمعها",
      privacy_s2_body:
        "قد نجمع: بيانات الاتصال (البريد مطلوب، الاسم اختياري)؛ التفضيلات؛ بيانات تقنية (IP، المتصفح، المرجع، الصفحات، الطوابع الزمنية)؛ UTM؛ رسائلك. لا يلزم حساب. لا نجمع عمدًا بيانات حساسة لقائمة الانتظار.",
      privacy_s3_title: "3. الأغراض",
      privacy_s3_body:
        "تشغيل القائمة وإرسال الدعوات/التحديثات المطلوبة؛ الرد؛ الأمان؛ تحليلات مجمّعة؛ الامتثال للقانون؛ الدفاع عن الحقوق. لا قرارات آلية ذات آثار قانونية كبيرة.",
      privacy_s4_title: "4. الأسس القانونية (GDPR)",
      privacy_s4_body:
        "الموافقة (المادة 6(1)(a))؛ المصالح المشروعة للأمان والتحليل المحدود (f)؛ الالتزام القانوني (c). يمكنك سحب الموافقة في أي وقت.",
      privacy_s5_title: "5. إشعار كاليفورنيا (CCPA/CPRA)",
      privacy_s5_body:
        "لسكان كاليفورنيا: فئات القسم 2 لأغراض القسم 3. لا نبيع البيانات ولا «نشاركها» للإعلانات السلوكية عبر السياقات. نحتفظ ثم نحذف/نُجهّل خلال فترة معقولة بعد موسم 2026 ما لم يتطلب القانون أطول.",
      privacy_s6_title: "6. حقوقك",
      privacy_s6_body:
        "الوصول والتصحيح والحذف والنقل والتقييد/الاعتراض وسحب الموافقة والشكوى؛ وحقوق CCPA في كاليفورنيا. راسل privacy@pbcrun.com بعنوان «Privacy Request».",
      privacy_s7_title: "7. المشاركة والمعالجون",
      privacy_s7_body:
        "مقدمو الاستضافة/DNS/التخزين (مثل Vercel) يعالجون البيانات وفق تعليماتنا. الإفصاح عند وجوب القانون أو للأمان. لا نبيع قائمة بريدك.",
      privacy_s8_title: "8. النقل الدولي",
      privacy_s8_body: "قد تتم المعالجة في الولايات المتحدة ودول أخرى مع ضمانات مناسبة عند اللزوم.",
      privacy_s9_title: "9. ملفات تعريف الارتباط",
      privacy_s9_body: "localStorage ضروري للغة وحالة الدعوة. لا ملفات إعلانية لطرف ثالث في هذه الصفحة.",
      privacy_s10_title: "10. الأمان",
      privacy_s10_body: "تدابير معقولة (HTTPS، ضوابط الإدارة، مكافحة البريد المزعج). لا أمان مطلق.",
      privacy_s11_title: "11. الأطفال",
      privacy_s11_body: "غير موجّه لمن هم دون 16 (أو 13). لا نجمع بيانات الأطفال عن علم.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "لا استجابة متباينة لـ DNT؛ لا تتبع إعلاني عبر المواقع هنا.",
      privacy_s13_title: "13. التغييرات",
      privacy_s13_body: "تُنشر التحديثات في هذه الصفحة بتاريخ جديد.",
      privacy_s14_title: "14. الاتصال",
      privacy_s14_body: "privacy@pbcrun.com (أو jhollidayesq@gmail.com). الموقع: https://pbcrun.com."
    }
  );

  T.ja = pack(
    {
      skip: "メインコンテンツへスキップ",
      lang_label: "言語",
      title: "PBCRun — 招待をリクエスト",
      eyebrow: "カーウィーク 2026",
      headline_line1: "あなたの同行ガイド",
      headline_to: "—",
      headline_place: "ペブルビーチ",
      days: "日",
      hours: "時間",
      mins: "分",
      secs: "秒",
      until: "カーウィーク開始まで",
      countdown_aria: "カーウィーク開始までのカウントダウン",
      request_title: "招待をリクエスト",
      email: "メール",
      email_ph: "you@domain.com",
      name: "お名前",
      optional: "（任意）",
      name_ph: "お名前",
      attending: "2026年カーウィークに参加しますか？",
      select: "選択…",
      attending_yes: "はい — 現地に行きます",
      attending_maybe: "未定",
      attending_no: "遠方からフォロー",
      platform: "ご興味",
      platform_both: "iPhoneアプリとウェブ",
      platform_ios: "iPhoneアプリ",
      platform_web: "ウェブガイド",
      consent: "PBCRunの早期アクセスについて連絡を受けることに同意し、プライバシーポリシーを読みました。",
      consent_link: "プライバシーポリシー",
      cta: "招待をリクエスト",
      hint: "カーウィーク前の早期アクセスに登録",
      success_title: "リストに登録されました",
      success_body: "ありがとうございます。アクセス開始時に招待メールをお送りします。",
      footer: "PBCRunは非公式ガイドであり、Pebble Beach Concours d’Eleganceとは提携していません。",
      privacy_link: "プライバシー",
      err_email: "有効なメールアドレスを入力してください。",
      err_consent: "同意とプライバシーポリシーの確認が必要です。",
      sending: "送信中…",
      err_generic: "エラーが発生しました。もう一度お試しください。",
      err_network: "ネットワークエラー。接続を確認して再試行してください。",
      privacy_title: "プライバシーポリシー",
      privacy_back: "招待ページへ戻る",
      privacy_updated: "最終更新: 2026年8月1日",
      privacy_effective: "施行日: 2026年8月1日"
    },
    {
      privacy_intro:
        "本ポリシーは、PBCRun（「当社」）が pbcrun.com、関連ページ、招待ウェイトリスト（「サービス」）において個人情報をどのように収集・利用・開示・保護するかを説明します。PBCRunは Monterey Car Week / ペブルビーチ地域イベントに関する独立した非公式ガイドです。",
      privacy_s1_title: "1. 管理者",
      privacy_s1_body:
        "管理者は pbcrun.com の PBCRun 運営者です。プライバシー請求: privacy@pbcrun.com（または jhollidayesq@gmail.com）。EEA/英国/スイスでは GDPR / UK GDPR 上の管理者です。",
      privacy_s2_title: "2. 収集する情報",
      privacy_s2_body:
        "連絡先（メール必須、氏名任意）、希望、技術情報（IP、ブラウザ、リファラ、ページ、時刻）、UTM、メッセージ等。アカウント不要。ウェイトリストでセンシティブデータを故意に収集しません。",
      privacy_s3_title: "3. 利用目的",
      privacy_s3_body:
        "リスト運営と依頼された招待/更新の送信、問い合わせ対応、セキュリティ、集計分析、法令遵守、権利保護。重要な法的効果を伴う自動化決定には使用しません。",
      privacy_s4_title: "4. 法的根拠（GDPR）",
      privacy_s4_body:
        "同意（6(1)(a)）、正当な利益（セキュリティ等 6(1)(f)）、法的義務（6(1)(c)）。同意はいつでも撤回可能です。",
      privacy_s5_title: "5. カリフォルニア通知（CCPA/CPRA）",
      privacy_s5_body:
        "カリフォルニア居住者向けに第2節のカテゴリを第3節の目的で収集します。販売せず、クロスコンテキスト行動広告のための「共有」もしません。2026シーズン後に合理的期間内で削除/匿名化（法令により必要な場合を除く）。",
      privacy_s6_title: "6. お客様の権利",
      privacy_s6_body:
        "アクセス、訂正、削除、移植、制限/異議、同意撤回、当局への苦情。カリフォルニアでは CCPA 権利も。件名「Privacy Request」で privacy@pbcrun.com へ。",
      privacy_s7_title: "7. 共有と処理者",
      privacy_s7_body:
        "ホスティング等（例: Vercel）は当社の指示で処理。法令または安全のため開示する場合があります。メールリストは販売しません。",
      privacy_s8_title: "8. 国際移転",
      privacy_s8_body: "米国等で処理される場合があり、必要に応じて適切な保護措置を用います。",
      privacy_s9_title: "9. Cookie",
      privacy_s9_body: "言語と招待状態のための必要な localStorage。本ページに第三者広告 Cookie はありません。",
      privacy_s10_title: "10. セキュリティ",
      privacy_s10_body: "HTTPS 等の合理的対策。完全な安全は保証できません。",
      privacy_s11_title: "11. 子ども",
      privacy_s11_body: "16歳未満（該当する場合は13歳未満）向けではありません。故意に子どもの情報を収集しません。",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "DNT に特別対応せず、本ページでクロスサイト広告追跡は行いません。",
      privacy_s13_title: "13. 変更",
      privacy_s13_body: "更新は本ページに日付とともに掲載します。",
      privacy_s14_title: "14. 連絡先",
      privacy_s14_body: "privacy@pbcrun.com（または jhollidayesq@gmail.com）。https://pbcrun.com"
    }
  );

  T.ko = pack(
    {
      skip: "본문으로 건너뛰기",
      lang_label: "언어",
      title: "PBCRun — 초대 요청",
      eyebrow: "카 위크 2026",
      headline_line1: "당신의 동반 가이드",
      headline_to: "—",
      headline_place: "페블 비치",
      days: "일",
      hours: "시간",
      mins: "분",
      secs: "초",
      until: "카 위크 시작까지",
      countdown_aria: "카 위크 시작까지 카운트다운",
      request_title: "초대 요청",
      email: "이메일",
      email_ph: "you@domain.com",
      name: "이름",
      optional: "(선택)",
      name_ph: "이름",
      attending: "2026 카 위크에 참석하시나요?",
      select: "선택…",
      attending_yes: "네 — 현장에 갑니다",
      attending_maybe: "미정",
      attending_no: "원격으로 팔로우",
      platform: "관심 플랫폼",
      platform_both: "iPhone 앱 & 웹",
      platform_ios: "iPhone 앱",
      platform_web: "웹 가이드",
      consent: "PBCRun 조기 이용 관련 연락에 동의하며 개인정보 처리방침을 읽었습니다.",
      consent_link: "개인정보 처리방침",
      cta: "초대 요청",
      hint: "카 위크 전 조기 이용을 위해 명단에 등록하세요",
      success_title: "명단에 등록되었습니다",
      success_body: "감사합니다 — 이용이 열리면 초대 이메일을 보내 드립니다.",
      footer: "PBCRun은 Pebble Beach Concours d’Elegance와 제휴하지 않은 비공식 가이드입니다.",
      privacy_link: "개인정보",
      err_email: "유효한 이메일 주소를 입력해 주세요.",
      err_consent: "동의와 개인정보 처리방침 확인이 필요합니다.",
      sending: "전송 중…",
      err_generic: "문제가 발생했습니다. 다시 시도해 주세요.",
      err_network: "네트워크 오류. 연결을 확인하고 다시 시도해 주세요.",
      privacy_title: "개인정보 처리방침",
      privacy_back: "초대 페이지로",
      privacy_updated: "최종 업데이트: 2026년 8월 1일",
      privacy_effective: "시행일: 2026년 8월 1일"
    },
    {
      privacy_intro:
        "본 방침은 PBCRun(「당사」)이 pbcrun.com, 관련 페이지 및 초대 대기자 명단(「서비스」)에서 개인정보를 수집·이용·공개·보호하는 방법을 설명합니다. PBCRun은 Monterey Car Week / 페블 비치 지역 행사와 관련된 독립·비공식 동반 가이드입니다.",
      privacy_s1_title: "1. 컨트롤러",
      privacy_s1_body:
        "컨트롤러는 pbcrun.com의 PBCRun 운영자입니다. 요청: privacy@pbcrun.com(또는 jhollidayesq@gmail.com). EEA/영국/스위스에서는 GDPR / UK GDPR상 컨트롤러입니다.",
      privacy_s2_title: "2. 수집 정보",
      privacy_s2_body:
        "연락처(이메일 필수, 이름 선택), 선호, 기술 데이터(IP, 브라우저, 리퍼러, 페이지, 시각), UTM, 메시지 등. 계정 불필요. 대기 명단에서 민감정보를 고의로 수집하지 않습니다.",
      privacy_s3_title: "3. 이용 목적",
      privacy_s3_body:
        "명단 운영 및 요청된 초대/업데이트 발송, 문의 대응, 보안, 집계 분석, 법령 준수, 권리 보호. 중대한 법적 효과를 낳는 자동 결정에 사용하지 않습니다.",
      privacy_s4_title: "4. 법적 근거(GDPR)",
      privacy_s4_body:
        "동의(6(1)(a)), 보안 등 정당한 이익(f), 법적 의무(c). 동의는 언제든 철회 가능합니다.",
      privacy_s5_title: "5. 캘리포니아 고지(CCPA/CPRA)",
      privacy_s5_body:
        "캘리포니아 주민: 2절 범주를 3절 목적으로 수집. 판매하지 않으며 cross-context 행동광고를 위한 「공유」를 하지 않습니다. 2026 시즌 후 합리적 기간 내 삭제/비식별(법령상 더 긴 보관이 필요한 경우 제외).",
      privacy_s6_title: "6. 귀하의 권리",
      privacy_s6_body:
        "열람·정정·삭제·이동·제한/거부·동의 철회·감독기관 불만. 캘리포니아는 CCPA 권리 포함. 제목 「Privacy Request」로 privacy@pbcrun.com.",
      privacy_s7_title: "7. 공유 및 처리자",
      privacy_s7_body:
        "호스팅 등(예: Vercel)은 당사 지시에 따라 처리. 법령 또는 안전을 위해 공개할 수 있습니다. 이메일 목록을 판매하지 않습니다.",
      privacy_s8_title: "8. 국제 이전",
      privacy_s8_body: "미국 등에서 처리될 수 있으며 필요 시 적절한 보호조치를 사용합니다.",
      privacy_s9_title: "9. 쿠키",
      privacy_s9_body: "언어·초대 상태용 필수 localStorage. 본 페이지에 제3자 광고 쿠키 없음.",
      privacy_s10_title: "10. 보안",
      privacy_s10_body: "HTTPS 등 합리적 조치. 절대적 보안은 없습니다.",
      privacy_s11_title: "11. 아동",
      privacy_s11_body: "16세(해당 시 13세) 미만 대상이 아닙니다. 아동 정보를 고의로 수집하지 않습니다.",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "DNT에 차별 응답 없음. 본 페이지에서 크로스사이트 광고 추적 없음.",
      privacy_s13_title: "13. 변경",
      privacy_s13_body: "업데이트는 본 페이지에 날짜와 함께 게시합니다.",
      privacy_s14_title: "14. 연락처",
      privacy_s14_body: "privacy@pbcrun.com(또는 jhollidayesq@gmail.com). https://pbcrun.com"
    }
  );

  T.zh = pack(
    {
      skip: "跳到主要内容",
      lang_label: "语言",
      title: "PBCRun — 申请邀请",
      eyebrow: "汽车周 2026",
      headline_line1: "您的同行指南",
      headline_to: "—",
      headline_place: "圆石滩",
      days: "天",
      hours: "时",
      mins: "分",
      secs: "秒",
      until: "距汽车周开始",
      countdown_aria: "距汽车周开始的倒计时",
      request_title: "申请邀请",
      email: "邮箱",
      email_ph: "you@domain.com",
      name: "姓名",
      optional: "（选填）",
      name_ph: "您的姓名",
      attending: "会参加 2026 汽车周吗？",
      select: "请选择…",
      attending_yes: "会 — 我会到场",
      attending_maybe: "可能",
      attending_no: "远程关注",
      platform: "感兴趣的平台",
      platform_both: "iPhone 应用与网页",
      platform_ios: "iPhone 应用",
      platform_web: "网页指南",
      consent: "我同意就 PBCRun 抢先体验与我联系，并已阅读隐私政策。",
      consent_link: "隐私政策",
      cta: "申请邀请",
      hint: "加入名单，在汽车周前获得抢先访问",
      success_title: "您已在名单中",
      success_body: "谢谢 — 开放访问时我们会发送邀请邮件。",
      footer: "PBCRun 是非官方指南，与 Pebble Beach Concours d’Elegance 无关联。",
      privacy_link: "隐私政策",
      err_email: "请输入有效的邮箱地址。",
      err_consent: "请同意并查看隐私政策。",
      sending: "发送中…",
      err_generic: "出错了，请重试。",
      err_network: "网络错误，请检查连接后重试。",
      privacy_title: "隐私政策",
      privacy_back: "返回邀请页",
      privacy_updated: "最后更新：2026 年 8 月 1 日",
      privacy_effective: "生效日期：2026 年 8 月 1 日"
    },
    {
      privacy_intro:
        "本政策说明 PBCRun（「我们」）在您使用 pbcrun.com、相关页面及邀请候补名单（「服务」）时如何收集、使用、披露与保护个人信息。PBCRun 是与 Monterey Car Week / 圆石滩地区活动相关的独立非官方同行指南。",
      privacy_s1_title: "1. 控制者",
      privacy_s1_body:
        "控制者为 pbcrun.com 上 PBCRun 的运营方。隐私请求：privacy@pbcrun.com（或 jhollidayesq@gmail.com）。在 EEA/英国/瑞士，其为 GDPR / UK GDPR 下的控制者。",
      privacy_s2_title: "2. 我们收集的信息",
      privacy_s2_body:
        "可能收集：联系方式（邮箱必填、姓名选填）；偏好；技术数据（IP、浏览器、来源、页面、时间戳）；UTM；您的消息。无需账户。不会故意为候补名单收集敏感信息。",
      privacy_s3_title: "3. 使用目的",
      privacy_s3_body:
        "运营名单并发送您请求的邀请/更新；回复问询；安全；汇总分析；守法；维护权利。不用于产生重大法律效果的自动化决策。",
      privacy_s4_title: "4. 法律依据（GDPR）",
      privacy_s4_body:
        "同意（第 6(1)(a) 条）；安全与有限分析的合法利益（f）；法定义务（c）。您可随时撤回同意。",
      privacy_s5_title: "5. 加州通知（CCPA/CPRA）",
      privacy_s5_body:
        "加州居民：第 2 节类别用于第 3 节目的。我们不出售，也不为跨情境行为广告而「共享」。在 2026 季后合理期限内删除/去标识（法律另有要求除外）。",
      privacy_s6_title: "6. 您的权利",
      privacy_s6_body:
        "访问、更正、删除、可携、限制/反对、撤回同意、向监管机构投诉；加州另有 CCPA 权利。请发邮件至 privacy@pbcrun.com，主题「Privacy Request」。",
      privacy_s7_title: "7. 共享与处理者",
      privacy_s7_body:
        "托管等服务商（如 Vercel）按我们的指示处理数据。法律要求或安全需要时可披露。不出售您的邮件列表。",
      privacy_s8_title: "8. 国际传输",
      privacy_s8_body: "可能在美国等地处理，必要时采取适当保障措施。",
      privacy_s9_title: "9. Cookie",
      privacy_s9_body: "用于语言与邀请状态的必要 localStorage。本页无第三方广告 Cookie。",
      privacy_s10_title: "10. 安全",
      privacy_s10_body: "合理措施（HTTPS、管理访问控制、防垃圾信息）。无法保证绝对安全。",
      privacy_s11_title: "11. 儿童",
      privacy_s11_body: "不面向 16 岁以下（或适用时 13 岁以下）。不会故意收集儿童信息。",
      privacy_s12_title: "12. Do Not Track",
      privacy_s12_body: "不对 DNT 作差异响应；本页无跨站广告跟踪。",
      privacy_s13_title: "13. 变更",
      privacy_s13_body: "更新将发布于本页并修改日期。",
      privacy_s14_title: "14. 联系",
      privacy_s14_body: "privacy@pbcrun.com（或 jhollidayesq@gmail.com）。网站：https://pbcrun.com。"
    }
  );

  function detectLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored && T[stored]) return stored;
    } catch (e) {}
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q) {
        q = q.toLowerCase().split("-")[0];
        if (q === "jp") q = "ja";
        if (q === "cn") q = "zh";
        if (q === "kr") q = "ko";
        if (T[q]) return q;
      }
    } catch (e) {}
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    nav = String(nav).toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh";
    if (nav.indexOf("ja") === 0) return "ja";
    if (nav.indexOf("ko") === 0) return "ko";
    if (nav.indexOf("ar") === 0) return "ar";
    if (nav.indexOf("ru") === 0) return "ru";
    var short = nav.split("-")[0];
    if (T[short]) return short;
    return "en";
  }

  function t(lang, key) {
    var pack = T[lang] || T.en;
    if (pack[key] != null) return pack[key];
    if (T.en[key] != null) return T.en[key];
    return key;
  }

  function applyDocumentLang(code) {
    if (!T[code]) code = "en";
    var meta = LANGS.find(function (l) {
      return l.code === code;
    }) || LANGS[0];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch (e) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", code);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {}
    return code;
  }

  function buildLangBar(container, current, onChange) {
    if (!container) return;
    container.innerHTML = "";
    container.setAttribute("role", "group");
    LANGS.forEach(function (l) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = l.label;
      btn.setAttribute("data-lang", l.code);
      btn.setAttribute("aria-label", l.code);
      btn.setAttribute("aria-pressed", l.code === current ? "true" : "false");
      btn.addEventListener("click", function () {
        onChange(l.code);
      });
      container.appendChild(btn);
    });
  }

  function updateLangBarPressed(container, code) {
    if (!container) return;
    container.querySelectorAll("button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === code ? "true" : "false");
    });
  }

  function applyI18n(root, lang) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(lang, key);
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key) el.innerHTML = t(lang, key);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(lang, key));
    });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(lang, key));
    });
  }

  var PRIVACY_KEYS = [
    "privacy_intro",
    "privacy_s1_title",
    "privacy_s1_body",
    "privacy_s2_title",
    "privacy_s2_body",
    "privacy_s3_title",
    "privacy_s3_body",
    "privacy_s4_title",
    "privacy_s4_body",
    "privacy_s5_title",
    "privacy_s5_body",
    "privacy_s6_title",
    "privacy_s6_body",
    "privacy_s7_title",
    "privacy_s7_body",
    "privacy_s8_title",
    "privacy_s8_body",
    "privacy_s9_title",
    "privacy_s9_body",
    "privacy_s10_title",
    "privacy_s10_body",
    "privacy_s11_title",
    "privacy_s11_body",
    "privacy_s12_title",
    "privacy_s12_body",
    "privacy_s13_title",
    "privacy_s13_body",
    "privacy_s14_title",
    "privacy_s14_body"
  ];

  return {
    LANGS: LANGS,
    LANG_KEY: LANG_KEY,
    T: T,
    t: t,
    detectLang: detectLang,
    applyDocumentLang: applyDocumentLang,
    buildLangBar: buildLangBar,
    updateLangBarPressed: updateLangBarPressed,
    applyI18n: applyI18n,
    PRIVACY_KEYS: PRIVACY_KEYS
  };
})();
