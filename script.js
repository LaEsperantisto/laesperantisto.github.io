async function loadProjects() {
  const res = await fetch('projects.json');
  const projects = await res.json();

  const container = document.getElementById('projects');

  projects.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';

    // Construct the specific install command for this project
    const installCommand = `curl -sSfO ${p.installer} && chmod +x install.sh && ./install.sh && rm ./install.sh`;

    el.innerHTML = `
      <img src="${p.icon ? p.icon : 'assets/icons/no-icon-found.png'}" alt="LaEsperantisto icon">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="links">
        <a href="${p.repo}" target="_blank">Repo</a>
        ${p.installer ? `<button class="copy-btn" onclick="copyCommand(this, '${installCommand}')">Copy Installer</button>` : ""}
      </div>
    `;

    container.appendChild(el);
  });
}

// Global function to handle the clipboard copy and button animation
function copyCommand(buttonElement, textToCopy) {
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = buttonElement.innerText;

    // Visual feedback
    buttonElement.innerText = "Copied! ✓";
    buttonElement.classList.add("copied"); // You can use this class to style it green in CSS

    // Reset back to normal after 2 seconds
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.classList.remove("copied");
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy text: ", err);
  });
}

loadProjects();
