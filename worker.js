export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/news") {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=in&category=business",
        {
          headers: {
            "X-Api-Key": env.NEWS_API_KEY
          }
        }
      );

      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response("Market-Vally Worker is running");
  }
};
