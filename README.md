# Expense Tracker

Expense Tracker is a web application that allows users to create an account and track their daily expenses. With this tool, users can manage their spending, categorize expenses, and gain insights into their financial habits.

## Features

- **User Authentication:** Users can create accounts, log in, and securely manage their expense data.
- **Expense Logging:** Log daily expenses with details such as amount, title, description, category, and tags.
- **Tagging System:** Add tags to expenses for better organization.
- **Date-Based Tracking:** View and analyze expenses on a monthly, or yearly basis.
- **User-Friendly Interface:** Intuitive and responsive design for a seamless user experience.


## Getting Started

### Prerequisites

- python, pip, Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/suraj-anand/expense-tracker
   cd expense-tracker

2. Install Django Dependencies & Make sure your configs are set correctly
   
   ```bash
   pip install -r requirements.txt

3. Start django server

    ```
    python manage.py runserver

4. Start client dev or create a client build

    -- To Start client dev server
    ```bash
    cd client
    npm run dev
    ```

    -- To Create client build
    
    ```bash
    cd client
    npm run build
    ```

5. Open Browser and access expense-tracker web-app on the following URL
    
    ```
        http://localhost:5173/
    ```