🚀 Full-Stack Portfolio: From Angular Mocks to a Live Node.js APIHello there! Welcome to your full-stack journey. You've built an awesome Angular frontend with mock data, and now it's time to level up by building a real backend API to power it.This guide will walk you through every single step, from initializing your Node.js project to connecting your Angular ApiService to it.We've already generated all the backend files for you, so you can copy-paste them into your new express-portfolio-api project folder. This guide will explain what that code does.Part 1: Building the Node.js & Express BackendFirst, let's get your backend server up and running.Step 1: Project SetupCreate a new folder for your backend outside of your Angular project folder.mkdir express-portfolio-api
cd express-portfolio-api
Initialize a new Node.js project. The -y flag accepts all the defaults.npm init -y
This creates your package.json file.Copy the express-portfolio-api/package.json file I provided into your express-portfolio-api folder, replacing the one you just created. This new file includes all the dependencies and scripts we need.Install the dependencies.npm install
Let's look at what you just installed:express: The web framework itself. This is what lets us create routes and handle HTTP requests.cors: A critical piece of middleware. This will let your Angular app (on localhost:4200) make requests to your backend (on localhost:3000). Browsers block this by default for security.helmet: A great security package that adds 11 basic-but-important security headers to your responses.morgan: A request logger. It prints info about every incoming request to your console (e.g., GET /api/v1/projects 200 - 5.123 ms).dotenv: Lets us use a .env file for environment variables (like ports and API keys) so we don't hard-code them.express-validator: For (optional but recommended) validating incoming data on POST and PUT requests.swagger-jsdoc & swagger-ui-express: These magically generate live API documentation from comments in your route files.nodemon (as a devDependency): This is your new best friend. It's a "code butler" that watches your files for changes and automatically restarts your server every time you hit save. No more Ctrl+C and node src/server.js every 30 seconds!Step 2: The Folder StructureNow, create the following folder structure inside express-portfolio-api.You can create this structure manually, or run the following commands in your terminal to create all the folders and empty files at once. (Note: I've updated your script slightly for correctness, like using responseWrapper.js).# Create all folders at once (-p creates parent directories as needed)
mkdir -p src/routes src/data src/middleware src/config src/utils

# Create the top-level .env file
touch .env

# Create the main src files
touch src/server.js
touch src/app.js

# Create files for sub-folders
touch src/config/swagger.js
touch src/data/mockData.js
touch src/middleware/errorHandler.js
touch src/utils/responseWrapper.js

# Create all route files
touch src/routes/index.js
touch src/routes/profile.js
touch src/routes/projects.js
touch src/routes/skills.js
touch src/routes/workExperience.js
touch src/routes/navLinks.js
After running this, your structure will look like this. You can then copy-paste the file contents I provided into their correct locations.express-portfolio-api/
├── .env                  # Environment variables (PORT, etc.)
├── package.json          # Project config and dependencies
├── src/
│   ├── app.js            # Main Express app configuration (middleware, routes)
│   ├── server.js         # Server entry point (starts the HTTP server)
│   ├── config/
│   │   └── swagger.js    # Configuration for API docs
│   ├── data/
│   │   └── mockData.js   # Your portfolio data, ported from api.ts
│   ├── middleware/
│   │   └── errorHandler.js # A global error handler
│   ├── routes/
│   │   ├── index.js          # Main router (imports all other routes)
│   │   ├── navLinks.js     # /api/v1/nav-links route
│   │   ├── profile.js      # /api/v1/profile route
│   │   ├── projects.js     # /api/v1/projects route
│   │   ├── skills.js       # /api/v1/skills route
│   │   └── workExperience.js # /api/v1/work-experience route
│   └── utils/
│       └── responseWrapper.js # Helper for consistent JSON responses
└── node_modules/           # (Created by npm install)
Step 3: Understanding the Serversrc/server.js: This is the entry point. Its only job is to load dotenv (so .env variables are available), import the app, and start the HTTP server on the correct port.src/app.js: This is the heart of your Express application. It imports and "uses" all the middleware (like cors, helmet, morgan). It also imports the main apiRoutes from src/routes/index.js and tells Express to use them under the /api/v1 prefix. Finally, it sets up the Swagger docs and error handlers.Step 4: Your Datasrc/data/mockData.js: I've carefully extracted all the mock data from your api.ts file and converted it to plain JavaScript.Important: I added id fields to your arrays (projects, skills, workExperience). This is a REST API best practice and allows us to create routes like GET /api/v1/projects/1 to fetch a single item.Step 5: The API RoutesThis is where the magic happens.src/routes/index.js: This file is a clean way to manage routes. It imports all the individual route files (like projects.js) and mounts them. app.js only has to import this one file.src/routes/projects.js (Example):We import Router from express.We import our projects data.We import our sendSuccess and sendError helpers.router.get('/', ...): This handles GET /api/v1/projects. It simply sends all the projects, wrapped in our standard response.router.get('/:id', ...): This handles GET /api/v1/projects/123. The :id is a URL parameter. We find the project with that ID and return it. If not found, we use sendError to return a 404.Scaffolding: I've added empty (but functional) handlers for POST, PUT, and DELETE. They show how you would create, update, or delete a project, including validation with express-validator. They don't permanently change the mock data (since it's just a file), but they return the correct responses (201, 200, 204).Step 6: Running Your BackendThis is the easy part! Thanks to our package.json script, just run:npm run dev
You should see output like this in your terminal:[nodemon] starting `node src/server.js`
✅ Server is listening on http://localhost:3000
📚 API docs available at http://localhost:3000/api-docs
Your backend is live!Step 7: Testing Your APIYou can't see it in a browser (well, you can, but it's not pretty). Let's use curl (in your terminal) or a tool like Postman to test it.Open a new terminal (leave your server running!) and try these:# Get all projects
curl http://localhost:3000/api/v1/projects

