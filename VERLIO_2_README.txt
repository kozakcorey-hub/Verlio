Verlio 2.0 dashboard source

1. Extract the archive.
2. Copy your existing .env file into the verlio folder (do not share this file).
3. In a command prompt inside the verlio folder, run:
   npm install
   npm run build
4. If build succeeds, deploy the generated dist folder to your EXISTING Netlify site.

This source update preserves the existing Supabase integration and database schema.
The dashboard uses real user data; yearly counts depend on recorded completion dates.
The visual design is adapted from the concept image, not a pixel-perfect reproduction.
JSX syntax was checked; production build was not verified in this environment.
