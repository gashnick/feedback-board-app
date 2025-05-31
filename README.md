# Feedback Board App

This is a full-stack application for managing feedback. It consists of two parts:

- **Frontend**: Built with Next.js and Tailwind CSS.
- **Backend**: Built with Node.js and Express.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Environment Variables

Both the frontend and backend require environment variables. Create `.env` files in the respective directories based on the `.env.example` files.

### Backend Environment Variables

Create a `.env` file in the `feedback-board-backend` directory with the following variables:

```
DB_URI=<your-database-uri>
PORT=<port-number>
```

### Frontend Environment Variables

Create a `.env` file in the `feedback-board-app-frontend` directory with the following variables:

```
NEXT_PUBLIC_API_URL=<backend-api-url>
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd feedback-board-app
```

### 2. Install Dependencies

#### Backend

```bash
cd feedback-board-backend
npm install
```

#### Frontend

```bash
cd feedback-board-app-frontend
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
cd feedback-board-backend
npm start
```

The backend server will start on the port specified in the `.env` file (default: `http://localhost:5001`).

### 2. Start the Frontend Application

```bash
cd feedback-board-frontend
npm run dev
```

The frontend application will start on `http://localhost:3000` by default.

## Project Structure

### Backend

- `config/`: Database configuration.
- `controllers/`: Contains the logic for handling requests.
- `models/`: Mongoose models.
- `routes/`: API routes.

### Frontend

- `app/`: Contains the main application files.
- `components/`: Reusable React components.
- `config/`: Configuration files.
- `public/`: Static assets.
- `styles/`: Global styles.

## Features

- **Feedback Submission**: Users can submit feedback through a form.
- **Feedback Display**: Feedback is displayed in a list with sorting and filtering options.
- **Responsive Design**: The application is fully responsive and works on all devices.
- **API Integration**: The frontend communicates with the backend API for data operations.
- **Database Storage**: Feedback data is stored in a database using Mongoose.

## License

This project is licensed under the MIT License.
