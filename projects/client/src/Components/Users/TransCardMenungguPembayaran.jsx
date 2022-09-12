import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import ModalPaymentProofComponent from "./ModalPaymentProof";
import { getTransactionAction } from "../../Redux/Actions/transactionActions";
import { API_URL, BE_URL } from "../../helper";
import {
    Box,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";

const TransCardMenungguPembayaranComponent = (props) => {

    //^ STATE MANAGEMENT
    const [total, setTotal] = useState(0);
    // const [isModalMetodeBayarOpen, setisModalPaymentProofOpen] = useState(false);
    const [isModalPaymentProofOpen, setIsModalPaymentProofOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [isBtnUploadBuktiBayarClicked, setIsBtnUploadBuktiBayarClicked] = useState(0);

    //^ cek state isModalPaymentProofOpen
    console.log(`isModalPaymentProofOpen`, isModalPaymentProofOpen);

    //TODO axios get seluruh transaksi yang berstatus Menunggu Pembayaran

    //& component did mount
    useEffect(() => {

    }, [selectedTransaction, isModalPaymentProofOpen, isBtnUploadBuktiBayarClicked])

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

    const openModalPaymentProof = () => {
        if (isBtnUploadBuktiBayarClicked == 0) {
            setIsModalPaymentProofOpen(false);
        } else {
            setIsModalPaymentProofOpen(true);
        }
    }

    //& onClick akan deteksi transaksinya beresep atau ngga, beresep akan minta user pilih metode bayar, ga beresep akan langsung minta user upload bukti bayar
    const btnUploadBuktiBayar = (selectedIdTransaction) => {
        setIsBtnUploadBuktiBayarClicked(1);
        setIsModalPaymentProofOpen(true);

        let transaction = props.dbMenungguPembayaran.filter((val, idx) => val.idTransaction == selectedIdTransaction)[0]

        setSelectedTransaction(transaction);
        setTotal(transaction.totalPayment);

        console.log(`selectedTransaction`, selectedTransaction);
        console.log(`transaction.totalPayment`, total);

        //TODO axios untuk patch add multer gambar bukti bayar untuk transaksi yang diklik upload bukti bayar nya
    }

    const handleCallbackToChildPaymentProof = () => {
        setIsBtnUploadBuktiBayarClicked(0);
        setIsModalPaymentProofOpen(false);
    }

    const handleCallbackToChildPaymentProofOVERLAY = () => {
        setIsBtnUploadBuktiBayarClicked(0);
        setIsModalPaymentProofOpen(false);
    }

    const handleCallbackToChildPaymentProofONCLOSE = () => {
        setIsBtnUploadBuktiBayarClicked(0);
        setIsModalPaymentProofOpen(false);
    }

    //& print list transaksi yg menunggu pembayaran
    const printMenungguPembayaran = () => {
        if (props.dbMenungguPembayaran.length > 0) {
            return props.dbMenungguPembayaran.map((value, index) => {
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
                                                    src={BE_URL+valProduct.productPicture}
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

                            {/* <Text
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
                            </Text> */}

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
                handleSendingToCardParentPaymentMethodOVERLAY={handleCallbackToChildPaymentProofOVERLAY}
                handleSendingToCardParentPaymentMethodONCLOSE = {handleCallbackToChildPaymentProofONCLOSE}

                selectedTransaction={selectedTransaction}
                totalPayment={total}
            />

            {printMenungguPembayaran()}

        </>
    )

}

export default TransCardMenungguPembayaranComponent;