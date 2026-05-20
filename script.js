async function loadProjects() {
  const res = await fetch('projects.json');
  const projects = await res.json();

  const container = document.getElementById('projects');

  projects.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';

    el.innerHTML = `
      <img src="${p.icon ? p.icon : 'assets/icons/no-icon-found.png'}" alt="LaEsperantisto icon">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="links">
        <a href="${p.repo}" target="_blank">Repo</a>
	    ${p.installer ? "<a href='" + p.installer + "' target='_blank'>Installer</a>" : ""}
      </div>
    `;

    container.appendChild(el);
  });
}

loadProjects();
