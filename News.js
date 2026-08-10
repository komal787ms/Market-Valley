async function loadNews() {
  const container = document.getElementById("news-container");

  if (!container) return;

  container.innerHTML = `
    <div class="news-loading">
      📰 ताज़ा बाजार समाचार लोड हो रहे हैं...
    </div>
  `;

  try {
    const response = await fetch("/api/news");

    if (!response.ok) {
      throw new Error("News API failed");
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `
        <div class="news-empty">
          अभी कोई समाचार उपलब्ध नहीं है।
        </div>
      `;
      return;
    }

    container.innerHTML = data.articles.map(article => {

      const title = article.title || "समाचार";
      const description =
        article.description || "इस समाचार की अधिक जानकारी पढ़ें।";

      const image =
        article.urlToImage ||
        article.image ||
        "https://via.placeholder.com/600x350?text=Market-Valley";

      const source =
        article.source?.name || "News";

      const url = article.url || "#";

      return `
        <article class="news-card">

          <img
            src="${image}"
            alt="${title}"
            class="news-image"
            onerror="this.src='https://via.placeholder.com/600x350?text=Market-Valley'"
          >

          <div class="news-content">

            <div class="news-source">
              ${source}
            </div>

            <h3>${title}</h3>

            <p>${description}</p>

            <a
              href="${url}"
              target="_blank"
              rel="noopener noreferrer"
              class="read-news"
            >
              पूरी खबर पढ़ें →
            </a>

          </div>

        </article>
      `;

    }).join("");

  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div class="news-error">
        ❌ समाचार लोड नहीं हो पाए।
        <br>
        थोड़ी देर बाद फिर कोशिश करें।
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadNews);
