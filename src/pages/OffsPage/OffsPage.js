import React, { useEffect, useState } from 'react'
import './OffsPage.css'
import { ToastContainer, toast } from 'react-toastify'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'


export default function OffsPage() {
  const [allOffs, setAllOffs] = useState([])
  const [maniOrderID, setMainOrderID] = useState(null)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowActiveModal, setIsShowActiveModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)

  // react Notifys
  const successOffNotify = () => {
    toast.success('کاربر با موفقیت حذف شد', {
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

  const errorOffNotify = () => {
    toast.error('کاربر حذف نشد', {
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

  const successActiveOffNotify = () => {
    toast.success('تخفیف با موفقیت اعمال شد', {
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

  const errorActiveOffNotify = () => {
    toast.error('تخفیف اعمال نشد', {
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

  const successRejectOffNotify = () => {
    toast.success('تخفیف با موفقیت رد شد', {
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

  const errorRejectOffNotify = () => {
    toast.error('تخفیف رد نشد', {
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
  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeActiveModal = () => setIsShowActiveModal(false)
  const closeRejectModal = () => setIsShowRejectModal(false)


  useEffect(() => {
    getAllOffs()
  }, [])

  function getAllOffs() {
    fetch('http://localhost:8080/api/offs')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAllOffs(data.reverse())
      })
      .catch(error => console.log(error))
  }


  const deleteOff = () => {
    fetch(`http://localhost:8080/api/offs/${maniOrderID}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          setIsShowDeleteModal(false)
          getAllOffs()
          successOffNotify()
        } else {
          setIsShowDeleteModal(false)
          errorOffNotify()
        }
      })
      .catch(error => {
        console.log(error);
        isShowDeleteModal(false)
        errorOffNotify()

      })
  }

  const activeOff = () => {
    fetch(`http://localhost:8080/api/offs/active/${maniOrderID}`, {
      method: "PUT"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllOffs()
          setIsShowActiveModal(false)
          successActiveOffNotify()
        } else {
          setIsShowActiveModal(false)
          errorActiveOffNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowActiveModal(false)
        errorActiveOffNotify()
      })
  }

  const rejectOff = () => {
    fetch(`http://localhost:8080/api/offs/reject/${maniOrderID}`, {
      method: "PUT"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllOffs()
          setIsShowRejectModal(false)
          successRejectOffNotify()
        } else {
          setIsShowRejectModal(false)
          errorRejectOffNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowRejectModal(false)
        errorRejectOffNotify()
      })
  }



  return (
    <div className="cms-main">
      <h1 className='cms-title'>لیست تخفیف ها</h1>
      {allOffs.length ? (
        <>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام ادمین</th>
                <th>محصول</th>
                <th>تاریخ</th>
                <th>کد تخفیف</th>
                <th>درصد تخفیف</th>
              </tr>
            </thead>
            <tbody>
              {allOffs && allOffs.map(order => (
                <tr>
                  <td>{order.adminID}</td>
                  <td>{order.productID}</td>
                  <td>{order.date}</td>
                  <td>{order.code}</td>
                  <td>% {order.percent}</td>
                  <td>
                    <button onClick={() => {
                      setMainOrderID(order.id)
                      setIsShowDeleteModal(true)
                    }}>حذف</button>


                    {order.isActive ? (
                      <button onClick={() => {
                        setMainOrderID(order.id)
                        setIsShowRejectModal(true)
                      }}>رد</button>
                    ) : (
                      <button onClick={() => {
                        setMainOrderID(order.id)
                        setIsShowActiveModal(true)
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
      ) : (<ErrorBox message="هیچ کدتخفیفی یافت نشد" />)}



      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف تخفیف اطمینان دارید ؟'
          submitAction={deleteOff}
          cancelAction={closeDeleteModal}
        />
      )}

      {isShowActiveModal && (
        <DeleteModal
          title='آیا از اعمال تخفیف اطمینان دارید ؟'
          submitAction={activeOff}
          cancelAction={closeActiveModal}
        />
      )}

      {isShowRejectModal && (
        <DeleteModal
          title='آیا از رد تخفیف اطمینان دارید ؟'
          submitAction={rejectOff}
          cancelAction={closeRejectModal}
        />
      )}

    </div>
  )
}
