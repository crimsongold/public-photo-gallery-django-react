import React, { Component } from "react";
import axios from "axios";

import ImageModal from "./components/ImageModal";
import UploadImageModal from "./components/UploadImageModal";

import './App.css';
import { Button } from "reactstrap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      commentList: [],
      detailModal: false,
      uploadImageModal: false,
      activeItem: {}
    }
  };

  componentDidMount() {
    this.refreshImageList();
  }

  refreshImageList = () => {
    axios
      .get("/api/images/")
      .then((res) => this.setState({ imageList: res.data }))
      .catch((err) => console.log(err));
  }

  refreshCommentList = (image) => {
    axios
      .get(`/api/images/${image.id}/comments/`)
      .then((res) => this.setState({ commentList: res.data }))
      .catch((err) => console.log(err));
  }

  onAddImage = (image) => {
    axios
      .post("/api/images/", image)
      .then((res) => this.refreshImageList());
  }

  onViewDetails = (image) => {
    this.refreshCommentList(image);
    this.setState({ 
      activeItem: image,
      detailModal: true });
  }

  renderItems = () => {
    const imageItems = this.state.imageList;

    return imageItems.map((image) => (
      <div className="card"
        key={image.id}
        onClick={() => this.onViewDetails(image)}
        >
        <img
          className="card--image"
          alt={image.title}
          src={image.image_url}
          width="50%"
          height="50%"
        ></img>
        <div>Click to see comments...</div>
        <div></div>
      </div>
    ))
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-black text-uppercase text-center my-4">Galleria</h1>
        <Button color="primary" className="add-photo btn btn-primary btn-lg btn-block my-4" onClick={() => this.setState({ uploadImageModal: true })}>
          Add Photo
        </Button>
        <div className="card-list">
          {this.renderItems()}
        </div>
        {this.state.detailModal ? (
          <ImageModal
            activeItem={this.state.activeItem}
            detailModal={this.state.detailModal}
          />
        ) : null}
        {this.state.uploadImageModal ? (
          <UploadImageModal
            uploadImageModal={this.state.uploadImageModal}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
