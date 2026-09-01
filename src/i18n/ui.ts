export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const languageNames = languages;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    seo: {
      title: 'Jesus Blanco — Senior Frontend Consultant',
      description: 'Portfolio of Jesus Blanco, Senior Frontend Consultant.',
      jobTitle: 'Senior Frontend Consultant',
    },
    nav: {
      theme: {
        light: 'Light',
        dark: 'Dark',
        toggleAria: 'Toggle theme',
      },
      language: {
        aria: 'Select language',
      },
    },
    header: {
      availability: 'Booking new projects',
      role: 'Senior Frontend Consultant',
      tagline: '8 years engineering complex web applications where architectural rigor meets high-fidelity UI.',
      capabilities: ['Design Systems', 'Data-viz', 'React', 'Vue', 'TypeScript'],
      signature: "I'm JB",
      ctaCv: 'Download CV',
      ctaWork: 'View featured work',
    },
    about: {
      label: 'About Me',
      heading: 'An Evolution, The Only Way',
      attribution: 'A line I borrowed from “Dreary Moon” — Big Black Delta',
      intro: [
        "From an early age I've felt a deep curiosity about the world — the kind that made me a self-taught learner long before it made me an engineer. Discovering programming in high school gave that restlessness a purpose, and I've been pointing it at the vast universe of technology ever since.",
        'That curiosity shapes how I build. I look beyond the spec to preserve the intent behind each interaction, paying close attention to visual detail and motion.',
      ],
      belief: 'The key, I have always believed, is to never stop evolving — and I bring that mindset to everything I build.',
      areasLabel: 'Key Consulting Areas',
      areas: [
        {
          title: 'Modernization Strategy',
          body: 'Migration paths for legacy systems into high-performance architectures — without compromising business stability.',
        },
        {
          title: 'Design Integrity & Product Fidelity',
          body: 'Closing the gap between Figma and technical reality: components that respect brand aesthetics and improve retention through meticulous detail.',
        },
        {
          title: 'Complex Data Architecture',
          body: 'Visualization systems that turn dense metrics and analytics into intuitive, efficient navigation.',
        },
        {
          title: 'Design System Governance',
          body: 'Component libraries and standards that let products scale consistently while cutting future development cost.',
        },
      ],
    },
    experience: {
      label: 'Career Log',
      heading: 'The Trajectory',
      intro: 'Platform modernization, reusable UI systems, and data visualization — a closer look at my contribution in each role.',
      present: 'Present',
      stackLabel: 'Stack',
      roles: [
        {
          period: 'Mar 2025 — Present',
          role: 'Senior Frontend Developer',
          company: 'Freelance',
          current: true,
          summary:
            'Front-end architecture and UI/UX for four clients: a remittance-operations single source of truth with scope-based permissions, a QuickBooks-integrated finance module, an audit and refactor of an AI-generated front-end, and a Figma-to-code marketing site.',
          stack: ['Next.js', 'TypeScript', 'GraphQL', 'Astro'],
          metric: '4 clients',
        },
        {
          period: 'May 2022 — Mar 2025',
          role: 'Senior Frontend Developer',
          company: 'Elion Partners',
          current: false,
          summary:
            'Built a headless React/TypeScript component library that cut manual development time once stabilized, powering an analytics platform used across the firm. Delivered five interconnected apps and led a front-end migration.',
          stack: ['React', 'Next.js', 'TypeScript', 'Storybook'],
          metric: '~50–70% faster',
        },
        {
          period: 'Sep 2021 — May 2022',
          role: 'Frontend Developer',
          company: 'White Peak Tech',
          current: false,
          summary:
            'Modernized a public crowdfunding platform for real estate and art, migrating a legacy Django/HTML system to Vue/Nuxt and reducing legacy code to email templates only.',
          stack: ['Vue', 'Nuxt', 'GraphQL'],
          metric: 'Django → Nuxt',
        },
        {
          period: 'Aug 2020 — Sep 2021',
          role: 'Frontend Developer',
          company: 'Legal Credit Solutions',
          current: false,
          summary:
            'Co-architected a Vue design system — inputs, layout, and data-display components with full variants — unifying UI across multiple fintech products under one brand.',
          stack: ['Vue', 'Nuxt', 'Storybook'],
          metric: '30 components',
        },
        {
          period: 'Nov 2018 — Jun 2020',
          role: 'Junior Frontend Developer',
          company: 'White Peak Tech',
          current: false,
          summary:
            'Delivered dashboards, data-visualization maps, and landing pages, and built interactive prototypes for real-estate and art investment products.',
          stack: ['Vue', 'JavaScript', 'HTML5'],
          metric: '',
        },
      ],
    },
    projects: {
      label: 'Featured Work',
      filterAll: 'All Projects',
      filters: {
        react: 'React',
        vue: 'Vue.js',
        typescript: 'TypeScript',
      },
      empty: 'No projects match this filter yet.',
      viewProject: 'View Project →',
      viewProjectAria: 'View',
      demoUnavailable: 'Demo Unavailable',
      previousAria: 'Previous project',
      nextAria: 'Next project',
      featuredFallback: 'Featured Project',
      explore: 'Select a case study',
      viewing: 'Viewing',
      fields: {
        role: 'Role',
        challenge: 'Challenge',
        decision: 'Key decision',
      },
      viewCaseStudy: 'View case study →',
      viewAllWork: 'View all work',
      // Redacted-dossier plate shown for NDA client work that can't ship a public screenshot.
      confidential: {
        marker: 'Confidential',
        markerShort: 'NDA',
        note: 'Client work · under NDA',
        aria: 'Confidential client work — no public preview available',
      },
      index: {
        home: 'Home',
        label: 'Project Index',
        filterLabel: 'Filter by technology',
        heading: 'All Work',
        lede: 'The full record of my front-end work — design systems and component libraries, data-rich platforms, and product interfaces. Each entry opens into its case study.',
        metaProjects: 'projects',
        metaLive: 'live',
        metaSince: 'Since 2018',
        showing: 'Showing',
        of: 'of',
        noDemoTag: 'No demo',
        confidentialTag: 'Under NDA',
        open: 'View case study',
        cta: {
          kicker: 'Get in touch',
          availability: 'Booking new projects',
          title: 'Have a project in mind?',
          body: "I'm available for new work — architecture, design systems, and data-rich interfaces. Tell me what you're building.",
          action: 'Get in touch',
        },
      },
      detail: {
        back: 'Back to work',
        caseLabel: 'Case study',
        caseCounter: 'Case',
        overview: 'Overview',
        challengeTitle: 'The challenge',
        approachTitle: 'The approach',
        roleTitle: 'My role',
        stackTitle: 'Built with',
        stackCount: 'technologies',
        liveTitle: 'See it live',
        liveIntro: 'The project is live in production. Explore the working interface:',
        visitSite: 'Visit live site →',
        noDemo: 'No public demo is available for this project.',
        pagerLabel: 'Keep exploring',
        prev: 'Previous',
        next: 'Next',
        allWork: 'View all projects',
      },
    },
    contact: {
      label: 'Get In Touch',
      subtitle: 'Have a project in mind or just want to say hi? Reach out through any of these channels.',
      availability: 'Booking new projects',
      items: {
        github: 'GitHub',
        email: 'Email',
        linkedin: 'LinkedIn',
      },
    },
    notFound: {
      title: 'Oops!',
      message1: 'The page you are looking for does not exist or has been moved.',
      message2: 'Please check the URL or return to the home page.',
      cta: 'Go to Home',
    },
  },
  es: {
    seo: {
      title: 'Jesus Blanco — Consultor Frontend Senior',
      description: 'Portfolio de Jesus Blanco, consultor frontend senior.',
      jobTitle: 'Consultor frontend senior',
    },
    nav: {
      theme: {
        light: 'Claro',
        dark: 'Oscuro',
        toggleAria: 'Cambiar tema',
      },
      language: {
        aria: 'Seleccionar idioma',
      },
    },
    header: {
      availability: 'Disponible para nuevos proyectos',
      role: 'Consultor Frontend Senior',
      tagline: '8 años de arquitectura en aplicaciones web complejas, donde el rigor estructural se une a una UI de alta fidelidad.',
      capabilities: ['Sistemas de diseño', 'Data-viz', 'React', 'Vue', 'TypeScript'],
      signature: 'Soy JB',
      ctaCv: 'Descargar CV',
      ctaWork: 'Ver trabajo destacado',
    },
    about: {
      label: 'Sobre mí',
      heading: 'Una evolución, el único camino',
      attribution: 'Un verso que tomé prestado de “Dreary Moon” — Big Black Delta',
      intro: [
        'Desde muy temprano he sentido una profunda curiosidad por el mundo — la que me hizo autodidacta mucho antes que ingeniero. Descubrir la programación en el instituto le dio un propósito a esa inquietud, y desde entonces la he enfocado en el vasto universo de la tecnología.',
        'Esa curiosidad guía cómo construyo. Voy más allá de las especificaciones para preservar la intención de cada interacción, cuidando el detalle visual y el movimiento.',
      ],
      belief: 'Siempre he creído que la clave es no dejar nunca de evolucionar — y llevo esa mentalidad a todo lo que construyo.',
      areasLabel: 'Áreas clave de consultoría',
      areas: [
        {
          title: 'Estrategia de modernización',
          body: 'Rutas de migración de sistemas legacy hacia arquitecturas de alto rendimiento — sin comprometer la estabilidad del negocio.',
        },
        {
          title: 'Integridad de diseño y fidelidad de producto',
          body: 'Cerrar la brecha entre Figma y la realidad técnica: componentes que respetan la estética de marca y mejoran la retención con atención meticulosa al detalle.',
        },
        {
          title: 'Arquitectura de datos compleja',
          body: 'Sistemas de visualización que convierten métricas y analíticas densas en navegación intuitiva y eficiente.',
        },
        {
          title: 'Gobernanza de sistemas de diseño',
          body: 'Librerías de componentes y estándares que permiten escalar productos de forma consistente reduciendo el coste de desarrollo futuro.',
        },
      ],
    },
    experience: {
      label: 'Registro de carrera',
      heading: 'La trayectoria',
      intro: 'Modernización de plataformas, sistemas de UI reutilizables y visualización de datos: mi contribución en cada etapa profesional.',
      present: 'Presente',
      stackLabel: 'Stack',
      roles: [
        {
          period: 'Mar 2025 — Presente',
          role: 'Senior Frontend Developer',
          company: 'Freelance',
          current: true,
          summary:
            'Arquitectura de front-end y UI/UX para cuatro clientes: un single source of truth de operaciones de remesas con permisos por alcance, un módulo de finanzas integrado con QuickBooks, auditoría y refactor de un front-end generado por IA, y un sitio de marketing de Figma a código.',
          stack: ['Next.js', 'TypeScript', 'GraphQL', 'Astro'],
          metric: '4 clientes',
        },
        {
          period: 'May 2022 — Mar 2025',
          role: 'Senior Frontend Developer',
          company: 'Elion Partners',
          current: false,
          summary:
            'Construí una librería de componentes headless en React/TypeScript que redujo el tiempo de desarrollo manual una vez estabilizada, impulsando una plataforma de analítica usada en toda la empresa. Entregué cinco apps interconectadas y lideré una migración de front-end.',
          stack: ['React', 'Next.js', 'TypeScript', 'Storybook'],
          metric: '~50–70% más rápido',
        },
        {
          period: 'Sep 2021 — May 2022',
          role: 'Frontend Developer',
          company: 'White Peak Tech',
          current: false,
          summary:
            'Modernicé una plataforma pública de crowdfunding para real estate y arte, migrando un sistema legacy Django/HTML a Vue/Nuxt y reduciendo el código legacy únicamente a plantillas de correo.',
          stack: ['Vue', 'Nuxt', 'GraphQL'],
          metric: 'Django → Nuxt',
        },
        {
          period: 'Ago 2020 — Sep 2021',
          role: 'Frontend Developer',
          company: 'Legal Credit Solutions',
          current: false,
          summary:
            'Co-arquitecté un sistema de diseño en Vue — componentes de input, layout y visualización de datos con todas sus variantes — unificando la UI de múltiples productos fintech bajo una misma marca.',
          stack: ['Vue', 'Nuxt', 'Storybook'],
          metric: '30 componentes',
        },
        {
          period: 'Nov 2018 — Jun 2020',
          role: 'Junior Frontend Developer',
          company: 'White Peak Tech',
          current: false,
          summary:
            'Entregué dashboards, mapas de visualización de datos y landing pages, y construí prototipos interactivos para productos de inversión en real estate y arte.',
          stack: ['Vue', 'JavaScript', 'HTML5'],
          metric: '',
        },
      ],
    },
    projects: {
      label: 'Trabajo destacado',
      filterAll: 'Todos los proyectos',
      filters: {
        react: 'React',
        vue: 'Vue.js',
        typescript: 'TypeScript',
      },
      empty: 'Aún no hay proyectos que coincidan con este filtro.',
      viewProject: 'Ver proyecto →',
      viewProjectAria: 'Ver',
      demoUnavailable: 'Demo no disponible',
      previousAria: 'Proyecto anterior',
      nextAria: 'Proyecto siguiente',
      featuredFallback: 'Proyecto destacado',
      explore: 'Selecciona un caso de estudio',
      viewing: 'Viendo',
      fields: {
        role: 'Rol',
        challenge: 'Reto',
        decision: 'Decisión clave',
      },
      viewCaseStudy: 'Ver caso de estudio →',
      viewAllWork: 'Ver todo el trabajo',
      // Placa de dossier redactado para trabajo de cliente bajo NDA sin captura pública.
      confidential: {
        marker: 'Confidencial',
        markerShort: 'NDA',
        note: 'Trabajo de cliente · bajo NDA',
        aria: 'Trabajo de cliente confidencial — sin vista previa pública disponible',
      },
      index: {
        home: 'Inicio',
        label: 'Índice de proyectos',
        filterLabel: 'Filtrar por tecnología',
        heading: 'Todo el trabajo',
        lede: 'El registro completo de mi trabajo front-end — sistemas de diseño y librerías de componentes, plataformas con datos densos e interfaces de producto. Cada entrada abre su caso de estudio.',
        metaProjects: 'proyectos',
        metaLive: 'en vivo',
        metaSince: 'Desde 2018',
        showing: 'Mostrando',
        of: 'de',
        noDemoTag: 'Sin demo',
        confidentialTag: 'Bajo NDA',
        open: 'Ver caso de estudio',
        cta: {
          kicker: 'Contacto',
          availability: 'Disponible para nuevos proyectos',
          title: '¿Tienes un proyecto en mente?',
          body: 'Estoy disponible para nuevos proyectos — arquitectura, sistemas de diseño e interfaces con datos densos. Cuéntame qué estás construyendo.',
          action: 'Contactar',
        },
      },
      detail: {
        back: 'Volver a proyectos',
        caseLabel: 'Caso de estudio',
        caseCounter: 'Caso',
        overview: 'Resumen',
        challengeTitle: 'El reto',
        approachTitle: 'El enfoque',
        roleTitle: 'Mi rol',
        stackTitle: 'Construido con',
        stackCount: 'tecnologías',
        liveTitle: 'Verlo en vivo',
        liveIntro: 'El proyecto está en producción. Explora la interfaz en funcionamiento:',
        visitSite: 'Visitar sitio →',
        noDemo: 'No hay demo pública disponible para este proyecto.',
        pagerLabel: 'Sigue explorando',
        prev: 'Anterior',
        next: 'Siguiente',
        allWork: 'Ver todos los proyectos',
      },
    },
    contact: {
      label: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente o simplemente quieres saludar? Contacta conmigo por cualquiera de estos canales.',
      availability: 'Disponible para nuevos proyectos',
      items: {
        github: 'GitHub',
        email: 'Correo electrónico',
        linkedin: 'LinkedIn',
      },
    },
    notFound: {
      title: '¡Vaya!',
      message1: 'La página que buscas no existe o se ha movido.',
      message2: 'Comprueba la URL o vuelve a la página de inicio.',
      cta: 'Volver al inicio',
    },
  },
};

export type Ui = (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang): Ui {
  return ui[lang];
}
