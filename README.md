# Mammon App Frontend

## Overview
The **Mammon App Frontend** is a web application built using **Next.js**, providing a seamless and interactive user experience. This project serves as the front-facing interface of the Mammon platform, enabling users to interact with its various financial and trading features.

## Features
- Built with **Next.js** for optimized performance and SEO benefits.
- Responsive design for a seamless experience on all devices.
- Secure API integrations for data retrieval and transactions.
- Real-time updates for financial and trading activities.
- Dynamic UI components enhancing user engagement.

## Getting Started
Follow the steps below to set up and run the Mammon App Frontend locally.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn** package manager

### Installation
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone https://github.com/mammon-app/frontend.git
cd mammon-frontend

# Install dependencies
npm install  # or yarn install
```

### Environment Variables
Create a `.env` file in the root directory and add the required environment variables:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:{backend port}/api/mammonapp
NEXT_PUBLIC_API_KEY=Your backend API key
```
Ensure you replace `{backend port}` with the correct port number and `Your backend API key` with the valid API key.

### Running the Project
Before starting the application, make sure:
- You have added the correct `.env` content.
- All dependencies are installed.
- If using a local backend, the backend service is running to enable API calls.

To build and start the project, run the following commands:
```bash
# Build the project
npm run build  # or yarn build

# Start the application
npm start  # or yarn start
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

