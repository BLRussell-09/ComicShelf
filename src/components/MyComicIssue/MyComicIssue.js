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
    const charactersComponent = this.props.characters.map((character) =>
    {
      return (
        <Characters character={character}/>
      );
    });

    if (!issue.isFavorite)
    {
      return (
        <div className="MyComicIssue col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issueCover} alt={issueAlt} onClick={this.handleShow}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="Favorite">star</li>
            <li className="buttons material-icons md-48" onClick={this.handleShow} tooltip="Add Review">
              library_add
            </li>
            <li className="buttons material-icons md-48" tooltip="View Covers">insert_photo</li>
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
                <h3>Synopsis</h3>
                <div className="col-xs-12">
                  <p>
                    {issue.description}
                  </p>
                </div>
              </div>
              <div className="row">
                <h3>Characters</h3>
                {charactersComponent};
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="warning">Save</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    } else
    {
      return (
        <div className="MyComicIssue col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <a href="/" className="thumbnail" onClick={singleIssueClick}>
            <img src={issueCover} alt={issueAlt} onClick={this.handleShow}/>
          </a>
          <nav className="navContainer">
            <li className="buttons material-icons md-48" onClick={favIssueClick} tooltip="un-Favorite" style={{color: 'red'}}>report</li>
            <li className="buttons material-icons md-48" onClick={this.handleShowReview} tooltip="Add Review">library_add</li>
            <li className="buttons material-icons md-48" tooltip="View Covers">insert_photo</li>
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
                <h3>Synopsis</h3>
                <div className="col-xs-12">
                  <p>
                    {issue.description}
                  </p>
                </div>
              </div>
              <div className="row">
                <h3>Characters</h3>
                {charactersComponent};
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="warning">Save</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  };
};

export default MyComicIssue;
