// Initial Mock Cluttered Files
const INITIAL_FILES = [
  {
    id: 1,
    name: "receipt_9921_oct.pdf",
    icon: "📄",
    snippet: "INVOICE #9921 - Total: $84.00 - Amazon AWS Cloud Hosting Sept",
    category: "Invoices_and_Finance",
    newName: "Invoice_AWS_Hosting_Oct2026.pdf"
  },
  {
    id: 2,
    name: "assignment_ai_draft_final_final.docx",
    icon: "📝",
    snippet: "Deep Learning Report: Transformer Attention Mechanisms & Fine-tuning",
    category: "Coursework_and_Notes",
    newName: "Report_Attention_Mechanisms.docx"
  },
  {
    id: 3,
    name: "temp_scraper_v2.py",
    icon: "🐍",
    snippet: "import requests\nfrom bs4 import BeautifulSoup\ndef scrape_catalog():",
    category: "Code_and_Dev",
    newName: "web_scraper_catalog.py"
  },
  {
    id: 4,
    name: "IMG_20261019_184910.png",
    icon: "🖼️",
    snippet: "[Image Binary] Dimensions: 1920x1080 - Sloth sleeping on tree branch",
    category: "Media",
    newName: "Photo_Sleeping_Sloth_Oct2026.png"
  },
  {
    id: 5,
    name: "ebill_water_utility_paid.pdf",
    icon: "📄",
    snippet: "City Municipal Utility - Water & Sewer Bill paid on 12-Oct-2026",
    category: "Invoices_and_Finance",
    newName: "Receipt_Water_Utility_Oct2026.pdf"
  }
];

const CATEGORIES = [
  { id: "Invoices_and_Finance", label: "📁 Invoices & Finance", files: [] },
  { id: "Coursework_and_Notes", label: "📁 Coursework & Notes", files: [] },
  { id: "Code_and_Dev", label: "📁 Code & Dev Scripts", files: [] },
  { id: "Media", label: "📁 Media & Captures", files: [] },
  { id: "Misc", label: "📁 Miscellaneous", files: [] }
];

let clutterQueue = [...INITIAL_FILES];
let isProcessing = false;

// DOM Elements
const unorganizedList = document.getElementById("unorganizedList");
const clutterCount = document.getElementById("clutterCount");
const categoriesGrid = document.getElementById("categoriesGrid");
const terminalBody = document.getElementById("terminalBody");
const terminalStatus = document.getElementById("terminalStatus");
const slothAvatar = document.getElementById("slothAvatar");
const btnOrganize = document.getElementById("btnOrganize");
const btnReset = document.getElementById("btnReset");
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const browseTrigger = document.getElementById("browseTrigger");

// Render Lists
function renderUnorganized() {
  clutterCount.textContent = clutterQueue.length;
  unorganizedList.innerHTML = "";

  if (clutterQueue.length === 0) {
    unorganizedList.innerHTML = `
      <div style="text-align: center; padding: 30px 10px; color: #728472;">
        🎉 All files organized! You can sit back and sleep like a sloth.
      </div>`;
    return;
  }

  clutterQueue.forEach((file) => {
    const el = document.createElement("div");
    el.className = "file-item";
    el.id = `file-${file.id}`;
    el.innerHTML = `
      <div class="file-info">
        <span class="file-icon">${file.icon}</span>
        <div>
          <div class="file-name">${file.name}</div>
          <div class="file-snippet">${file.snippet.substring(0, 50)}...</div>
        </div>
      </div>
    `;
    unorganizedList.appendChild(el);
  });
}

function renderCategories() {
  categoriesGrid.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const bin = document.createElement("div");
    bin.className = "category-bin";
    bin.innerHTML = `
      <div class="category-title">
        <span>${cat.label}</span>
        <span style="font-size:0.75rem; color:#607260;">${cat.files.length} items</span>
      </div>
      <div class="category-files" id="cat-list-${cat.id}">
        ${
          cat.files.length === 0
            ? '<span style="font-size:0.75rem; color:#a1b2a1; padding: 4px;">Folder is empty</span>'
            : cat.files
                .map(
                  (f) => `
              <div class="moved-file">
                <span style="font-weight:600;">${f.newName}</span>
                <span class="old-tag">${f.oldName}</span>
              </div>
            `
                )
                .join("")
        }
      </div>
    `;
    categoriesGrid.appendChild(bin);
  });
}

