import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist/frank-mcguire-portfolio/browser');
const port = Number(process.argv[3] ?? 4200);
const host = process.argv[4] ?? '127.0.0.1';

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function resolveRequestPath(url) {
  const { pathname } = new URL(url, `http://${host}:${port}`);
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(/^([/\\])+/, '');
  const requestedPath = resolve(join(root, normalizedPath));

  if (requestedPath !== root && !requestedPath.startsWith(`${root}${sep}`)) {
    return null;
  }

  return requestedPath;
}

async function readStaticFile(filePath) {
  const fileStat = await stat(filePath);
  const resolvedPath = fileStat.isDirectory() ? join(filePath, 'index.html') : filePath;
  return {
    body: await readFile(resolvedPath),
    contentType: contentTypes.get(extname(resolvedPath)) ?? 'application/octet-stream',
  };
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405);
    response.end();
    return;
  }

  const requestedPath = resolveRequestPath(request.url ?? '/');
  if (!requestedPath) {
    response.writeHead(403);
    response.end();
    return;
  }

  try {
    const file = await readStaticFile(requestedPath);
    response.writeHead(200, { 'Content-Type': file.contentType });
    response.end(request.method === 'HEAD' ? undefined : file.body);
  } catch {
    const acceptsHtml = request.headers.accept?.includes('text/html') ?? false;
    if (extname(requestedPath) && !acceptsHtml) {
      response.writeHead(404);
      response.end();
      return;
    }

    const file = await readStaticFile(join(root, 'index.html'));
    response.writeHead(200, { 'Content-Type': file.contentType });
    response.end(request.method === 'HEAD' ? undefined : file.body);
  }
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
