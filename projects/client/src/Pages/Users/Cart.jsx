import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useToastHook } from "../../Components/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItemComponent from "../../Components/Users/CartItem";
import NavbarComponent from "../../Components/Users/Navbar";
import { getCartAction } from "../../Redux/Actions/cartActions";
import { API_URL } from "../../helper";
// import CheckoutPage from "./Checkout";
import {
    Box,
    Divider,
    Center,
    Text,
    Button,
} from "@chakra-ui/react";

const CartPage = (props) => {

    //* assign function
    const navigate = useNavigate();
    const [currentToast, newToast] = useToastHook();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartAction());

        // handleToParentSubTotalAllCartItems();
    }, [])

    //^ STATE MANAGEMENT
    const [subTotalAllCartItems, setSubTotalAllCartItems] = useState(0);
    const [arrayIdCart, setArrayIdCart] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const { databaseCart } = useSelector((state) => {
        return {
            databaseCart: state.cartReducers.cart.filter(val=>val.isActive=="true"),
        }
    })

    //^ check isi databaseCart
    console.log(`databaseCart`, databaseCart);

    //! bisa didelete krn sudah diganti dr reducer
    const [dbCart, setDbCart] = useState([
        {
            idCart: 1,
            idStock: 15,
            idUser: 6,
            productName: "Derma AnGel Acne Patch Day",
            productPicture: "https://d2qjkwm11akmwu.cloudfront.net/products/887201_27-6-2022_14-36-43.webp",
            cartQuantity: 2,
            stockType: "dus",
            priceSale: 16500,
            subTotal: 33000,
            isActive: "true"
        },
        {
            idCart: 2,
            idStock: 7,
            idUser: 6,
            productName: "Enervon-C",
            productPicture: "https://d2qjkwm11akmwu.cloudfront.net/products/263731_19-5-2022_13-22-8.png",
            cartQuantity: 1,
            stockType: "saset",
            priceSale: 35000,
            subTotal: 35000,
            isActive: "true"
        },
        {
            idCart: 3,
            idStock: 3,
            idUser: 7,
            productName: "Decolgen",
            productPicture: "https://d2qjkwm11akmwu.cloudfront.net/products/49b5c4d0-85c9-4dc0-b1e2-96574c106cd9_product_image_url.webp",
            cartQuantity: 1,
            stockType: "saset",
            priceSale: 2300,
            subTotal: 2300,
            isActive: "true"
        }
    ]);

    const handleCallbackToChild = (subTotalData = 0, selectedIdCart) => {
        setSubTotalAllCartItems(subTotalData);
        setArrayIdCart(selectedIdCart);
    };

    console.log(`arrayIdCart cartPage ${arrayIdCart}`);
    console.log(`typeof arrayIdCart di cartPage ${typeof (arrayIdCart)}`);

    // const handleToParentSubTotalAllCartItems = () => {
    //     let temp = 0
    //     dbCart.map((value, index) => {
    //         temp += value.subTotal
    //     });
    //     console.log(temp)
    //     setSubTotalAllCartItems(temp);
    // }

    const btnCheckout = () => {
        setLoadingStatus(true);
        //idCart yang terselect, isActive diubah jd false, subTotal dijumlah semua
        console.log(`subTotal ${subTotalAllCartItems}`);
        console.log(`arrayIdCart onCLick btnCheckout ${arrayIdCart}`);

        if (arrayIdCart.length == 0) {
            console.log(`arrayIdCart ${arrayIdCart}`);

            setLoadingStatus(false);
            newToast({
                title: `Informasi Tidak Lengkap`,
                description: "Pilih dahulu item keranjang sebelum melakukan checkout",
                status: 'error'
            })
        } else {

            console.log(`arrayIdCart onClick btnCheckout`, arrayIdCart);

            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`btnCheckout tokenIdUser`, token);

            if (token) {
                Axios.post(`${API_URL}/cart/checkout`, {
                    arrayIdCart
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    console.log("isi res.data pas checkout", res.data);
                    dispatch(getCartAction());
                    navigate("/checkout", { state: arrayIdCart });
                    setLoadingStatus(false);
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    return (
        <>
            <Box boxShadow='md'>
                <NavbarComponent />
            </Box>
            <div className="container py-3">
                <Text
                    className="h3"
                    py={{ base: 0, md: 2 }}
                >
                    Keranjang
                </Text>

                <div className="row mx-auto">
                    <div
                        className="pt-2 border-0 rounded-2 shadow-sm col-12 col-xl-9 order-1"
                    >

                        <CartItemComponent
                            dbCart={databaseCart}
                            handleCallback={handleCallbackToChild}
                        />

                    </div>

                    <div
                        className="pt-2 border-0 rounded-2 shadow-sm col-12 col-xl-3 order-2"
                    >
                        <Center
                            pt={3}
                        >
                            <Button
                                className="btn-def"
                                width={250}
                                onClick={() => navigate("/productList")}
                            >
                                Tambah Produk Lainnya
                            </Button>
                        </Center>

                        <Divider
                            className="py-2"
                            variant="dashed"
                        />

                        <div
                            className="col-12 d-flex align-items-center justify-content-between py-3"
                        >

                            <Text className="font-brand" as='b'>
                                Sub Total
                            </Text>

                            <Text className="font-brand" as='b'>
                                Rp {subTotalAllCartItems.toLocaleString()}
                            </Text>

                        </div>

                        <Center
                            py={3}
                        >
                            <Button
                                className="btn-def_second"
                                width={250}
                                onClick={btnCheckout}
                                isLoading={loadingStatus}
                                loadingText=""
                            >
                                Checkout Keranjang
                            </Button>
                        </Center>

                    </div>
                </div>


            </div>
        </>
    )

}

export default CartPage;