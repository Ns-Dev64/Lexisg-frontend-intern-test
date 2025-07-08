# Lexi Legal Assistant - Frontend Interface

A ChatGPT-like legal assistant interface that allows users to ask legal questions and receive answers with clickable citations that open source documents in new tabs.

## Features

- **Chat Interface**: Clean, modern chat interface similar to ChatGPT
- **Legal Q&A**: Ask legal questions and receive detailed answers
- **Citation System**: View citations with source documents
- **Direct PDF Opening**: Citations open PDFs directly in new tabs with text highlighting
- **Example Question**: One-click button to paste example question
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during question processing

## How to Run

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to \`http://localhost:3000\`

## Usage

1. **Ask a Question**: Type your legal question in the input field at the bottom
2. **Use Example**: Click the "Use This Example" button to automatically paste the sample question
3. **View Answer**: The AI assistant will provide a detailed legal answer
4. **Check Citations**: Citations appear below the answer with source information
5. **Open Documents**: Click "Open PDF" to view the source document in a new tab with highlighted text

### Example Question

Click the "Use This Example" button or manually enter:

> "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988?"

## Citation Handling

The application handles citations by:

1. **Direct PDF Opening**: Citations open PDFs in new browser tabs
2. **Automatic Text Search**: Uses URL fragments to search for cited text
3. **Text Highlighting**: Most PDF viewers will highlight the searched text
4. **Source Attribution**: Shows document name and paragraph number

## Key Features

- **Simplified Interface**: Removed modal complexity, direct PDF opening only
- **Quick Start**: Example button for immediate testing
- **Clean Citations**: Streamlined citation cards with essential information
- **Reliable PDF Viewing**: Uses browser's native PDF capabilities

## Tech Stack

- **React 18** with TypeScript
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx          # Main chat interface
│   └── layout.tsx        # App layout
├── components/ui/        # Reusable UI components
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── textarea.tsx
└── README.md
\`\`\`

## Features Implemented

✅ Chat-like interface similar to ChatGPT  
✅ Legal question input with loading states  
✅ Answer display with formatted text  
✅ Citation cards with source information  
✅ Direct PDF opening in new tabs  
✅ Automatic text search in PDFs  
✅ Example question auto-paste button  
✅ Responsive design  
✅ TypeScript implementation  

## Customization

To use your own legal documents:

1. Update the \`SIMULATED_RESPONSE\` object with your citation data
2. Replace the PDF link with your document URL
3. Ensure your PDFs support the \`#search=\` parameter for text highlighting

Example citation format:
\`\`\`javascript
{
  text: "Your citation text here...",
  source: "Document_Name.pdf",
  link: "https://your-domain.com/documents/Document_Name.pdf",
  paragraph: 7
}
\`\`\`

---

Built with ❤️ for Lexi Singapore
