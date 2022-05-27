import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Card, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { IBlogPosts } from '../data/domain/models/BlogPosts';
import { IComments } from '../data/domain/models/Comments';
import { useBlogPost } from '../data/queries/BlogPostQueries';
import styles from '@/styles/BlogPosts.module.css'

const BlogPosts: NextPage = () => {
  const blogPostQuery = useBlogPost();
  const [pageNumber, setPageNumber] = useState(1);
  const [postNumber] = useState(5);
  const [modalComments, setModalComments] = useState<IComments[]>([]);
  const [maxPages, setMaxPages] = useState(10);
  const [showComment, setShowComment] = useState(false);

  const handleCloseComment = () => {
    setShowComment(false);
  }
  const handleShowComment = (comments: IComments[]) => {
    setShowComment(true);
    setModalComments(comments);
  }
  let pages = Array.from(Array(maxPages), (_, x) => x);

  const sortedBlogData = blogPostQuery?.data
    ? blogPostQuery?.data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    : [];

  const posts = JSON.parse(JSON.stringify(sortedBlogData));
  const currentPageNumber = (pageNumber * postNumber) - postNumber
  const pageItems: IBlogPosts[] = posts.splice(currentPageNumber, postNumber);

  useEffect(() => {
    const maxPageNumbers = Math.ceil(sortedBlogData?.length / 5);
    setMaxPages(maxPageNumbers);
  })

  const handlePrevious = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  }

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  return (
    <>
      {blogPostQuery.isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className={'justify-content-center'}>
          {pageItems && pageItems.length && pageItems.map(blog => (
            <Card className={'m-2 col-7 ' + styles.postCard} key={blog.id}>
              <Card.Header className={styles.cardHeader}>
                <Row>
                  <Col>
                      <span className={styles.title}>
                        {blog.title}
                      </span>
                    <span className={styles.date}>{new Date(blog.createdAt).toDateString()}</span>
                  </Col>
                </Row>
                  <Row className={'bootstrap-icons ' + styles.subTitle}>
                    <Col>
                      <i className="bi bi-people-fill me-2"/>
                      <span className="me-3">
                        {blog.authors.map((author, index) =>
                            <span key={author.id}>{author.name}{index < blog.authors.length - 1 ? ", " : ""}</span>
                        )}
                      </span>
                    </Col>
                  </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>{blog.description}</Card.Text>
              </Card.Body>
              <Card.Footer className={styles.cardFooter}>
                <span
                  className={styles.commentText}
                  onClick={() => handleShowComment(blog.comments)}
                  aria-label={'comment_' + blog.id}>
                  <i className="bi bi-chat-text me-1" />
                  <span>
                    {blog.comments.length}
                  </span>
                </span>
              </Card.Footer>
            </Card>
          ))}
          <Row className={'mt-3 justify-content-center'}>
            <Col>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className={pageNumber === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link" aria-label="Previous" onClick={handlePrevious}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {pages.map(page =>
                    <li className={pageNumber === page + 1 ? "page-item active" : "page-item"} key={page}>
                      <a className="page-link" aria-label={'Page_'+ page} onClick={() => handlePageChange(page + 1)}>
                        <span aria-hidden="true">{page + 1}</span>
                      </a>
                    </li>
                  )}
                  <li className={pageNumber === maxPages ? "page-item disabled" : "page-item"}>
                    <a className="page-link" aria-label="Next" aria-labelledby="Next" onClick={handleNext}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Row>
      )}
      <>
        <Modal size="lg"
               aria-label={"close-modal"}
               aria-labelledby="contained-modal-title-vcenter"
               centered
               show={showComment}
               onHide={handleCloseComment}>
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalComments.length ? modalComments.map(comment => (
              <div key={comment.id}>
                <Card className={'mb-3'}>
                  <Card.Header>
                    <strong aria-label={'comment-title-' + comment.id}>{comment.title}</strong>
                    <div className={styles.commentDate}>
                      {new Date(comment.updatedAt).toDateString()}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <span>{comment.description}</span>
                  </Card.Body>
                </Card>
              </div>
            )) : (
              <>
                No comments yet!
              </>
            )}
          </Modal.Body>
        </Modal>
      </>
    </>
  )
}

export default BlogPosts;