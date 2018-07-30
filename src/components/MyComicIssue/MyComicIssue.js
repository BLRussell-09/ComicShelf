import React from 'react';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import Characters from '../Characters/Characters';
import './MyComicIssue.css';

class MyComicIssue extends React.Component
{
  constructor (props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowReview = this.handleShowReview.bind(this);
    this.handleCloseReview = this.handleCloseReview.bind(this);

    this.state = {
      show: false,
      show2: false,
    };
  }

  hoverClick = (e) =>
  {
    e.preventDefault();
  }

  handleClose () {
    this.setState({ show: false });
  }

  handleShow () {
    this.setState({ show: true });
  }

  handleShowReview () {
    this.setState({ show2: true });
  }

  handleCloseReview () {
    this.setState({ show2: false });
  }

  render ()
  {
    const {issue} = this.props;
    const {singleIssueClick} = this.props;
    const issueCover = `${issue.thumbnail.path}.${issue.thumbnail.extension}`;
    const issueAlt = `${issue.title}`;
    const issueTitle =  `${issue.title}`;
    const {favIssueClick} = this.props;
    const {rmvIssueClick} = this.props;
    const {reviewIssueClick} = this.props;
    const {saveReviewClick} = this.props;
    const charactersComponent = this.props.characters.map((character) =>
    {
      return (
        <Characters character={character} key={character.id}/>
      );
    });

    if (!issue.isFavorite)
    {
      return (
        <div className="MyComicIssue col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issueCover} alt={issueAlt} onClick={this.handleShow}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="Favorite">star</li>
            <li className="buttons material-icons md-48" onClick={rmvIssueClick} tooltip="Remove from Library">cancel</li>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{issueTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4><img src={issueCover} alt={issueAlt} /></h4>
              <div className="row">
                <div className="col-xs-12">
                  <h3>Synopsis</h3>
                  <p>
                    {issue.description}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>User Review</h3>
                  {issue.userReview}
                  <form id='reviewForm' className='hidden'>
                    <div class="form-group">
                      <label for="inputTitle">Leave a Review Here</label>
                      <input type="text" class="form-control" id="inputReview" placeholder="Leave a Review" onChange={this.props.reviewStr}/>
                    </div>
                    <button type="submit" class="btn btn-default" onClick={saveReviewClick}>Submit</button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button className="btn btn-primary reviewReveal" onClick={reviewIssueClick}>Leave a Review</button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>Characters</h3>
                  {charactersComponent}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else
    {
      return (
        <div className="MyComicIssue col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issueCover} alt={issueAlt} onClick={this.handleShow}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="un-Favorite" style={{color: 'orange'}}>report</li>
            <li className="buttons material-icons md-48" onClick={rmvIssueClick} tooltip="Remove from Library">cancel</li>
            <i onClick={this.hoverClick}className="buttons material-icons md-48">add</i>
          </nav>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{issueTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4><img src={issueCover} alt={issueAlt} /></h4>
              <div className="row">
                <div className="col-xs-12">
                  <h3>Synopsis</h3>
                  <p>
                    {issue.description}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>User Review</h3>
                  {issue.userReview}
                  <form id='reviewForm' className='hidden'>
                    <div class="form-group">
                      <label for="inputTitle">Leave a Review Here</label>
                      <input type="text" class="form-control" id="inputReview" placeholder="Leave a Review" onChange={this.props.reviewStr}/>
                    </div>
                    <button type="submit" class="btn btn-default" onClick={saveReviewClick}>Submit</button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <button className="btn btn-primary reviewReveal" onClick={reviewIssueClick}>Leave a Review</button>
                </div>
              </div>
              <div className="row">
                <h3>Characters</h3>
                {charactersComponent}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };
};

export default MyComicIssue;
