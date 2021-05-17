import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";


export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uploadImageModal: this.props.uploadImageModal,
    };
  }

  newImageSubmit = (title, image) => {
    axios
        .post(`/api/images/`, { "title": title, "image": image})
        .then(this.setState({uploadImageModal: false}));
  } 

  render() {

    return (
        <Modal isOpen={this.state.uploadImageModal} >
        <ModalHeader toggle={() => this.setState({uploadImageModal: !this.state.uploadImageModal })} charCode="X">
            <h2>Upload a new photo:</h2>
        </ModalHeader>
        <ModalBody>
            <Form>
            <FormGroup>
            <Label for="image-title">Enter a title here:</Label>
            <Input
                type="text"
                id="image-title"
                name="image-title"
                placeholder="Enter Title"
                required=""
            />
            <Label for="image-file">Pick an image to upload:</Label>
            <Input 
                type="file" 
                name="image-file" 
                accept="image/*" 
                required="" 
                id="image-file" 
            />
            </FormGroup>
            </Form>
            <Button color="primary" className="add-photo btn btn-primary btn-lg btn-block my-4" onClick={() => 
                this.newImageSubmit(
                    document.getElementById('image-title').value, 
                    document.getElementById('image-file').files[0])}>
                Submit
            </Button>
        </ModalBody>
        </Modal>
    );
  }
}