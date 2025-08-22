# Open License Media Search Engine

A full-stack web application built with Flask and React that allows users to search for and download openly licensed images from the [Openverse API](https://api.openverse.engineering/).

## Features

*   **User Authentication:** Register, login, and logout with secure password hashing.
*   **Media Search:** Search for images using keywords and filter by content type (e.g., image, audio).
*   **Openverse Integration:** Directly fetches results from the vast Openverse catalog of open-license media.
*   **Responsive UI:** Built with React for a modern and user-friendly experience.
*   **Containerized Deployment:** Fully Dockerized for consistent environments from development to production.

## Technology Stack

*   **Frontend:** React.js, Axios, CSS
*   **Backend:** Flask, Python, SQLAlchemy, Flask-Login
*   **Database:** SQLite (development)
*   **Containerization:** Docker
*   **API:** [Openverse API](https://api.openverse.engineering/)


## Prerequisites

Before running this application, ensure you have the following installed on your system:
*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/) (usually bundled with Docker Desktop)

## Installation & Setup

Follow these steps to get the application running on your local machine:

### Using Docker (Recommended)

The easiest way to run the application is using Docker Compose, which will build and start both the frontend and backend containers.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nehavadagi/SOFTWARE-ENGG.git
    cd SOFTWARE-ENGG
    ```

2.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    *(Note: If you don't have a `docker-compose.yml` file yet, see the next section for setup instructions)*

3.  **Access the application:**
    *   Frontend (React App): Open your browser and go to `http://localhost:3000`
    *   Backend (Flask API): The API will be running on `http://localhost:5000`

### Manual Setup (Without Docker)

If you prefer to run the services manually:

#### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

3.  Set environment variables:
    ```bash
    export FLASK_APP=run.py
    export FLASK_ENV=development
    export SECRET_KEY=your-secret-key-here
    ```

4.  Initialize the database and run the application:
    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    flask run
    ```

#### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies and run the application:
    ```bash
    npm install
    npm start
    ```

## Docker Setup

This project includes Dockerfiles for both frontend and backend services.

### Building Containers Individually

**Backend:**
```bash
cd backend
docker build -t media-search-backend .
docker run -p 5000:5000 media-search-backend
