# Funding Pips Frontend Assessment

Welcome to the Funding Pips Frontend Assessment! This project is a starting point for your task, and you are expected to build upon it to complete the challenge. The goal is to evaluate your technical skills, problem-solving ability, and proficiency with modern frontend development tools.

---

## **Objective**

Build a responsive and performant stock price tracker using modern frontend technologies. The challenge focuses on your expertise in **React**, **Redux Toolkit**, **Tailwind CSS**, **TypeScript**, and testing frameworks while assessing your problem-solving skills and ability to optimise solutions.

---

## **Requirements**

### **1. Core Feature Implementation**

1. Build a stock price tracker dashboard that includes:
   - **Data Fetching**: Fetch stock prices from a public API (e.g., [Alpha Vantage](https://www.alphavantage.co/documentation/) or mock data).
   - **Table Display**: Display stock prices in a sortable and filterable table.
   - **Favorites**: Add/remove stocks to/from a list of favorites.
   - **Responsive Design**: Use **Tailwind CSS** to style the UI for responsiveness and modern aesthetics.
2. Stocks should be displayed in a table with the following columns:
   - **Stock Symbol**: The ticker symbol (e.g., AAPL, TSLA).
   - **Company Name**: The name of the company (e.g., Apple, Tesla).
   - **Price**: The current stock price in USD (e.g., $150.25).
   - **Change**: The price change in USD compared to the previous close (e.g., +$2.50, -$1.30).
   - **Percentage Change**: The percentage change compared to the previous close (e.g., +1.5%, -0.8%).
3. **State Management**:
   - Use **Redux Toolkit** to manage global state for the application.

---

### **2. Testing**

1. Write tests to validate your implementation:
   - **Unit Tests**: Test Redux slices and individual components using **Testing Library**.
   - **End-to-End Tests (Optional)**: Use **Cypress** to simulate user interactions, such as adding/removing favorites and filtering stocks.

---

### **3. Optimisation and Scalability**

1. Optimise the application for performance:

   - Implement lazy loading for components where applicable.
   - Use memoization to reduce unnecessary re-renders.

2. Use **TypeScript** to ensure type safety across the project.

---

## **Deliverables**

1. A fully functional application that meets the requirements.
2. Tests included in the codebase.
3. A detailed **README** that includes:
   - Instructions to run the application and tests.
   - Explanation of your design decisions and trade-offs.
   - Notes on performance optimizations and scalability considerations.
   - Ideas for future improvements.

---

## **Getting Started**

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app). Follow these steps to get started:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 with your browser to see the result.

---

## **Submission Instructions**

1. Clone this repository and complete the challenge in your own repository.
2. Once complete, make your repository public and share the link with us.
3. Ensure your repository includes:
   - The complete source code.
   - Test files and results.
   - A detailed README file.

---

## **Evaluation Criteria**

1. **Code Quality**:
   - Clean, modular, and maintainable code adhering to best practices.
2. **Functionality**:
   - Completeness of the required features and responsiveness of the UI.
3. **Testing**:
   - Coverage and quality of unit and end-to-end tests.
4. **Optimisation**:
   - Implementation of performance improvements and scalability.
5. **Documentation**:
   - Clarity and thoroughness of your README file.
6. **Problem-Solving**:
   - Ability to handle edge cases and provide thoughtful solutions.

---

## **Estimated Time**

The task is designed to take approximately **4–6 hours** to complete.

---

Thank you for taking the time to complete this challenge. We look forward to reviewing your submission!
