import React, { useEffect, useState } from 'react'
import './OrdersPage.css'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import { ToastContainer, toast } from 'react-toastify'
import DetailsModal from '../../Components/DetailsModal/DetailsModal'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'

export default function OrdersPage() {
  const [allOrders, setAllOrders] = useState([])
  const [mainOrder, setMainOrder] = useState(null)
  const [mainOrderID, setMainOrderID] = useState(null)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowActiveModal, setIsShowActiveModal] = useState(false)
  const [isShowRejectModal, setIsShowRejectModal] = useState(false)

  // react Notifys
  const successDeleteOrderNotify = () => {
    toast.success('سفارش با موفقیت حذف شد', {
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

  const errorDeleteOrderNotify = () => {
    toast.error('سفارش حذف نشد', {
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

  const successActiveOrderNotify = () => {
    toast.success('سفارش با موفقیت فعال شد', {
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

  const errorActiveOrderNotify = () => {
    toast.error('سفارش فعال نشد', {
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

  const successRejectOrderNotify = () => {
    toast.success('سفارش با موفقیت رد شد', {
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

  const errorRejectOrderNotify = () => {
    toast.error('سفارش رد نشد', {
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
  const closeDetailsModal = () => setIsShowDetailsModal(false)
  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeActiveModal = () => setIsShowActiveModal(false)
  const closeRejectModal = () => setIsShowRejectModal(false)

  useEffect(() => {
    getAllOrders()
  }, [])

  function getAllOrders() {
    fetch('http://localhost:8080/api/orders')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAllOrders(data.reverse())
      })
      .catch(error => console.log(error))
  }

  const deleteOrder = () => {
    fetch(`http://localhost:8080/api/orders/${mainOrderID}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          getAllOrders()
          setIsShowDeleteModal(false)
          successDeleteOrderNotify()
        } else {
          setIsShowDeleteModal(false)
          errorDeleteOrderNotify()
        }
      })
      .catch(error => {
        console.log(error)
        setIsShowDeleteModal(false)
        errorDeleteOrderNotify()
      })

  }

  const activeOrder = () => {
    console.log('order active')
    fetch(`http://localhost:8080/api/orders/active/${mainOrderID}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          getAllOrders()
          setIsShowActiveModal(false)
          successActiveOrderNotify()
        } else {
          setIsShowActiveModal(false)
          errorActiveOrderNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowActiveModal(false)
        errorActiveOrderNotify()
      })
  }

  const rejectOrder = () => {
    console.log('oder reject')
    fetch(`http://localhost:8080/api/orders/reject/${mainOrderID}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          getAllOrders()
          setIsShowRejectModal(false)
          successRejectOrderNotify()
        } else {
          setIsShowRejectModal(false)
          errorRejectOrderNotify()
        }
      })
      .catch(error => {
        console.log(error);
        setIsShowRejectModal(false)
        errorRejectOrderNotify()
      })
  }


  return (
    <div className="cms-main">
      <h1 className='cms-title'>لیست سفارش ها</h1>
      {allOrders.length ? (
        <>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام خریدار</th>
                <th>نام محصول</th>
                <th>قیمت محصول</th>
                <th>روز خرید</th>
                <th>تخفیف</th>
              </tr>
            </thead>
            <tbody>
              {allOrders && allOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.userID}</td>
                  <td>{order.productID}</td>
                  <td>{order.price}</td>
                  <td>{order.date}</td>
                  <td>% {order.off}</td>
                  <td>

                    <button onClick={() => {
                      setIsShowDeleteModal(true)
                      setMainOrderID(order.id)
                    }}>حذف</button>

                    <button onClick={() => {
                      setMainOrder(order)
                      setIsShowDetailsModal(true)
                    }}>جزییات</button>

                    {order.isActive ? (
                      <button onClick={() => {
                        setIsShowRejectModal(true)
                        setMainOrderID(order.id)
                      }}>رد سفارش</button>
                    ) : (
                      <button onClick={() => {
                        setIsShowActiveModal(true)
                        setMainOrderID(order.id)
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
      ) : (<ErrorBox message="هیچ سفارشی یافت نشد" />)}


      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>تعداد</th>
                <th>ساعت سفارش</th>
                <th>محبوبیت</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainOrder.count}</td>
                <td>{mainOrder.hour}</td>
                <td>{mainOrder.popularity}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف سفارش اطمینان دارید ؟'
          submitAction={deleteOrder}
          cancelAction={closeDeleteModal}
        />
      )}

      {isShowActiveModal && (
        <DeleteModal
          title='آیا از تایید سفارش اطمینان دارید ؟'
          submitAction={activeOrder}
          cancelAction={closeActiveModal}
        />
      )}

      {isShowRejectModal && (
        <DeleteModal
          title='آیا از رد سفارش اطمینان دارید ؟'
          submitAction={rejectOrder}
          cancelAction={closeRejectModal}
        />
      )}

    </div>
  )
}
