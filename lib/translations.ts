export type L = { es: string; en: string }

export interface ProjectItem {
  logoSrc: string
  logoAlt: string
  invertLogo?: boolean
  name: string
  category: L
  pain?: L
  done: L
  url: string
}

export const t = {
  nav: {
    projects:   { es: 'Proyectos', en: 'Projects' },
    pricing:    { es: 'Precios',   en: 'Pricing'  },
    faq:        { es: 'Preguntas', en: 'FAQ'      },
    cta:        { es: 'Diagnóstico gratis', en: 'Free assessment' },
    ctaShort:   { es: 'Diagnóstico',        en: 'Assessment'      },
    langToggle: { es: 'EN', en: 'ES' },
  },

  cta: {
    start: { es: 'Hacer mi diagnóstico gratis', en: 'Take my free assessment' },
    trust: { es: '2 minutos · Sin costo · Resultado al instante', en: '2 minutes · Free · Instant results' },
  },

  hero: {
    eyebrow: {
      es: 'Para hospedajes, tours y rent a car en Costa Rica',
      en: 'For lodges, tours and car rentals in Costa Rica',
    },
    h1: {
      es: 'Reservas directas, sin comisión, en su WhatsApp.',
      en: 'Direct bookings, commission-free, right on your WhatsApp.',
    },
    sub: {
      es: 'Instalo en 14 días un sistema para que los turistas lo encuentren en Google, entiendan su oferta en su idioma y le reserven a usted, no a la plataforma.',
      en: 'In 14 days, I set up a system so travelers find you on Google, understand your offer in their own language, and book with you — not with the platform.',
    },
    secondary: { es: 'Ver proyectos', en: 'See projects' },
    chat: {
      contact: { es: 'Cliente nuevo', en: 'New guest' },
      status:  { es: 'en línea',      en: 'online'    },
      today:   { es: 'Hoy',           en: 'Today'     },
      input:   { es: 'Mensaje',       en: 'Message'   },
      msg: {
        es: 'Hola, quiero reservar del 12 al 15 de diciembre para 2 personas',
        en: "Hi, I'd like to book December 12–15 for 2 people",
      },
      time: '22:04',
    },
  },

  logos: {
    label: { es: 'Proyectos en producción', en: 'Live projects' },
  },

  problem: {
    h2: {
      es: 'Los turistas lo buscan, pero no logran reservarle directo.',
      en: "Travelers look for you, but they can't book with you directly.",
    },
    points: [
      {
        es: 'El turista lo busca en Google y encuentra una plataforma de reservas, o al vecino que sí aparece.',
        en: 'Travelers search for you on Google and find a booking platform — or the neighbor who does show up.',
      },
      {
        es: 'Le escribe por WhatsApp a las 10 p. m. y, cuando usted responde, ya reservó en otro lado.',
        en: "They message you on WhatsApp at 10 p.m., and by the time you reply, they've already booked somewhere else.",
      },
      {
        es: 'Cada reserva por plataforma le deja una comisión menos en la mano.',
        en: 'Every platform booking leaves you a commission short.',
      },
    ],
    closing: {
      es: 'Lo peor no es la comisión. Es sentir que su negocio depende de reglas que usted no controla.',
      en: "The worst part isn't the commission. It's feeling that your business depends on rules you don't control.",
    },
  },

  solution: {
    h2: {
      es: 'No necesita otra página web. Necesita un sistema de reservas.',
      en: "You don't need another website. You need a booking system.",
    },
    colA: { es: 'Una web común',           en: 'A typical website'     },
    colB: { es: 'Sistema Reserva Directa', en: 'Direct Booking System' },
    rows: [
      {
        a: { es: 'Muestra fotos y un teléfono', en: 'Shows photos and a phone number' },
        b: { es: 'Lleva al turista hasta el mensaje de reserva', en: 'Takes the traveler all the way to the booking message' },
      },
      {
        a: { es: 'Solo en español', en: 'Spanish only' },
        b: { es: 'Bilingüe, pensado para el turista extranjero', en: 'Bilingual, built for international travelers' },
      },
      {
        a: { es: 'Nadie la encuentra', en: 'Nobody finds it' },
        b: { es: 'Ficha de Google lista para aparecer en búsquedas locales', en: 'Google Business Profile ready to show up in local searches' },
      },
      {
        a: { es: 'No sabe si funciona', en: "You don't know if it works" },
        b: { es: 'Reporte mensual con visitas, clics y reservas', en: 'Monthly report with visits, clicks and bookings' },
      },
      {
        a: { es: 'Se entrega y se olvida', en: 'Delivered and forgotten' },
        b: { es: 'Mantenimiento y cambios incluidos cada mes', en: 'Maintenance and changes included every month' },
      },
    ],
  },

  projects: {
    title: { es: 'Lo que he construido', en: 'What I have built' },
    sub: {
      es: 'Negocios reales que tenían el mismo problema que usted.',
      en: 'Real businesses that had the same problem you do.',
    },
    labels: {
      pain:  { es: 'El problema', en: 'The problem' },
      done:  { es: 'Qué se hizo', en: 'What we did' },
      visit: { es: 'Ver sitio →', en: 'Visit site →' },
    },
    items: [
      {
        logoSrc: '/logos/sloth.png',
        logoAlt: 'Sloth RentACar',
        invertLogo: true,
        name: 'Sloth RentACar',
        category: { es: 'Rent a car', en: 'Car rental' },
        pain: {
          es: 'Las reservas dependían de mensajes y plataformas.',
          en: 'Bookings depended on messages and platforms.',
        },
        done: {
          es: 'Se creó un sistema bilingüe con reserva directa a WhatsApp, entregado en 10 días.',
          en: 'We built a bilingual system with direct booking to WhatsApp, delivered in 10 days.',
        },
        url: 'https://slothrentacar.com',
      },
      {
        logoSrc: '/logos/logofbv.png',
        logoAlt: 'Finca Buena Vista',
        name: 'Finca Buena Vista Turrialba',
        category: { es: 'Hospedaje', en: 'Lodging' },
        pain: {
          es: 'El huésped tenía que pasar por plataformas para reservar.',
          en: 'Guests had to go through platforms to book.',
        },
        done: {
          es: 'Se creó una página de un solo objetivo: reservar directo.',
          en: 'We built a page with a single goal: booking direct.',
        },
        url: 'https://fincabuenavistaturrialba.com',
      },
      {
        logoSrc: '/logos/serenia.png',
        logoAlt: 'Serenia CR',
        name: 'Serenia CR',
        category: { es: 'Bienestar', en: 'Wellness' },
        pain: {
          es: 'Los clientes preguntaban lo mismo antes de agendar.',
          en: 'Clients kept asking the same questions before booking.',
        },
        done: {
          es: 'Se creó una página que responde antes de que pregunten.',
          en: 'We built a page that answers before they ask.',
        },
        url: 'https://sereniacr.com',
      },
      {
        logoSrc: '/logos/fma.png',
        logoAlt: 'FitManage',
        name: 'FitManage',
        category: { es: 'Software propio', en: 'Own software' },
        done: {
          es: 'Plataforma para entrenadores personales con más de 10,000 usuarios en Latinoamérica, en producción desde 2023. Prueba de que construyo sistemas, no solo páginas.',
          en: 'A platform for personal trainers with more than 10,000 users across Latin America, live since 2023. Proof that I build systems, not just pages.',
        },
        url: 'https://fitmanage.app',
      },
    ] satisfies ProjectItem[] as ProjectItem[],
  },

  howItWorks: {
    title: { es: 'Cómo funciona', en: 'How it works' },
    steps: [
      {
        num: '01',
        title: { es: 'Haga el diagnóstico gratis', en: 'Take the free assessment' },
        desc: {
          es: '2 minutos y sabe cuántas reservas está dejando pasar y qué plan le corresponde.',
          en: "In 2 minutes you'll know how many bookings you're missing and which plan fits you.",
        },
      },
      {
        num: '02',
        title: { es: 'En 14 días publico su sistema', en: 'Your system goes live in 14 days' },
        desc: {
          es: 'Usted me da una llamada de 45 minutos y sus fotos; yo hago todo lo demás y usted aprueba antes de publicar.',
          en: 'You give me a 45-minute call and your photos. I handle everything else, and you approve it before it goes live.',
        },
      },
      {
        num: '03',
        title: { es: 'Recibe reservas en su WhatsApp', en: 'Bookings arrive on your WhatsApp' },
        desc: {
          es: 'Cada mes le envío un reporte con lo que le trajo el sistema.',
          en: 'Every month I send you a report showing what the system brought in.',
        },
      },
    ],
  },

  offer: {
    h2: {
      es: 'Todo lo que incluye el Sistema Reserva Directa',
      en: 'Everything included in the Direct Booking System',
    },
    items: [
      {
        label: {
          es: 'Sitio de reservas bilingüe (página principal + una por habitación o tour)',
          en: 'Bilingual booking site (home page + one page per room or tour)',
        },
        value: '$1,200',
      },
      {
        label: { es: 'Ficha de Google lista para vender', en: 'Google Business Profile set up to sell' },
        value: '$250',
      },
      {
        label: { es: 'Medición y reporte del primer mes', en: 'Tracking and first-month report' },
        value: '$150',
      },
      {
        label: { es: '30 días de ajustes ilimitados', en: '30 days of unlimited adjustments' },
        value: '$200',
      },
    ],
    totalLabel:  { es: 'Valor total',  en: 'Total value'     },
    total: '$1,800',
    investLabel: { es: 'Su inversión', en: 'Your investment' },
    invest: { es: '$990 + $59/mes', en: '$990 + $59/month' },
    guaranteeLabel: { es: 'Garantía de entrega', en: 'On-time delivery guarantee' },
    guaranteeText: {
      es: 'Si su sistema no está publicado en 14 días hábiles desde que recibo sus fotos y textos, el primer mes de mensualidad va por mi cuenta. El dominio y el contenido son suyos: si un día se va, se lleva todo.',
      en: "If your system isn't live within 14 business days of receiving your photos and copy, your first month is on me. The domain and content are yours: if you ever leave, you take everything with you.",
    },
  },

  packages: {
    title: { es: '¿Cuál es su situación?', en: 'Which one fits you?' },
    subtitle: {
      es: 'Si no sabe cuál elegir, el diagnóstico gratis se lo dice en 2 minutos.',
      en: "If you're not sure which to choose, the free assessment will tell you in 2 minutes.",
    },
    recommended: { es: 'Recomendado', en: 'Recommended' },
    cta: { es: 'Ver si es para mí', en: 'See if it fits me' },
    items: [
      {
        name: { es: 'Esencial', en: 'Essential' },
        price: { es: '$590 + $39/mes', en: '$590 + $39/month' },
        forWho: {
          es: 'Para quien empieza de cero y necesita aparecer.',
          en: 'For businesses starting from scratch that need to be found.',
        },
        includes: {
          es: ['Sitio de una página', 'Ficha de Google', 'Botón de WhatsApp'],
          en: ['One-page website', 'Google Business Profile', 'WhatsApp button'],
        },
      },
      {
        name: { es: 'Reserva Directa', en: 'Direct Booking' },
        price: { es: '$990 + $59/mes', en: '$990 + $59/month' },
        forWho: {
          es: 'Para quien quiere reservas propias cada mes.',
          en: 'For businesses that want their own bookings every month.',
        },
        includes: {
          es: ['Todo lo de la oferta', 'Garantía de entrega en 14 días'],
          en: ['Everything in the offer', '14-day delivery guarantee'],
        },
      },
      {
        name: { es: 'Reserva Directa + Anuncios', en: 'Direct Booking + Ads' },
        price: { es: '$990 + $59/mes', en: '$990 + $59/month' },
        priceNote: {
          es: '+ $250/mes de gestión (la pauta va aparte)',
          en: '+ $250/month management (ad spend not included)',
        },
        forWho: {
          es: 'Para quien ya recibe reservas y quiere más volumen.',
          en: 'For businesses already getting bookings that want more volume.',
        },
        includes: {
          es: ['Todo lo anterior', 'Gestión de Meta o Google Ads'],
          en: ['Everything above', 'Meta or Google Ads management'],
        },
      },
    ],
    custom: {
      es: '¿Su negocio no es turístico o necesita una herramienta propia? Sistema a medida, desde $5,000.',
      en: "Not a tourism business, or need a tool of your own? Custom system, from $5,000.",
    },
    note: {
      es: 'La mensualidad incluye hosting, dominio, seguridad, hasta 1 hora de cambios al mes y el reporte mensual.',
      en: 'The monthly fee includes hosting, domain, security, up to 1 hour of changes per month and the monthly report.',
    },
  },

  about: {
    p1: {
      es: 'Soy Jefferson, programador de Turrialba. Fundé FitManage, un software que hoy usan más de 10,000 entrenadores en Latinoamérica.',
      en: "I'm Jefferson, a developer from Turrialba. I founded FitManage, software now used by more than 10,000 trainers across Latin America.",
    },
    p2: {
      es: 'Ahí aprendí que la gente no compra cuando la página es bonita: compra cuando encuentra respuestas antes de tener que preguntar. Hoy aplico eso para que negocios turísticos como el suyo reciban reservas propias.',
      en: "That's where I learned that people don't buy because a page looks nice — they buy when they find answers before they have to ask. Today I apply that so tourism businesses like yours get bookings of their own.",
    },
  },

  faq: {
    title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
    questions: [
      {
        q: { es: 'Ya estoy en plataformas de reservas, ¿para qué necesito esto?', en: "I'm already on booking platforms. Why do I need this?" },
        a: {
          es: 'No reemplaza las plataformas. Recupera al huésped que repite y al que lo busca por su nombre, que hoy reserva por la plataforma y le cuesta comisión.',
          en: "It doesn't replace the platforms. It wins back repeat guests and the people who search for you by name — guests who today book through a platform and cost you a commission.",
        },
      },
      {
        q: { es: 'Ya pagué una web y no sirvió.', en: "I already paid for a website and it didn't work." },
        a: {
          es: 'Por eso no le entrego solo una página: le entrego un sistema pensado para que el turista llegue hasta el mensaje de reserva, con un reporte mensual para que vea qué le trae.',
          en: "That's why I don't just hand you a page: I deliver a system designed to take travelers all the way to the booking message, with a monthly report so you can see what it brings in.",
        },
      },
      {
        q: { es: 'No sé nada de tecnología.', en: "I don't know anything about tech." },
        a: {
          es: 'No tiene que tocar nada. Los cambios me los pide por WhatsApp.',
          en: "You don't have to touch a thing. Just send me any changes on WhatsApp.",
        },
      },
      {
        q: { es: '¿Y si no recibo reservas?', en: "What if I don't get any bookings?" },
        a: {
          es: 'Cada mes le envío un reporte con visitas, clics y reservas, y con esa información ajustamos lo que no esté funcionando. La mensualidad incluye hasta 1 hora de cambios al mes.',
          en: "Every month I send you a report with visits, clicks and bookings, and we use it to adjust whatever isn't working. The monthly fee includes up to 1 hour of changes per month.",
        },
      },
      {
        q: { es: '¿El dominio es mío?', en: 'Is the domain mine?' },
        a: { es: 'Sí, siempre.', en: 'Yes, always.' },
      },
      {
        q: { es: '¿Cuánto tarda?', en: 'How long does it take?' },
        a: {
          es: '14 días hábiles desde que recibo fotos y textos.',
          en: '14 business days from when I receive your photos and copy.',
        },
      },
      {
        q: { es: '¿Funciona con mi número de WhatsApp?', en: 'Does it work with my WhatsApp number?' },
        a: { es: 'Sí, con su número actual.', en: 'Yes, with your current number.' },
      },
      {
        q: { es: '¿Trabaja fuera de Turrialba?', en: 'Do you work outside Turrialba?' },
        a: { es: 'Sí, en todo Costa Rica.', en: 'Yes, anywhere in Costa Rica.' },
      },
    ],
  },

  diagnosticSection: {
    h2: { es: 'Diagnóstico gratis', en: 'Free assessment' },
    sub: {
      es: 'Responda 8 preguntas y sepa cuántas reservas se le están escapando y qué plan le corresponde.',
      en: "Answer 8 questions and find out how many bookings are slipping away and which plan fits you.",
    },
  },

  contactCta: {
    h2: {
      es: 'Cada temporada sin un canal propio es margen que se queda en la plataforma.',
      en: 'Every season without your own booking channel is margin left on the platform.',
    },
  },

  footer: {
    left:      { es: 'Jefferson López · 2026', en: 'Jefferson López · 2026' },
    fitmanage: { es: 'FitManage.app', en: 'FitManage.app' },
    cr:        { es: 'Hecho en Costa Rica 🇨🇷', en: 'Made in Costa Rica 🇨🇷' },
  },
}

