import React from 'react'
import { PoweroffOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Space, Tooltip, Button, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';



const Header = () => {

    const navigate = useNavigate();

    const loginUserData = useSelector((state) => state)
    const cartProducts = useSelector((state) => state.CartProduct.cartProduct)
    // console.log('cartProducts', loginUserData.loginUserData.loginUser[0].fname)

    // let q = JSON.parse(localStorage.getItem('token'))[0].cartProducts
    // console.log('-->',q)


    return (
        <div className='headerStyle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', backgroundColor: 'whitesmoke', height: '80px' }}>
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <Space size={20}>
                    <h2 style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>Hii... {loginUserData.loginUserData.loginUser[0].fname} </h2>
                    {
                        Object.keys(cartProducts).length === 0
                            ? (
                                <Tooltip title="Buy Now" color='gold'>
                                    <Button type="primary" icon={<ShoppingCartOutlined />}
                                        onClick={() => {
                                            navigate('/productcart')
                                            window.location.reload();
                                        }}
                                    />
                                </Tooltip>
                            ) : (
                                <Badge count={(cartProducts).length}>
                                    <Tooltip title="Buy Now" color='gold'>
                                        <Button type="primary" icon={<ShoppingCartOutlined />}
                                            onClick={() => {
                                                navigate('/productcart')
                                            }}
                                        />
                                    </Tooltip>
                                </Badge>

                            )
                    }
                    <Tooltip title="Logout" color='gold'>
                        <Button type="primary" icon={<PoweroffOutlined
                            onClick={() => {

                                const tokenData = JSON.parse(localStorage.getItem('token'))
                                console.log('tokenData', tokenData)

                                const checkTokenData = JSON.parse(localStorage.getItem('userRecord'))
                                console.log('checkTokenData', checkTokenData)

                                const findToken = checkTokenData.map((e) => {
                                    return e.email === tokenData[0].email && e.password === tokenData[0].password ? { ...e, cartProducts } : e

                                })
                                console.log('findToken', findToken)
                                localStorage.setItem('userRecord', JSON.stringify(findToken))

                                localStorage.removeItem('token')
                                localStorage.removeItem('BuyCartProduct')
                                navigate('/')
                            }}
                        />} />
                    </Tooltip>
                </Space>
            </div>
        </div>
    )
}

export default Header
