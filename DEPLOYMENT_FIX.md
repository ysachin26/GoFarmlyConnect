# 🛠️ Fix for "MONGODB_URI" Deployment Error

The error `Environment Variable "MONGODB_URI" references Secret "MONGODB_URI", which does not exist` occurs because the deployment platform is looking for a legacy secret that is either missing or misconfigured.

## 🚀 Step-by-Step Fix (Vercel)

1.  **Login to Vercel**: Go to [vercel.com](https://vercel.com) and select your project `GoFarmlyConnect`.
2.  **Navigate to Settings**: Click on the **Settings** tab in the top navigation bar.
3.  **Environment Variables**: Select **Environment Variables** from the left sidebar.
4.  **Find MONGODB_URI**:
    *   Look for the `MONGODB_URI` variable in the list.
    *   If it shows a "Secret" icon (🔒) and is causing an error, **Delete it**.
5.  **Add New Variable**:
    *   **Key**: `MONGODB_URI`
    *   **Value**: Paste your MongoDB connection string (e.g., `mongodb+srv://StayConnect:PASSWORD@cluster0...`)
    *   **Environments**: Ensure **Production**, **Preview**, and **Development** are checked.
6.  **Save & Redeploy**:
    *   Click **Save**.
    *   Go to the **Deployments** tab.
    *   Click the three dots (⋮) on your latest failed deployment and select **Redeploy**.

## 🐳 Running with Docker & MongoDB Atlas

If you want to run the app in Docker while using MongoDB Atlas:

1.  **Prepare `.env.local`**: Ensure your `MONGODB_URI` is correctly set in your `.env.local` file on your host machine.
2.  **Start Container**:
    ```bash
    docker-compose up --build
    ```
3.  **How it works**: The `docker-compose.yml` is configured to read your `.env.local` file and pass the variables to the container. This keeps your secrets out of the image itself.

---
*Created by Antigravity AI Assistant*

