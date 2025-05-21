# AI Humanizer

A modern web application that transforms AI-generated text into more human-like content, making it undetectable by AI detection tools.

## Features

### Core Functionality
- **AI Text Humanization**: Transform AI-generated text into natural, human-like content
- **Real-time Processing**: Get instant results with our lightning-fast processing
- **Project Management**: Save and manage your humanized content in a dashboard
- **User Authentication**: Secure login and signup system with Supabase

### User Interface
- **Modern Design**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Interactive Dashboard**: Track your usage and manage projects
- **Pricing Plans**: Transparent pricing structure with different tiers
- **Contact System**: Easy-to-use contact form for support and inquiries

### Technical Features
- **Authentication**: Secure user authentication using Supabase
- **Database Integration**: Store user data and projects in Supabase
- **API Integration**: Connect with AI humanization services
- **Responsive Design**: Works seamlessly on all devices
- **Type Safety**: Built with TypeScript for better development experience

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Language**: TypeScript
- **State Management**: React Context API
- **API Integration**: Undetectable AI API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Undetectable AI API key

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
UNDETECTABLE_AI_API_KEY=your_undetectable_ai_api_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fromancient/ai-humanizer.git
cd ai-humanizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-humanizer/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── pricing/          # Pricing page
│   ├── contact/          # Contact page
│   └── page.tsx          # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
│   ├── authContext.tsx   # Authentication context
│   └── supabaseClient.ts # Supabase client configuration
└── public/               # Static assets
```

## Features Implementation

### Authentication
- Implemented using Supabase Auth
- Secure login and signup flows
- Protected routes and dashboard access
- Session management with React Context

### Dashboard
- Project history tracking
- Usage statistics
- Recent activity monitoring
- Quick access to humanization tool

### Humanization Tool
- Real-time text processing
- Input/output comparison
- Project saving functionality
- Error handling and loading states

### Pricing Plans
- Three-tier pricing structure
- Feature comparison
- Plan selection interface
- Mock payment flow

### Contact System
- Contact form with validation
- Email notification system
- Business hours display
- Contact information section

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Undetectable AI](https://undetectable.ai/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
