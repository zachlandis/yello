- Use controller validations to alter back end json response to front end. The response should pass your object if the creation, update, or deletion succeeds. However, the response should pass error messages to the front end and display them if the action fails. HINT: Utilize record.errors.


Note: a user should only be able to edit and delete resources if they are logged in and the creator of that resource. For example, if we consider the example described below with models of User, DogHouse, and Review, I would only be able to edit or delete the reviews that I created. This protection should occur in the back end of the project. Simply altering the front end to hide the edit & delete buttons is insufficient in terms of security. Assuming you have a current_user method and a post belongs to a user, the code needed to secure these operations looks something like this: if current_user.id == post.user.id.

Alternatively, the most performant way to implement this is:

post = current_user.posts.find(params[:id])
if post
  <do something>
else
  <do something else>
end