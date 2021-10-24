# Firebase Authentication With SSR

## Getting Started

To install all required dependencies, run the following command at the root level of the project.

```bash
npm run install
# or
yarn install
```

---

## Introduction

This is the boilerplate code needed to create a user authentication flow with Firebase that enables server-side validation and generation of a user's ID token and session cookie respectively. This will allow for user validation on both the client-side and on the server-side through `getServerSideProps` to fetch additional data from the Firestore or Realtime Database.

- When a user sign's in or creates an account, the API route `/api/session` will validate the incoming ID token and will generate a session cookie to the client with `createSessionCookie()`, which is made possible on the server side with Firebase's Admin SDK for Node.js environments.

- The user will then be redirected to a protected route that verifies the cookie with the Firebase API method `verifyCookieSession()` within a page's `getServerSideProps` call.

- The user's authenticated data will be persisted on the frontend via an `AuthContext` provider.

- Logging out will also clear the cookie from local storage, with the API route `/api/logout`

---

## Notes

- Built with [Chakra-UI](https://chakra-ui.com/)
- Using [react-hook-forms](https://react-hook-form.com/) for handling login forms
- Using Firebase's latest [modular API](https://firebase.google.com/docs/web/modular-upgrade)

---

## Try the Demo

Deployed on Vercel, the live demo can be found [here](https://firebase-auth-with-ssr.vercel.app/):
