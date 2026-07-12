// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { ALL_PROJECTS } from '@/data/projects/index';

const intlMiddleware = createMiddleware({ locales: ['es', 'en'], defaultLocale: 'es' });
const projectPaths = new Set(ALL_PROJECTS.map((project) => project.slug));

export default function middleware(request: NextRequest) {
  const projectMatch = request.nextUrl.pathname.match(
    /^\/(es|en)(\/proyectos\/[^/]+)\/?$/,
  );

  if (projectMatch && !projectPaths.has(projectMatch[2])) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-next-intl-locale', projectMatch[1]);

    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = `/${projectMatch[1]}/__localized-not-found`;

    return NextResponse.rewrite(notFoundUrl, {
      status: 404,
      request: { headers: requestHeaders },
    });
  }

  return intlMiddleware(request);
}

export const config = { matcher: ['/', '/(es|en)/:path*'] };
