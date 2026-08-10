export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // News API endpoint
    if (url.pathname === "/api/news") {
      const apiUrl =
        "https://newsapi.org/v2/top-headlines?country=in&category=business";

      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": env.NEWS_API_KEY
        }
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Website files
    return env.ASSETS.fetch(request);
  }
};
