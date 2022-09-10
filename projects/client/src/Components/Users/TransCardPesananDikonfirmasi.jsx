import React, { useState, useEffect } from "react";
import Axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import {
    Box,
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

const TransCardPesananDikonfirmasiComponent = (props) => {

    //TODO axios get seluruh transaksi yang berstatus Pesanan Dikonfirmasi
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
        }
    ]);

    const printPesananDikonfirmasi = () => {
        if (dbTransaksi.length > 0) {
            return dbTransaksi.map((value, index) => {
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
                                    {value.transactionStatus} Diterima Pembeli
                                </Text>
                            </Box>

                            <>
                                {value.purchasedProducts.map((valProduct, idxProduct) => {
                                    return (
                                        <Box
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
                                                    src={valProduct.productPicture}
                                                    alt={`IMG-${valProduct.productName}`}
                                                    className="d-md-block d-none"
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
                                        </Box>
                                    )
                                })}
                            </>

                            <Box
                                display='flex'
                                alignItems='start'
                                justifyContent='space-between'
                                className="font-brand"
                                pb={3}
                            >
                                <Text
                                    ps={90}
                                >
                                    Ongkir
                                </Text>
                                <Text
                                    className="me-1"
                                >
                                    Rp {value.freightCost.toLocaleString()}
                                </Text>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='start'
                                justifyContent='space-between'
                                className="font-brand"
                                pb={3}
                                textColor='var(--colorSix)'
                            >
                                <Text
                                    ps={90}
                                >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>

                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
            {printPesananDikonfirmasi()}
        </>
    )

}

export default TransCardPesananDikonfirmasiComponent;