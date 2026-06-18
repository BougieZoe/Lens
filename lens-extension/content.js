const DEEPSEEK_KEY = "YOUR_API_KEY_HERE"

async function askDeepSeek(word) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      max_tokens: 150,
      messages: [{
        role: "user",
        content: `The word "${word}" appears in a GitHub README. What 3 intellectual worlds has this creator likely traveled through? Reply with ONLY 3 world names, one per line, no explanation.`
      }]
    })
  })
  const data = await res.json()
  return data.choices[0].message.content.trim().split("\n").slice(0, 3)
}

function createPopup(worlds, x, y) {
  const old = document.getElementById("lens-popup")
  if (old) old.remove()

  const popup = document.createElement("div")
  popup.id = "lens-popup"
  popup.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y - 140}px;
    background: #0A0A0F;
    border: 1px solid rgba(123,158,166,0.3);
    color: #E8E8E8;
    padding: 14px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    border-radius: 2px;
    z-index: 99999;
    max-width: 260px;
    line-height: 1.8;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  `
  popup.innerHTML = `
    <div style="color: #7B9EA6; font-size: 10px; letter-spacing: 0.15em; margin-bottom: 8px;">🌍 WORLDS DETECTED</div>
    ${worlds.map((w, i) => `<div style="opacity: ${1 - i * 0.2}">${i === 0 ? "" : "↓ "}${w}</div>`).join("")}
  `
  document.body.appendChild(popup)
  setTimeout(() => popup.remove(), 5000)
}

function showLoading(x, y) {
  const old = document.getElementById("lens-popup")
  if (old) old.remove()
  const popup = document.createElement("div")
  popup.id = "lens-popup"
  popup.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y - 140}px;
    background: #0A0A0F;
    border: 1px solid rgba(123,158,166,0.3);
    color: #7B9EA6;
    padding: 14px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    border-radius: 2px;
    z-index: 99999;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  `
  popup.innerHTML = `🌍 reading traces...`
  document.body.appendChild(popup)
}

document.addEventListener("mouseup", async () => {
  const selection = window.getSelection().toString().trim()
  if (!selection || selection.length < 3 || selection.length > 50) return

  const rect = window.getSelection().getRangeAt(0).getBoundingClientRect()
  showLoading(rect.left, rect.top)

  const worlds = await askDeepSeek(selection)
  createPopup(worlds, rect.left, rect.top)
})
