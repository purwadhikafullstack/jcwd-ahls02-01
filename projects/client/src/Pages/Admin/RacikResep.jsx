import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { useToastHook } from "../../Components/CustomToast";
import Sidebar from "../../Components/Admin/Sidebar";
import { getTransactionAdminAction } from "../../Redux/Actions/transactionActions";
import ModalEdit from "../../Components/Admin/ModalProducts";
import { API_URL, BE_URL } from "../../helper";
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

import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { IoConstructOutline } from "react-icons/io5";

const RacikResepPage = (props) => {

  //^ assign function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //^ state management]
  const { state, search } = useLocation();
  console.log(`search`, search);

  const [detail, setDetail] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [addProductClicked, setAddProductClicked] = useState(0);
  const [selectedMeds, setSelectedMeds] = [];
  const [detailOneMed, setDetailOneMed] = useState({
    idProduct: "",
    idStock: "",
    productName: "",
    stockType: "",
    stockQuantity: 0,
    purchaseQuantity: 0,
    priceSale: 0,
    subTotal: 0
  });

  const { transactionList, transactionLength } = useSelector((state) => {
    return {
      transactionList: state.transactionReducers.adminvalidasiresep,
      transactionLength: state.transactionReducers.transactionAdminView.filter(val => val.transactionStatus == "Menunggu Diproses Penjual").length
    }
  })

  //& component did mount
  useEffect(() => {
    getDetail();
    getAllProducts();
  }, []);

  const getDetail = async () => {
    console.log("isi search di getDetail", search);

    let token = localStorage.getItem("tokenIdUser");

    Axios.get(`${API_URL}/transaction/adminGetDetailRecipe${search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((response) => {
        console.log("isi detail", response.data);
        setDetail(response.data);
      })
      .catch((error) => { console.log(error) })
  };

  console.log(`Detail Recipe`, detail);
  console.log(`detail.idTransaction`, detail.idTransaction);
  console.log(`detail.purchasedProducts`, detail.purchasedProducts);

  const getAllProducts = async () => {
    Axios.get(`${API_URL}/transaction/adminGetAllProduct`)
      .then((response) => {
        console.log("isi adminGetAllProduct", response.data);
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const btnTambahProduk = () => {
    let temp = [...selectedMeds];
    temp.push({
      idProduct: "",
      idStock: "",
      productName: "",
      stockType: "",
      stockQuantity: 0,
      purchaseQuantity: 0,
      priceSale: 0,
      subTotal: 0
    })

    // temp.push(
    //   <Select
    //     placeholder="Pilih produk"
    //     onChange={(e) => handleProdukTerpilih(e, index)}
    //     size="sm"
    //   >
    //     <Input
    //       placeholder="Nama Produk"
    //     />

    //   </Select>)
  }

  const handleProdukTerpilih = () => {
    let temp = [...detailOneMed.idProduct]


  }


  // const handleSelectProduct = (value) => {
  //   console.log(`value dari dropdown`, value);
  //   let temp = allProducts.filter(valueAll => valueAll.idProduct == value);

  //   console.log(`nilai temp di handleSelectProduct`, temp);
  //   setSelectedMeds([...selectedMeds, ...temp]);
  //   console.log(`isi selectedMeds`, selectedMeds);
  // }

  // console.log(`selectedMeds setelah append dengan temp`, selectedMeds);

  //   const printStock = () => {
  //     if (newProduct.stock.length > 0) {
  //         return newProduct.stock.map((value, index) => {
  //             return (
  //                 <div className="d-flex justify-content-between my-1" key={index}>
  //                     <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => handleType(e, index)} />
  //                     <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => handleStock(e, index)} />
  //                     <Button
  //                         outline
  //                         color="danger"
  //                         onClick={() => { handleDeleteStock(index) }}
  //                     >Delete</Button>
  //                 </div>
  //             )
  //         })
  //     }
  // }

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

                {detail.idTransaction
                  &&
                  <>
                    <div
                      className="card mb-2" key={detail.idTransaction}
                    >
                      <div className="card-body">
                        <div class="row">
                          <div class="col-md-4">
                            <Image
                              borderRadius='xl'
                              boxSize='300px'
                              src={detail.prescription.includes("http")
                                ?
                                detail.prescription
                                :
                                `${BE_URL}${detail.prescription}`}
                              alt='Gambar resep dokter'
                            />
                          </div>
                          <div class="col-md-8">
                            <Button
                              className="btn-def_second"
                              onClick={btnTambahProduk}
                            >
                              Tambah Produk
                            </Button>
                            {/* {printOptions()} */}
                            {/* <Box
                              display='flex'
                              alignItems='start'
                              justifyContent='space-between'
                              className="font-brand"
                              pb={2}
                            >
                              printProductTerpilih()
                            </Box> */}
                          </div>
                        </div>
                        <Divider mt={5} />
                        <div class="row">
                          <div class="col-md-4">
                            {null}
                          </div>
                          <div class="col-md-8">

                            {printTambahProduk()}

                            <div class="d-flex justify-content-end mt-2">
                              <Button
                                className="btn-def_second3"
                                onClick={() => navigate("/admin/transactionList")}
                              >
                                Simpan & kembali ke daftar transaksi
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default RacikResepPage;