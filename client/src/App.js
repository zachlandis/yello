import { useState, useEffect } from "react";
import { BrowserRoute, Switch, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/">
            <h1>Page Count: {count}</h1>
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
