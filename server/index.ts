// server/index.ts
export default {
  async fetch(request, env, ctx) {
    return env.ASSETS.fetch(request);
  },
};
