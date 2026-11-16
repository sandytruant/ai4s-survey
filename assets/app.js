// AI4S Survey — Unified Navigation Shell, Accessible Tabs, Dark Mode Toggle, Responsive Tables

const SURVEY_TREE = [
  {
    title: "Overview",
    items: [
      { label: "Master Portal & Comparison", path: "index.html" },
    ],
  },
  {
    title: "1. Electronic Structure",
    pillar: "01_electronic_structure",
    items: [
      { label: "1.1 Problem Overview", path: "01_electronic_structure/1_scientific_problem/1.1_problem_overview.html" },
      { label: "1.2 Classical Bottlenecks", path: "01_electronic_structure/1_scientific_problem/1.2_classical_methods_and_bottlenecks.html" },
      { label: "1.3 Compute Demand & Impact", path: "01_electronic_structure/1_scientific_problem/1.3_compute_demand_and_impact.html" },
      { label: "2.1 AI4S Landscape", path: "01_electronic_structure/2_ai4s_methods/2.1_landscape_overview.html" },
      { label: "2.2 FermiNet & Psiformer", path: "01_electronic_structure/2_ai4s_methods/2.2_representative_methods/ferminet_psiformer.html" },
      { label: "2.2 DeepH-E3", path: "01_electronic_structure/2_ai4s_methods/2.2_representative_methods/deeph_e3.html" },
      { label: "2.2 QHNet", path: "01_electronic_structure/2_ai4s_methods/2.2_representative_methods/qhnet.html" },
      { label: "2.2 DM21 & Skala", path: "01_electronic_structure/2_ai4s_methods/2.2_representative_methods/dm21_skala.html" },
    ],
  },
  {
    title: "2. Molecular Dynamics",
    pillar: "02_molecular_dynamics",
    items: [
      { label: "1.1 Problem Overview", path: "02_molecular_dynamics/1_scientific_problem/1.1_problem_overview.html" },
      { label: "1.2 Classical Bottlenecks", path: "02_molecular_dynamics/1_scientific_problem/1.2_classical_methods_and_bottlenecks.html" },
      { label: "1.3 Compute Demand & Impact", path: "02_molecular_dynamics/1_scientific_problem/1.3_compute_demand_and_impact.html" },
      { label: "2.1 AI4S Landscape", path: "02_molecular_dynamics/2_ai4s_methods/2.1_landscape_overview.html" },
      { label: "2.2 DeePMD-kit", path: "02_molecular_dynamics/2_ai4s_methods/2.2_representative_methods/deepmd_kit.html" },
      { label: "2.2 NequIP & Allegro", path: "02_molecular_dynamics/2_ai4s_methods/2.2_representative_methods/nequip_allegro.html" },
      { label: "2.2 MACE", path: "02_molecular_dynamics/2_ai4s_methods/2.2_representative_methods/mace.html" },
      { label: "2.2 SevenNet", path: "02_molecular_dynamics/2_ai4s_methods/2.2_representative_methods/sevennet.html" },
    ],
  },
  {
    title: "3. Continuum Mechanics PDEs",
    pillar: "03_continuum_mechanics_pde",
    items: [
      { label: "1.1 Problem Overview", path: "03_continuum_mechanics_pde/1_scientific_problem/1.1_problem_overview.html" },
      { label: "1.2 Classical Bottlenecks", path: "03_continuum_mechanics_pde/1_scientific_problem/1.2_classical_methods_and_bottlenecks.html" },
      { label: "1.3 Compute Demand & Impact", path: "03_continuum_mechanics_pde/1_scientific_problem/1.3_compute_demand_and_impact.html" },
      { label: "2.1 AI4S Landscape", path: "03_continuum_mechanics_pde/2_ai4s_methods/2.1_landscape_overview.html" },
      { label: "2.2 PINNs & PhysicsNeMo", path: "03_continuum_mechanics_pde/2_ai4s_methods/2.2_representative_methods/pinn_physicsnemo.html" },
      { label: "2.2 Fourier Neural Operator", path: "03_continuum_mechanics_pde/2_ai4s_methods/2.2_representative_methods/fno_neuraloperator.html" },
      { label: "2.2 MeshGraphNets", path: "03_continuum_mechanics_pde/2_ai4s_methods/2.2_representative_methods/meshgraphnets.html" },
      { label: "2.2 Transolver & Poseidon", path: "03_continuum_mechanics_pde/2_ai4s_methods/2.2_representative_methods/transolver_poseidon.html" },
    ],
  },
];

