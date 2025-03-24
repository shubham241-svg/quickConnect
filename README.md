# QuickConnect

## A Modern Social Media Platform built with MERN Stack

QuickConnect is a feature-rich social media application designed for seamless connections and interactions among users. Built with modern web technologies, it provides a robust and intuitive platform for social networking.

![QuickConnect Logo](https://github.com/shubham241-svg/quickConnect/raw/main/client/public/assets/images/logo.png)

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JWT
- **Profile Management**: Create and customize your personal profile
- **Social Interactions**: Post updates, like and comment on content
- **Real-time Notifications**: Stay updated with activities
- **Responsive Design**: Seamless experience across devices
- **Dark/Light Mode**: Choose your preferred theme

## 🛠️ Tech Stack

### Frontend
- React.js for UI components
- Redux for state management
- DaisyUI & Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js runtime environment
- Express.js framework
- MongoDB database
- Mongoose ODM
- JWT for authentication

## 📋 Prerequisites

Before running this application, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shubham241-svg/quickConnect.git
   cd quickConnect
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server in a new terminal
   cd client
   npm start
   ```

## 🌐 Usage

After starting the servers, navigate to `http://localhost:3000` in your browser to access QuickConnect.

- Create a new account or log in to an existing account
- Complete your profile information
- Start connecting with friends and sharing content

## 📱 Screenshots

### Home Page
![Home Page](Screenshot%202025-03-24%20at%202.27.10%20PM.png)

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/shubham241-svg/quickConnect/raw/main/screenshots/login.png" alt="Login Screen" width="30%">
  <img src="https://github.com/shubham241-svg/quickConnect/raw/main/screenshots/feed.png" alt="Feed Screen" width="30%">
  <img src="https://github.com/shubham241-svg/quickConnect/raw/main/screenshots/profile.png" alt="Profile Screen" width="30%">
</div>

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Users
- `GET /api/users/:id` - Get user information
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/friends` - Get user's friends list

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Add comment to a post

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Shubham - [GitHub](https://github.com/shubham241-svg) - [Email](shubh241gupta@gmail.com)

Project Link: [https://github.com/shubham241-svg/quickConnect](https://github.com/shubham241-svg/quickConnect)