// ── Diagnóstico interactivo ─────────────────────────────────────────

export const diag = {
  questions: [
    {
      q: { es: '¿Qué tipo de negocio tiene?', en: 'What kind of business do you run?' },
      options: [
        { es: 'Hospedaje (cabinas, hotel, finca, glamping)', en: 'Lodging (cabins, hotel, farm stay, glamping)' },
        { es: 'Tours o actividades', en: 'Tours or activities' },
        { es: 'Rent a car', en: 'Car rental' },
        { es: 'Otro tipo de negocio', en: 'Another type of business' },
      ],
    },
    {
      q: { es: '¿Por dónde le llega la mayoría de sus reservas?', en: 'Where do most of your bookings come from?' },
      options: [
        { es: 'Booking, Airbnb o Expedia', en: 'Booking, Airbnb or Expedia' },
        { es: 'WhatsApp o Instagram', en: 'WhatsApp or Instagram' },
        { es: 'Gente que llega o referidos', en: 'Walk-ins or referrals' },
        { es: 'Casi no me llegan reservas', en: 'I barely get any bookings' },
      ],
    },
    {
      q: { es: '¿Tiene página web hoy?', en: 'Do you have a website today?' },
      options: [
        { es: 'No', en: 'No' },
        { es: 'Sí, pero casi no me trae reservas', en: 'Yes, but it barely brings in bookings' },
        { es: 'Sí, y me trae algunas reservas', en: 'Yes, and it brings in some bookings' },
      ],
    },
    {
      q: {
        es: 'Si alguien busca su tipo de negocio en su zona en Google, ¿aparece?',
        en: 'If someone searches Google for your type of business in your area, do you show up?',
      },
      options: [
        { es: 'Sí, de los primeros', en: 'Yes, near the top' },
        { es: 'Aparezco, pero abajo', en: 'I show up, but further down' },
        { es: 'No sé', en: "I'm not sure" },
        { es: 'No aparezco', en: "I don't show up" },
      ],
    },
    {
      q: {
        es: '¿Cuánto tarda normalmente en responder un WhatsApp de un cliente?',
        en: 'How long does it usually take you to reply to a customer on WhatsApp?',
      },
      options: [
        { es: 'Menos de 15 minutos', en: 'Under 15 minutes' },
        { es: 'Entre 1 y 3 horas', en: '1 to 3 hours' },
        { es: 'El mismo día', en: 'Same day' },
        { es: 'Al día siguiente o más', en: 'Next day or later' },
      ],
    },
    {
      q: { es: '¿Cuánto cuesta en promedio una reserva en su negocio?', en: "What's the average value of a booking at your business?" },
      options: [
        { es: 'Menos de $100', en: 'Under $100' },
        { es: '$100–300', en: '$100–300' },
        { es: '$300–600', en: '$300–600' },
        { es: 'Más de $600', en: 'Over $600' },
      ],
    },
    {
      q: { es: 'En temporada alta, ¿cuántas reservas recibe al mes?', en: 'In high season, how many bookings do you get per month?' },
      options: [
        { es: 'Menos de 10', en: 'Fewer than 10' },
        { es: '10–30', en: '10–30' },
        { es: '30–60', en: '30–60' },
        { es: 'Más de 60', en: 'More than 60' },
      ],
    },
    {
      q: { es: '¿Qué quiere lograr en los próximos 3 meses?', en: 'What do you want to achieve in the next 3 months?' },
      options: [
        { es: 'Aparecer en Google y empezar a recibir reservas directas', en: 'Show up on Google and start getting direct bookings' },
        { es: 'Recibir reservas directas cada mes y depender menos de las plataformas', en: 'Get direct bookings every month and rely less on platforms' },
        { es: 'Ya recibo reservas directas, quiero más volumen con anuncios', en: 'I already get direct bookings — I want more volume with ads' },
      ],
    },
  ],

  // Nombre corto del tipo de negocio para el titular del resultado
  typeShort: [
    { es: 'Hospedaje', en: 'Lodging' },
    { es: 'Tours o actividades', en: 'Tours and activities' },
    { es: 'Rent a car', en: 'Car rental' },
    { es: 'Otro tipo de negocio', en: 'Other business' },
  ],

  ui: {
    progress: { es: 'Pregunta {n} de {total}', en: 'Question {n} of {total}' },
    back:     { es: 'Atrás',  en: 'Back'  },
    close:    { es: 'Cerrar', en: 'Close' },
    resultStep:  { es: 'Su resultado', en: 'Your result' },
    contactStep: { es: 'Último paso',  en: 'Last step'   },
  },

  analyzing: [
    { es: 'Revisando cómo le llegan sus reservas…', en: 'Reviewing how your bookings come in…' },
    { es: 'Calculando las reservas que se le escapan…', en: "Calculating the bookings you're missing…" },
    { es: 'Eligiendo el plan para su negocio…', en: 'Choosing the right plan for your business…' },
  ],

  result: {
    eyebrow: { es: 'Su diagnóstico', en: 'Your assessment' },
    titleMany: {
      es: '{type}: se le podrían estar escapando unas {n} reservas al mes.',
      en: '{type}: you could be missing around {n} bookings a month.',
    },
    titleOne: {
      es: '{type}: se le podría estar escapando al menos una reserva al mes.',
      en: '{type}: you could be missing at least one booking a month.',
    },
    yearly:   { es: 'al año', en: 'a year' },
    estimate: { es: 'Estimación basada en sus respuestas.', en: 'Estimate based on your answers.' },
    platformNote: {
      es: 'Además, por cada reserva de plataforma paga una comisión que podría quedarse usted.',
      en: 'On top of that, every platform booking pays a commission you could keep.',
    },
    findingsLabel: { es: 'Lo que encontramos', en: 'What we found' },
    transformation: {
      es: 'Con el Sistema Reserva Directa, los turistas lo encuentran, entienden su oferta en su idioma y le reservan directo en su WhatsApp.',
      en: 'With the Direct Booking System, travelers find you, understand your offer in their own language, and book directly on your WhatsApp.',
    },
    planLabel:   { es: 'Su plan recomendado', en: 'Your recommended plan' },
    investLabel: { es: 'Inversión',           en: 'Investment'            },
    guarantee: {
      es: 'Incluye la garantía de entrega: si su sistema no está publicado en 14 días hábiles desde que recibo sus fotos y textos, el primer mes de mensualidad va por mi cuenta.',
      en: "Includes the on-time delivery guarantee: if your system isn't live within 14 business days of receiving your photos and copy, your first month is on me.",
    },
    cta:     { es: 'Agendar mi primera reunión', en: 'Book my first meeting' },
    restart: { es: 'Empezar de nuevo',           en: 'Start over'            },
  },

  findings: {
    noWeb:         { es: 'Los turistas que lo buscan no tienen dónde reservarle directo.', en: 'Travelers looking for you have nowhere to book with you directly.' },
    weakWeb:       { es: 'Su web no está llevando al turista hasta la reserva.', en: "Your website isn't taking travelers all the way to a booking." },
    googleNo:      { es: 'Cuando lo buscan en Google, la reserva se la lleva otro.', en: 'When people search for you on Google, someone else gets the booking.' },
    googleLow:     { es: 'Aparece en Google, pero debajo de quienes se llevan la reserva.', en: 'You show up on Google, but below the ones getting the bookings.' },
    googleUnknown: { es: 'Si no sabe si aparece en Google, lo más probable es que esas búsquedas se las lleve otro.', en: "If you don't know whether you show up on Google, chances are someone else is getting those searches." },
    slow:          { es: 'Cada hora sin responder es una reserva que se enfría.', en: 'Every hour without a reply is a booking going cold.' },
    platforms:     { es: 'La mayoría de sus reservas pagan comisión.', en: 'Most of your bookings pay a commission.' },
    fewBookings:   { es: 'Hoy casi no le llegan reservas: su negocio no está en el camino del turista.', en: "You barely get bookings today: your business isn't on the traveler's path." },
    solid:         { es: 'Su base es buena: el siguiente paso es convertirla en reservas directas cada mes.', en: 'You have a solid base: the next step is turning it into direct bookings every month.' },
  },

  plans: {
    esencial: {
      name: { es: 'Esencial', en: 'Essential' },
      summary: { es: 'Sitio de una página, ficha de Google y botón de WhatsApp.', en: 'One-page website, Google Business Profile and WhatsApp button.' },
      price: { es: '$590 + $39/mes', en: '$590 + $39/month' },
      investPhrase: { es: 'de $590 + $39/mes', en: '$590 + $39/month' },
      guarantee: false,
    },
    reserva: {
      name: { es: 'Reserva Directa', en: 'Direct Booking' },
      summary: {
        es: 'Sitio de reservas bilingüe, ficha de Google, medición y reporte mensual.',
        en: 'Bilingual booking site, Google Business Profile, tracking and monthly report.',
      },
      price: { es: '$990 + $59/mes', en: '$990 + $59/month' },
      investPhrase: { es: 'de $990 + $59/mes', en: '$990 + $59/month' },
      guarantee: true,
    },
    anuncios: {
      name: { es: 'Reserva Directa + Anuncios', en: 'Direct Booking + Ads' },
      summary: {
        es: 'Todo lo de Reserva Directa + gestión de Meta o Google Ads.',
        en: 'Everything in Direct Booking + Meta or Google Ads management.',
      },
      price: { es: '$990 + $59/mes + $250/mes de gestión (la pauta va aparte)', en: '$990 + $59/month + $250/month management (ad spend not included)' },
      investPhrase: { es: 'de $990 + $59/mes + $250/mes de gestión', en: '$990 + $59/month + $250/month management' },
      guarantee: true,
    },
    medida: {
      name: { es: 'Sistema a medida', en: 'Custom system' },
      summary: {
        es: 'Una herramienta hecha para la operación de su negocio.',
        en: "A tool built around how your business operates.",
      },
      price: { es: 'Desde $5,000', en: 'From $5,000' },
      investPhrase: { es: 'desde $5,000', en: 'from $5,000' },
      guarantee: false,
    },
  },

  contact: {
    intro: {
      es: 'Va a pasar directo al WhatsApp de nuestro equipo para agendar su primera reunión e iniciar el trabajo. Su plan recomendado es {plan} — inversión {price}.',
      en: "You'll go straight to our team's WhatsApp to book your first meeting and get started. Your recommended plan is {plan} — investment {price}.",
    },
    name:     { es: 'Nombre',             en: 'Name'             },
    business: { es: 'Nombre del negocio', en: 'Business name'    },
    phone:    { es: 'Teléfono',           en: 'Phone'            },
    email:    { es: 'Email (opcional)',   en: 'Email (optional)' },
    consent:  { es: 'Conozco la inversión del plan recomendado.', en: 'I understand the investment for the recommended plan.' },
    submit:   { es: 'Continuar a WhatsApp', en: 'Continue to WhatsApp' },
    errFields:  { es: 'Complete su nombre, el nombre del negocio y su teléfono.', en: 'Please fill in your name, business name and phone.' },
    errConsent: { es: 'Confirme que conoce la inversión del plan recomendado.', en: 'Please confirm you understand the investment for the recommended plan.' },
    errEmail:   { es: 'Revise el email o déjelo en blanco.', en: 'Please check your email or leave it blank.' },
  },

  // Plantilla del mensaje de WhatsApp. {campos} se reemplazan al enviar.
  message: {
    es: `Hola Jefferson, hice el diagnóstico en su web.
Nombre: {name}
Negocio: {business} ({type})
Teléfono: {phone}
Email: {email}
Reservas llegan por: {a2}
Web: {a3} · Google: {a4} · Respuesta WhatsApp: {a5}
Precio promedio: {a6} · Reservas/mes: {a7}
Meta: {a8}
Resultado: {result}
Plan recomendado: {plan} — {price}
Conozco la inversión y quiero agendar la primera reunión.`,
    en: `Hi Jefferson, I took the assessment on your website.
Name: {name}
Business: {business} ({type})
Phone: {phone}
Email: {email}
Bookings come from: {a2}
Website: {a3} · Google: {a4} · WhatsApp reply time: {a5}
Average booking: {a6} · Bookings/month: {a7}
Goal: {a8}
Result: {result}
Recommended plan: {plan} — {price}
I understand the investment and want to book the first meeting.`,
  },
  resultLine: {
    es: '~{n} reservas/mes que se escapan (~{amount}/año)',
    en: '~{n} bookings/month slipping away (~{amount}/year)',
  },
}
