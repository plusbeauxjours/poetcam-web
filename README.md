# PoetCam

PoetCam is a web application that takes your photos and generates poetry using AI.

## Features

- 📸 Capture images from the camera in real time
- 🤖 Generate Korean poetry powered by Claude AI
- 📱 Mobile-friendly responsive design
- 🔗 Share to social media
- ♿ Accessibility support

## Running the Development Environment

```bash
# Standard development server (HTTP)
npm run dev

# HTTPS development server (recommended for camera permissions)
npm run dev:https
```

### Troubleshooting Camera Permissions

#### Chrome Browser

1. Click the 🔒 or 📷 icon to the left of the address bar
2. Set "Camera" permissions to "Allow"
3. Refresh the page

#### Using HTTPS in Development

```bash
npm run dev:https
```

- Chrome only allows full camera access in an HTTPS environment
- While localhost generally works with HTTP, using HTTPS is recommended

#### Common Camera Issues


- **Permission denied**: Check camera permissions in your browser settings
- **Camera in use**: Close any other applications that might be using the camera
- **No camera**: Automatically switches to a test image mode

### React Webcam Example

You can use the `react-webcam` package to easily request camera access.

```bash
npm install react-webcam
```

In the example below, the `onUserMedia` callback is triggered once permission is granted.

```tsx
import { useState } from "react";
import Webcam from "react-webcam";

export default function WebcamPermission() {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <Webcam
      audio={false}
      onUserMedia={() => setHasPermission(true)}
      onUserMediaError={(e) => console.error("Camera access denied", e)}
    />
  );
}
```

Once `onUserMedia` is called, you have access to the camera.

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React components
├── hooks/                  # Custom hooks
├── utils/                  # Utility functions
├── types/                  # TypeScript type definitions
├── constants/              # Shared constants
└── lib/                    # Library functions
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude 3 Sonnet (Anthropic)
- **Development**: Turbopack, ESLint

## Environment Variables

Create a `.env.local` file and set the following variable:

```env
CLAUDE_API_KEY=your_claude_api_key_here
```

## Deployment

This project is optimized for Vercel:

```bash
npm run build
npm run start
```

## SEO Optimization

- Open Graph meta tags
- Twitter Card support
- Structured data with Schema.org
- Semantic HTML
- Web accessibility (WCAG compliant)

## License

MIT License
