export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await env.ASSETS.fetch(request);
    } catch {
      return new Response("Internal Server Error", { status: 502 });
    }
  },
} satisfies ExportedHandler<Env>;
