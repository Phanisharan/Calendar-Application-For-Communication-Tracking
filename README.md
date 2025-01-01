# Calendar Application

## Project Overview

This project is a **web application** built using **React** for the frontend and **Django REST Framework** for the backend. It is designed to manage communications with companies, track communication methods, and generate detailed reports. Both the frontend and backend are deployed on **Vercel** using serverless functions for the backend.

### Technologies Used:
- **Frontend**: React.js, Vercel (Frontend Deployment)
- **Backend**: Django, Django REST Framework, Vercel (Backend Deployment with Serverless Functions)
- **Database**: PostgreSQL (for production or SQLite for development)
- **Deployment**: Vercel (Frontend and Backend)

---

## **Setup Instructions**

### Backend Setup (Django + Django REST Framework) on Vercel

To deploy the backend (Django) on **Vercel** using serverless functions, follow the steps below:

### Step 1: Prepare Your Django Backend for Serverless

1. **Install necessary dependencies** for serverless deployment:
    ```bash
    pip install vercel-django
    ```

2. **Project Structure**:
    Create the following directory structure in your Django project:
    ```plaintext
    /backend
      ├── api/
          └── index.py
      ├── myapp/
      ├── manage.py
      └── vercel.json
    ```

3. **Create `vercel.json` file**:
    In the root directory, create a `vercel.json` file for configuring Vercel to handle the backend as a serverless function.
    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "your-project-name/wsgi.py",
          "use": "@vercel/python"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "your-project-name/wsgi.py"
        }
      ]
    }
    ```

4. **Create `index.py` for serverless functions**:
    In the `api` directory, create an `index.py` file that interfaces with Django.
    ```python
    from django.core.wsgi import get_wsgi_application
    import os

    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')

    # Get WSGI application
    app = get_wsgi_application()
    ```

### Step 2: Deploy Django Backend

1. **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```

2. **Deploy to Vercel**:
    - Navigate to your backend directory.
    - Run `vercel` to deploy the application:
    ```bash
    vercel
    ```

    Vercel will guide you through the deployment process and provide a URL for your backend once the deployment is complete.

---

## Frontend Setup (React) on Vercel

### Step 1: Install React Dependencies

1. **Navigate to the frontend directory** and install the necessary dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Step 2: Deploy React App to Vercel

1. **Push your React code to GitHub** (if not already done):
    ```bash
    git init
    git remote add origin <your-repository-url>
    git add .
    git commit -m "Initial commit"
    git push -u origin master
    ```

2. **Deploy to Vercel**:
    - Log in to Vercel at [Vercel Login](https://vercel.com/login).
    - Import your GitHub repository into Vercel.
    - Vercel will automatically detect that it’s a React application.
    - Set the `Build Command` to `npm run build` (if not auto-detected).
    - Set the `Output Directory` to `build`.
    - Click on "Deploy."

    Vercel will provide you with a live URL for your frontend after deployment.

---

## Connecting the Frontend and Backend

1. **Update the API URL in the React App**:
    - In your React application, you need to update the API URL to point to the deployed backend.
    - Example:
    ```javascript
    const API_URL = 'https://your-backend-url.vercel.app/api/';
    ```

2. **Test the Integration**:
    - Once both frontend and backend are deployed, test the application by navigating to the React app URL.
    - Ensure that the frontend can interact with the backend API seamlessly.

---

## **Application Functionality**

### Key Features:

1. **Admin Module**:
   - Set up companies, communication methods, and manage configurations.
   - Manage company data (e.g., Name, Location, Emails, Phone Numbers).
   - Define and manage communication methods (e.g., LinkedIn Post, Email, Phone Call).

2. **User Module**:
   - Dashboard to manage company communications.
   - Interactive grid showing recent communications and next scheduled communication.
   - Notifications for overdue communications.
   - Allows users to log communications (e.g., LinkedIn Post, Email).

3. **Reporting & Analytics Module**:
   - Communication Frequency Report to visualize the frequency of communication methods used.
   - Engagement Effectiveness Dashboard to track the success of communication methods.
   - Overdue Communication Trends to visualize overdue communications over time.
   - Downloadable Reports (CSV/PDF) for sharing.

---

## **Known Limitations**

1. **Limited Database Support for Serverless Functions**:
   - Running Django in a serverless environment can present challenges with persistent database connections. This may require configuring the backend to use serverless-compatible databases, such as PostgreSQL or MySQL, with connection pooling.

2. **Cold Start Latency**:
   - Serverless functions may experience latency during cold starts (initial invocations after some idle time). This may affect the response time for the first API call.

3. **Serverless Constraints**:
   - Serverless functions may have limitations on execution time, memory, and request payload size. These limits may require optimizations to your backend code and configurations.

4. **Complex Routing**:
   - Django's complex URL routing can be tricky when deploying to Vercel's serverless functions. You may need to adjust how routes and views are handled within the serverless framework.

---

## **Deployment Notes**

- Both **frontend** and **backend** are deployed on **Vercel**, but due to Vercel's focus on static sites, the backend has been adapted to work with **serverless functions**.
- Ensure that your **API endpoints** are correctly linked to the frontend for seamless communication between the user interface and backend data.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This **README.md** now includes:
- Detailed setup and deployment instructions for both the **React frontend** and **Django REST backend**.
- Notes on **functionality** and **known limitations** to help developers understand how to deploy and use the application effectively.