function logToTerminal(message, isDim = false) {
  const line = document.createElement("div");
  line.className = `log-line ${isDim ? "text-dim" : ""}`;
  line.textContent = `> ${message}`;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Simulated Slow & Steady Local Processing
async function runOrganizer() {
  if (isProcessing || clutterQueue.length === 0) return;
  isProcessing = true;
  btnOrganize.disabled = true;
  btnReset.disabled = true;
  slothAvatar.classList.add("working");
  terminalStatus.textContent = "INFERRING (OFFLINE)";

  logToTerminal("Waking local Llama-3.2-3B via Ollama unix socket...", true);

  while (clutterQueue.length > 0) {
    const file = clutterQueue[0];
    const itemEl = document.getElementById(`file-${file.id}`);
    if (itemEl) itemEl.classList.add("processing");

    logToTerminal(`[Inspect] Reading 200B header: "${file.name}"`);
    await sleep(700);

    logToTerminal(`[Llama-3.2] Classifying: "${file.snippet.slice(0, 35)}..."`);
    await sleep(900);

    logToTerminal(`[Result] Target: ${file.category} | Name: ${file.newName}`);
    await sleep(500);

    // Place into target category
    const cat = CATEGORIES.find((c) => c.id === file.category) || CATEGORIES[4];
    cat.files.unshift({ newName: file.newName, oldName: file.name });

    // Remove from queue
    clutterQueue.shift();
    renderUnorganized();
    renderCategories();
    await sleep(400);
  }

  logToTerminal("✓ All tasks completed. System back to idle nap.", true);
  terminalStatus.textContent = "IDLE";
  slothAvatar.classList.remove("working");
  isProcessing = false;
  btnOrganize.disabled = false;
  btnReset.disabled = false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Reset Handler
btnReset.addEventListener("click", () => {
  if (isProcessing) return;
  clutterQueue = JSON.parse(JSON.stringify(INITIAL_FILES));
  CATEGORIES.forEach((c) => (c.files = []));
  terminalBody.innerHTML = '<div class="log-line text-dim">// SlothDesk Engine reset. Ready for messy files.</div>';
  renderUnorganized();
  renderCategories();
});

btnOrganize.addEventListener("click", runOrganizer);

// File drag & drop simulator
browseTrigger.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => {
  handleCustomFiles(e.target.files);
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "#3b6e47";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.borderColor = "#cfe0d1";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "#cfe0d1";
  handleCustomFiles(e.dataTransfer.files);
});

function handleCustomFiles(files) {
  if (!files || files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const ext = f.name.split(".").pop().toLowerCase();
    let cat = "Misc";
    let icon = "📄";

    if (["pdf", "csv", "xlsx"].includes(ext)) {
      cat = "Invoices_and_Finance";
      icon = "📊";
    } else if (["py", "js", "html", "css", "json", "cpp"].includes(ext)) {
      cat = "Code_and_Dev";
      icon = "💻";
    } else if (["png", "jpg", "jpeg", "mp4", "gif"].includes(ext)) {
      cat = "Media";
      icon = "🖼️";
    } else if (["doc", "docx", "txt", "md"].includes(ext)) {
      cat = "Coursework_and_Notes";
      icon = "📝";
    }

    clutterQueue.push({
      id: Date.now() + i,
      name: f.name,
      icon: icon,
      snippet: `Local file: ${f.name} (${(f.size / 1024).toFixed(1)} KB)`,
      category: cat,
      newName: `Organized_${f.name}`
    });
  }
  renderUnorganized();
  logToTerminal(`Imported ${files.length} custom file(s) into queue.`);
}

// Initial Run
renderUnorganized();
renderCategories();
