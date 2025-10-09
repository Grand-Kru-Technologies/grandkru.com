# Chatbot Setup Guide

This guide will help you set up the Perplexity-powered chatbot feature for Grand Kru Technologies.

## Prerequisites

1. **Firebase Project**: Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. **Perplexity API Key**: Get your API key from [Perplexity AI](https://www.perplexity.ai/settings/api)

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Google Analytics (optional)

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication" > "Sign-in method"
2. Enable the following providers:
   - **Email/Password**: Enable this provider
   - **Google**: Enable and configure with your domain
   - **GitHub**: Enable and configure with your GitHub OAuth app

### 3. Create Firestore Database
1. Go to "Firestore Database" in your Firebase project
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location for your database

### 4. Get Firebase Configuration
1. Go to Project Settings (gear icon) > General tab
2. Scroll down to "Your apps" section
3. Click "Add app" > Web app
4. Register your app and copy the configuration object

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Perplexity API
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key

# Existing EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Environment
VITE_ENVIRONMENT=development
VITE_BASE_URL=/
```

## GitHub Secrets (for deployment)

Add the following secrets to your GitHub repository:

1. Go to your repository > Settings > Secrets and variables > Actions
2. Add the following repository secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_PERPLEXITY_API_KEY`

## OAuth Configuration

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client IDs"
5. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - `https://your-domain.com` (for production)
   - `https://your-staging-domain.com` (for staging)

### GitHub OAuth
1. Go to GitHub > Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: "Grand Kru Technologies Chatbot"
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com`
4. Copy the Client ID and Client Secret
5. Add these to your Firebase Authentication > Sign-in method > GitHub

## Admin Access

The chatbot admin panel is protected by authentication. To grant admin access:

1. Update the admin email check in `src/stores/authStore.ts`:
   ```typescript
   const isAdmin = computed(() => {
     return user.value?.email === 'admin@yourdomain.com' ||
            user.value?.email === 'your-email@yourdomain.com'
   })
   ```

2. Or modify the logic to check for specific user roles in Firebase Auth.

## Usage

### For Users
- **Floating Chat Widget**: Available on all pages (bottom right corner)
- **Dedicated Chat Page**: Visit `/chat` for full-screen chat experience
- **Quick Questions**: Pre-defined questions to get started

### For Admins
- **Admin Login**: Visit `/admin/login` to sign in
- **Knowledge Base Management**: Add/edit/delete Q&A pairs, documents, and context snippets
- **Chatbot Settings**: Configure welcome messages and test API connections

## Features

### Knowledge Base Types
1. **Q&A Pairs**: Question and answer pairs for direct responses
2. **Knowledge Documents**: Longer-form content with markdown support
3. **Context Snippets**: Short pieces of information to augment responses

### Chatbot Capabilities
- Answers questions about Grand Kru Technologies services
- Uses both admin-provided knowledge base and site content
- Powered by Perplexity AI for intelligent responses
- Maintains conversation history during session
- Mobile-responsive design

## Troubleshooting

### Common Issues

1. **Firebase Auth Errors**
   - Check that your Firebase configuration is correct
   - Ensure OAuth providers are properly configured
   - Verify redirect URIs match your domain

2. **Perplexity API Errors**
   - Verify your API key is correct and has sufficient credits
   - Check rate limits and usage quotas
   - Ensure the API key has the necessary permissions

3. **Admin Access Issues**
   - Verify the email address is in the admin list
   - Check Firebase Auth user permissions
   - Ensure the user has signed in successfully

### Testing

Run the test suite to verify everything is working:

```bash
npm run test
```

### Development

Start the development server:

```bash
npm run dev
```

The chatbot will be available at `http://localhost:5173` with the floating widget on all pages.

## Security Considerations

1. **Firestore Rules**: Update Firestore security rules to protect admin data
2. **API Keys**: Never commit API keys to version control
3. **Admin Access**: Regularly review and update admin user list
4. **Rate Limiting**: Monitor Perplexity API usage to avoid unexpected costs

## Support

For issues or questions about the chatbot implementation, please refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [Vue.js Documentation](https://vuejs.org/guide/)
