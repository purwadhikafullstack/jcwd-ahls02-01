import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
// import NavbarComponent from "./Navbar";
import { useToastHook } from "../../Components/CustomToast";
import Sidebar from "../../Components/Admin/Sidebar";
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

const RacikResepPage = (props) => {
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

    const printStokProduk = () => {
      return (
        <div class="pb-3">
          <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder='Tambah Produk' width={"400px"}>
          </Select>
          <Box mt={2}>
            <div class="row">
              <div class="col-md-4">
                <Text class="h6">
                  Paracetamol
                </Text>
              </div>
              <div class="col-md-5">
                <div class="row">
                  <div class="col-md-5">
                    <Text class="h6">
                      Saset :
                    </Text>
                    <Text class="h6">
                      Kapsul :
                    </Text>
                  </div>
                  <div class="col-md-7">
                    <Text class="h6">
                      19
                    </Text>
                    <Text class="h6">
                      10
                    </Text>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-4">-</div>
                  <div class="col-md-4">0</div>
                  <div class="col-md-4">+</div>
                </div>
                <div class="row">
                  <div class="col-md-4">-</div>
                  <div class="col-md-4">5</div>
                  <div class="col-md-4">+</div>
                </div>
              </div>
            </div>
            <Button className="btn-def">
                Konversi
            </Button>
          </Box>
        </div>
      )
    }
    const printTambahProduk = () => {
      return (
        <div class="pb-3">
          <Box mt={2}>
            <div class="row">
              <div class="col-md-4">
                <Text class="h6">
                  Paracetamol
                </Text>
              </div>
              <div class="col-md-5">
                <div class="row">
                  <div class="col-md-5">
                    <Text class="h6">
                      10 Kapsul
                    </Text>
                    <Text class="h6">
                      5 Kapsul
                    </Text>
                  </div>
                  <div class="col-md-2">
                    <Text class="h6">
                      X
                    </Text>
                    <Text class="h6">
                      X
                    </Text>
                  </div>
                  <div class="col-md-5">
                    <Text class="h6">
                      Rp 1.300
                    </Text>
                    <Text class="h6">
                      Rp 1.000
                    </Text>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                  <Text class="h6">
                    Rp 13.000
                  </Text>
                  <Text class="h6">
                    Rp 15.000
                  </Text>
              </div>
            </div>
          </Box>
        </div>
      )
    }

    const printSemuaTransaksi = () => {
        if (dbTransaksi.length > 0) {
            return dbTransaksi.map((value, index) => {
                if (value.prescription != null && value.transactionStatus == "Menunggu Diproses Penjual") {
                    return (
                        <div
                            className="card mb-2" key={value.idTransaction}
                        >
                            <div className="card-body">
                                <div class="row">
                                  <div class="col-md-4">
                                    <Image
                                        id={value.idTransaction}
                                        src={value.prescription}
                                        alt='Gambar resep dokter'
                                        borderRadius='sm'
                                        boxSize='300px'
                                        className="imgResep"
                                        />
                                  </div>
                                  <div class="col-md-8">
                                    {printStokProduk()}
                                    {printStokProduk()}
                                    <Button
                                        className="btn-def_second"
                                        >
                                        Tambah Produk
                                    </Button>
                                  </div>
                                </div>
                                <Divider mt={5}/>
                                <div class="row">
                                  <div class="col-md-4">

                                  </div>
                                  <div class="col-md-8">
                                    {printTambahProduk()}
                                    <div class="d-flex justify-content-end mt-2">
                                        <Button
                                            className="btn-def_second3"
                                            onClick={()=> navigate("/admin/transactionList")}
                                        >
                                            Simpan & kembali ke daftar transaksi
                                        </Button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            )
        }
    }

    return (
        <>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-3 col-sm-5">
                <Sidebar />
              </div>
              <div class="col-md-9 col-sm-8">
                <div class="row">
                  <div class="col-md-10">
                    <Box mt={10} mb={3}>
                      <Text
                          className="h3"
                          >
                            Racik Resep
                      </Text>
                    </Box>
                    {printSemuaTransaksi()}
                  </div>
                </div>
              </div>
              </div>
            </div>
        </>
    )

}

export default RacikResepPage;