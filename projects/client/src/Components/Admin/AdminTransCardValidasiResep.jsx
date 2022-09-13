import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
// import NavbarComponent from "./Navbar";
import { useToastHook } from "../CustomToast";
import { API_URL, BE_URL } from "../../helper";
import {
    Box,
    Flex,
    Divider,
    VStack,
    Center,
    Stack,
    Image,
    Text,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";

const AdminTransCardValidasiResepComponent = (props) => {
    const navigate = useNavigate();
    //TODO axios get seluruh transaksi yang prescriptionnya ga null dan berstatus Menunggu Diproses Penjual
    //^ seluruh transaksi user yg login
    const [dbTransaksi] = useState([
        {
            idTransaction: 1,
            purchasedProducts: [
                {
                    idTransactionDetail: 1,
                    productName: 'Derma AnGel Acne Patch Day',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/887201_27-6-2022_14-36-43.webp',
                    stockType: 'dus',
                    purchaseQuantity: 2,
                    priceSale: 16500,
                    subTotal: 33000
                }
            ],
            totalSale: 33000,
            prescription: null,
            transactionStatus: 'Pesanan Dikonfirmasi',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220315/STN/00001',
            addDate: '2022-03-15 16:15:00',
            freightCost: 10000,
            totalPayment: 43000,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 2,
            purchasedProducts: [
                {
                    idTransactionDetail: 2,
                    productName: 'Decolgen',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/49b5c4d0-85c9-4dc0-b1e2-96574c106cd9_product_image_url.webp',
                    stockType: 'saset',
                    purchaseQuantity: 1,
                    priceSale: 2300,
                    subTotal: 2300
                }
            ],
            totalSale: 2300,
            prescription: null,
            transactionStatus: 'Menunggu Pembayaran',
            transferReceipt: null,
            invoiceNumber: 'INV/20220315/STN/00002',
            addDate: '2022-03-15 19:05:00',
            freightCost: 10000,
            totalPayment: 12300,
            recereceiverName: 'Aditya Dimas',
            receiverAddress: 'Jl. Dimas',
            receiverPhone: '081287907001',
            postalCode: '77777'
        },
        {
            idTransaction: 3,
            purchasedProducts: [
                {
                    idTransactionDetail: 3,
                    productName: 'Renovit',
                    productPicture: 'https://cf.shopee.co.id/file/bdb49a41e77413654fe1d71bb8ddc46a',
                    stockType: 'saset',
                    purchaseQuantity: 5,
                    priceSale: 15000,
                    subTotal: 75000,
                }
            ],
            totalSale: 75000,
            prescription: null,
            transactionStatus: 'Menunggu Konfirmasi',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220304/STN/00001',
            addDate: '2022-03-04 21:10:00',
            freightCost: 10000,
            totalPayment: 85000,
            recereceiverName: 'Aditya Dimas',
            receiverAddress: 'Jl. Dimas',
            receiverPhone: '081287907001',
            postalCode: '77777'
        },
        {
            idTransaction: 4,
            purchasedProducts: [
                {
                    idTransactionDetail: 4,
                    productName: 'Decolgen',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/49b5c4d0-85c9-4dc0-b1e2-96574c106cd9_product_image_url.webp',
                    stockType: 'saset',
                    purchaseQuantity: 1,
                    priceSale: 2300,
                    subTotal: 2300,
                }
            ],
            totalSale: 2300,
            prescription: null,
            transactionStatus: 'Dikirim',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220304/STN/00001',
            addDate: '2022-03-05 10:05:00',
            freightCost: 10000,
            totalPayment: 12300,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 5,
            purchasedProducts: [
                {
                    idTransactionDetail: 5,
                    productName: 'Renovit',
                    productPicture: 'https://cf.shopee.co.id/file/bdb49a41e77413654fe1d71bb8ddc46a',
                    stockType: 'tablet',
                    purchaseQuantity: 5,
                    priceSale: 3000,
                    subTotal: 15000,
                },
                {
                    idTransactionDetail: 6,
                    productName: 'Labore Sensitive Skin Care Biomerepair Barrier Revive Cream',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/316515_1-8-2022_9-42-58.webp',
                    stockType: 'ml',
                    purchaseQuantity: 10,
                    priceSale: 3000,
                    subTotal: 30000,
                }
            ],
            totalSale: 45000,
            prescription: 'https://assets.kompasiana.com/items/album/2016/10/20/2016-10-20-21-00-22-pengantar-ilmu-farmasi-kedokteran-1-pdf-5808c571c823bd662a834f19.png?t=t&v=260',
            transactionStatus: 'Pesanan Dikonfirmasi',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220410/RCK/00001',
            addDate: '2022-04-10 10:00:00',
            freightCost: 10000,
            totalPayment: 55000,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 6,
            purchasedProducts: [
                {
                    idTransactionDetail: 7,
                    productName: '',
                    productPicture: '',
                    stockType: '',
                    purchaseQuantity: 0,
                    priceSale: 0,
                    subTotal: 0
                }
            ],
            totalSale: 0,
            prescription: 'https://assets.kompasiana.com/items/album/2016/10/20/2016-10-20-21-00-22-pengantar-ilmu-farmasi-kedokteran-1-pdf-5808c571c823bd662a834f19.png?t=t&v=260',
            transactionStatus: 'Menunggu Diproses Penjual',
            transferReceipt: null,
            invoiceNumber: 'INV/20220411/RCK/00001',
            addDate: '2022-04-11 10:00:00',
            freightCost: 10000,
            totalPayment: 10000,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 7,
            purchasedProducts: [
                {
                    idTransactionDetail: 8,
                    productName: 'Renovit',
                    productPicture: 'https://cf.shopee.co.id/file/bdb49a41e77413654fe1d71bb8ddc46a',
                    stockType: 'tablet',
                    purchaseQuantity: 5,
                    priceSale: 3000,
                    subTotal: 15000
                }
            ],
            totalSale: 15000,
            prescription: 'https://assets.kompasiana.com/items/album/2016/10/20/2016-10-20-21-00-22-pengantar-ilmu-farmasi-kedokteran-1-pdf-5808c571c823bd662a834f19.png?t=t&v=260',
            transactionStatus: 'Diproses',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220411/RCK/00002',
            addDate: '2022-04-11 9:00:00',
            freightCost: 10000,
            totalPayment: 25000,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 8,
            purchasedProducts: [
                {
                    idTransactionDetail: 9,
                    productName: 'Renovit',
                    productPicture: 'https://cf.shopee.co.id/file/bdb49a41e77413654fe1d71bb8ddc46a',
                    stockType: 'tablet',
                    purchaseQuantity: 5,
                    priceSale: 3000,
                    subTotal: 15000
                }
            ],
            totalSale: 15000,
            prescription: 'https://assets.kompasiana.com/items/album/2016/10/20/2016-10-20-21-00-22-pengantar-ilmu-farmasi-kedokteran-1-pdf-5808c571c823bd662a834f19.png?t=t&v=260',
            transactionStatus: 'Dibatalkan',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220411/RCK/00002',
            addDate: '2022-04-11 9:00:00',
            freightCost: 10000,
            totalPayment: 25000,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        },
        {
            idTransaction: 9,
            purchasedProducts: [
                {
                    idTransactionDetail: 10,
                    productName: 'Derma AnGel Acne Patch Day',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/887201_27-6-2022_14-36-43.webp',
                    stockType: 'dus',
                    purchaseQuantity: 2,
                    priceSale: 16500,
                    subTotal: 33000
                },
                {
                    idTransactionDetail: 11,
                    productName: 'Enervon-C',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/263731_19-5-2022_13-22-8.png',
                    stockType: 'saset',
                    purchaseQuantity: 1,
                    priceSale: 35000,
                    subTotal: 35000
                }
            ],
            totalSale: 68000,
            prescription: null,
            transactionStatus: 'Menunggu Pembayaran',
            transferReceipt: null,
            invoiceNumber: 'INV/20220817/STN/00001',
            addDate: '2022-08-17 11:00:00',
            freightCost: 10000,
            totalPayment: 78000,
            recereceiverName: 'Aditya Dimas',
            receiverAddress: 'Jl. Dimas',
            receiverPhone: '081287907001',
            postalCode: '77777'
        }
    ]);

    const printProdukResep = () => {
        if (props.dbValidasiResep.length > 0) {
            return props.dbValidasiResep.map((value, index) => {
                if (value.prescription != null && value.transactionStatus == "Menunggu Diproses Penjual") {
                    return (
                        <div className="col-md-10">
                            <Box>
                                <div>
                                    <Text className="h6b">
                                        Paracetamol
                                    </Text>
                                </div>
                                <div>
                                    <Box
                                        display='flex'
                                        flexDirection={{ base: 'column', md: 'row' }}
                                        alignItems={{ base: 'start', md: 'center' }}
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={3}
                                    >
                                        <Text className="h6">
                                            10 Kapsul x Rp 1.300
                                        </Text>
                                        <Text
                                            className="h6"
                                        // as='b'
                                        // textColor='var(--colorSix)'
                                        >
                                            Rp 13.000
                                        </Text>
                                    </Box>
                                </div>
                            </Box>
                        </div>
                    )
                }
            }
            )
        }
    }

    //! pending list product dr hasil konversi / validasi resep
    //! pending handling subtotal
    const printSemuaTransaksi = () => {
        if (props.dbValidasiResep.length > 0) {
            console.log(`isi props.dbValidasiResep`, props.dbValidasiResep)
            return props.dbValidasiResep.map((value, index) => {
                if (value.prescription != null && value.transactionStatus == "Menunggu Diproses Penjual") {
                    return (
                        <div
                            className="card mb-2" key={value.idTransaction}
                        >
                            <div className="card-body">
                                <Box
                                    display='flex'
                                    flexDirection={{ base: 'column', md: 'row' }}
                                    alignItems={{ base: 'start', md: 'center' }}
                                    justifyContent='space-between'
                                    className="font-brand"
                                    as='b'
                                    pb={3}
                                >
                                    <Box
                                        display='flex'
                                        flexDirection={{ base: 'column', md: 'row' }}
                                        alignItems={{ base: 'start', md: 'center' }}
                                        justifyContent='space-between'
                                        gap={5}
                                    >
                                        <Text>
                                            {value.addDate}
                                        </Text>
                                        <Text>
                                            {value.invoiceNumber}
                                        </Text>
                                    </Box>
                                    <Text
                                        textColor='var(--colorSix)'
                                    >
                                        {value.transactionStatus}
                                    </Text>
                                </Box>
                                <Button
                                    className="btn-def_second"
                                    mb={3}
                                    onClick={() => navigate("/admin/racikResep")}
                                >
                                    Validasi Resep
                                </Button>

                                {/* UPDATE V2.0 */}
                                <>
                                    <Box
                                        display='flex'
                                        alignItems='start'
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={2}
                                        
                                    >
                                        {value.purchasedProducts.length > 0
                                            ?
                                            value.purchasedProducts.map((valProduct, idxProduct) => {
                                                return (
                                                    <>
                                                        <Box
                                                            display='flex'
                                                            alignItems='start'
                                                            justifyContent='start'
                                                            gap={5}
                                                            key={valProduct.idTransactionDetail}
                                                        >
                                                            <Image
                                                                borderRadius='xl'
                                                                boxSize='70px'
                                                                src={value.prescription.includes("http")
                                                                    ?
                                                                    value.prescription
                                                                    :
                                                                    `${BE_URL}${value.prescription}`}
                                                                alt='Gambar resep dokter'
                                                                className="d-md-block d-none imgResep"
                                                            />
                                                            <Text>
                                                                <span>
                                                                    {valProduct.productName}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    {valProduct.purchaseQuantity} {valProduct.stockType} x Rp {valProduct.priceSale.toLocaleString()}
                                                                </span>
                                                            </Text>
                                                        </Box>
                                                        <Text
                                                            className="me-1"
                                                        >
                                                            Rp {valProduct.subTotal.toLocaleString()}
                                                        </Text>
                                                    </>
                                                )
                                            })
                                            :
                                            <>
                                                <Box
                                                    display='flex'
                                                    alignItems='start'
                                                    justifyContent='start'
                                                    gap={5}
                                                >
                                                    <Image
                                                        borderRadius='xl'
                                                        boxSize='70px'
                                                        src={value.prescription.includes("http")
                                                            ?
                                                            value.prescription
                                                            :
                                                            `${BE_URL}${value.prescription}`}
                                                        alt='Gambar resep dokter'
                                                        className="d-md-block d-none imgResep"
                                                    />
                                                </Box>
                                            </>
                                        }
                                    </Box>


                                    {/* <Box
                                        display='flex'
                                        alignItems='start'
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={2}
                                        key={valProduct.idTransactionDetail}
                                    >
                                        <Box
                                            display='flex'
                                            alignItems='start'
                                            justifyContent='start'
                                            gap={5}
                                        >
                                            <Image
                                                borderRadius='xl'
                                                boxSize='70px'
                                                src={value.prescription.includes("http")
                                                    ?
                                                    value.prescription
                                                    :
                                                    `${BE_URL}${value.prescription}`}
                                                alt='Gambar resep dokter'
                                                className="d-md-block d-none"
                                            />
                                            <Text>
                                                <span>
                                                    Paracetamol
                                                    {valProduct.productName}
                                                </span>
                                                <br />
                                                <span>
                                                    10 Kapsul x Rp 1.300
                                                    {valProduct.purchaseQuantity} {valProduct.stockType} x Rp {valProduct.priceSale.toLocaleString()}
                                                </span>
                                            </Text>
                                        </Box>
                                        <Text
                                            className="me-1"
                                        >
                                            Rp 13.000
                                            Rp {valProduct.subTotal.toLocaleString()}
                                        </Text>
                                    </Box> */}
                                </>
                                {/*  */}

                                {/* V1.0 */}
                                {/* <div className="row mt-3" key={value.idTransaction}>
                                    <div className="col-md-2 d-flex justify-content-center">
                                        <Image
                                            id={value.idTransaction}
                                            src={value.prescription.includes("http")
                                                ?
                                                value.prescription
                                                :
                                                `${BE_URL}${value.prescription}`}
                                            alt='Gambar resep dokter'
                                            borderRadius='sm'
                                            boxSize='80px'
                                            className="imgResep"
                                        />
                                    </div>
                                    <div className="col-md-10">
                                        <Box>
                                            <div>
                                                <Text className="font-brand"
                                                >
                                                    Paracetamol
                                                </Text>
                                            </div>
                                            <div>
                                                <Box
                                                    display='flex'
                                                    flexDirection={{ base: 'column', md: 'row' }}
                                                    alignItems={{ base: 'start', md: 'center' }}
                                                    justifyContent='space-between'
                                                    className="font-brand"
                                                    pb={3}
                                                >
                                                    <Text className="font-brand">
                                                        10 Kapsul x Rp 1.300
                                                    </Text>
                                                    <Text
                                                        className="font-brand"
                                                    >
                                                        Rp 13.000
                                                    </Text>
                                                </Box>
                                            </div>
                                        </Box>
                                    </div>
                                </div> */}
                                {/*  */}


                                <Divider mt={4} />
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10">
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box mt={5}>
                                                <Text className="h6">
                                                    Ongkir
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp {value.freightCost.toLocaleString()}
                                            </Text>
                                        </Box>
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box>
                                                <Text className="h6">
                                                    Total
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp 35.000
                                            </Text>
                                        </Box>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <Button
                                        className="btn-def_second"
                                    // onClick={() => btnUploadBuktiBayar(value.idTransaction)}
                                    >
                                        Tagih Pembayaran
                                    </Button>
                                </div>
                            </div>
                        </div >
                    )
                }
            }
            )
        }
    }

    return (
        <>
            {printSemuaTransaksi()}
        </>
    )

}

export default AdminTransCardValidasiResepComponent;