import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from './Navbar';
import SignUpForm from "./SignUpForm";
import { useContext } from "react";
import { UserContext } from "../context/user";

function App() {
  const [page, setPage] = useState("/")
  const [count, setCount] = useState(0);

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch("/signup")
      .then((res) => {
        if(res.ok) {
          res.json().then(user => setUser(user))
        }
      })
  }, []);

  // if(!user) return <h1>Not Logged In</h1>

  return (
    <>
    <Navbar onChangePage={setPage}/>
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignUpForm}/>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
    </div>
    </>
    
  );
}

export default App;
