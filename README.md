## Nassi Hospitals Website Netlify deployment

</span>

<p> &nbsp; </p>

This project is a basic implementation of Netlify lambda functions deployment of an express server.
It deploys the Nassi website found on yet another one of my [repos](https://github.com/khalayilwanga/NassiLatest) using express for the backend and a react frontend.

However due to limits on the lambda functions being called on the Netlify free tier plan this site is not deployed from the functions. Nevertheless, this is the implementation. The functions are generated from the server folder in the root directory.

The functions are already generated and found in the `functions` folder but to rebuild them anew , delete that folder and run the script `npm run build`.

To serve the lambda functions locally run `npm run start`. They will run on the url

> https://localhost:9000/.netlify/functions/<name-of-function>

---

Thanks for visiting.
