# SlothDesk 🦥

> **Slow & Steady Offline AI File Tidier**  
> *Channel your inner sloth — let open-source AI clean your digital clutter while you nap.*

---

## 📌 Overview

**SlothDesk** is a zero-cloud, local desktop utility and interactive showcase designed for the **"Slow and Steady" Open-Source AI Challenge** (celebrating International Sloth Day).

Instead of wasting cognitive energy manually inspecting, renaming, and filing messy downloads (`receipt_9921_oct.pdf`, `assignment_final_v2.docx`, `temp_scraper_v2.py`), SlothDesk utilizes a compact local open-weight model (**Llama 3.2 3B** via **Ollama**) to semantically inspect file headers, generate descriptive names, and organize files into dedicated directory vaults automatically.

---

## 💡 Why Open Innovation Matters

| Advantage | Why It Matters for SlothDesk |
| :--- | :--- |
| **🔒 100% Zero-Leak Privacy** | Invoices, medical records, tax receipts, and proprietary source code never leave your device. Model inference runs strictly against local memory with zero external telemetry. |
| **⚡ True Offline Independence** | Works reliably on airplanes, rural retreats, and during internet blackouts. No cloud outages, rate limits, or latency spikes. |
| **💸 Free Forever (Zero Cloud Rent)** | Tidying files is a mundane background task. Closed-source APIs introduce token costs, billing setup, and API keys. Open weights make continuous background automation free forever. |
| **🛠️ Modularity & Portability** | Swap the underlying engine seamlessly between `Llama 3.2 (3B)`, `Phi-3.5-mini`, or `Qwen 2.5 (1.5B/7B)` depending on your hardware envelope. |

---

## 🗂️ Project Structure

```text
slothdesk/
├── index.html            # Web interface & interactive demo UI
├── style.css             # Forest/sage aesthetic styling & animations
├── script.js             # Client-side inference simulator & drag-and-drop logic
├── sloth_organizer.py    # Production Python daemon running local Ollama inference
└── README.md             # Project documentation & setup instructions
```

---

## 🚀 Quick Start Guide

### Option 1: Run the Interactive Web Showcase

The web client provides a live visualizer of how SlothDesk inspects and categorizes files offline.

1. Clone or download this repository.
2. Ensure `index.html`, `style.css`, and `script.js` reside in the same directory.
3. Open `index.html` directly in any modern browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # Or serve locally
   python3 -m http.server 8080
   ```
4. Click **"Run Slow & Steady"** or drag messy test files directly into the drop zone.

---

### Option 2: Run the Production Python Daemon

Run the actual local agent against your real `~/Downloads` folder.

#### 1. Install & Launch Ollama
Download Ollama from [ollama.com](https://ollama.com) and pull the compact 3B parameter model:

```bash
# Pull and start the open-weight model
ollama run llama3.2:3b
```

#### 2. Install Dependencies
```bash
pip install ollama
```

#### 3. Run the Organizer
```bash
python sloth_organizer.py
```

---

## ⚙️ Configuration & Target Buckets

The Python daemon classifies files into structured directories located by default in `~/Documents/SlothOrganized/`:

* `Invoices_and_Finance/` — Bills, expense receipts, tax filings, statements.
* `Coursework_and_Notes/` — Research drafts, lecture slides, assignments, summaries.
* `Code_and_Dev/` — Scripts, datasets, config files, backups.
* `Media/` — Photos, diagrams, soundscapes, screenshots.
* `Misc/` — Uncategorized documents.

You can customize the target paths and category taxonomy directly in `sloth_organizer.py`:

```python
WATCH_DIR = os.path.expanduser("~/Downloads")
TARGET_BASE = os.path.expanduser("~/Documents/SlothOrganized")
CATEGORIES = [
    "Invoices_and_Finance",
    "Coursework_and_Notes",
    "Code_and_Dev",
    "Media",
    "Misc"
]
```

---

## 🧠 Model Prompt Architecture

The agent sends a standardized JSON-enforced system prompt to ensure deterministic local moves:

```json
{
  "category": "Invoices_and_Finance",
  "new_name": "Electricity_Bill_Oct2026.pdf"
}
```

Only the first 200 bytes/characters of non-binary documents are passed to the model to minimize inference latency on standard laptops (taking ~200–500ms per file on Apple Silicon or modern x86 CPUs).

---

## 📄 License

Distributed under the **MIT License**. Free for personal modification, commercial deployment, or community forks.
