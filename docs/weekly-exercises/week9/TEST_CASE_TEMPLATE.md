# Week 9 — Test Case Template

Use this template to describe edge cases and expected behavior for CSV parsing and data handling.

- Title: Short descriptive title for the test
- Purpose: Why this test exists
- Input file: (path to sample CSV used)
- Pre-conditions: (e.g., app started, file uploaded)
- Steps to reproduce:
  1. Step 1
  2. Step 2
  3. ...
- Expected result: (What should the UI show? Any status codes?)
- Notes: (Any additional context)

## Example

- Title: Empty CSV
- Purpose: App should show a helpful error when a CSV contains no rows
- Input file: `sample-data/test-files/empty.csv`
- Pre-conditions: App is running and user opens the upload area
- Steps to reproduce:
  1. Upload `empty.csv` using the DataUpload component
  2. Click Analyze / Visualize
- Expected result: The app displays a friendly error like "No data found" and does not crash.
- Notes: Ensure File headers are validated and user sees guidance on required columns.
