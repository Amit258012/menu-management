# Menu Management Backend

This Node.js backend server is built for managing menus with categories, subcategories, and items.
For more info [ReadMe](https://docs.google.com/document/d/1TAftxo1HQwMBHf-KwLM-6_-haet7HNUNHvtkVtxYVjs/edit)

## Installation

1. Clone the repository: `[git clone https://github.com/amit258012/menu-management.git](https://github.com/Amit258012/menu-management.git)`
2. Install dependencies: `npm install`
3. Setup database: download `mongodb Compass` and add the data to the compass

## Running the Server

Start the server: `node server.js`

The server will run on port 3000 by default.

## API Endpoints

### Categories

-   **GET /api/categories:** Get all categories
-   **POST /api/categories:** Create a new category
-   ...

### Subcategories

-   **GET /api/subcategories:** Get all subcategories
-   **POST /api/subcategories:** Create a new subcategory
-   ...

### Items

-   **GET /api/items:** Get all items
-   **POST /api/items:** Create a new item
-   ...

### QNA

-   Which database you have chosen and why?
-   Database used => MongoDB, It has flexible schema and it can scale easily by horizontal sharding and easy to use,
-   I used Mongoose, it makes the woking with schema very easy

-   3 things that you learned from this assignment?
-   1. How to use Mongoose schema
-   2. MongoDB relations (one to one, many to one , many to many)
-   3. Structured way of writing code (best practices).

-   What was the most difficult part of the assignment?
-   It took me time to understand the relationships in mongodb.

-   What you would have done differently given more time?
-   I would like to learn more about the reference in mongodb and implement schemas better.
