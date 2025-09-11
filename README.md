# Nihongo_Playground ⛩️

An interactive web application for learning Japanese Kanji and vocabulary through dynamic, SRS-based quizzes. This project is built with React and Firebase, focusing on a clean user interface and effective learning tools.

**[Live Demo Link Here]**

---
## Screenshots

Here's a glimpse of the application's key features.

| Quiz Level Selection | Difficulty & Progress |
| :---: | :---: |
|  |  |

| Interactive Quiz Card | Kanji Drawing Practice |
| :---: | :---: |
|  |  |

| User Profile & Dashboard | Custom Quiz Creator |
| :---: | :---: |
|  |  |

---
## Features

* **Standard JLPT Quizzes:** Pre-loaded quizzes for Kanji and Vocabulary, covering levels N5 through N1.
* **Progressive Difficulty:** Each quiz has Easy, Medium, and Hard difficulty levels that unlock as the user masters the previous one.
* **Spaced Repetition System (SRS):** A two-pass quiz system. The first round introduces new words, and the second round repeats the ones you got wrong until you master them.
* **User Authentication:** Secure user sign-up and login provided by Firebase Authentication.
* **Personalized Profile Page:** A central dashboard for every user to track their progress, view quiz history, and manage their content.
* **Advanced Filtering:** Users can filter their quiz history to see which quizzes are **Mastered**, still **Incomplete**, or **Unattended**.
* **Custom Quiz Creation:** Users can create and save their own vocabulary or kanji quizzes by simply pasting a list in CSV format.
* **Interactive Kanji Drawing:** An integrated canvas pad allows users to practice writing Kanji by stroke directly on the quiz card.
* **Firebase Backend:** All quiz content, user data, and quiz history are stored and managed in Firestore.

---
## Tech Stack

* **Frontend:** [React](https://reactjs.org/) (with Hooks)
* **Routing:** [React Router](https://reactrouter.com/)
* **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
* **Drawing Canvas:** [react-canvas-draw](https://github.com/embiem/react-canvas-draw)

---
## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and `npm` (or `yarn`) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Firebase Setup

This project requires you to set up your own Firebase project to handle the backend.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your new project, go to **Project Settings** > **General**.
3.  Under "Your apps", click the web icon (`</>`) to register a new web app.
4.  Copy the `firebaseConfig` object provided.
5.  Create a new file in the project's `src` directory called `firebaseConfig.js`.
6.  Paste your configuration into the file like this:

    ```javascript
    // src/firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);
    export const auth = getAuth(app);
    ```
7.  In the Firebase Console, go to the **Authentication** tab and enable the "Email/Password" sign-in method.
8.  Go to the **Firestore Database** tab and create a new database in **Production mode**.

### Running the Application

Once the setup is complete, you can run the development server:

```bash
npm start