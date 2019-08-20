import * as React from "react";
import { render } from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>home page</h1>
        <nav>
          <p>
            <a href="/blog">blog</a>
          </p>
          <p>
            <a href="/about">about</a>
          </p>
        </nav>
      </div>
    );
  }
}
render(<App />, document.getElementById("app"));
