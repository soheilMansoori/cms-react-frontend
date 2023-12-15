import React, { useEffect, useState } from 'react'
import './UsersPage.css'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import { ToastContainer, toast } from 'react-toastify'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'
import EditModal from '../../Components/EditModal/EditModal'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import DetailsModal from '../../Components/DetailsModal/DetailsModal'

export default function UsersPage() {
  const [allUsers, setAllUsers] = useState([])
  const [mainUserID, setManinUserID] = useState(null)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsshowEditModal] = useState(false)
  const [mainUserInfos, setMainUserInfos] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userUserName, setUserUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userScore, setUserScore] = useState('')
  const [userBuy, setUserBuy] = useState('')
  const [userAddress, setUserAddress] = useState('')

  // react Notifys
  const successDeleteUserNotify = () => {
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

  const errorDeleteUserNotify = () => {
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

  const successEditUserNotify = () => {
    toast.success('کاربر با موفقیت آپدیت شد', {
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

  const errorEditUserNotify = () => {
    toast.error('کاربر آپدیت نشد', {
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
  const closeEditModal = () => setIsshowEditModal(false)
  const closeDetailsModal = () => setIsShowDetailsModal(false)

  
  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAllUsers(data.reverse())
      })
      .catch(error => console.log(error))
  }

  const deleteUser = () => {
    fetch(`http://localhost:8080/api/users/${mainUserID}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllUsers()
          setIsShowDeleteModal(false)
          successDeleteUserNotify()
        } else {
          setIsShowDeleteModal(false)
          errorDeleteUserNotify()
        }
      }).catch(error => {
        console.log(error)
        setIsShowDeleteModal(false)
        errorDeleteUserNotify()
      })

  }

  const editUser = (event) => {
    event.preventDefault()
    let userNewInfos = {
      firstname: userFirstName,
      lastname: userLastName,
      username: userUserName,
      password: userPassword,
      email: userEmail,
      city: userCity,
      phone: userPhone,
      score: userScore,
      buy: userBuy,
      address: userAddress,
    }

    fetch(`http://localhost:8080/api/users/${mainUserID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userNewInfos),
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          getAllUsers()
          setIsshowEditModal(false)
          successEditUserNotify()
        } else {
          setIsshowEditModal(false)
          errorEditUserNotify()
        }
      })
      .catch(error => {
        console.log(error)
        setIsshowEditModal(false)
        errorEditUserNotify()
      })
  }

  return (
    <div className="cms-main">
      <h1 className='cms-title'>لیست کاربران</h1>
      {allUsers.length ? (
        <>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            {allUsers && allUsers.map(user => (
              <tr key={user.id}>
                <td>{user.firstname} , {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => {
                    setManinUserID(user.id)
                    setIsShowDeleteModal(true)
                  }}>حذف</button>
                  <button onClick={() => {
                    setIsShowDetailsModal(true)
                    setMainUserInfos(user)
                  }}>جزییات</button>
                  <button onClick={() => {
                    setIsshowEditModal(true)
                    setManinUserID(user.id)
                    setUserFirstName(user.firstname)
                    setUserLastName(user.lastname)
                    setUserUserName(user.username)
                    setUserPassword(user.password)
                    setUserEmail(user.email)
                    setUserCity(user.city)
                    setUserPhone(user.phone)
                    setUserScore(user.score)
                    setUserBuy(user.buy)
                    setUserAddress(user.address)
                  }}>ویرایش</button>
                </td>
              </tr>

            ))}

            <tbody>

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
        <ErrorBox message="هیچ کاربری یافت نشد" />
      )
      }


      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف کاربر اطمینان دارید ؟'
          cancelAction={closeDeleteModal}
          submitAction={deleteUser}
        />
      )}

      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={editUser}>

          <>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userFirstName}
                onChange={(event) => setUserFirstName(event.target.value)}
                className='edit-user-info-input' placeholder='نام' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userLastName}
                onChange={(event) => setUserLastName(event.target.value)}
                className='edit-user-info-input' placeholder='نام خانوادگی' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userUserName}
                onChange={(event) => setUserUserName(event.target.value)}
                className='edit-user-info-input' placeholder='نام کاربری' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
                className='edit-user-info-input' placeholder='رمز عبور' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                className='edit-user-info-input' placeholder='ایمیل' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userPhone}
                onChange={(event) => setUserPhone(event.target.value)}
                className='edit-user-info-input' placeholder='شماره تماس' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <textarea type="text"
                value={userAddress}
                onChange={(event) => setUserAddress(event.target.value)}
                className='edit-user-info-input' placeholder='آدرس'>
              </textarea>
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userScore}
                onChange={(event) => setUserScore(event.target.value)}
                className='edit-user-info-input' placeholder='امتیاز' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userBuy}
                onChange={(event) => setUserBuy(event.target.value)}
                className='edit-user-info-input' placeholder='خرید' />
            </div>
            <div className='edit-user-ifno-input-group'>
              <span>
                <AiOutlineDollarCircle />
              </span>
              <input type="text"
                value={userCity}
                onChange={(event) => setUserCity(event.target.value)}
                className='edit-user-info-input' placeholder='شهر' />
            </div>
          </>
        </EditModal>
      )}

      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>تعداد خرید</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>{mainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  )
}
