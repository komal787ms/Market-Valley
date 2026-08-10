export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // =========================
    // LIVE NEWS
    // =========================
    if (url.pathname === "/api/news") {
      const apiUrl =
        "https://newsapi.org/v2/everything?q=(stock OR stocks OR market OR nifty OR sensex)&language=en&sortBy=publishedAt&pageSize=20";

      try {
        const response = await fetch(apiUrl, {
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

    // =========================
    // LIVE MARKET DATA - iDATA
    // =========================
    if (url.pathname === "/api/market") {
      const apiUrl = "https://idata.fyi/api/nse/indices";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-API-Key": env.MARKET_API_KEY,
            "Accept": "application/json"
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

    // =========================
    // LIVE PRE-MARKET
    // =========================
    if (url.pathname === "/api/pre-market") {
      const apiUrl = "https://idata.fyi/api/nse/pre-market";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-API-Key": env.MARKET_API_KEY,
            "Accept": "application/json"
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

    // =========================
    // DEFAULT - WEBSITE FILES
    // =========================
    return env.ASSETS.fetch(request);
  }
};
