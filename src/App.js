import { useState } from "react";
import "./App.css";
import createParser from "@subparry/selective-html-parser";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "../node_modules/prismjs/components/prism-clike";
import "../node_modules/prismjs/components/prism-javascript";
import "../node_modules/prismjs/themes/prism.css";

const defaultOptions = `{
  "whitelistTags": {
    "h1": {
      "tagName": "h3"
    },
    "script": {
      "tagName": "del"
    },
    "a": {
      "attributes": {
        "target": "_blank",
        "href": true
      }
    },
    "img": {
      "attributes": {
        "src": true,
        "width": "200px"
      }
    }
  }
}`;

const defaultHtml = `<h1>Hi! this is an h1</h1>
  <img src="https://image.shutterstock.com/z/stock-vector-target-icon-red-vector-flat-bullseye-strategy-goal-sign-symbol-1228690714.jpg" />
  <script>localStorage.getItem('password')</script>
`;

function App() {
  const [html, setHtml] = useState(defaultHtml);
  const [options, setOptions] = useState(defaultOptions);
  const [parseOptions, setParseOptions] = useState(JSON.parse(defaultOptions));

  const createOptions = (json) => {
    try {
      setParseOptions(JSON.parse(json));
    } catch (error) {
      return null;
    }
  };

  const parser = createParser(parseOptions);

  const optionsChange = (code) => {
    setOptions(code);
    createOptions(code);
  };

  const style = {
    minHeight: "250px",
    border: "1px solid lightgray",
  };
  return (
    <div>
      <h1>
        <a
          href="https://www.npmjs.com/package/@subparry/selective-html-parser"
          target="_blank"
        >
          @subparry/selective-html-parser
        </a>{" "}
        demo
      </h1>
      <div className="areas-container">
        <div className="textarea-container">
          <h2>Enter your html here</h2>
          <Editor
            value={html}
            onValueChange={(code) => setHtml(code)}
            highlight={(code) => highlight(code, languages.html)}
            padding={10}
            style={style}
          ></Editor>
        </div>
        <div className="textarea-container">
          <h2>Enter parser options as JSON</h2>
          <Editor
            value={options}
            onValueChange={optionsChange}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={style}
          ></Editor>
          <small>
            Attribute values can also be functions that receive original
            attributes as an object as only argument, but we can't demo that
            here
          </small>
        </div>
      </div>
      <br></br>
      <h2>
        Parsed:{" "}
        <span dangerouslySetInnerHTML={{ __html: parser.parse(html) }}></span>
      </h2>
    </div>
  );
}

export default App;