function getBasePrefix() {
  const link = document.querySelector('link[href$="assets/style.css"]');
  if (!link) return "";
  return link.getAttribute("href").replace(/assets\/style\.css$/, "");
}

function getCurrentRelPath(base) {
  const depth = base ? base.split("../").length - 1 : 0;
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (depth === 0) {
    const last = parts.at(-1) || "index.html";
    return last.endsWith(".html") ? last : "index.html";
  }
  return parts.slice(-(depth + 1)).join("/");
}

function buildSidebarNav(base, currentPath) {
  const nav = document.createElement("nav");
  nav.className = "sidebar-nav";
  nav.setAttribute("aria-label", "Survey Index");

  for (const group of SURVEY_TREE) {
    const h2 = document.createElement("h2");
    h2.textContent = group.title;
    nav.appendChild(h2);

    const ul = document.createElement("ul");
    for (const item of group.items) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = base + item.path;
      a.textContent = item.label;
      if (currentPath === item.path) {
        a.setAttribute("aria-current", "page");
      }
      li.appendChild(a);
      ul.appendChild(li);
    }
    nav.appendChild(ul);
  }
  return nav;
}

function setupThemeToggle(btn) {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getEffectiveScheme() {
    let stored = null;
    try {
      stored = localStorage.getItem("color-scheme");
    } catch {}
    if (stored === "light" || stored === "dark") return stored;
    return darkQuery.matches ? "dark" : "light";
  }

  function syncUI() {
    const effective = getEffectiveScheme();
    const isDark = effective === "dark";
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    btn.innerHTML = isDark
      ? '<span aria-hidden="true">☀️</span><span>Light</span>'
      : '<span aria-hidden="true">🌙</span><span>Dark</span>';
  }

  btn.addEventListener("click", () => {
    const current = getEffectiveScheme();
    const target = current === "dark" ? "light" : "dark";
    const system = darkQuery.matches ? "dark" : "light";

    try {
      if (target === system) {
        localStorage.removeItem("color-scheme");
      } else {
        localStorage.setItem("color-scheme", target);
      }
    } catch {}

    if (meta) {
      meta.content = target === system ? "light dark" : target;
    }
    syncUI();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme" && meta) {
      meta.content = e.newValue ?? "light dark";
      syncUI();
    }
  });

  darkQuery.addEventListener("change", syncUI);
  syncUI();
}

