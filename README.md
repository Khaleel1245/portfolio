# Academic Information Portfolio

A dynamic, responsive portfolio website built with React, Vite, and Tailwind CSS.
This application fetches content directly from your Google Sheets, ensuring your portfolio is always up-to-date without changing code.

## features

- **Dynamic Data Loading**: Connects to 18+ Google Sheets.
- **Section Filtering**: Automatically hides empty sections.
- **Responsive Design**: Mobile-friendly layout with a sidebar navigation.
- **Modern UI**: Clean, academic aesthetic with a premium feel.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   Open the link shown (usually http://localhost:5173).

3. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration

The sheet connections are defined in `src/config/sheets.ts`.
If you create new versions of the sheets, update the IDs there.

**Note**: Ensure your Google Sheets are set to "Anyone with the link can view" for the fetching to work.
