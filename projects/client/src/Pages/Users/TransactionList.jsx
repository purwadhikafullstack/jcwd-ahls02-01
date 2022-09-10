import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import TransCardValidasiResepComponent from "../../Components/Users/TransCardValidasiResep";
import TransCardMenungguPembayaranComponent from "../../Components/Users/TransCardMenungguPembayaran";
import TransCardMenungguKonfirmasiComponent from "../../Components/Users/TransCardMenungguKonfirmasi";
import TransCardDiprosesComponent from "../../Components/Users/TransCardDiproses";
import TransCardDikirimComponent from "../../Components/Users/TransCardDikirim";
import TransCardPesananDikonfirmasiComponent from "../../Components/Users/TransCardPesananDikonfirmasi";
import TransCardDibatalkanComponent from "../../Components/Users/TransCardDibatalkan";
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

import { TiArrowBack } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";

const TransactionListPage = (props) => {

    //* assign function
    const [currentToast, newToast] = useToastHook();
    //const dispatch = useDispatch();
    // const navigate = useNavigate();

    //^ STATE MANAGEMENT
    const [orderData, setOrderData] = useState("null");
    const [filterInvoiceNo, setFilterInvoiceNo] = useState("");
    const [filterDateBegin, setFilterDateBegin] = useState("");
    const [filterDateEnd, setFilterDateEnd] = useState("");
    const [tabIndex, setTabIndex] = useState(1);
    // const { state, search } = useLocation();

    //& component did mount
    useEffect(() => {
        { props.defaultTabIndex && setTabIndex(props.defaultTabIndex)}
    }, [])

    //TODO nanti ambil dr reducer transaksi
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

    const handleTabIndex = (idx) => {
        setTabIndex(idx);
    }

    //& untuk ambil BE transaksi yang terpaginate dan tersortir
    const handleSortDropdown = (sortValue) => {
        console.log(`dropdown yang terpilih ${sortValue}`);

        if (sortValue != "null") {
            setOrderData(sortValue);
            let property = sortValue.split('-')[0];
            let order = sortValue.split('-')[1];

            //TODO axios paginated sorted data here
        } else {
            // setOrderData(sortValue);
            newToast({
                description: "Reset urutan dengan mengklik tombol reset",
                status: 'warning'
            })
        }
    }

    const handleFilterSort = () => {

        //^check isi handle
        console.log(`isi filterDateBegin ${filterDateBegin}`);
        console.log(`isi filterDateEnd ${filterDateEnd}`);
        console.log(`isi filterInvoiceNo ${filterInvoiceNo}`);

        //TODO try catch axios untuk filter data
        let filterQuery = '?';

    }

    const handleReset = () => {
        //getTransaction();
        setFilterDateBegin('');
        setFilterDateEnd('');
        setFilterInvoiceNo('');
        setOrderData('');
    }

    return (
        <>
            <Box boxShadow='md'>
                <NavbarComponent />
            </Box>
            <div
                className="row container mx-auto pt-3"
            >
                <div
                    className="col-12 col-md-3 order-2 order-md-1 py-3"
                >
                    <Box
                        borderRadius={5}
                        shadow="md"
                        py={2}
                        textAlign="left"
                        className="font-brand"
                    >
                        <Text
                            py={2}
                            ps={4}
                            className="h6b"
                        >
                            Filter dan atau urutkan berdasarkan:
                        </Text>
                        <Divider
                            className="d-none d-md-block"
                        />
                        <Box>
                            <InputGroup size="sm">
                                <InputLeftAddon children='Tanggal awal' width={150} />
                                <Input
                                    type='date'
                                    value={filterDateBegin}
                                    onChange={(e) => setFilterDateBegin(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup size="sm">
                                <InputLeftAddon children='Tanggal akhir' width={150} />
                                <Input
                                    type='date'
                                    value={filterDateEnd}
                                    onChange={(e) => setFilterDateEnd(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup size="sm">
                                <InputLeftAddon children='Nomor invoice' width={150} />
                                <Input
                                    type='text'
                                    placeholder="Cari transaksimu disini" value={filterInvoiceNo}
                                    onChange={(e) => setFilterInvoiceNo(e.target.value)}
                                />
                            </InputGroup>
                            <Select
                                size="sm"
                                alignItems="left"
                                className="font-brand"
                                variant="filled"
                                value={orderData}
                                onChange={(e) => handleSortDropdown(e.target.value)}
                            >
                                <option
                                    value="null"
                                >
                                    Urutkan berdasarkan ...
                                </option>
                                <option
                                    value="invoiceNumber-asc"
                                >
                                    Nomor Invoice - Ascending
                                </option>
                                <option
                                    value="invoiceNumber-desc"
                                >
                                    Nomor Invoice - Descending
                                </option>
                                <option
                                    value="addDate-asc"
                                >
                                    Tanggal Invoice - Ascending
                                </option>
                                <option
                                    value="addDate-dessc"
                                >
                                    Tanggal Invoice - Descending
                                </option>
                            </Select>
                            <Button
                                mx={{ base: 2, md: 0 }}
                                mt={{ base: 2, md: 2 }}
                                width={{ base: 400, md: 300 }}
                                className="btn-def"
                                onClick={handleFilterSort}
                            >
                                Terapkan
                            </Button>
                            <Button
                                mx={{ base: 2, md: 0 }}
                                mt={{ base: 2, md: 2 }}
                                width={{ base: 400, md: 300 }}
                                className="btn-def"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </div>
                <div
                    className="col-12 col-md-9 order-1 order-md-2"
                >
                    <Text
                        className="h3"
                        pt={{ base: 2, md: 6 }}
                        pb={{ base: 0, md: 4 }}
                    >
                        Daftar Transaksi
                    </Text>
                    <Box
                        shadow='md'
                        borderRadius={5}
                    >
                        <Tabs
                            variant='soft-rounded'
                            isFitted='true'
                            className="font-brand"
                            orientation={{ base: 'vertical', md: 'horizontal' }}
                            defaultIndex={tabIndex}
                            onChange={(e) => setTabIndex(e)}
                        >
                            <TabList>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Validasi Resep
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Menunggu Pembayaran
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Menunggu Konfirmasi
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Diproses
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Dikirim
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Pesanan Dikonfirmasi
                                </Tab>
                                <Tab
                                    _selected={{
                                        color: 'var(--colorOne)',
                                        bg: 'var(--colorSix)',
                                    }}
                                >
                                    Dibatalkan
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <TransCardValidasiResepComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardMenungguPembayaranComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardMenungguKonfirmasiComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardDiprosesComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardDikirimComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardPesananDikonfirmasiComponent

                                    />
                                </TabPanel>
                                <TabPanel>
                                    <TransCardDibatalkanComponent

                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default TransactionListPage;