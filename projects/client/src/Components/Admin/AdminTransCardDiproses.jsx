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

const AdminTransCardDiprosesComponent = (props) => {

    //TODO axios get seluruh transaksi yang berstatus Diproses
    //^ seluruh transaksi user yg login
    const [dbTransaksi] = useState([
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
        }
    ]);

    const printDiproses = () => {
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
                                    Pesanan Sedang Diproses Penjual
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
                                    as={'b'}
                                >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                    as={'b'}
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='end'
                                mt={2}
                                mb={3}
                            >
                                <Button
                                    className="btn-def"
                                    width={180} ms={5}
                                >
                                    Batalkan Pesanan
                                </Button>
                                <Button
                                    className="btn-def_second"
                                    width={180} ms={5}
                                >
                                    <Text class="h6b" style={{color:"#FFFFFF"}}>
                                        Kirim Pesanan
                                    </Text>
                                </Button>
                            </Box>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
            {printDiproses()}
        </>
    )

}

export default AdminTransCardDiprosesComponent;