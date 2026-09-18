"""
Lightweight Web Interface for FlipHTML to PDF Converter.
Requires zero external web frameworks (built entirely on Python's http.server).
"""

import os
import sys
import json
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
import webbrowser
import threading

sys.path.insert(0, str(Path(__file__).parent.resolve()))

from core.local_extractor import convert_local_fliphtml
from core.online_downloader import convert_online_fliphtml

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlipHTML to PDF Converter (Free)</title>
    <style>
        :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --border: #334155;
            --success: #10b981;
            --error: #ef4444;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: var(--bg); color: var(--text); display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .container { background: var(--card-bg); width: 100%; max-width: 650px; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); overflow: hidden; }
        .header { padding: 24px; border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.02); }
        .header h1 { font-size: 1.4rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
        .header p { color: var(--text-muted); font-size: 0.88rem; margin-top: 4px; }
        .tabs { display: flex; border-bottom: 1px solid var(--border); }
        .tab-btn { flex: 1; padding: 14px; background: none; border: none; color: var(--text-muted); font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab-btn.active { color: #60a5fa; border-bottom-color: #60a5fa; background: rgba(96, 165, 250, 0.05); }
        .content { padding: 24px; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: #cbd5e1; }
        input[type="text"] { width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid var(--border); background: #0f172a; color: #fff; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
        input[type="text"]:focus { border-color: #60a5fa; }
        .btn-submit { width: 100%; padding: 13px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; display: flex; justify-content: center; align-items: center; gap: 8px; }
        .btn-submit:hover { background: var(--primary-hover); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        #statusBox { margin-top: 20px; padding: 14px; border-radius: 8px; display: none; font-size: 0.9rem; line-height: 1.5; }
        #statusBox.success { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success); color: #6ee7b7; }
        #statusBox.error { background: rgba(239, 68, 68, 0.15); border: 1px solid var(--error); color: #fca5a5; }
        #statusBox.loading { background: rgba(37, 99, 235, 0.15); border: 1px solid var(--primary); color: #93c5fd; }
        .spinner { width: 18px; height: 18px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📖 FlipHTML to PDF Converter</h1>
            <p>100% Free & Lossless PDF generation for offline folders and online flipbooks.</p>
        </div>
        <div class="tabs">
            <button class="tab-btn active" onclick="switchTab('local')">📁 Local Folder / File</button>
            <button class="tab-btn" onclick="switchTab('online')">🌐 Online FlipHTML5 URL</button>
        </div>
        <div class="content">
            <!-- Local Tab -->
            <div id="tab-local" class="tab-content active">
                <div class="form-group">
                    <label>FlipHTML Folder or index.html Path:</label>
                    <input type="text" id="localPath" placeholder="e.g. D:/MyBooks/FlipBook_Folder or C:/.../index.html">
                </div>
                <div class="form-group">
                    <label>Output PDF Path (optional):</label>
                    <input type="text" id="localOutput" placeholder="e.g. D:/MyBooks/ConvertedBook.pdf">
                </div>
                <button class="btn-submit" id="btnLocal" onclick="convertLocal()">⚡ Generate PDF</button>
            </div>

            <!-- Online Tab -->
            <div id="tab-online" class="tab-content">
                <div class="form-group">
                    <label>Online FlipHTML5 URL:</label>
                    <input type="text" id="onlineUrl" placeholder="https://online.fliphtml5.com/xxxx/yyyy/">
                </div>
                <div class="form-group">
                    <label>Output PDF File (optional):</label>
                    <input type="text" id="onlineOutput" placeholder="e.g. MyOnlineBook.pdf">
                </div>
                <button class="btn-submit" id="btnOnline" onclick="convertOnline()">⬇️ Download & Convert to PDF</button>
            </div>

            <div id="statusBox"></div>
        </div>
    </div>

    <script>
        function switchTab(type) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            if(type === 'local') {
                document.querySelectorAll('.tab-btn')[0].classList.add('active');
                document.getElementById('tab-local').classList.add('active');
            } else {
                document.querySelectorAll('.tab-btn')[1].classList.add('active');
                document.getElementById('tab-online').classList.add('active');
            }
        }

        async function convertLocal() {
            const path = document.getElementById('localPath').value.trim();
            const out = document.getElementById('localOutput').value.trim();
            if(!path) { alert('Please enter a folder or file path.'); return; }
            await sendRequest('/api/convert/local', { path: path, output: out }, 'btnLocal');
        }

        async function convertOnline() {
            const url = document.getElementById('onlineUrl').value.trim();
            const out = document.getElementById('onlineOutput').value.trim();
            if(!url) { alert('Please enter a FlipHTML5 URL.'); return; }
            await sendRequest('/api/convert/online', { url: url, output: out }, 'btnOnline');
        }

        async function sendRequest(endpoint, body, btnId) {
            const btn = document.getElementById(btnId);
            const statusBox = document.getElementById('statusBox');
            btn.disabled = true;
            statusBox.style.display = 'block';
            statusBox.className = 'loading';
            statusBox.innerHTML = '<span class="spinner"></span> Converting FlipHTML to PDF, please wait...';

            try {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const data = await res.json();
                if(data.success) {
                    statusBox.className = 'success';
                    statusBox.innerHTML = '<strong>✓ Conversion Successful!</strong><br>Saved to: <code>' + data.pdf_path + '</code>';
                } else {
                    statusBox.className = 'error';
                    statusBox.innerHTML = '<strong>✗ Failed:</strong> ' + data.error;
                }
            } catch (err) {
                statusBox.className = 'error';
                statusBox.innerHTML = '<strong>✗ Request Error:</strong> ' + err.message;
            } finally {
                btn.disabled = false;
            }
        }
    </script>
</body>
</html>
"""


class FlipHTMLRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode("utf-8"))
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req_json = json.loads(post_data.decode("utf-8"))
        except Exception:
            req_json = {}

        response_data = {"success": False}

        if self.path == "/api/convert/local":
            path = req_json.get("path")
            out = req_json.get("output") or None
            try:
                pdf_path = convert_local_fliphtml(path, output_pdf=out)
                response_data = {"success": True, "pdf_path": pdf_path}
            except Exception as e:
                response_data = {"success": False, "error": str(e)}

        elif self.path == "/api/convert/online":
            url = req_json.get("url")
            out = req_json.get("output") or None
            try:
                pdf_path = convert_online_fliphtml(url, output_pdf=out)
                response_data = {"success": True, "pdf_path": pdf_path}
            except Exception as e:
                response_data = {"success": False, "error": str(e)}

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode("utf-8"))

    def log_message(self, format, *args):
        # Clean server logging
        pass


def run_web_server(port: int = 5820):
    server = HTTPServer(("127.0.0.1", port), FlipHTMLRequestHandler)
    url = f"http://127.0.0.1:{port}"
    print(f"\n=======================================================")
    print(f" 🚀 FlipHTML to PDF Web Server Running!")
    print(f" 👉 Access UI in your browser: {url}")
    print(f" Press Ctrl+C to stop the server.")
    print(f"=======================================================\n")
    
    # Auto-open browser
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping web server...")
        server.server_close()


if __name__ == "__main__":
    run_web_server()
