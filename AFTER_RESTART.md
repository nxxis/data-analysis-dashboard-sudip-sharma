After restart — quick checklist to get server & tests working

1) Open the project in terminal (PowerShell) and confirm you are in the repo root:
   cd "C:\Users\Kayla\BVCC\BVCC_Soft.Engi"

2) Ensure dependencies are installed:
   npm install openai dotenv express cors

3) Confirm or create `.env` (project root) with your API key and optional port:
   OPENAI_API_KEY=sk-...your_key_here...
   PORT=4000

   (You can create it in PowerShell:)
   Set-Content -Path .env -Value "OPENAI_API_KEY=your_key_here`nPORT=4000"

4) Start the server (in a terminal you can watch):
   node .\server\insight.js
   # or use nodemon if installed:
   npx nodemon .\server\insight.js

5) Confirm the server is listening on the port:
   Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue
   # or
   netstat -ano | Select-String ':4000'

6) Test the endpoint (PowerShell recommended):
   $body = @{ prompt = 'Write a haiku about autumn leaves' } | ConvertTo-Json
   Invoke-RestMethod -Method Post -Uri 'http://localhost:4000/insight' -ContentType 'application/json' -Body $body

   # or use the real curl.exe (not PowerShell alias):
   curl.exe -X POST "http://localhost:4000/insight" -H "Content-Type: application/json" -d '{"prompt":"Write a haiku about autumn leaves"}'

7) If you see a 401 or API key error:
   - Ensure `.env` has OPENAI_API_KEY and you restarted the server after creating `.env`.
   - Or set in session then restart:
     $env:OPENAI_API_KEY = 'sk-...'
     node .\server\insight.js

8) If you see server errors, copy the server console output and paste it into the GitHub Codespace / chat for help.

9) Optional cleanup after PR/merge work:
   # Update local main and delete remote branch if PR merged
   git fetch origin
   git checkout main
   git pull origin main
   git branch -d week5
   git push origin --delete week5

Notes:
- I can't actively remember across your computer restart; I wrote this file so you'll find the steps after you log back in.
- If you'd like, I can also add a short PowerShell script `run-insight.ps1` that sets the env var and starts the server for you. Reply "make script" and I'll add it.

Good luck — ping me after you restart and I can run through any errors with the console output.