# Get project with id 1
curl http://localhost:3000/api/v1/projects/1

# Get the profile data
curl http://localhost:3000/api/v1/profile

# Get all skills
curl http://localhost:3000/api/v1/skills
You should see the JSON data you defined! You can also check out your new API documentation by visiting http://localhost:3000/api-docs in your browser.Part 2: Connecting Your Angular FrontendOkay, your backend is running. Now let's tell Angular to use it.Step 1: Prep Your Angular AppImport HttpClientModule: This is the most important step. Angular's HttpClient won't work without it.If you have app.module.ts (older Angular):// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- IMPORT THIS
import { AppComponent } from './app.component';
// ... other imports

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- ADD THIS
    // ... other modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
If you have app.config.ts (modern Standalone Angular):// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- IMPORT THIS
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <-- ADD THIS
  ],
};
Step 2: Update Your api.service.tsThis is where we replace your static signals with data from HttpClient.I've created a new version of your api.ts file. You can replace your entire api.ts file with the code I'm providing in the file block named angular-portfolio/src/app/api.service.ts.Here's a breakdown of what's changed in that new file:Imports: We now import inject from @angular/core and HttpClient from @angular/common/http. We also import map and tap from rxjs/operators.New Interfaces: We define a generic ApiResponse<T> interface that matches the { data: ..., meta: ... } structure our Node.js API sends.Inject HttpClient: Inside the ApiService class, we get an instance of HttpClient:private http = inject(HttpClient);
private baseUrl = 'http://localhost:3000/api/v1'; // Our backend URL
Signals: Your signals are now initialized as empty or null, because they will be filled by the API call.readonly navLinks = signal<NavLink[]>([]);
profile = signal<Profile | null>(null);
// ...etc
Constructor: The service's constructor now calls private methods to load the data when the service is first created.constructor() {
  this.loadProfile();
  this.loadNavLinks();
  this.loadSkills();
  this.loadWorkExperience();
  this.loadProjects();
}
load... Methods: This is the core logic. Let's look at loadProfile:private loadProfile() {
  this.http.get<ApiResponse<Profile>>(`${this.baseUrl}/profile`)
    .pipe(
      map(response => response.data), // Pluck the 'data' object from the response
      tap(data => this.profile.set(data)) // Set the signal's value
    )
    .subscribe(); // Subscribe to make the request happen
}
This code:Makes an HTTP GET request to http://localhost:3000/api/v1/profile.Tells TypeScript to expect an ApiResponse<Profile>.Uses the map operator to transform the full response and only return the data property.Uses the tap operator to take that data and update the profile signal.Finally, .subscribe() executes the whole chain.Step 3: Run Both & See the Magic!This is the moment of truth.Terminal 1 (Backend):cd express-portfolio-api
npm run dev
(Wait for it to say it's listening on port 3000...)Terminal 2 (Frontend):cd your-angular-project
ng serve
(Wait for it to compile and be available on port 4200...)Browser:Open http://localhost:4200 in your browser.Your portfolio should load... exactly as it did before!"Wait... how do I know it worked?"Open your browser's Dev Tools (F12 or Cmd+Option+I), go to the "Network" tab, and refresh the page. You will now see your app making actual HTTP requests to localhost:3000 for profile, projects, skills, etc.You are no longer using mock data. You are a full-stack developer!Part 3: Extra Credit & TroubleshootingTroubleshooting"I got a CORS error!"This is the most common problem. It means your Angular app on http://localhost:4200 was blocked from talking to http://localhost:3000.Solution: Double-check your express-portfolio-api/.env file. Make sure CLIENT_ORIGIN=http://localhost:4200. Then, restart your Node.js server (Ctrl+C and npm run dev) to make it read the new .env value."nodemon isn't restarting!"This usually means you have a syntax error in your Node.js code. Check the nodemon terminal window—it will print the error (e.g., SyntaxError: Unexpected token '{'). Fix the error and save the file; nodemon will try again.Next StepsValidation: We added express-validator to the POST /projects route. This is super important for a real app to make sure you don't get bad data.Database: The next logical step is to replace mockData.js with a real database like MongoDB (with Mongoose) or PostgreSQL (with Prisma). You'd change your route handlers to fetch from the DB instead of the file.Authentication: You could add a POST /api/v1/auth/login route using jsonwebtoken (JWT). This would return a token that your Angular app could save and send with future requests to access protected routes.Deployment: To deploy this, you would:Run ng build in your Angular app.Configure your Express server (in app.js) to serve the static files from Angular's dist/ folder.Deploy your Node.js project (which now contains both the API and the frontend) to a service like Render, Vercel, or Heroku.You've built a solid foundation. You've got a clean, secure, and documented API, and you've successfully connected it to your Angular frontend. Amazing work!