import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import ModalPaymentProofComponent from "./ModalPaymentProof";
import {
    Box,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";

const TransCardMenungguPembayaranComponent = (props) => {

    //^ STATE MANAGEMENT
    const [total, setTotal] = useState(0);
    const [isModalMetodeBayarOpen, setIsModalMetodeBayarOpen] = useState(false);
    const [isModalPaymentProofOpen, setIsModalPaymentProofOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    //TODO axios get seluruh transaksi yang berstatus Menunggu Pembayaran
    //^ seluruh transaksi user yg login
    const [dbTransaksi] = useState([
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
            receiverName: 'Aditya Dimas',
            receiverAddress: 'Jl. Dimas',
            receiverPhone: '081287907001',
            postalCode: '77777'
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
        },
        {
            idTransaction: 13,
            purchasedProducts: [
                {
                    idTransactionDetail: 14,
                    productName: 'Labore Sensitive Skin Care Biomerepair Barrier Revive Cream',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/316515_1-8-2022_9-42-58.webp',
                    stockType: 'ml',
                    purchaseQuantity: 10,
                    priceSale: 3000,
                    subTotal: 30000,
                }
            ],
            totalSale: 30000,
            prescription: "https://assets.kompasiana.com/items/album/2016/10/20/2016-10-20-21-00-22-pengantar-ilmu-farmasi-kedokteran-1-pdf-5808c571c823bd662a834f19.png?t=t&v=260",
            transactionStatus: 'Menunggu Pembayaran',
            transferReceipt: null,
            invoiceNumber: 'INV/20220818/RCK/00001',
            addDate: '2022-08-18 11:00:00',
            freightCost: 10000,
            totalPayment: 40000,
            recereceiverName: 'Aditya Dimas',
            receiverAddress: 'Jl. Dimas',
            receiverPhone: '081287907001',
            postalCode: '77777'
        }
    ]);

    //& component did mount
    useEffect(() => {

    }, [])

    // & onClick btn back di modal pilih metode pembayaran akan mulangin user ke page Checkout
    // const btnBackModalMetodeBayar = () => {
    //     console.log(`btnBackModalMetodeBayar dipencet`)
    //     setIsModalMetodeBayarOpen(!isModalMetodeBayarOpen);
    //     setWhichBank("");
    // }

    // & onClick btn pilih ulang metode pembayaran akan mulangin user ke modal pilih metode pembayaran
    // const handleCallbackToChildPaymentMethod = () => {
    //     setIsModalMetodeBayarOpen(true);
    //     setWhichBank("");
    // }

    // & onClick metode bayar bca akan buka modal payment method khusus bca
    // const handleBca = () => {
    //     setWhichBank('bca');
    //     setIsModalMetodeBayarOpen(!isModalMetodeBayarOpen);
    // }

    // & onClick metode bayar mandiri akan buka modal payment method khusus bca
    // const handleMandiri = () => {
    //     setWhichBank('mandiri');
    //     setIsModalMetodeBayarOpen(!isModalMetodeBayarOpen);
    // }

    //& onClick akan deteksi transaksinya beresep atau ngga, beresep akan minta user pilih metode bayar, ga beresep akan langsung minta user upload bukti bayar
    const btnUploadBuktiBayar = (selectedIdTransaction) => {
        let transaction = dbTransaksi.filter((val, idx) => val.idTransaction == selectedIdTransaction)[0]

        setSelectedTransaction(transaction);
        setTotal(transaction.totalPayment);

        console.log(`selectedTransaction`, selectedTransaction);
        console.log(`transaction.totalPayment`, total);

        setIsModalPaymentProofOpen(true);
        //TODO axios untuk patch add multer gambar bukti bayar untuk transaksi yang diklik upload bukti bayar nya

        
    }

    const handleCallbackToChildPaymentProof = () => {
        setIsModalPaymentProofOpen(false);
    }

    //& print list transaksi yg menunggu pembayaran
    const printMenungguPembayaran = () => {
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
                                    {value.transactionStatus}
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

                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='end'
                                mt={2}
                                mb={3}
                            >
                                <Button
                                    className="btn-def_second"
                                    onClick={() => btnUploadBuktiBayar(value.idTransaction)}
                                >
                                    Upload Bukti Bayar
                                </Button>
                            </Box>

                            <Text
                                fontSize={15}
                                className='font-brand'
                            >
                                <span
                                    className="me-1"
                                >
                                    *) Bukti bayar harus diunggah
                                </span>
                                <span
                                    className="me-1"
                                    style={{ color: 'var(--colorSix)' }}
                                >
                                    maksimal 1 hari dari tanggal pembayaran
                                </span>
                                <span
                                >
                                    , bila melewati batas waktu maka pesanan otomatis dibatalkan.
                                </span>
                            </Text>

                            <Text
                                fontSize={15}
                                className='font-brand'
                            >
                                <span
                                    className="me-1"
                                >
                                    **) Bukti bayar yang diunggah harus jelas, sesuai dengan jumlah yang harus dibayar dan akan divalidasi oleh penjual. Bila tidak tepat atau tidak jelas, penjual dapat meminta pengunggahan ulang.
                                </span>
                            </Text>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
            <ModalPaymentProofComponent
                openModalPaymentProofFromCard={isModalPaymentProofOpen}
                handleSendingToCardParentPaymentMethod={handleCallbackToChildPaymentProof}
                selectedTransaction={selectedTransaction}
                totalPayment={total}
            />

            {printMenungguPembayaran()}

        </>
    )

}

export default TransCardMenungguPembayaranComponent;