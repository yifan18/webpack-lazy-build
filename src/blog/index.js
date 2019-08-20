import * as React from "react";
import { render } from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1><a href='/'>home page</a> / blog</h1>
        <div>
            blog content!!!!
        </div>
      </div>
    );
  }
}
render(<App />, document.getElementById("app"));
