# Go to backend folder (THIS IS IMPORTANT)
Set-Location -Path "$PSScriptRoot"

# Activate venv
.\lms_venv\Scripts\Activate.ps1

# Run FastAPI
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
