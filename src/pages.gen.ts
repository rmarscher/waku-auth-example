// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_ProtectedAbout_getConfig } from './pages/(protected)/about';
// prettier-ignore
import type { getConfig as File_ProtectedSecret_getConfig } from './pages/(protected)/secret';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof File_ProtectedAbout_getConfig>)
| ({ path: '/secret' } & GetConfigResponse<typeof File_ProtectedSecret_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
