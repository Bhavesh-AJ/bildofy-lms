import os
import tempfile
import zipfile
import rarfile
from tkinter import Tk, filedialog, messagebox
from PyPDF2 import PdfMerger

def extract_pdfs_from_archive(archive_path, extract_dir):
    pdf_files = []
    file_ext = os.path.splitext(archive_path)[1].lower()

    if file_ext == ".zip":
        with zipfile.ZipFile(archive_path, "r") as zip_ref:
            zip_ref.extractall(extract_dir)
    elif file_ext == ".rar":
        with rarfile.RarFile(archive_path, "r") as rar_ref:
            rar_ref.extractall(extract_dir)
    else:
        raise ValueError("Unsupported file type. Please select a .zip or .rar file.")

    # Collect all PDF files recursively
    for root, _, files in os.walk(extract_dir):
        for f in files:
            if f.lower().endswith(".pdf"):
                pdf_files.append(os.path.join(root, f))
    
    return pdf_files

def sort_pdfs(pdf_files):
    """Sorts PDFs so that ones containing '1ps' in filename come first."""
    def sort_key(path):
        filename = os.path.basename(path).lower()
        if "ps" in filename:
            return (0, filename)
        return (1, filename)
    return sorted(pdf_files, key=sort_key)

def combine_pdfs(pdf_paths, output_path):
    merger = PdfMerger()
    for pdf in pdf_paths:
        merger.append(pdf)
    merger.write(output_path)
    merger.close()

def main():
    Tk().withdraw()  # Hide the root window

    messagebox.showinfo("Select Archive", "Choose a ZIP or RAR file containing PDFs.")
    archive_path = filedialog.askopenfilename(
        title="Select ZIP or RAR File",
        filetypes=[("Archive Files", "*.zip *.rar")]
    )

    if not archive_path:
        messagebox.showwarning("No file selected", "Operation cancelled.")
        return

    # Temporary extraction directory
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            pdf_files = extract_pdfs_from_archive(archive_path, temp_dir)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to extract PDFs: {e}")
            return

        if not pdf_files:
            messagebox.showwarning("No PDFs found", "No PDF files were found in the archive.")
            return

        # Sort PDFs: "1ps" files first
        pdf_files = sort_pdfs(pdf_files)

        messagebox.showinfo("Select Save Location", "Choose where to save the combined PDF.")
        output_path = filedialog.asksaveasfilename(
            defaultextension=".pdf",
            filetypes=[("PDF Files", "*.pdf")],
            title="Save Combined PDF As"
        )

        if not output_path:
            messagebox.showwarning("No location selected", "Operation cancelled.")
            return

        try:
            combine_pdfs(pdf_files, output_path)
            messagebox.showinfo("Success", f"PDFs combined successfully!\nSaved at:\n{output_path}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to combine PDFs: {e}")

if __name__ == "__main__":
    main()
