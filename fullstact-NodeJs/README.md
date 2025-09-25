# Full Stack NodeJS Application

## Environment Setup

1. Copy `.env.example` to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your MongoDB credentials:
   ```
   MONGODB_URI=your-mongodb-connection-string
   MONGODB_DB_NAME=your-database-name
   ```

3. Never commit the `.env` file to version control as it contains sensitive information.

## Security Best Practices

1. Keep your MongoDB connection string secure and never share it publicly.
2. Regularly rotate your database credentials.
3. Use environment variables for all sensitive information.
4. Make sure `.env` is listed in `.gitignore`.
5. Use `.env.example` as a template for required environment variables (without actual values).