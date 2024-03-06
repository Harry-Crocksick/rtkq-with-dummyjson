import { http, HttpResponse, delay } from "msw";

async function isAuthenticated(request: Request) {
  if (!request.headers.has("cookies")) {
    throw new HttpResponse(null, { status: 400 });
  }
}

export const handlers = [
  /* http[method](predicate, resolver) */

  http.get("/todos", async ({ request, params, cookies }) => {
    await delay(2000);
    return HttpResponse.json({
      requestUrl: request.url,
      requestParams: params,
      requestCookies: cookies,
    });
  }),

  http.post("/todos", async ({ request }) => {
    await isAuthenticated(request);
    return new HttpResponse(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  }),
];
