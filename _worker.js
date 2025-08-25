export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const isFileRequest = pathname.includes('.');

    try {
      const response = await env.ASSETS.fetch(request);

      if(response.status === 404 && !isFileRequest) {
        const spaRequest = new Request(new URL('/', url), request);
        return env.ASSETS.fetch(spaRequest);
      }

      return response;
      
    } catch (e) {
      if ( e instanceof Error) {
        return new Response(e.message || e.toString(), { status: 500});
      }
      return new Response('Internal Server Error', { status: 500});
    }

  // ...existing code...
  }
};
  