import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  Button,
} from "reactstrap";
import axios from "axios";


export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      commentList: this.props.commentList,
      detailModal: this.props.detailModal,
    };
  }

  componentDidMount() {
    this.refreshCommentList(this.state.activeItem);
  }

  refreshCommentList = (image) => {
    axios
      .get(`/api/images/${image.id}/comments/`)
      .then((res) => {
        this.setState({ commentList: res.data })
        this.renderComments()
      })
      .catch((err) => console.log(err));
  }

  onAddComment = (event, comment) => {
    if (event.charCode === 13) {
      const comment_with_id = comment;
      comment_with_id['image'] = this.state.activeItem.id; 
      axios
        .post(`/api/images/${this.state.activeItem.id}/comments/`, comment_with_id)
        .then((res) => this.refreshCommentList(this.state.activeItem));
    }
  }

  renderComments = () => {
    const commentList = this.state.commentList;
    if (commentList !== undefined)
      return commentList.map((comment) => (
        <li
          key={comment.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          >
            {comment.text}
        </li>
    ));
  }

  render() {

    return (
      <Modal isOpen={this.state.detailModal}>
        <ModalHeader toggle={() => this.setState({detailModal: !this.state.detailModal })} charCode="X">
          <h2>{this.state.activeItem.title}</h2>
        </ModalHeader>
        <ModalBody>
          <img 
          className="card--image my-4"
          src={this.state.activeItem.image_url}
          alt={this.state.activeItem.title}/> 
          <h5 className="my-4">Comments: </h5>
          <ul className="list-group list-group-flush border-top-0 my-4">
            {this.renderComments()}
          </ul>
          <Form>
            <FormGroup>
              <Label for="comment-text">Enter a comment here:</Label>
              <Input
                type="text"
                id="comment-text"
                name="comment-text"
                placeholder="Press 'Enter' when finished."
                onKeyPress={(event) => this.onAddComment(event, {"text": document.getElementById('comment-text').value})}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="secondary" 
              className="add-photo btn btn-primary btn-lg btn-block my-4" 
              onClick={() => this.setState({detailModal: !this.state.detailModal })}
            >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}