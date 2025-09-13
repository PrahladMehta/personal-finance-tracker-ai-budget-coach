# Project Setup

## Prerequisites

* Node.js and npm (or yarn)
* PostgreSQL
* Git

## Installation

1. Clone the repository:
   bash
   git clone <repository_url>
   2. Navigate to the project directory:
   bash
   cd <project_directory>
   3. Install server-side dependencies:
   bash
   cd server
   npm install
   4. Install client-side dependencies:
   bash
   cd ../client
   npm install
   5. Create the PostgreSQL database.  The name and credentials should be configured in the `.env` file within the `server` directory.  Example `.env` file:

   DATABASE_URL=postgres://user:password@host:port/database_name
   OPENAI_API_KEY=your_openai_api_key
   ## Running the application

1. Start the PostgreSQL server.

2. Start the server:
   bash
   cd server
   npm run dev
   3. Start the client:
   bash
   cd ../client
   npm start
   ## Project Structure

project/
├── client/             // React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/             // Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── ...
│   ├── package.json
│   └── .env
├── README.md
└── ...
## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m "Add some feature"`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a pull request


## License

MIT