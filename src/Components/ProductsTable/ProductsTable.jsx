import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from './../EditModal/EditModal'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import ErrorBox from '../ErrorBox/ErrorBox'
export default function ProductsTable({ getAllProducts, products }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productID, setProductID] = useState(null)
  const [mainProductInfo, setMainProductInfo] = useState(null)
  const [productNewTitle, setProductNewTitle] = useState(null)
  const [productNewPrice, setProductNewPrice] = useState(null)
  const [productNewPopularity, setProductNewPopularity] = useState(null)
  const [productNewSale, setProductNewSale] = useState(null)
  const [productNewColors, setProductNewColors] = useState(null)
  const [productNewCount, setProductNewCount] = useState(null)
  const [productNewImg, setProductNewImg] = useState(null)

  // react Notifys
  const successDeleteNotify = () => {
    toast.success('حذف با موفقیت انجام شد', {
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
  const errorDeleteProductNotify = () => {
    toast.error('محصول حذف نشد', {
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
  const successEditProductNotify = () => {
    toast.success('محصول با موفقیت آپدیت شد', {
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
  const errorEditProductNotify = () => {
    toast.error('محصول آپدیت نشد', {
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





  useEffect(() => {
    getAllProducts()
  }, [])

  const deleteModalCancelAction = () => setIsShowDeleteModal(false)
  const closeDetailsmodal = () => setIsShowDetailsModal(false)


  const updateProductInfos = (event) => {
    event.preventDefault()
    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    }

    fetch(`http://localhost:8080/api/products/${productID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productsNewInfos)
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          getAllProducts()
          setIsShowEditModal(false)
          successEditProductNotify()
        } else {
          setIsShowEditModal(false)
          errorEditProductNotify()
        }
      })
      .catch(error => {
        console.log(error)
        setIsShowEditModal(false)
        errorEditProductNotify()
      })

  }

  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8080/api/products/${productID}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          successDeleteNotify()
          getAllProducts()
          setIsShowDeleteModal(false);
        } else {
          setIsShowDeleteModal(false);
          errorDeleteProductNotify()
        }
      })
      .catch(error => {
        console.log(error)
        setIsShowDeleteModal(false);
        errorDeleteProductNotify()
      })
  };




  return (
    <>
      {products.length ? (
        <>
          <table className="products-table">
            <thead>
              <tr className="products-table-heading-tr">
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map(product => (
                <tr className="products-table-tr" key={product.id}>
                  <td>
                    <img
                      src={product.img}
                      alt="oil image"
                      className="products-table-img"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price.toLocaleString()}$</td>
                  <td>{product.count}</td>
                  <td>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDetailsModal(true)
                        setMainProductInfo(product)
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDeleteModal(true)
                        setProductID(product.id)
                      }}
                    >
                      حذف
                    </button>
                    <button className="products-table-btn"
                      onClick={() => {
                        setProductID(product.id)
                        setProductNewTitle(product.title)
                        setProductNewPrice(product.price)
                        setProductNewPopularity(product.popularity)
                        setProductNewSale(product.sale)
                        setProductNewColors(product.colors)
                        setProductNewCount(product.count)
                        setProductNewImg(product.img)
                        setIsShowEditModal(true)
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* notif */}
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
        <ErrorBox message='هیچ محصولی یافت نشد' />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف اطمینان دارید؟'
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}

      {isShowDetailsModal && <DetailsModal onHide={closeDetailsmodal}>
        <table className="cms-table">
          <thead>
            <tr>
              <th>محبوبیت</th>
              <th>فروش</th>
              <th>رنگ بندی</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{mainProductInfo.popularity}%</td>
              <td>{mainProductInfo.sale.toLocaleString()}</td>
              <td>{mainProductInfo.colors}</td>
            </tr>
          </tbody>
        </table>
      </DetailsModal>}

      {isShowEditModal && <EditModal
        onClose={() => {
          setIsShowEditModal(false)
        }}
        onSubmit={updateProductInfos}
      >

        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewTitle}
            onChange={(event) => setProductNewTitle(event.target.value)}
            placeholder="عنوان محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewPrice}
            onChange={(event) => setProductNewPrice(event.target.value)}
            placeholder="مبلغ محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewPopularity}
            onChange={(event) => setProductNewPopularity(event.target.value)}
            placeholder="میزان محبوبیت محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewSale}
            onChange={(event) => setProductNewSale(event.target.value)}
            placeholder="میزان فروش محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewColors}
            onChange={(event) => setProductNewColors(event.target.value)}
            placeholder="میزان رنگ بندی محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewCount}
            onChange={(event) => setProductNewCount(event.target.value)}
            placeholder="تعداد محصول را وارد کنید" className="edit-product-input" />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text"
            value={productNewImg}
            onChange={(event) => setProductNewImg(event.target.value)}
            placeholder="آدرس عکس محصول" className="edit-product-input" />
        </div>

      </EditModal>}
    </>
  );
}