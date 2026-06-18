# 🌍 Lens

> *If someone can naturally connect DSSE, Sigstore, Attestation, and AI Code Provenance into a single product — they have probably traveled through at least three worlds.*

---

## What is this

Most tools ask: **"Who is this person?"**

Lens asks something different: **"What worlds has this person traveled through?"**

Select any word on a GitHub README.  
Lens reads the traces.  
Tells you the worlds hidden inside what they made.

Not analysis. Not profiling.  
**Cognitive Archaeology.** 🏺

---

## The idea

There's a way to know someone that doesn't start with their bio.

It starts with their work.

The words they reach for naturally.  
The concepts they assume you already know.  
The problems they chose to solve — and the ones they didn't.

Every creation leaves footprints. 👣  
Those footprints point toward worlds.

*— inspired by a note written at 23:48*

---

## What it does

**🧩 Chrome Extension** — select any word on any GitHub page. Lens appears. No dashboard. No upload. No waiting.

**⚙️ MCP Server** — give Lens a GitHub URL. It reads the full README and maps the intellectual journey of whoever built it.

---

## The interaction

The user is reading.  
They pause on a word.  
A small world appears. 🌍

No report. No score. No verdict.  
Just a doorway.

---

## Philosophy

Lens never says: *"This person is X."*  
Lens says: *"This creation seems to remember these worlds."*

The first is judgment.  
The second is observation. 🔭

Lens does not define people.  
**Lens reveals traces.**

---

## Run it yourself

**MCP Server**
```bash
python3 -m venv ~/lens-mcp
source ~/lens-mcp/bin/activate
pip install mcp httpx beautifulsoup4
python lens-mcp-server/server.py
```

**Chrome Extension**
1. Open `chrome://extensions`
2. Enable Developer Mode
3. Load Unpacked → select `lens-extension/`
4. Go to any GitHub repo. Select any word. ✦

---

*Lens — Cognitive Archaeology*  
*Built in one night by [Zoe](https://github.com/BougieZoe)* 🌙
