# Pocket Activities
This is a simple project built with ASP.NET and React. The app allows users to create activities, follow other users, and leave messages under each activity.

## How to Run

1. Build the Docker image:
   ```bash
   docker build -t pocketActivities .
   ```
2. Run the Docker container:

```bash
docker run -p 3000:80 pocketActivities
```
3. Visit the app at localhost:3000

### Technology Stack
- Backend: C#
- Frontend: React

### Folder Structure
- Client: React
- API layer: Main entry of the project. Receives HTTP requests and handles responses.
- Application layer: Processes business logic.
- Domain: Contains business entities.
- Persistence: Includes DB-related files.
- Feel free to explore each folder for a better understanding of the project structure.

Note
Ensure that Docker is installed on your system before running the provided commands.

## Running without Docker
If you don't have Docker installed, you may run the frontend/backend separately:

### Frontend:

Go to the Client folder and run the following command:
```bash
npm run dev
```
This will start the React development server.

### Backend:
Go to the API folder.
Run the following command:
```bash
dotnet run
```
This will start the ASP.NET server.
