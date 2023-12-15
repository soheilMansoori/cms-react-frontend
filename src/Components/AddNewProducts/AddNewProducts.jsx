import React, { useState } from 'react'
import './AddNewProducts.css'
import { ToastContainer, toast } from 'react-toastify';

export default function AddNewProduct({ getAllProducts }) {
    const [newProductTitle, setNewProductTitle] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [newProductCount, setNewProductCount] = useState('')
    const [newProductImg, setNewProductImg] = useState('')
    const [newProductPopularity, setNewProductPopularity] = useState('')
    const [newProductSale, setNewProductSale] = useState('')
    const [newProductColors, setNewProductColors] = useState('')

    // react Notifys
    const successAddNewProductNotify = () => {
        toast.success('محصول با موفقعیت اضافه شد', {
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
    const errorAddNewProductsNotify = () => {
        toast.error('محصول اضافه نشد !!!', {
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



    const addNewProduct = async (event) => {
        event.preventDefault()

        const newProductsInfos = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors
        }

        console.log(newProductsInfos);

        await fetch("http://localhost:8080/api/products/new-product", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductsInfos)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    successAddNewProductNotify()
                    getAllProducts()
                } else {
                    errorAddNewProductsNotify()
                }
            }).catch(error => {
                console.log(error.message)
                errorAddNewProductsNotify()
            })
        emptyAllInputs()
    }

    function emptyAllInputs() {
        setNewProductTitle('')
        setNewProductPrice('')
        setNewProductCount('')
        setNewProductImg('')
        setNewProductPopularity('')
        setNewProductSale('')
        setNewProductColors('')
    }

    return (
        <>
            <div className='products-main'>
                <h1 className='products-title'>افزودن محصول جدید</h1>

                <form action="#" className='add-products-form' onSubmit={addNewProduct}>
                    <div className='add-products-form-wrap'>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='اسم محصول را بنویسید' className='add-products-input' value={newProductTitle} onChange={(event) => setNewProductTitle(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='قیمت محصول را بنویسید' className='add-products-input' value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='موجودی محصول را بنویسید' className='add-products-input' value={newProductCount} onChange={(event) => setNewProductCount(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='آدرس عکس محصول را بنویسید' className='add-products-input' value={newProductImg} onChange={(event) => setNewProductImg(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='میزان محبوبیت محصول را بنویسید' className='add-products-input' value={newProductPopularity} onChange={(event) => setNewProductPopularity(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='میزان فروش محصول را بنویسید' className='add-products-input' value={newProductSale} onChange={(event) => setNewProductSale(event.target.value)} />
                        </div>
                        <div className='add-products-form-group'>
                            <input type="text" placeholder='تعداد رنگ بندی محصول را بنویسید' className='add-products-input' value={newProductColors} onChange={(event) => setNewProductColors(event.target.value)} />
                        </div>
                    </div>
                    <button className='add-products-submit' type='submit'>ثبت محصول</button>
                </form>
            </div>
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
    )
}