#!/usr/bin/env python3
# Minimal proxy: rewrites /rest/v1/* -> /* and forwards to PostgREST on :3000.
# Lets the local stack respond at the exact Supabase URL shape (http://host/rest/v1/<table>).
import http.server, urllib.request, urllib.error

UPSTREAM = "http://localhost:3000"
PREFIX = "/rest/v1"

class H(http.server.BaseHTTPRequestHandler):
    def _proxy(self, method):
        path = self.path
        if path.startswith(PREFIX):
            path = path[len(PREFIX):] or "/"
        body = None
        cl = self.headers.get("Content-Length")
        if cl: body = self.rfile.read(int(cl))
        req = urllib.request.Request(UPSTREAM + path, data=body, method=method)
        for k, v in self.headers.items():
            if k.lower() not in ("host", "content-length"): req.add_header(k, v)
        try:
            with urllib.request.urlopen(req) as r:
                self.send_response(r.status)
                for k, v in r.headers.items():
                    if k.lower() not in ("transfer-encoding", "connection"): self.send_header(k, v)
                self.end_headers(); self.wfile.write(r.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            data = e.read()
            self.send_header("Content-Type", "application/json"); self.end_headers(); self.wfile.write(data)
        except Exception as e:
            self.send_response(502); self.end_headers(); self.wfile.write(str(e).encode())
    def do_GET(self): self._proxy("GET")
    def do_POST(self): self._proxy("POST")
    def do_PATCH(self): self._proxy("PATCH")
    def do_DELETE(self): self._proxy("DELETE")
    def log_message(self, *a): pass

if __name__ == "__main__":
    http.server.HTTPServer(("0.0.0.0", 8000), H).serve_forever()
