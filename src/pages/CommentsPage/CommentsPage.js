import React, { useEffect, useState } from "react";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditModal from '../../Components/EditModal/EditModal'
import { ToastContainer, toast } from 'react-toastify';
import './CommentsPage.css'

export default function CommentsPage() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isRejectModal, setIsRejectModal] = useState(false)
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [commentID, setCommentID] = useState(null)

  // react Notifys
  const successDeleteCommentNotify = () => {
    toast.success('کامنت با موفقیت حذف شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const errorDeleteCommentNotify = () => {
    toast.error('کامنت حذف نشد !!!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const successEditCommentNotify = () => {
    toast.success('کامنت با موفقیت آپدیت شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const errorEditCommentNotify = () => {
    toast.error('کامنت آپدیت نشد !!!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }


  const successAcceptCommentNotify = () => {
    toast.success('کامنت با موفقیت تایید شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const errorAcceptCommentNotify = () => {
    toast.error('کامنت تایید نشد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }


  const successRejecttCommentNotify = () => {
    toast.success('کامنت با موفقیت رد شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const errorRejectCommentNotify = () => {
    toast.error('کامنت رد نشد !!!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }


  // close functions
  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAccepteModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsRejectModal(false);


  useEffect(() => {
    getAllComments()
  }, []);

  function getAllComments() {
    fetch("http://localhost:8080/api/comments")
      .then(res => res.json())
      .then(data => setAllComments(data))
      .catch(error => console.log(error))
  }


  const deleteComment = () => {
    fetch(`http://localhost:8080/api/comments/${commentID}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllComments()
          setIsShowDeleteModal(false)
          successDeleteCommentNotify()
        } else {
          setIsShowDeleteModal(false)
          errorDeleteCommentNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowDeleteModal(false)
        errorDeleteCommentNotify()
      })
  }

  const acceptComment = () => {
    fetch(`http://localhost:8080/api/comments/aceept/${commentID}`, {
      method: "PUT"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllComments()
          setIsShowAcceptModal(false)
          successAcceptCommentNotify()
        } else {
          setIsShowAcceptModal(false)
          errorAcceptCommentNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowAcceptModal(false)
        errorAcceptCommentNotify()
      })
  }

  const rejectComment = () => {
    fetch(`http://localhost:8080/api/comments/reject/${commentID}`, {
      method: "PUT"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllComments()
          setIsRejectModal(false)
          successRejecttCommentNotify()
        } else {
          setIsRejectModal(false)
          errorRejectCommentNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsRejectModal(false)
        errorRejectCommentNotify()
      })
  }

  const updateComment = (event) => {
    event.preventDefault()

    fetch(`http://localhost:8080/api/comments/${commentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          getAllComments()
          setIsShowEditModal(false);
          successEditCommentNotify()
        } else {
          setIsShowEditModal(false);
          errorEditCommentNotify()
        }
      }).catch(error => {
        console.log(error)
        setIsShowEditModal(false);
        errorEditCommentNotify()
      })
  };


  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت ها</h1>
      {allComments.length ? (
        <>
          <table className="cms-table">
            <thead>
              <tr>
                <th>اسم کاربر</th>
                <th>محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
              </tr>
            </thead>

            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setMainCommentBody(comment.body);
                        setIsShowDetailsModal(true);
                      }}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button onClick={() => {
                      setIsShowDeleteModal(true)
                      setCommentID(comment.id)
                    }}>حذف</button>

                    <button onClick={() => {
                      setIsShowEditModal(true)
                      setMainCommentBody(comment.body)
                      setCommentID(comment.id)
                    }}>ویرایش</button>

                    <button>پاسخ</button>

                    {comment.isAccept ? (<button onClick={() => {
                      setCommentID(comment.id)
                      setIsRejectModal(true)
                    }
                    }> رد کامنت </button>) : (
                      <button onClick={
                        () => {
                          setCommentID(comment.id)
                          setIsShowAcceptModal(true)
                        }}>تایید</button>

                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </>
      ) : (
        <ErrorBox message="هیچ کامنتی یافت نشد" />
      )
      }

      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal">{mainCommentBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailsModal}>بستن</button>
        </DetailsModal>
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف اطمینان دارید؟'
          cancelAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}

      {isShowEditModal && (
        <EditModal
          onClose={closeEditModal}
          onSubmit={updateComment}
        >
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)} className="comment-modal-textarea" />

        </EditModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title='آیا از تایید اطمینان دارید ؟'
          cancelAction={closeAccepteModal}
          submitAction={acceptComment}
        />
      )}

      {isRejectModal && (
        <DeleteModal
          title='آیا از رد اطمینان دارید ؟'
          cancelAction={closeRejectModal}
          submitAction={rejectComment}
        />
      )}

    </div >
  );
}