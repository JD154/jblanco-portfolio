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
      title: 'Jesus Blanco — Senior Front-End Developer',
      description: 'Portfolio of Jesus Blanco, Senior Front-End Developer.',
      jobTitle: 'Senior Front-End Developer',
    },
    nav: {
      badge: {
        default: 'Booking new projects',
        hover: 'Get in touch',
        aria: 'Get in touch - go to contact section',
      },
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
      role: 'Senior Front-End Developer',
      tagline:
        'Crafting clean, functional interfaces with a strong focus on maintainability and scalability. 7 years of experience.',
      capabilities: ['Design Systems', 'Data-viz', 'React', 'Vue', 'TypeScript'],
      signature: "I'm JB",
      ctaCv: 'Download CV',
      ctaLinkedin: 'Visit LinkedIn',
    },
    about: {
      label: 'About Me',
      heading: 'An Evolution, The Only Way',
      paragraphs: [
        'From an early age, I have felt a deep curiosity about the world around me, which led me to develop a self-taught spirit and a constant passion for learning about everything. This intellectual curiosity found a clear purpose when I discovered programming in high school. From that moment on, I was able to focus my desire to learn into the vast universe of technology. Using my love for technology to always grow and to create increasingly innovative solutions.',
        'I have always believed that the key to success is to never stop evolving, and I strive to apply this mindset in all my endeavors.',
      ],
      quote: {
        title: 'An Evolution, the only way',
        attributionPre: 'Lyric extract from ',
        attributionMid: ' by ',
      },
    },
    projects: {
      label: 'Featured Projects',
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
      title: 'Jesus Blanco — Desarrollador Front-End Senior',
      description: 'Portfolio de Jesus Blanco, desarrollador front-end senior.',
      jobTitle: 'Desarrollador front-end senior',
    },
    nav: {
      badge: {
        default: 'Disponible para nuevos proyectos',
        hover: 'Ponte en contacto',
        aria: 'Ponte en contacto - ir a la sección de contacto',
      },
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
      role: 'Desarrollador Front-End Senior',
      tagline:
        'Creando interfaces limpias y funcionales con un fuerte enfoque en la mantenibilidad y la escalabilidad. 7 años de experiencia.',
      capabilities: ['Sistemas de diseño', 'Data-viz', 'React', 'Vue', 'TypeScript'],
      signature: 'Soy JB',
      ctaCv: 'Descargar CV',
      ctaLinkedin: 'Visitar LinkedIn',
    },
    about: {
      label: 'Sobre mí',
      heading: 'Una evolución, el único camino',
      paragraphs: [
        'Desde muy temprana edad, he sentido una profunda curiosidad por el mundo que me rodea, lo que me llevó a desarrollar un espíritu autodidacta y una pasión constante por aprender. Esta curiosidad intelectual encontró un propósito claro cuando descubrí la programación en el instituto. Desde entonces, he podido enfocar mis ganas de aprender en el vasto universo de la tecnología, usando mi amor por ella para crecer siempre y crear soluciones cada vez más innovadoras.',
        'Siempre he creído que la clave del éxito es no dejar nunca de evolucionar, y procuro aplicar esta mentalidad en todo lo que hago.',
      ],
      quote: {
        title: 'Una evolución, el único camino',
        attributionPre: 'Extracto de la letra de ',
        attributionMid: ' de ',
      },
    },
    projects: {
      label: 'Proyectos destacados',
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
