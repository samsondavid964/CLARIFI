# Clarifi AI

**AI-Powered Legal Document Analysis**

Clarifi AI is a modern web application that leverages advanced AI to help users understand and analyze complex legal documents. Upload a PDF or paste text, and receive instant, actionable insights, summaries, and risk highlights—all in a beautiful, user-friendly interface.

---

## Features

- **AI-Powered Legal Analysis**: Instantly analyze contracts, agreements, rental documents, terms & conditions, and more.
- **Multiple Input Methods**: Upload PDF files or paste text directly for analysis.
- **Comprehensive Reports**: Get summaries, key terms, and risk factors extracted from your documents.
- **Follow-up Q&A**: Ask questions about your document and get AI-generated answers.
- **User Authentication**: Simple sign-in flow (mocked for demo purposes).
- **Modern UI/UX**: Responsive, accessible, and visually appealing design with smooth animations.
- **Notifications**: Toasts and alerts for user feedback.
- **404 Handling**: Friendly not-found page for invalid routes.

---

## Demo

> **Live demo:** _https://clarifi-jyr6.onrender.com_

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samsondavid964/CLARIFI.git
   cd CLARIFI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080).

---

## Usage

1. **Sign In**  
   Use the following credentials (mocked for demo):
   - Email: `edafee65@gmail.com`
   - Password: `QWERTY`

2. **Analyze a Document**
   - Paste text or upload a PDF.
   - Click "Analyze Document" to receive an AI-generated report.

3. **Ask Questions**
   - After analysis, use the Q&A feature to ask follow-up questions about your document.

4. **Sign Out**
   - Use the profile dropdown to sign out.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **UI Components:** Radix UI, Lucide Icons
- **PDF Parsing:** pdfjs-dist
- **State Management:** React Context, React Query
- **Notifications:** Custom Toasts, Sonner
- **Form Handling:** React Hook Form
- **Other:** Class Variance Authority, clsx, tailwind-merge

---

## Project Structure

```
CLARIFI/
├── public/                # Static assets (favicon, images, robots.txt)
├── src/
│   ├── components/        # UI and feature components
│   ├── contexts/          # React Contexts (e.g., Auth)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components (Index, NotFound)
│   ├── App.tsx            # App root with routing/providers
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind and global styles
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## Environment Variables

- No environment variables are required for the default demo setup.
- If you wish to use your own AI backend/webhooks, update the URLs in:
  - `src/components/DocumentAnalyzer.tsx`
  - `src/components/ReportDisplay.tsx`

---

## Customization

- **Branding:** Update the favicon and images in `public/`.
- **AI Webhooks:** Change the webhook URLs in the relevant components to connect your own AI backend.
- **Authentication:** Replace the mock authentication logic in `src/contexts/AuthContext.tsx` with your own provider for production use.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

[MIT](LICENSE)

---

## Author

**Edafeoghene Egona**  
[Portfolio](https://egonaedafeoghene.framer.website/)
