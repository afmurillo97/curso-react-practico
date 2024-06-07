# Technical Challenge

## 1. User Interface Design

### General Description

- Page for user login (if the user is not authenticated)
- Sign up page to create a new user (if the user is not authenticated)
- Page with user information and logout button (if the user is already authenticated)

### Task Breakdown

1. Design UI for the `sign-in` page.
2. Create the `sign-up` page and design its interface.
3. Create logic to fetch and store a user in the browser's local storage. The structure of the stored object would be as follows:

```sh
    account: {
        name: String
        email: String
        password: String
    }
```
4. Create logic to fetch and store the login state in the browser's local storage. The structure of the stored object would be as follows:

5. Add functionality to add a user to the "**Create**" button of the form on the `sign-up` page, and store the active login state.
6. Create logic to check if a user exists and if they are authenticated.
7. Restrict access to the `sign-in` and `sign-up` pages for authenticated users.
8. Correct link URL for "**Sign in**" in the `Navbar`.
9. Design the "**Sign out**" button in the `Navbar`.
10. Add sign-out functionality to the "**Sign out**" button in the `Navbar`.
11. Add sign-in functionality to the "**Log in**" button on the `sign-in` page.
12. Restrict access to the `my-account` page for logged-in users.
13. Design UI for the `my-account` page, which should display the "**name**" and "**email**" of the logged-in user.
14. Add a route for editing user account details. It is recommended to reuse the interface from the `sign-up` page.
15. Slightly change the interface of the `sign-up` page if the currently authenticated user is being edited. The user values should be displayed in the inputs, and the text of the "Create" button should be changed to "Edit".

## 2. Dynamic Navbar

### General Description

The main navbar or menu of the application should change its structure depending on whether the user is authenticated or not:

- Show the user's email (if authenticated)
- Show the sign-in button (if not authenticated)

### Task Breakdown

1. Display the authenticated user's email in the `Navbar`.
2. Show the "**Sign out**", "**My Account**", and "**My Orders**" links along with the "**email**" when a user is authenticated.
3. Show the "**Sign in**" link when there is no authenticated user.

## 3. Route Protection

### General Description

Checkout, Order History, and Product Viewing routes should not be visible to unauthenticated users:

- Redirect to the login page if the user is not authenticated
- Display the mentioned pages normally

    