import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { useToastHook } from "../../Components/CustomToast";
import Sidebar from "../../Components/Admin/Sidebar";
import { getTransactionAdminAction, savedTransactionAdminAction } from "../../Redux/Actions/transactionActions";
import ModalConversion from "../../Components/Admin/ModalConversion";
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
  const [currentToast, newToast] = useToastHook();

  //^ state management]
  const { state, search } = useLocation();
  console.log(`search`, search);

  const [detail, setDetail] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [addProductClicked, setAddProductClicked] = useState(0);
  const [selectedMeds, setSelectedMeds] = useState([]);
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
  const [toggleModal, setToggleModal] = useState(false)
  const [idForConversion, setIdForConversion] = useState(null)

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
    setSelectedMeds(temp)
    console.log(`selectedMeds`, selectedMeds)
  }

  const printProduct = () => {
    console.log(`selectedMeds`, selectedMeds)
    if (selectedMeds.length > 0) {
      return selectedMeds.map((value, index) => {
        return (
          <div className="mb-2 font-brand">
            <div
              key={value.idStock}
              className="d-flex align-items-center justify-content-between"
            >
              <Select
                placeholder="Pilih Produk"
                onChange={(e) => handleProdukTerpilih(e.target.value, index)}
                size="sm"
                width={334}
              >
                {
                  allProducts.map((value2, index2) => {
                    // console.log(`isi value2`,value2)
                    return (
                      <option
                        id={value2.idStock}
                        value={`${value2.idProduct}|${value2.idStock}|${value2.productName}|${value2.stockType}|${value2.stockQuantity}|${value2.priceSale}`}
                      >
                        {`${value2.productName} - sisa ${value2.stockQuantity} ${value2.stockType}`}
                      </option>
                    )
                  }
                  )}
              </Select>
              <ButtonGroup
                me={6}
              >
                <Button
                  outline
                  className="btn-def"
                  size="sm"
                  style={{ width: "80px" }}
                  onClick={() => { handleKonversi(value, index) }}
                >Konversi</Button>
                <Button
                  outline
                  className="btn-def"
                  size="sm"
                  style={{ width: "80px" }}
                  onClick={() => { handleDeleteProduct(index) }}
                >Delete</Button>
              </ButtonGroup>
            </div>
            <div
              className="d-flex align-items-center justify-content-between"
            >
              <InputGroup size="sm">
                <InputLeftAddon children="Quantity" width={150} />
                <Input
                  width="fit-content"
                  onChange={(e) => handlePurchaseQuantity(e, index)}
                  size="sm"
                />
              </InputGroup>
              {/* <InputGroup size="sm">
                <InputLeftAddon children="Type" width={150} />
                <Input
                  width="fit-content"
                  onChange={(e) => handleStockType(e, index)}
                  size="sm"
                />
              </InputGroup> */}
            </div>
          </div>
        )
      })
    }
  }

  const handleProdukTerpilih = (e, idx) => {
    // console.log(`typeof isi dropdown yg dipilih / isi handleProdukTerpilih`, (e))

    // console.log(`isi idProduct di dropdown setelah dipecah`, idProduct)
    // console.log(`isi idProduct di dropdown setelah dipecah lewat e.split("|")[0]`, e.split("|")[0])

    let temp = [...selectedMeds]
    temp[idx].idProduct = e.split("|")[0]
    temp[idx].idStock = e.split("|")[1]
    temp[idx].productName = e.split("|")[2]
    temp[idx].stockType = e.split("|")[3]
    temp[idx].stockQuantity = e.split("|")[4]
    temp[idx].priceSale = e.split("|")[5]
    setSelectedMeds(temp)
  }

  console.log(`selectedMeds`, selectedMeds)

  const handlePurchaseQuantity = (e, idx) => {
    let temp = [...selectedMeds]
    temp[idx].purchaseQuantity = e.target.value
    temp[idx].subTotal = e.target.value * temp[idx].priceSale
    setSelectedMeds(temp)
  }

  const handleDeleteProduct = (idx) => {
    let temp = [...selectedMeds]
    temp.splice(idx, 1)
    setSelectedMeds(temp)
  }

  const handleKonversi = (value, index) => { //! error di product reducer line 36
    if (value.idProduct) {
      console.log(`handleKonversi diklik`)
      setToggleModal(true)
      setIdForConversion(value.idProduct)
      console.log(`idForConversion`, idForConversion)
    } else {
      newToast({
        title: `Produk belum terpilih`,
        description: "Pilih dahulu produk yang ingin dikonversi",
        status: 'warning'
      })
    }
  }

  console.log(`idForConversion`, idForConversion);

  const handleCLoseModal = () => {
    setToggleModal(false)
  }

  const btnSubmit = async () => {
    try {
      console.log(`isi selectedMeds sebelum submit`, selectedMeds);

      let token = localStorage.getItem("tokenIdUser");
      if (token) {
        let res = await Axios.post(`${API_URL}/transaction/adminAddTransactionDetailForRecipe${search}`, {selectedMeds,idUser:detail.idUser,idTransaksi:search.split("=")[1]}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("data yg teregister", res.data)
        getTransactionAdminAction();
        // navigate("/admin/transactionList")
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getTransactionAdminAction = () => {
    return async (dispatch) => {
      try {
        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        console.log(`getTransactionAdminAction tokenIdUser`, token);

        if (token) {
          let res = await Axios.get(`${API_URL}/transaction/adminGetAllTransaction`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          //^ cek isi res.data
          console.log(`res.data getTransactionAdminAction`, res.data);

          dispatch(savedTransactionAdminAction(res.data));
        }
      } catch (error) {
        console.log(error);
      }
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
                              size="sm"
                              mb={2}
                            >
                              Tambah Produk
                            </Button>
                            {printProduct()}

                            {
                              idForConversion
                              &&
                              <ModalConversion
                                toggleModal={toggleModal}
                                handleCLoseModal={handleCLoseModal}
                                idForConversion={idForConversion}
                              />
                            }

                          </div>
                        </div>
                        <Divider mt={5} />
                        <div class="row">
                          <div class="col-md-4">
                            {null}
                          </div>
                          <div class="col-md-8">

                            <div class="d-flex justify-content-end mt-2">
                              <Button
                                className="btn-def_second"
                                width={80}
                                size="sm"
                                onClick={btnSubmit}
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