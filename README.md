# 🧪 Labiotic - AI-Powered Lab Report Generator

**Labiotic** is an intelligent laboratory report generation platform that uses advanced AI to create comprehensive, professional lab reports for computer science and engineering practical experiments. Built specifically for Indian university standards, it transforms simple experiment descriptions into detailed, publication-ready lab manuals.

![Labiotic Banner](https://raw.githubusercontent.com/GarvGoel08/portfolio/refs/heads/main/public/Images/LabioticsLogo.png)

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Advanced AI Integration**: Uses Google's Gemini 1.5 Flash for intelligent content creation
- **Professional Writing Style**: Generates reports in third-person academic voice
- **Real Code Examples**: Includes working code with actual terminal outputs
- **Comprehensive Coverage**: Covers theory, procedures, observations, calculations, and more

### 📋 Complete Lab Manual Creation
- **Multiple Experiments**: Handle entire lab manuals with multiple experiments
- **Professional Formatting**: Export to PDF and DOCX with university-standard formatting
- **Index Generation**: Auto-generated table of contents with page numbers
- **Cover Page Design**: Professional cover pages with university branding

### 🎯 Subject Specialization
- **Data Structures & Algorithms**: Specialized prompts for DS/Algo experiments
- **Programming Labs**: Complete code examples with terminal outputs
- **Engineering Practicals**: Comprehensive apparatus and procedure documentation
- **Academic Standards**: Follows Indian university lab report conventions

### 📊 Smart Processing
- **Batch Processing**: Generate multiple experiments simultaneously
- **Auto-Retry System**: Automatic retry for failed generations
- **Progress Tracking**: Real-time progress monitoring with visual feedback
- **Error Handling**: Robust error handling with detailed feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/labiotic.git
cd labiotic
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects
- **Dynamic Imports** - Code splitting and lazy loading

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Document-based database
- **Mongoose** - MongoDB object modeling
- **JWT Authentication** - Secure user authentication

### AI & Processing
- **Google Gemini 1.5 Flash** - Large language model
- **LangChain** - AI application framework
- **Structured Output Parsing** - Consistent AI response formatting
- **Retry Logic** - Robust AI processing with fallbacks

### Document Generation
- **PDFKit** - PDF generation library
- **docx** - Microsoft Word document creation
- **Custom Formatting** - University-standard document layouts

## 📖 How It Works

### 1. **Create Lab Session**
- Enter lab details (subject, instructor, experiments)
- Configure experiment parameters
- Set up batch processing options

### 2. **AI Processing**
- Structured prompts sent to Google Gemini
- AI generates comprehensive lab reports
- Automatic validation and error correction
- Real-time progress tracking

### 3. **Export & Download**
- Professional PDF generation
- Microsoft Word DOCX export
- University-standard formatting
- Complete with cover pages and index

## 🎯 Use Cases

### For Students
- **Quick Lab Reports**: Generate complete lab reports in minutes
- **Professional Quality**: University-standard formatting and content
- **Multiple Formats**: Export in PDF or DOCX as needed
- **Batch Processing**: Handle entire semester's lab work efficiently

### For Educators
- **Standardized Reports**: Consistent formatting across all students
- **Template Creation**: Generate template lab manuals for courses
- **Quality Assurance**: Professional, error-free documentation
- **Time Saving**: Reduce manual lab report creation time

### For Institutions
- **Curriculum Support**: Support for multiple engineering subjects
- **Brand Consistency**: University branding and formatting standards
- **Scalable Solution**: Handle multiple courses and students
- **Quality Control**: Consistent, professional documentation

## 📁 Project Structure

```
labiotic/
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── lab-jobs/        # Lab session management
│   │   ├── process-experiment/ # AI processing endpoints
│   │   └── export-lab/      # Document export functionality
│   ├── components/          # Reusable React components
│   ├── dashboard/          # Dashboard page and components
│   ├── login/              # Authentication pages
│   └── process-lab/        # Lab processing interface
├── lib/                    # Utility functions and configurations
├── models/                 # MongoDB/Mongoose models
├── public/                 # Static assets
└── README.md              # Project documentation
```

## 🔧 Configuration

### AI Model Settings
```javascript
// Adjust AI model parameters in /api/process-experiment/route.js
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.3,  // Controls creativity (0.0-1.0)
  maxTokens: 4000    // Maximum response length
});
```

### Document Formatting
```javascript
// Customize document styling in /api/export-lab/route.js
const docStyles = {
  fontSize: 12,
  fontFamily: "Times New Roman",
  spacing: { after: 200 },
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
};
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on commits

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [Component Documentation](docs/components.md)
- [Deployment Guide](docs/deployment.md)

### Community
- **Issues**: Report bugs and request features on GitHub Issues
- **Discussions**: Join community discussions on GitHub Discussions
- **Email**: Contact us at support@labiotic.com

### FAQ

**Q: What subjects are supported?**
A: Currently optimized for Computer Science, Data Structures, Algorithms, and Programming labs. Support for other engineering subjects is being added.

**Q: Can I customize the document format?**
A: Yes! The formatting can be customized in the export API routes. We're working on a user-friendly customization interface.

**Q: Is there a limit on the number of experiments?**
A: No hard limits, but performance is optimized for typical lab manuals (5-15 experiments).

**Q: Can I use my own AI model?**
A: The system is designed to be modular. You can modify the AI processing endpoints to use different models.

## 🙏 Acknowledgments

- **Google Gemini** for providing advanced AI capabilities
- **Next.js Team** for the excellent React framework
- **MongoDB** for reliable data storage
- **Open Source Community** for the amazing libraries and tools

---

**Built with ❤️ for the academic community**

*Labiotic - Making lab reports intelligent, one experiment at a time.*
