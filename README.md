
## My Daily Macros
My Daily Macros is a full-stack nutrition tracking web application that allows users to monitor their daily calorie and macronutrient intake. Users can calculate personalized macro targets, log foods into meal categories, create custom recipes, and review historical intake through a calendar-based dashboard.

The goal of the application is to help users make informed dietary decisions by providing clear insights into their nutritional habits through structured tracking and visual analytics.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

<h3>User Authentication</h3>

<ul><li>Secure account registration and login</li>

<li>Session-based authentication</li>

<li>User-specific data storage</li></ul>

## Daily Macro Tracking
Log foods into meal categories:

<ul>
 <li>Breakfast</li>

<li>Lunch</li>

<li>Dinner</li>

<li>Snacks</li>
</ul>

Automatic calculation of total daily calories and macronutrients
## Personalized Macro Calculator
Calculates recommended daily calorie and macro targets based on user inputs

Stores user preferences and goals

## Food Search and Logging

Search for foods and add them to a daily log

Track quantities and nutritional values

## Recipe Management

Create custom recipes

Update and delete recipes

Automatically calculate macros for recipes

## Calendar-Based History

Navigate to any date

View exact food intake for that day

Maintain a full history of meals

## Data Visualization

Charts and summaries for calories, protein, carbs, and fats

Daily macro progress indicators

## Tech Stack
<h3>Frontend</h3>

Next.js (App Router)

React

Tailwind CSS

shadcn/ui

Recharts

React Hook Form

Zod

<h3>Backend</h3>

Next.js API Routes

NextAuth authentication

Prisma ORM

MongoDB

<h3>Additional Tools</h3>

Docker

Environment-based configuration

Modern UI component libraries

## Getting Started
1. Clone the repository
git clone https://github.com/dmukaj/macros-calculator.git

2. Install dependencies
npm install

3. Run the development server
npm run dev


Open http://localhost:3000
 in your browser to view the application.
