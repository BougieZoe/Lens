import httpx
from bs4 import BeautifulSoup
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Lens")

@mcp.tool()
def detect_worlds(keyword: str) -> str:
    """Given a keyword, return the worlds it connects to."""
    world_map = {
        "sigstore": ["Open Source Infrastructure", "Identity & Verification", "Cryptography World"],
        "attestation": ["Security World", "Trust Infrastructure", "Legal & Compliance"],
        "dsse": ["Security World", "Open Source Infrastructure", "Platform Engineering"],
        "provenance": ["AI Governance", "Supply Chain Security", "Research World"],
        "supply chain": ["Platform Engineering", "Security World", "Open Source Infrastructure"],
    }
    key = keyword.lower()
    for k, worlds in world_map.items():
        if k in key:
            return f"Worlds detected for '{keyword}':\n" + "\n↓ ".join(worlds)
    return f"No world map found for '{keyword}' yet."

@mcp.tool()
def analyze_readme(url: str) -> str:
    """Fetch a GitHub README and detect what worlds this creator has traveled through."""
    try:
        r = httpx.get(url, follow_redirects=True, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")
        text = soup.get_text().lower()

        world_signals = {
            "Open Source World": ["open source", "contributor", "pull request", "license", "fork"],
            "Security World": ["sigstore", "attestation", "vulnerability", "cve", "encryption", "zero trust"],
            "AI World": ["llm", "machine learning", "neural", "transformer", "inference", "fine-tuning"],
            "Design World": ["figma", "ui", "ux", "design system", "typography", "accessibility"],
            "Research World": ["arxiv", "paper", "dataset", "experiment", "hypothesis", "benchmark"],
            "Platform Engineering": ["kubernetes", "docker", "ci/cd", "pipeline", "infrastructure"],
            "AI Governance": ["provenance", "supply chain", "compliance", "audit", "transparency"],
        }

        detected = []
        for world, signals in world_signals.items():
            hits = [s for s in signals if s in text]
            if hits:
                detected.append(f"{world} (signals: {', '.join(hits)})")

        if detected:
            return "Worlds detected:\n" + "\n↓ ".join(detected)
        return "No strong world signals detected in this README."

    except Exception as e:
        return f"Could not fetch URL: {e}"

if __name__ == "__main__":
    mcp.run()
