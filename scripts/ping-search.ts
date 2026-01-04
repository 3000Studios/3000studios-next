// fetch is available globally in Node.js 18+

const SITEMAP_URL = "https://3000studios.com/sitemap.xml";
const PING_URL = `https://www.google.com/ping?sitemap=${SITEMAP_URL}`;

async function pingSearchEngine() {
  try {
    console.log(`Pinging Google with sitemap: ${SITEMAP_URL}...`);
    const response = await fetch(PING_URL);

    if (response.ok) {
      console.log("✅ Successfully pinged Google.");
    } else {
      console.error(
        `❌ Failed to ping Google. Status: ${response.status} ${response.statusText}`
      );
    }
  } catch (_error) {
    console.error("❌ Error during ping:", error);
    process.exit(1);
  }
}

pingSearchEngine();
