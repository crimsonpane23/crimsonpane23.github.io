/* ==========================================================================
   ✏️  site-data.js  —  THE ONLY FILE YOU NEED TO EDIT

   Every page of the website (Home, Interests, Projects, Experience,
   Gallery, Contact) is built from the information below.

   HOW TO EDIT
   • Change the text between the "quotes".  Keep every quote " and comma ,
   • To ADD an item: copy one whole { ... } block and paste it right
     after the previous one.
   • To REMOVE an item: delete its whole { ... } block.
   • To HIDE a whole page: delete its line in  nav  (further below).
   • Images: put files in the  images/  folder and write  "images/me.jpg".
   • Files (CV, certificates): put them in the  files/  folder and write
     "files/cv.pdf".  Online links (https://...) work too.
   • If the site goes blank after an edit, a quote or comma is missing.
   ========================================================================== */

const SITE = {

  /* ─────────────── BASIC INFO (used on every page) ─────────────── */
  name: "Aryan Shrivastava",
  logoInitials: "AS",                              // top-left logo mark
  status: "Open to research opportunities",        // green-dot badge on Home
  headline: "Exploring <em>physics</em> through experiments and computation.",   // <em>…</em> = coloured italic
  intro: "I'm Aryan. I'm interested in particle detectors, detector data analysis, and machine learning for event reconstruction.",
  photo: "images/me.jpg",                                       // e.g. "images/me.jpg"   ("" = placeholder)
  cv: "files/Aryan_Shrivastava_CV.pdf",                              // put your CV in the files/ folder ("" = hide CV buttons)
  footer: "© 2026 Aryan Shrivastava. All rights reserved.",

  socials: [
    { label: "Email",          url: "mailto:aryan.shrivastava@niser.ac.in" },
    { label: "GitHub",         url: "https://github.com/crimsonpane23" },
    { label: "LinkedIn",       url: "https://linkedin.com/in/aryan-shrivastava-nsp" },
  ],

  /* ─────────────── TOP MENU ───────────────
     Order here = order in the menu.  `page` must stay as it is;
     change `label` and `blurb` freely. Delete a line to hide that page. */
  nav: [
    { page: "home",       label: "Home",       href: "index.html",       blurb: "" },
    { page: "interests",  label: "Interests",  href: "interests.html",   blurb: "My research interests and fields I find fascinating." },
    { page: "projects",   label: "Projects",   href: "projects.html",    blurb: "Major projects carried out during Summer break or as a part of coursework." },
    { page: "experience", label: "Experience", href: "experience.html",  blurb: "My research experience and educational journey." },
    { page: "gallery",    label: "Gallery",    href: "gallery.html",     blurb: "Felicitations and a few photos from campus. (To be updated)" },
    { page: "contact",    label: "Contact",    href: "contact.html",     blurb: "Email and socials, if you would like to get in touch." }
  ],

  /* ─────────────── HOME PAGE ─────────────── */
  home: {
    aboutTitle: "About me",
    about: "I am a fourth-year Integrated M.Sc. student in physics at NISER. My projects have spanned detector instrumentation, data analysis and machine learning applications in physics. I am keen to pursue research in experimental particle physics.",

    /*
    newsTitle: "Latest updates",           // delete the whole news [ ... ] list to hide this section
    news: [
      { date: "Oct 2026", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — add your latest news here.", url: "" },
      { date: "Aug 2026", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", url: "#" },
      { date: "May 2026", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.", url: "" }
    ]
    */
  },

  /* ─────────────── INTERESTS PAGE ─────────────── */
  interests: {
    eyebrow: "Research",
    title: "Research interests",
    intro: "The fields I want to learn more about and work in, from detectors and data analysis to the theory behind the measurements.",
    items: [
      { icon: "⚛", title: "Experimental High Energy Physics",
        text: "",
        keywords: ["Particle Physics", "Detector development", "Data Analysis"], link: "", linkLabel: "" },
      { icon: "◎", title: "Machine Learning for High Energy Physics",
        text: "A large variety of tasks, in different reconstruction stages, are carried out by Machine Learning algorithms in the many of the modern High Energy Physics experiments. For example, particle identification, event reconstruction, particle track reconstruction, jet tagging etc are the major areas where ML techniques can be used.",
        keywords: ["Particle Identification", "Event reconstruction"], link: "", linkLabel: "" },
      { icon: "∿", title: "Physics-Informed Neural Networks",
        text: "A standard neural network learns only from data and knows nothing about the physics behind it. Physics-informed neural networks add that knowledge, either as a penalty for violating a governing equation or by building a conservation law or symmetry into the architecture. This matters most when data is scarce or when the long-time behaviour counts, as in chaotic dynamics, where a small error grows exponentially. I am interested in incorporating physics into Machine learning models and how these models compare with conventional numerical methods, and where they could be useful in physics.",
        keywords: ["PINNs", "Non-linear Dynamics"], link: "", linkLabel: "" },
      { icon: "∑", title: "Quantum Field Theory",
        text: "Quantum field theory combines quantum mechanics and special relativity by treating particles as excitations of underlying fields. It is the framework of the Standard Model, and it describes how particles are created, destroyed and scattered, which is what a detector records. Quantities such as cross sections and decay rates are calculated with perturbation theory and Feynman diagrams.",
        keywords: ["Feynman Diagrams"], link: "", linkLabel: "" }
    ],
    /*
    questionsTitle: "Questions I find compelling",    // delete the questions [ ... ] list to hide
    questions: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco?"
    ]
    */
  },

  /* ─────────────── PROJECTS PAGE ─────────────── */
  projects: {
    eyebrow: "Work",
    title: "Projects",
    intro: "List of experimental & computational projects I've worked on during my summer break and coursework. They range from detector studies and nuclear experiments to machine learning and dynamical systems.",
    // category = any label you like (creates the filter buttons automatically)
    items: [
      { title: "Correlated & Uncorrelated Noise in Silicon Photomultiplier device (SiPM)", category: "Summer Research", image: "images/sipm_noise.jpg",
        text: "Silicon Photomultipliers (SiPMs) are widely used in particle and radiation detection owing to their high sensitivity and fast response, but their performance is affected by both uncorrelated and correlated noise processes. This work experimentally investigates these noise contributions in Onsemi SiPMs with active areas of 3×3 mm2, 4×4 mm2, and 6×6 mm2 under dark conditions. Fast-output waveforms were acquired and analysed to identify dark counts, prompt optical crosstalk, delayed optical crosstalk, and afterpulsing from their amplitude and time characteristics.",
        tags: ["C++", "ROOT", "Detector study"], links:  [{ label: "Report", url: "https://drive.google.com/file/d/1Pn_kvLULi11ZdtniIFJnH_dU5XLT33VJ/view?usp=sharingl" }] },
      { title: "Setting up α-γ coincidence experiment", category: "Coursework", image: "images/alpha_gamma.jpg",
        text: "We setup and investigate α-γ coincidences in the decay of Am-241 and isolate decay processes using energy-correlation heatmap analysis. We use the time-walk corrected time delay distributions between α and γ signals to estimate the lifetime of Np-237 excited state. The experiment demonstrates the use of α−γ coincidence technique to identify correlated nuclear decays and measure nuclear excited state lifetime.",
        tags: ["C++","ROOT", "Nuclear Physics"], links: [{ label: "GitHub Repository", url: "https://github.com/crimsonpane23/Alpha-Gamma-Coincidence-Experiment.git" }] },
      { title: "Muon Energy Reconstruction in INO-ICAL Detector using Machine Learning", category: "Summer Research", image: "images/XGB.png",
        text: "Simulations and machine learning have become essential tools in high-energy physics, enabling precise modeling of detector responses and data-driven approaches to event reconstruction. We explore machine learning applications in the context of the INO-ICAL detector, focusing on muon energy reconstruction as a supervised regression task. Models including Random Forest, XGBoost, and Artificial Neural Networks (ANNs) were implemented, with particular emphasis on the mathematical formulation behind each approach. This project underscores the potential of data-driven techniques for parameter reconstruction in modern particle detectors.",
        tags: ["Machine Learning", "ML for HEP"], links: [{ label: "GitHub Repository", url: "https://github.com/crimsonpane23/IASc-INSA-NASI-Summer-Project.git" }] },
      { title: "Physics-Enhanced Neural Networks for Chaotic Hamiltonian Dynamics", category: "Coursework", image: "images/PENN.png",
        text: "Chaotic Hamiltonian systems present a major challenge to data-driven forecasting due to their extreme sensitivity to initial conditions. We demonstrate an idea of a Hamiltonian Neural Network which learns the Hamiltonian, enforces the conservation laws, and produces reasonably accurate trajectories far beyond the training horizon. This outperforms the standard feed-forward Neural Network in terms of stability and long-term predictive power. This approach can be generalized since we do not invoke any details of the Hamiltonian's form. The results highlight the importance of embedding the physical structure into machine learning models for chaotic dynamical systems. ",
        tags: ["PINNs", "Non-linear Dynamics"], links: [{label:"Reference Paper", url:"https://journals.aps.org/pre/pdf/10.1103/PhysRevE.101.062207"}, {label:"GitHub Repository", url:"https://github.com/crimsonpane23/Physics-Enhanced-Neural-Networks-for-Chaotic-Hamiltonian-Dynamics.git"}] }
    ]
  },

  /* ─────────────── EXPERIENCE PAGE ───────────────
     Sections appear in this order: Timeline → Awards → Courses → Tools.
     category (timeline): "Research", "Internships" or "Education" (or your own) */
  experience: {
    eyebrow: "Journey",
    title: "Experience & Education",
    intro: "Academic background, summer internships, workshops, online courses, scholarships and awards.",
    cvLabel: "Download CV",                  // button text; the file is set by  cv  at the top of this file

    items: [
      { category: "Education", role: "Integrated M.Sc.", org: "National Institute of Science Education and Research (NISER), Bhubaneswar", date: "2023 – Present",
        points: ["Department - School of Physical Sciences", "Current CGPA - 9.06"],
        tags: [] },
      { category: "Internships", role: "Summer Research Fellow", org: "Tata Institute of Science Education and Research (TIFR), Mumbai", date: "June – July 2026",
        points: ["Supervisor - Prof. Gobinda Majumder and Dr. S Pethuraj", "Project Title - Correlated and Uncorrelated Noise in Silicon Photomultiplier (SiPM)"],
        tags: ["IASc-INSA-NASI Summer Research Fellowship Programme 2026"] },
      { category: "Internships", role: "Summer Research Fellow", org: "Tezpur University (TU), Tezpur, Assam", date: "June – July 2025",
        points: ["Supervisor - Dr. Moon Moon Devi, Assistant Professor, Department of Physics", "Project Title - Particle Physics: Simulations & Machine Learning"],
        tags: ["IASc-INSA-NASI Summer Research Fellowship Programme 2025"] },
      { category: "Education", role: "CBSE - XII", org: "Chavara Vidyapeeth (CVP), Narsinghpur, Madhya Pradesh", date: "2023",
        points: ["Result - 94.8%"],
        tags: [] },
      { category: "Education", role: "CBSE - X", org: "Chavara Vidyapeeth (CVP), Narsinghpur, Madhya Pradesh", date: "2021",
        points: ["Result - 93%"],
        tags: [] },
    ],

    awardsTitle: "Awards & scholarships",
    awards: [
      { year: "2026", title: "Highest SGPA - Semester 6", detail: "Awarded for highest Semester GPA in Physics Department Batch-23 in the 6th Semester AY 2025-26 - 9.55" },
      { year: "2026", title: "NCICP 2026 - Gold Medal", detail: "Awarded Gold medal in the Postgraduate Category in the National Competition in Computational Physics (NCICP) 2026, organised by the Indian Association of Physics Teachers (IAPT)." },
      { year: "2025", title: "Highest SGPA - Semester 4", detail: "Awarded for highest Semester GPA in Physics Department Batch-23 in the 4th Semester AY 2024-25 - 9.09"  },
      { year: "2025", title: "Highest SGPA - Semester 3", detail: "Awarded for highest Semester GPA in Physics Department Batch-23 in the 3rd Semester AY 2024-25 - 9.43"  },
      { year: "2025", title: "NCICP 2025 - Silver Medal", detail: "Awarded Silver medal in the Undergraduate Category in the National Competition in Computational Physics (NCICP) 2025, organised by the Indian Association of Physics Teachers (IAPT)." },
    ],

    /* certificate: a web link ("https://...") or a file you added to files/ ("files/cert1.pdf") */
    coursesTitle: "Online courses & workshops",
    courses: [
      { year: "2026", title: "Introductory School on the Standard Model of Particle Physics", provider: "Dr. Ibrahim Mirza", type: "Online school", certificate:"files/Standard_Model_School.pdf" },
      { year: "2025", title: "Quantum Quest: Principles, Security and Applications", provider: "Association of All Computer Science Teachers (AACST)", type: "Online Workshop", certificate: "files/AACST_Workshop.pdf" },
      { year: "2025", title: "Deep Learning - IIT Kharagpur", provider: "National Programme on Technology Enhanced Learning (NPTEL)", type: "Online course", certificate: "files/NPTEL.pdf" },
      { year: "2024", title: "Machine Learning Specialization by Andrew Ng", provider: "Coursera", type: "Online Course", certificate: "files/Coursera.pdf" }   // "" = no certificate link
    ],
    
    labsTitle: "Lab coursework",
    labs: [
      { year: "2026", title: "Nuclear Physics and Instrumentation Lab", url: "https://github.com/crimsonpane23/P341-Nuclear-Physics-and-Instrumentation-Lab.git" },
      { year: "2026", title: "Solid State Physics Lab", url: "https://github.com/crimsonpane23/P347-Solid-State-Physics-Lab.git" },
      { year: "2025", title: "Modern Physics Lab", url: "https://github.com/crimsonpane23/P343---Modern-Physics-lab.git" },
      { year: "2025", title: "Computational Physics Lab", url: "https://github.com/crimsonpane23/P346-Computational-Physics.git" }
    ],

    skillsTitle: "Software & tools",
    skills: [
      { group: "Programming", items: ["Python", "C++", "ROOT"] },
      { group: "Tools",       items: ["LaTeX", "Git", "Jupyter", "Linux"] },
    ]
  },

  /* ─────────────── GALLERY PAGE ───────────────
     Made for about 4–6 photos. Each one gets a large frame with a title and
     a longer caption underneath.
     src:   "images/photo1.jpg"   ("" shows a placeholder tile)
     ratio: optional shape for this photo: "4/3" (landscape), "1/1", "3/4" … */
  gallery: {
    eyebrow: "Moments",
    title: "Gallery",
    intro: "A small selection. Click a photo to enlarge it.",
    ratio: "4/3",                            // default shape for all photos
    items: [
      { src: "images/felicitation_2026.JPG", title: "Academic award felicitation, 2026",
        caption: "I received the award for the highest SGPA in the Physics batch of 2023 for Semester 6 (AY 2025–26) at the NISER Foundation Day ceremony in September 2026. It was presented by Shri K N Vyas, former Secretary, Department of Atomic Energy (DAE) and Prof. Hirendra Nath Ghosh, Director, NISER." },
      { src: "images/felicitation_2025.JPG", title: "Academic award felicitation, 2025",
        caption: "I received the award for the highest SGPA in the Physics batch of 2023 for Semester 3 and 4 (AY 2024–25) at the NISER Foundation Day ceremony in September 2025. It was presented by Prof. Vinod Kumar Singh, President of National Academy of Sciences (NASI) and Prof. Hirendra Nath Ghosh, Director, NISER." },
      /*
        { src: "images/TIFR_Gobinda_sir.jpg", title: "Photo title three",
        caption: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." },
        */
    ]
  },

  /* ─────────────── CONTACT PAGE ───────────────
     formEndpoint: leave "" and the form opens the visitor's email app.
     For a real form, make a free form at formspree.io and paste its URL
     here, e.g. "https://formspree.io/f/abcdwxyz".                        */
  contact: {
    eyebrow: "Hello",
    title: "Contact",
    intro: "I'm happy to talk about research, collaborations, or anything physics.",
    email: "aryan.shrivastava@niser.ac.in",
    affiliation: "School of Physical Sciences, National Institute of Science Education and Research (NISER)",
    location: "Bhubaneswar, India",
    hours: "",                                   // e.g. "Mon–Fri, 10:00–17:00 IST" ("" = hide)
    formTitle: "Send a message",
    formEndpoint: ""
  }
};