function mountShell() {
  const container = document.querySelector(".container");
  if (!container || document.querySelector(".site-header")) return;

  const base = getBasePrefix();
  const currentPath = getCurrentRelPath(base);

  // Skip link
  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main-content";
  skip.textContent = "Skip to main content";
  document.body.prepend(skip);

  // Header
  const header = document.createElement("header");
  header.className = "site-header";
  const headerInner = document.createElement("div");
  headerInner.className = "header-inner";

  const menuBtn = document.createElement("button");
  menuBtn.type = "button";
  menuBtn.className = "menu-toggle-btn";
  menuBtn.setAttribute("aria-label", "Open survey index");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.innerHTML = '<span aria-hidden="true">☰</span><span>Index</span>';

  const brand = document.createElement("a");
  brand.className = "site-brand";
  brand.href = base + "index.html";
  brand.innerHTML = '<span class="site-brand-badge">AI4S</span><span>Arch &amp; Compiler Survey</span>';

  const topNav = document.createElement("nav");
  topNav.className = "header-nav";
  topNav.setAttribute("aria-label", "Primary");

  const topLinks = [
    { label: "Portal", path: "index.html", match: "index.html" },
    { label: "1. Electronic Structure", path: "01_electronic_structure/1_scientific_problem/1.1_problem_overview.html", match: "01_electronic_structure" },
    { label: "2. Molecular Dynamics", path: "02_molecular_dynamics/1_scientific_problem/1.1_problem_overview.html", match: "02_molecular_dynamics" },
    { label: "3. Continuum PDEs", path: "03_continuum_mechanics_pde/1_scientific_problem/1.1_problem_overview.html", match: "03_continuum_mechanics_pde" },
  ];

  for (const link of topLinks) {
    const a = document.createElement("a");
    a.href = base + link.path;
    a.textContent = link.label;
    if (link.match === "index.html" && currentPath === "index.html") {
      a.setAttribute("aria-current", "page");
    } else if (link.match !== "index.html" && currentPath.startsWith(link.match)) {
      a.classList.add("is-active-pillar");
    }
    topNav.appendChild(a);
  }

  const actions = document.createElement("div");
  actions.className = "header-actions";
  const themeBtn = document.createElement("button");
  themeBtn.type = "button";
  themeBtn.className = "theme-toggle";
  setupThemeToggle(themeBtn);
  actions.appendChild(themeBtn);

  headerInner.append(menuBtn, brand, topNav, actions);
  header.appendChild(headerInner);

  // App shell wrapping sidebar + main
  const shell = document.createElement("div");
  shell.className = "app-shell";

  const sidebar = document.createElement("aside");
  sidebar.className = "site-sidebar";
  sidebar.appendChild(buildSidebarNav(base, currentPath));

  const main = document.createElement("main");
  main.id = "main-content";
  main.tabIndex = -1;
  main.className = container.className;
  while (container.firstChild) {
    main.appendChild(container.firstChild);
  }
  container.replaceWith(shell);
  shell.append(sidebar, main);

  // Mobile modal <dialog> drawer
  const drawer = document.createElement("dialog");
  drawer.className = "nav-drawer";
  drawer.setAttribute("aria-label", "Survey Navigation Index");
  const drawerHeader = document.createElement("div");
  drawerHeader.className = "drawer-header";
  drawerHeader.innerHTML = "<strong>Survey Index</strong>";
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "drawer-close-btn";
  closeBtn.setAttribute("aria-label", "Close navigation index");
  closeBtn.textContent = "✕";
  closeBtn.autofocus = true;
  drawerHeader.appendChild(closeBtn);
  drawer.append(drawerHeader, buildSidebarNav(base, currentPath));

  menuBtn.addEventListener("click", () => {
    drawer.showModal();
    menuBtn.setAttribute("aria-expanded", "true");
  });
  closeBtn.addEventListener("click", () => drawer.close());
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) drawer.close();
  });
  drawer.addEventListener("close", () => {
    menuBtn.setAttribute("aria-expanded", "false");
  });

  document.body.prepend(header, drawer);
}

function setupTabs() {
  for (const container of document.querySelectorAll(".tabs")) {
    const tablist = container.querySelector('[role="tablist"], .tablist');
    if (!tablist) continue;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"], button'));
    const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length || tabs.length !== panels.length) continue;

    function selectTab(index, shouldFocus = false) {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        tab.toggleAttribute("focusgroupstart", active);
        if (active) {
          panels[i].removeAttribute("hidden");
          panels[i].tabIndex = 0;
        } else {
          panels[i].setAttribute("hidden", "until-found");
          panels[i].removeAttribute("tabindex");
        }
      });
      if (shouldFocus) {
        tabs[index].focus();
        tabs[index].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectTab(i, false));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) {
          e.preventDefault();
          selectTab(next, true);
        }
      });
    });

    panels.forEach((panel, i) => {
      panel.addEventListener("beforematch", () => selectTab(i, false));
    });
  }
}

function wrapTables() {
  for (const table of document.querySelectorAll("table")) {
    if (table.closest(".table-wrapper")) continue;
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    const caption = table.querySelector("caption");
    if (caption) {
      if (!caption.id) caption.id = "tbl-" + Math.random().toString(36).slice(2, 8);
      wrapper.setAttribute("aria-labelledby", caption.id);
    } else {
      wrapper.setAttribute("aria-label", "Data table");
    }
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mountShell();
  setupTabs();
  wrapTables();
});
