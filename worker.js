export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // News API
    if (url.pathname === "/api/news") {
      const apiUrl =
        "https://newsapi.org/v2/top-headlines?country=in&category=business";

      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": env.NEWS_API_KEY,
          "User-Agent":"Market-Valley/1.0"
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

    // Website
    return env.ASSETS.fetch(request);
  }
};
