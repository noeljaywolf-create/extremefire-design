/* Extreme Fire Design Inc — single source of truth for shared facts.
   Every page loads this and renders contact details from it, so a number
   can only ever be changed in one place.

   !! Items marked TODO_CONFIRM are NOT verified. They are placeholders
   !! pending written confirmation from the client. Do not publish as fact. */

window.EFD_CONFIG = {
  // ---- CONTACT ----------------------------------------------------------
  // Office switchboard lines end in 270, 271, 272 and 273; dial the base line.
  phoneDisplay: '0242 488270 / 1 / 2 / 3',
  phoneDial: '+263242488270',
  // Legacy phone2 selectors refer to the primary mobile throughout the pages.
  phoneSecondaryDisplay: '0773 148 295',
  phoneSecondaryDial: '+263773148295',
  mobilePrimaryDisplay: '0773 148 295',
  mobilePrimaryDial: '+263773148295',
  mobileSecondaryDisplay: '0719 148 295',
  mobileSecondaryDial: '+263719148295',
  whatsappDisplay: '0773 148 295',
  whatsappDial: '263773148295',
  whatsappUrl: 'https://wa.me/263773148295',
  whatsappSecondaryDisplay: '0719 148 295',
  whatsappSecondaryDial: '263719148295',
  whatsappSecondaryUrl: 'https://wa.me/263719148295',

  // Email confirmed by the client.
  // the site uses today, but needs confirming as a monitored inbox.
  email: 'info@extremefire.co.zw',        // CONFIRMED by client

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
    weekday: 'Monday - Friday',
    opens: '07:30',
    closes: '16:30',
    display: 'Monday - Friday | 7:30AM - 4:30PM',},

  // ---- DOMAIN -----------------------------------------------------------
  // The production domain confirmed by the site owner.
  canonicalOrigin: 'https://extremefire.co.zw',

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
    { code: 'NFPA 13', desc: 'Sprinkler Systems', confirmed: false }, // TODO_CONFIRM
    { code: 'EN 12845', desc: 'Fixed Firefighting Systems', confirmed: false } // TODO_CONFIRM
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
