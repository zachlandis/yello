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
    - XXXX At least one reciprocal many-to-many relationship (implemented by using 2 has-many-through relationships). Note: in order to accomplish this, your project must include a joins table. This joins table must include a user submittable attribute.
    - XXXX Full CRUD actions for the resource belonging to the two others (joins). 
        - ?X?X The update action should be implemented using a form that is pre-filled with existing values for the object. On submission of the form, the object should update. Note: Using a like button or similar will not meet the update requirement.
    - XXXX Minimum of create and read actions for EACH resource.

- XXXX Follow RESTful routing convention for backend routes.

- XXXX Active Record validations must be present on your models for most attributes.

- Use controller validations to alter back end json response to front end. The response should pass your object if the creation, update, or deletion succeeds. However, the response should pass error messages to the front end and display them if the action fails. HINT: Utilize record.errors.

- Properly update front end state upon successful response from a POST, PATCH, or DELETE request. That is to say, you should NOT rely on another GET request or redirect to update front end state of your application.

- XXXX Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that allows users to navigate between routes. Follow RESTful convention where applicable.

- Implement authentication/authorization, including password protection. A user must be able to:
    - XXXX sign up with a new user account,
    - XXXX log in to the site with a secure password and stay logged in via user ID in the session hash, and
    - XXXX log out of the site.

- XXXX Use the React hook useContext to persist your logged in user object in front end state and avoid props drilling.


Note: a user should only be able to edit and delete resources if they are logged in and the creator of that resource. For example, if we consider the example described below with models of User, DogHouse, and Review, I would only be able to edit or delete the reviews that I created. This protection should occur in the back end of the project. Simply altering the front end to hide the edit & delete buttons is insufficient in terms of security. Assuming you have a current_user method and a post belongs to a user, the code needed to secure these operations looks something like this: if current_user.id == post.user.id.

Alternatively, the most performant way to implement this is:

post = current_user.posts.find(params[:id])
if post
  <do something>
else
  <do something else>
end