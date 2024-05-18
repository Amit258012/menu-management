# Menu Management Backend

This Node.js backend server is built for managing menus with categories, subcategories, and items.
For more info [ReadMe](https://docs.google.com/document/d/1TAftxo1HQwMBHf-KwLM-6_-haet7HNUNHvtkVtxYVjs/edit)

## Installation

1. Clone the repository: `git clone https://github.com/amit258012/menu-management.git`
2. Install dependencies: `npm install`
3. Setup database: Update the MongoDB connection string in `db.js`

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

## Database Schema

-   **Category:**

    -   name: String (required)
    -   image: String
    -   description: String
    -   ...

-   **Subcategory:**

    -   name: String (required)
    -   image: String
    -   description: String
    -   ...

-   **Item:**
    -   name: String (required)
    -   image: String
    -   description: String
    -   ...

...
