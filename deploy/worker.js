/* Zenith'26 — static site worker: API routes first (none), then assets. */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
