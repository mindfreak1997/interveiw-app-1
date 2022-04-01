import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import { useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Hidden } from "@mui/material";

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    console.log("editor", this.state, this.props);
  }
  /* componentDidMount() {
    const contentState =
      Object.keys(this.props.data).includes("reveiws") &&
      convertFromRaw(this.props.data.reveiws.newState);
    const editor =
      Object.keys(this.props.data).includes("reveiws") &&
      EditorState.createWithContent(contentState);
    console.log(editor, contentState, "reducer");
    this.setState({
      editorState: editor,
    });
  } */

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    let newState = convertToRaw(editorState.getCurrentContent());
    this.props.setData({
      ...this.props.stateData,
      reveiws: newState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          {...(this.props.data
            ? { editorState: this.props.data }
            : { editorState: editorState })}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          /*  {...(Object.keys(this.props.data).includes("reveiws") && {
            readOnly: true,
          })} */
        />
      </div>
    );
  }
}

export default EditorContainer;
