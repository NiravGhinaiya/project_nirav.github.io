import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Header from "./Header";
import './cart.css'
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeAddProduct, selectProductRemove, byuNowProduct } from '../actions/actions'
import ArrowAnimation from "./ArrowAnimation";
import { Modal } from "antd";



const Cart = () => {
    const cartProducts = useSelector((state) => state.CartProduct.cartProduct)
    const dispatch = useDispatch()
    // console.log('cartProducts---', cartProducts)

    const [shipping, setShipping] = useState(5)
    const [open, setOpen] = useState(false);

    let Total = 0;

    let placeOrderData = JSON.parse(localStorage.getItem('token'))[0]

    // console.log('--->', JSON.parse(localStorage.getItem('token'))[0].fname)

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "rgb(20 20 20 / 12%)", }}>
            <Header />
            <MDBContainer className="py-3 h-100">
                <MDBRow className="justify-content-center align-items-center h-90 my-5">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                    Shopping Cart
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted">
                                                    {(JSON.parse(localStorage.getItem('token'))[0].fname).toUpperCase()}
                                                </MDBTypography>
                                            </div>

                                            <hr className="my-4" />
                                            {
                                                cartProducts.map((data, index) => {
                                                    let num1 = data.quantity * data.price
                                                    let num2 = Total
                                                    Total = Math.round(num1 + num2)
                                                    return (
                                                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center" key={data.id}>

                                                            <MDBCol md="2" lg="2" xl="2" className='img-container'  >
                                                                <MDBCardImage
                                                                    src={data.image}
                                                                    fluid className="rounded-3" alt="Cotton T-shirt" />
                                                            </MDBCol>

                                                            <MDBCol md="3" lg="3" xl="3">
                                                                <MDBTypography tag="h6" className="text-muted">
                                                                    {data.category}
                                                                </MDBTypography>
                                                                <MDBTypography tag="h6" className="text-black mb-0">
                                                                    {data.title.substr(0, 20)}...
                                                                </MDBTypography>
                                                            </MDBCol>

                                                            <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                                {data.quantity <= 1 ?
                                                                    <MDBBtn color="link" className="px-2" onClick={() => dispatch(removeAddProduct(data))}>
                                                                        <MDBIcon fas icon="trash" />
                                                                    </MDBBtn>
                                                                    :
                                                                    <MDBBtn color="link" className="px-2" onClick={() => dispatch(removeAddProduct(data))}>
                                                                        <MDBIcon fas icon="minus" />
                                                                    </MDBBtn>
                                                                }
                                                                <MDBInput type="number" min="0" max="9" value={data.quantity} size="sm" />

                                                                <MDBBtn color="link" className="px-2" onClick={() => dispatch(selectedProduct(data))} >
                                                                    <MDBIcon fas icon="plus" />
                                                                </MDBBtn>
                                                            </MDBCol>

                                                            <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                                <MDBTypography tag="h6" className="mb-0">
                                                                    $ {Math.round(data.quantity * data.price)}
                                                                </MDBTypography>
                                                            </MDBCol>

                                                            <MDBCol md="1" lg="1" xl="1" className="text-end" >
                                                                <MDBBtn className="text-dark bg-body btn-outline-danger" onClick={() => dispatch(selectProductRemove(data.id))} >
                                                                    <MDBIcon fas icon="times" />
                                                                </MDBBtn>
                                                            </MDBCol>

                                                            <hr className="my-4" />
                                                        </MDBRow>
                                                    )
                                                })
                                            }

                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="/Home" className="text-body">
                                                        <span> <ArrowAnimation /></span> <span style={{ position: 'relative', left: '50px', top: '4px', }} > Back to shop</span>
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>

                                    </MDBCol>
                                    <MDBCol lg="4" className="bg-grey">
                                        <div className="p-5">
                                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </MDBTypography>

                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-4">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Cart
                                                </MDBTypography>
                                                <MDBTypography tag="h5">$ {Total}</MDBTypography>
                                            </div>
                                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                Shipping
                                            </MDBTypography>
                                            <div className="mb-4 pb-2">
                                                <select className="select p-2 rounded bg-grey" style={{ width: "100%" }} onChange={(e) => setShipping(e.target.value)}>
                                                    <option value="5">Standard-Delivery - $5.00</option>
                                                    <option value="10">First-Deliver - $10.00</option>
                                                    <option value="20">Super-First-Deliver - $20.00</option>
                                                </select>
                                            </div>

                                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                Give code
                                            </MDBTypography>

                                            <div className="mb-5">
                                                <MDBInput size="lg" label="Enter your code" />
                                            </div>

                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography tag="h5">$ {parseInt(Total) + Number(shipping)}</MDBTypography>
                                            </div>

                                            <MDBBtn color="dark" block size="lg" onClick={() => setOpen(true)} >
                                                place order
                                            </MDBBtn>
                                            <Modal centered width={500} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} >
                                                <div style={{ padding: '10px' }}>
                                                    <h2 style={{ textTransform: 'capitalize' }}>{placeOrderData.fname} {placeOrderData.lname}</h2>
                                                    <p><strong>Email :</strong> {placeOrderData.email}</p>
                                                    <textarea placeholder="Enter Addres ..." style={{ padding: '10px' }} cols='50' rows='3' />
                                                    <p><strong>Mobile no :</strong>&nbsp;&nbsp; <input type='number' style={{ border: '0', borderBottom: '1px solid' }} /></p>
                                                    <p><strong>Total Prise :</strong> $ {parseInt(Total) + Number(shipping)}</p>
                                                </div>
                                            </Modal>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default Cart