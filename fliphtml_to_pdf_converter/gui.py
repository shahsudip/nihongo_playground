"""
Modern Desktop GUI for FlipHTML to PDF Converter using Tkinter / TTK.
Multi-threaded, responsive, and easy to use.
"""

import os
import sys
import threading
from pathlib import Path
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.resolve()))

from core.local_extractor import convert_local_fliphtml, find_flipbook_pages
from core.online_downloader import convert_online_fliphtml
from core.browser_renderer import convert_browser_fliphtml


class FlipHTMLGui(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("FlipHTML to PDF Converter — Free Tool")
        self.geometry("680x520")
        self.minsize(620, 480)

        # Style configuration
        self.style = ttk.Style(self)
        self.style.theme_use("clam")
        
        # Color palette
        self.configure(bg="#F4F6F9")
        self.style.configure(".", background="#F4F6F9", font=("Segoe UI", 10))
        self.style.configure("TNotebook", background="#E2E8F0")
        self.style.configure("TNotebook.Tab", font=("Segoe UI", 10, "bold"), padding=[16, 6])
        self.style.configure("Accent.TButton", font=("Segoe UI", 11, "bold"), padding=[12, 8])

        self.last_generated_pdf = None

        self._build_header()
        self._build_tabs()
        self._build_progress_section()

    def _build_header(self):
        header_frame = tk.Frame(self, bg="#1E293B", height=70)
        header_frame.pack(fill=tk.X, side=tk.TOP)

        title_lbl = tk.Label(
            header_frame,
            text="📖 FlipHTML to PDF Converter",
            font=("Segoe UI", 16, "bold"),
            fg="#FFFFFF",
            bg="#1E293B"
        )
        title_lbl.pack(anchor="w", padx=20, pady=(12, 2))

        sub_lbl = tk.Label(
            header_frame,
            text="100% Free, Lossless, Watermark-Free PDF Generator for Offline & Online Flipbooks",
            font=("Segoe UI", 9),
            fg="#94A3B8",
            bg="#1E293B"
        )
        sub_lbl.pack(anchor="w", padx=20, pady=(0, 10))

    def _build_tabs(self):
        self.notebook = ttk.Notebook(self)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=20, pady=15)

        # Tab 1: Local Folder/File
        self.tab_local = ttk.Frame(self.notebook, padding=15)
        self.notebook.add(self.tab_local, text=" 📁 Local FlipHTML Folder / File ")
        self._build_local_tab(self.tab_local)

        # Tab 2: Online URL
        self.tab_online = ttk.Frame(self.notebook, padding=15)
        self.notebook.add(self.tab_online, text=" 🌐 Online FlipHTML5 URL ")
        self._build_online_tab(self.tab_online)

    def _build_local_tab(self, parent):
        lbl_info = ttk.Label(
            parent,
            text="Select an extracted FlipHTML book folder (or an index.html file):",
            font=("Segoe UI", 10, "bold")
        )
        lbl_info.pack(anchor="w", pady=(0, 6))

        # Path input frame
        path_frame = ttk.Frame(parent)
        path_frame.pack(fill=tk.X, pady=(0, 12))

        self.local_path_var = tk.StringVar()
        self.entry_local = ttk.Entry(path_frame, textvariable=self.local_path_var, font=("Segoe UI", 10))
        self.entry_local.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 6))

        btn_browse_folder = ttk.Button(path_frame, text="Browse Folder...", command=self._browse_folder)
        btn_browse_folder.pack(side=tk.LEFT, padx=(0, 4))

        btn_browse_file = ttk.Button(path_frame, text="Browse HTML...", command=self._browse_file)
        btn_browse_file.pack(side=tk.LEFT)

        # Output path
        lbl_out = ttk.Label(parent, text="Save PDF to (optional, defaults next to folder):")
        lbl_out.pack(anchor="w", pady=(6, 4))

        out_frame = ttk.Frame(parent)
        out_frame.pack(fill=tk.X, pady=(0, 15))

        self.local_out_var = tk.StringVar()
        self.entry_local_out = ttk.Entry(out_frame, textvariable=self.local_out_var, font=("Segoe UI", 10))
        self.entry_local_out.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 6))

        btn_browse_out = ttk.Button(out_frame, text="Select Output...", command=self._browse_local_output)
        btn_browse_out.pack(side=tk.LEFT)

        # Convert button
        self.btn_convert_local = ttk.Button(
            parent,
            text="⚡ Generate PDF from Local Book",
            style="Accent.TButton",
            command=self._start_local_conversion
        )
        self.btn_convert_local.pack(fill=tk.X, pady=(10, 0))

    def _build_online_tab(self, parent):
        lbl_info = ttk.Label(
            parent,
            text="Enter Online FlipHTML5 URL (e.g., https://online.fliphtml5.com/xxxx/yyyy/):",
            font=("Segoe UI", 10, "bold")
        )
        lbl_info.pack(anchor="w", pady=(0, 6))

        self.online_url_var = tk.StringVar()
        self.entry_online = ttk.Entry(parent, textvariable=self.online_url_var, font=("Segoe UI", 10))
        self.entry_online.pack(fill=tk.X, pady=(0, 12))

        # Output path
        lbl_out = ttk.Label(parent, text="Save PDF to (optional):")
        lbl_out.pack(anchor="w", pady=(6, 4))

        out_frame = ttk.Frame(parent)
        out_frame.pack(fill=tk.X, pady=(0, 15))

        self.online_out_var = tk.StringVar()
        self.entry_online_out = ttk.Entry(out_frame, textvariable=self.online_out_var, font=("Segoe UI", 10))
        self.entry_online_out.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 6))

        btn_browse_out = ttk.Button(out_frame, text="Select Output...", command=self._browse_online_output)
        btn_browse_out.pack(side=tk.LEFT)

        # Convert button
        self.btn_convert_online = ttk.Button(
            parent,
            text="⬇️ Download & Convert Online Flipbook",
            style="Accent.TButton",
            command=self._start_online_conversion
        )
        self.btn_convert_online.pack(fill=tk.X, pady=(10, 0))

    def _build_progress_section(self):
        prog_frame = ttk.Frame(self, padding=(20, 0, 20, 15))
        prog_frame.pack(fill=tk.X, side=tk.BOTTOM)

        self.progress_bar = ttk.Progressbar(prog_frame, mode="determinate")
        self.progress_bar.pack(fill=tk.X, pady=(0, 6))

        self.status_var = tk.StringVar(value="Ready. Select a folder, file, or paste a URL.")
        self.lbl_status = ttk.Label(prog_frame, textvariable=self.status_var, foreground="#475569")
        self.lbl_status.pack(anchor="w")

        # Quick action buttons frame
        self.action_frame = ttk.Frame(prog_frame)
        self.action_frame.pack(fill=tk.X, pady=(8, 0))

        self.btn_open_pdf = ttk.Button(self.action_frame, text="📄 Open PDF", command=self._open_pdf, state=tk.DISABLED)
        self.btn_open_pdf.pack(side=tk.LEFT, padx=(0, 6))

        self.btn_open_folder = ttk.Button(self.action_frame, text="📂 Open Containing Folder", command=self._open_folder, state=tk.DISABLED)
        self.btn_open_folder.pack(side=tk.LEFT)

    def _browse_folder(self):
        folder = filedialog.askdirectory(title="Select FlipHTML Root Directory")
        if folder:
            self.local_path_var.set(folder)

    def _browse_file(self):
        file_path = filedialog.askopenfilename(
            title="Select HTML File",
            filetypes=[("HTML Files", "*.html;*.htm"), ("All Files", "*.*")]
        )
        if file_path:
            self.local_path_var.set(file_path)

    def _browse_local_output(self):
        f = filedialog.asksaveasfilename(
            title="Save Output PDF As",
            defaultextension=".pdf",
            filetypes=[("PDF Documents", "*.pdf")]
        )
        if f:
            self.local_out_var.set(f)

    def _browse_online_output(self):
        f = filedialog.asksaveasfilename(
            title="Save Downloaded PDF As",
            defaultextension=".pdf",
            filetypes=[("PDF Documents", "*.pdf")]
        )
        if f:
            self.online_out_var.set(f)

    def update_progress(self, current: int, total: int, message: str):
        self.progress_bar["value"] = int((current / total) * 100) if total else 0
        self.status_var.set(message)
        self.update_idletasks()

    def _start_local_conversion(self):
        path = self.local_path_var.get().strip()
        if not path:
            messagebox.showwarning("Missing Input", "Please select a FlipHTML folder or file first.")
            return

        out_pdf = self.local_out_var.get().strip() or None
        self._toggle_ui(False)

        def worker():
            try:
                result = convert_local_fliphtml(path, output_pdf=out_pdf, progress_callback=self.update_progress)
                self.last_generated_pdf = result
                self.btn_open_pdf.config(state=tk.NORMAL)
                self.btn_open_folder.config(state=tk.NORMAL)
                messagebox.showinfo("Success", f"PDF generated successfully!\n\n{result}")
            except Exception as ex:
                messagebox.showerror("Conversion Failed", str(ex))
                self.status_var.set(f"Error: {ex}")
            finally:
                self._toggle_ui(True)

        threading.Thread(target=worker, daemon=True).start()

    def _start_online_conversion(self):
        url = self.online_url_var.get().strip()
        if not url:
            messagebox.showwarning("Missing URL", "Please enter an online FlipHTML5 URL.")
            return

        out_pdf = self.online_out_var.get().strip() or None
        self._toggle_ui(False)

        def worker():
            try:
                result = convert_online_fliphtml(url, output_pdf=out_pdf, progress_callback=self.update_progress)
                self.last_generated_pdf = result
                self.btn_open_pdf.config(state=tk.NORMAL)
                self.btn_open_folder.config(state=tk.NORMAL)
                messagebox.showinfo("Success", f"Online Flipbook downloaded and saved as PDF!\n\n{result}")
            except Exception as ex:
                messagebox.showerror("Download/Conversion Failed", str(ex))
                self.status_var.set(f"Error: {ex}")
            finally:
                self._toggle_ui(True)

        threading.Thread(target=worker, daemon=True).start()

    def _toggle_ui(self, enabled: bool):
        state = tk.NORMAL if enabled else tk.DISABLED
        self.btn_convert_local.config(state=state)
        self.btn_convert_online.config(state=state)

    def _open_pdf(self):
        if self.last_generated_pdf and os.path.exists(self.last_generated_pdf):
            os.startfile(self.last_generated_pdf)

    def _open_folder(self):
        if self.last_generated_pdf and os.path.exists(self.last_generated_pdf):
            folder = Path(self.last_generated_pdf).parent
            os.startfile(str(folder))


def launch_gui():
    app = FlipHTMLGui()
    app.mainloop()


if __name__ == "__main__":
    launch_gui()
