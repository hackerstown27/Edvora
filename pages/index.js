import React from "react";
import Nav from "./components/Nav";
import Result from "./components/Result";

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav userInfo={this.props.userInfo} />
        <Result userInfo={this.props.userInfo}/>
      </div>
    );
  }
}

export async function getStaticProps() {
  const res = await fetch("https://assessment.api.vweb.app/user");
  const userInfo = await res.json();
  return {
    props: {
      userInfo,
    },
  };
}

export default App;
