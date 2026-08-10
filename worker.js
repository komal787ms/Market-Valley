export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // News API
    if (url.pathname === "/api/news") {
      const apiUrl =
        "https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=20";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-Api-Key": env.NEWS_API_KEY,
            "User-Agent": "Market-Vally/1.0"
          }
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        });
      } catch (error) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: error.message
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }
    }

    // Website
    return env.ASSETS.fetch(request);
  }
};
