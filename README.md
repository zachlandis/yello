##USER STORIES

MVP
As a user, I can:
- Sign up for an account
- Log in to the site & remain logged in
- Log out
- View a list of all to-dos
- Create a comment on one specific to-do
- Modify or delete a comment that a user left on a to-do
- Create a new card


Stretch: 
As a user, I can:
- View all cards the user has commented on


##MODELS AND RELATIONSHIPS

- User
- Card
- Comment

User -< Comment >- Card
User -< Card




REQUIREMENTS

For this project, you must:

- XXXX Use a Rails API backend with a React frontend.

- Have at least three models on the backend, that include the following:
    - At least one reciprocal many-to-many relationship (implemented by using 2 has-many-through relationships). Note: in order to accomplish this, your project must include a joins table. This joins table must include a user submittable attribute.
    - XXXX Full CRUD actions for the resource belonging to the two others (joins). 
        - The update action should be implemented using a form that is pre-filled with existing values for the object. On submission of the form, the object should update. Note: Using a like button or similar will not meet the update requirement.
    - XXXX Minimum of create and read actions for EACH resource.

- XXXX Follow RESTful routing convention for backend routes.

- XXXX Active Record validations must be present on your models for most attributes.

- Use controller validations to alter back end json response to front end. The response should pass your object if the creation, update, or deletion succeeds. However, the response should pass error messages to the front end and display them if the action fails. HINT: Utilize record.errors.

- Properly update front end state upon successful response from a POST, PATCH, or DELETE request. That is to say, you should NOT rely on another GET request or redirect to update front end state of your application.

- Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes. Follow RESTful convention where applicable.

- Implement authentication/authorization, including password protection. A user must be able to:
    - sign up with a new user account,
    - log in to the site with a secure password and stay logged in via user ID in the session hash, and
    - log out of the site.

- Use the React hook useContext to persist your logged in user object in front end state and avoid props drilling.