export async function onRequest(context) {
  const apiUrl =
    "https://newsapi.org/v2/top-headlines?country=in&category=business";

  const response = await fetch(apiUrl, {
    headers: {
      "X-Api-Key": context.env.NEWS_API_KEY
    }
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
