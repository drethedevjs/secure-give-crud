# Transaction Log Dashboard

Created a simple CRUD app using Typescript that will log and manage financial transactions. This app mimics a dashboard that will allow a bookkeeper, an accountant, or a CTO to have a high-level view of the organization's current income.

## Dependencies

1. TypeScript
2. npm (I used version 8.15.0)
3. Node

## How to start the app

1. Clone the repo to your computer.
2. In your terminal, navigate to the `church-transactions` directory.
3. Run `npm i` and then `npm run dev`.
4. A browser window/tab may open with the app. If not, navigate to the url shown in the terminal.
5. Open another terminal window and navigate to the `server` directory.
6. Run `npm i`, `npm run build`, and then `nodemon` if you have it installed globally.
7. You may have to refresh the page so that it calls the server for the data to be shown.

## Running Tests

Navigate to the `server` directory and run `npm test`. The terminal should show all tests passing.

## State Management

This app isn't deployed anywhere and is not hooked up to any databases. The data that it uses is created when the `express` app is launched. An array of transaction objects is created using random data and sent to the front end for viewing and data manipulation. All operations update the `transactions` variable in the transactions router.

## Features that could be added

As stated before, this app is simple. There are many features that one might expect an app like this to have but does not. I forgo'd these features for the sake of time but I'll list below what would make great additions:

1. Table filtering and sorting: by name, by year, etc.
2. Form validation on the modal. The app could easily break, for instance, if someone adds letters to the amount field.
3. Error handling. All the router endpoints assume that all the request will work.
4. Adding a db connection so that our data can be stored and saved permanently.
5. Multi-delete in case users need to delete many transactions at the same time.
6. "Are you sure?" popup for deletes.
7. Responsive.
