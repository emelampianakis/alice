import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Disabled for GitHub Pages preview
    // renderMode: RenderMode.Prerender
    renderMode: RenderMode.Client,
  },
];
