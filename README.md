# CashFlow-Solver

Try - https://shivxnshjasathi.github.io/CashFlow-Solver/
algoritm - [CashFlow.pdf](https://github.com/user-attachments/files/16740276/9.Splitwise.Cashflow.Maxmizing.pdf)


# Overview

**CashFlow Solver** is a web application designed to visualize and solve cash settlement problems. It allows users to input data representing a network of transactions between individuals and then calculates the minimum number of transactions needed to settle all debts in the most efficient manner.

## Features

- **Dynamic Problem Generation:** Automatically generates random cash flow problems with a variable number of participants and transactions.
- **Graph Visualization:** Uses `vis-network` to visualize the cash flow problem and the solution.
- **Solution Calculation:** Solves the cash flow problem using a minimum transactions algorithm.

## Technologies Used

- **HTML/CSS:** For the basic structure and styling of the web pages.
- **JavaScript:** For interactive functionalities and algorithms.
- **vis-network:** A JavaScript library for creating network graphs.
- **Bootstrap:** For responsive design and styling.
- **Font Awesome:** For icons in the network visualization.

## How It Works

### Algorithm

The algorithm used to solve the cash flow problem is based on the concept of minimizing the number of transactions required to settle all debts. Here's a step-by-step explanation of the algorithm:

1. **Data Generation:**
   - Generate a random number of participants (nodes) and transactions (edges) between them.
   - Each transaction has a random amount of money that one participant owes another.

2. **Calculating Balances:**
   - Calculate the net balance for each participant by summing up the incoming and outgoing transactions.
   - Positive values indicate credits, and negative values indicate debts.

3. **Using Heaps for Optimization:**
   - Use two heaps to separate participants into creditors and debtors:
     - **Positive Heap:** For creditors (participants who should receive money).
     - **Negative Heap:** For debtors (participants who owe money).

4. **Settling Debts:**
   - Extract the maximum credit and the maximum debt.
   - Determine the minimum amount that can be settled between the two.
   - Create a new transaction for the settled amount and update the remaining balances.
   - Repeat until all debts are settled.

5. **Visualization:**
   - Visualize the original cash flow problem and the solution using the `vis-network` library.

### Usage

1. **Getting Started:**
   - Open the application in your browser.
   - Click "Get New Problem" to generate a new random cash flow problem.
   - Click "Solve" to compute and display the optimal way to settle all debts.

2. **Running Locally:**
   - Clone the repository:
     ```bash
     git clone https://github.com/<username>/cashflow-solver.git
     ```
   - Navigate to the project directory:
     ```bash
     cd cashflow-solver
     ```
   - Open `index.html` in your browser to run the application locally.

## Project Structure

- **`index.html`**: The main HTML file.
- **`style.css`**: Contains custom styles for the application.
- **`script.js`**: JavaScript file containing the logic for generating and solving cash flow problems.
- **`heap.js`**: JavaScript file defining the BinaryHeap class used for optimizing transactions.
- **`README.md`**: This file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **vis-network:** For the powerful network visualization capabilities.
- **Bootstrap:** For the responsive design framework.
- **Font Awesome:** For the icon library.

