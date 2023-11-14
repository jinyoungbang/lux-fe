# Lux - Illuminate Your Finances
Finance apps like Mint and Oops Finance are missing users' needs. We want to provide features like financial insights and budget customizations, helping users cultivate their personal finance skills.

<img width="1061" alt="Screenshot 2023-11-14 at 11 53 09 AM" src="https://github.com/jinyoungbang/lux-fe/assets/44107246/bcfd539e-6144-483f-b1be-06fd32e09478">


## Inspiration
Current applications like Mint and Oops Finance do not provide recommendations and have limited customization features.

We want to empower our users to take full control of their finances.

## What it does
Lux lets you connect multiple bank accounts using Plaid and view your transactions.

You can make personal budget decisions using Lux, allowing you to remove and directly change different transactions.

Lux also gives you a detailed insight/analysis of your monthly spending and uses OpenAI to give you a tailored recommendation for credit cards based on your historical spending.

## How we built it
We used Next.js to build our front end and deployed it using Vercel. Our Flask backend is deployed using Render.

Transaction data is stored in MongoDB.

## Challenges we ran into
Throughout the development process, we encountered several challenges that tested our problem-solving skills and teamwork.

Some planned features had to be eliminated due to the hackathon's limiting time constraints. It was difficult to find the right trade-offs for our project.

## Accomplishments that we're proud of
We were able to create a smooth, responsive application in a day!

## What we learned
We learned about the need for extensive testing in software development.
We discovered new ways to create universal native apps with React that run on Android, iOS, and the web.

## What's next for Lux
Become the one-stop platform that helps manage and perform actions related to all finances
Bring in other transaction data (investments, debt, etc) to provide more valuable recommendations
Recommendations could include: best savings accounts, change in debt structuring, etc
Ways to improve credit scores for users
… and much more!

## Getting Started

First, run the development server:

```bash
npm run dev
```
