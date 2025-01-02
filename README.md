# Calendar Application

## Project Overview

This project is a **web application** built using **React** for the frontend and **Django REST Framework** for the backend. It is designed to manage communications with companies, track communication methods, and generate detailed reports. Both the frontend and backend are deployed on **Vercel** using serverless functions for the backend.

### Floders
- **communication-tracking** : This is a Frontened Floder
- **communication_tracking** : This is a Backened Floder

### Technologies Used:
- **Frontend**: React.js, Vercel (Frontend Deployment)
- **Backend**: Django, Django REST Framework, Vercel (Backend Deployment with Serverless Functions)
- **Deployment**: Vercel (Frontend and Backend)

---

## **Setup Instructions**

### Backend Setup (Django + Django REST Framework) on Vercel

To deploy the backend (Django) on **Vercel** using serverless functions, follow the steps below:

### Step 1: Prepare Your Django Backend for Serverless

1. **Install necessary dependencies** for serverless deployment:
    ```bash
    pip install vercel
    ```

2. **Project Structure**:
    Create the following directory structure in your Django project:
    ```plaintext
    /backend
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

4. **In you project directory of `settings.py` to allow all hosts use "*" in ALLOWED_HOSTS**:
    ```python
    SECRET_KEY = 'django-insecure-ra(_io_69-^3hnrktu$lvqd(no8pur4j*7+rsjlkysgd39_gh_'
    
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True
    
    ALLOWED_HOSTS = ["*"]
    
    ```

4. **In you project directory of `wsgi.py` add app = application**:
```python
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'communication_tracker.settings')

application = get_wsgi_application()
app = application

```

### Step 2: Deploy Django Backend

 **Deploy to Vercel**:
    - Navigate to your backend directory.
    - Run `vercel` to deploy the application:
    
    ```bash
    vercel
    ```
Vercel will guide you through the deployment process and provide a URL for your backend once the deployment is complete.

---

## Frontend Setup (React) on Vercel

Here’s a step-by-step guide, for deploying your React frontend and connecting it to your Django backend:

---

### 1. **Backend Deployed URL**  
Your backend Django REST API is deployed at:  
`https://<yoururl>.vercel.app`

---

### 2. **React Frontend Configuration**  
In your React project, make the following changes:

#### a. **Environment Variables File**  
**File:** `.env` (Root of your React project)  
Add the following line:  
```env
REACT_APP_BACKEND_URL=https://<yoururl>.vercel.app
```

#### b. **Config File**  
**File:** `src/config.js`  
Create a file named `config.js` inside the `src` folder to centralize your API base URL.  
```javascript
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
```

#### c. **Using the API Base URL**  
Update all API calls in your React project to use the centralized `API_BASE_URL`.

**File:** Wherever your API calls are made (e.g., `src/services/api.js`, or directly in components)  
Here’s how you can update them:

**Example using `fetch`:**
```javascript
import { API_BASE_URL } from './config';

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/endpoint/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
```

**Example using `axios` in every component file having urls replace http://localhost:8000/api/endpoint with `${API_BASE_URL}/api/endpoint`**
```javascript
    import axios from 'axios';
    import { API_BASE_URL } from './config';
    
    export const fetchData = () => {
      return axios.get(`${API_BASE_URL}/api/endpoint/`)
        .then(response => response.data)
        .catch(error => console.error(error));
    };
```

---

### 3. **Local Development Setup**  
For development, you’ll need to ensure that React uses the `.env` file.

#### Steps:
1. Create the `.env` file as shown above.
2. Restart the development server:
   ```bash
   npm start
   ```

---

### 4. **Deployment to Vercel**  
When deploying your React app to Vercel:

#### a. **Add Environment Variables**  
    1. Go to your React project’s settings in the Vercel dashboard.  
    2. Navigate to **Environment Variables**.  
    3. Add the following variable:  
       - **Key:** `REACT_APP_BACKEND_URL`  
       - **Value:** `https://<yoururl>.vercel.app`

#### b. **Deploy the React App**  
Deploy the React app using the Vercel CLI or by connecting your GitHub repository.

---

### 5. **File Summary**  

Here’s a complete summary of the required files:

    | **File**                 | **Purpose**                                                                                   | **Content/Code**                                                                                                         
    |--------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------
    | `.env`                   | Environment variable for backend URL                                                          | `REACT_APP_BACKEND_URL=https://<yourapp>.vercel.app`                                                   
    | `src/config.js`          | Centralized configuration file for the API base URL                                           | `export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;`                                                        
    | `src/services/api.js`    | File to manage all API calls (if you use a service layer)                                     | Use `API_BASE_URL` for constructing API URLs.                                                                           
    | **API call locations**   | Wherever you are making API calls in your React components                                    | Replace hardcoded URLs with `${API_BASE_URL}/your-endpoint/`.                                                           
    | **Vercel Dashboard**     | Add environment variables for deployment                                                      | Add `REACT_APP_BACKEND_URL` in Vercel’s Environment Variables section.                                                  

---

### 6. **Verify Integration**  
Once deployed:  
1. Open your React app in a browser.  
2. Use the browser’s developer tools (Network tab) to check API calls are sent to `https://communication-tracker-uprf.vercel.app`.  

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
