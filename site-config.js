/* Extreme Fire Design Inc — single source of truth for shared facts.
   Every page loads this and renders contact details from it, so a number
   can only ever be changed in one place.

   !! Items marked TODO_CONFIRM are NOT verified. They are placeholders
   !! pending written confirmation from the client. Do not publish as fact. */

window.EFD_CONFIG = {
  // ---- CONTACT ----------------------------------------------------------
  // TODO_CONFIRM: main landline. Three variants are in circulation:
  //   visible landing text ......... 0242488270/1/2/3   (488 270)
  //   every tel: link ............. +263242488720      (488 720)
  //   contact.html meta desc ...... 0242 488 720       (488 720)
  //   LocalBusiness schema ........ +263-24-2488270    (488 270)
  // The provisional value below is the one already present in every tel: link,
  // so tap-to-call behaviour is unchanged until you confirm. The visible text
  // 0242488270/1/2/3 looks like a digit transposition and is the likely typo.
  phoneDisplay: '0242 488 720',           // TODO_CONFIRM
  phoneDial: '+263242488720',             // TODO_CONFIRM
  phoneSecondaryDisplay: '0773 688 904',  // mobile shown in header/footer today
  phoneSecondaryDial: '+263773688904',    // TODO_CONFIRM - confirm still current
  // A fourth number, 0719 148 295, appeared in the old footer beside the
  // 0773 mobile. It has been dropped rather than guessed at.
  // TODO_CONFIRM: is 0719 148 295 still a live line?

  // WhatsApp: supplied directly by the client as the single number.
  whatsappDisplay: '0776 400 176',
  whatsappDial: '263776400176',
  whatsappUrl: 'https://wa.me/263776400176',

  // TODO_CONFIRM: email. info@extremefire.co.zw is domain-matched and is what
  // the site uses today, but needs confirming as a monitored inbox.
  email: 'info@extremefire.co.zw',        // TODO_CONFIRM

  // TODO_CONFIRM: which Facebook page is the official one.
  facebookUrl: 'https://www.facebook.com/Extreme-Fire-Design-Inc-100063570455758/', // TODO_CONFIRM

  // TODO_CONFIRM: address.
  address: {
    line1: '21566 Damofalls Industrial Area',
    city: 'Harare',
    country: 'Zimbabwe',
    // TODO_CONFIRM: geo coordinates, needed for LocalBusiness schema.
    lat: null,
    lng: null
  },

  // TODO_CONFIRM: the site currently contradicts itself:
  //   contact.html -> "Monday - Sunday | 8AM - 5PM"
  //   index.html   -> "Fire Emergency? We Respond 24/7"
  //   faq.html     -> "24/7 Support"
  // Pick ONE response promise and ONE set of hours, then use it everywhere.
  hours: {
    // TODO_CONFIRM
    opens: null,
    closes: null,
    days: null,
    // TODO_CONFIRM: e.g. "We reply to enquiries within one business day."
    responsePromise: null,
    emergency24_7: null
  },

  // ---- DOMAIN -----------------------------------------------------------
  // Canonicals currently point at https://www.extremefiredesigninc.com/ but the
  // site is served from GitHub Pages and email is @extremefire.co.zw.
  // TODO_CONFIRM: the final production domain before canonicals, og:url,
  // sitemap.xml and the 301 map are locked.
  canonicalOrigin: 'https://www.extremefiredesigninc.com', // TODO_CONFIRM

  // ---- CREDENTIALS ------------------------------------------------------
  // Rendered only when `confirmed: true`. Nothing here is confirmed yet, so the
  // Credentials strip stays hidden rather than showing unverified claims.
  credentials: [
    { label: 'FPIB-licensed sprinkler contractor', detail: 'Licence number to be confirmed', confirmed: false }, // TODO_CONFIRM
    { label: 'NFPA member', detail: 'Membership to be confirmed', confirmed: false }, // TODO_CONFIRM
    { label: 'Harare Fire Brigade registration', detail: 'Registration to be confirmed', confirmed: false } // TODO_CONFIRM
  ],

  // ---- STANDARDS --------------------------------------------------------
  // SABS, the OHS Act and ASIB have been removed pending confirmation:
  // SABS and ASIB are South African bodies, not Zimbabwean regulators.
  // TODO_CONFIRM: replace with the Zimbabwean standard actually used (SAZ?).
  standards: [
    { code: 'NFPA 13', desc: 'Sprinkler Systems', confirmed: true },
    { code: 'EN 12845', desc: 'Fixed Firefighting Systems', confirmed: true }
    // TODO_CONFIRM: add the Zimbabwean standard/site-specific standard used.
  ],

  // ---- CLIENTS ----------------------------------------------------------
  // Hidden by default. Only add a client once written permission is on file.
  // TODO_CONFIRM: written client permission for each logo.
  clients: [
    // { name: 'Client name', permissionConfirmed: true }
  ],

  // ---- STATISTICS -------------------------------------------------------
  // Left null so the counters do not render. Replace with audited figures only.
  stats: {
    projectsCompleted: null,  // TODO_CONFIRM
    yearsOperating: null,     // site references 2012 elsewhere - confirm
    industriesServed: null,   // TODO_CONFIRM
    clientsServed: null       // TODO_CONFIRM
  },

  // ---- TESTIMONIALS -----------------------------------------------------
  // Deliberately empty. The previous four five-star reviews on the homepage
  // named real-seeming people and were not verifiable, so they were removed.
  // Add entries only from a real, written, permission-confirmed quote.
  //   { name, role, company, quote, permissionConfirmed: true }
  testimonials: [],

  // ---- SERVICE AREA -----------------------------------------------------
  serviceAreas: ['Harare', 'Bulawayo']
};
