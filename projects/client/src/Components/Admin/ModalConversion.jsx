import Axios from "axios";
import React from "react";
// import Register from "../../Assets/DevImage/Register.png";
// import logo from "../../Assets/DevImage/LogoMedhika.png";
import { API_URL } from "../../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loginAction } from "../../Redux/Actions/userActions";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useToastHook } from "../CustomToast";
import {
  Flex,
  Box,
  Input,
  Text,
  Divider,
  Spacer,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  getProducts,
  getProductActions,
} from "../../Redux/Actions/productsAction";


function ModalConversion(props) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [konversiQty, setKonversiQty] = React.useState(0);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [currentToast, newToast] = useToastHook();
  const [loadingStat, setLoadingStat] = React.useState(false);
  const [dataproduct,SetDataproduct] = React.useState([]);

  React.useEffect(() => {
    getProducts()
  }, [])

  // const { dataproduct } = useSelector((state) => {
  //   console.log(state.productReducers,"test reducer")
  //   return {
  //     dataproduct: state.productReducers.product,
  //   };
  // });
  // console.log("getProducts", dataproduct);
  // console.log("KonversionQty", konversiQty);

  const getProducts = async () => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      console.log("TOKENN PRODUCT JALAN", token);
      // memeriksa adanya token
      if (token) {
        let res = await Axios.post(
          `${API_URL}/admin/getProduct`,
          {
            idProducts:3

          },
          {

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data) {
          console.log("RES DATA GETPRODUCTS", res.data);
          SetDataproduct(res.data);
          
        }
      }
    } catch (error) {
      console.log(error);

    }

  };

  const handleKonversi = async () => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      console.log("TOKENN PRODUCT JALAN", token)
      // memeriksa adanya token
      if (token) {
        let res = await Axios.post(
          `${API_URL}/admin/konversiStock`,
          {
            idProducts: dataproduct[0].idProduct,
            conversionQty: konversiQty,
            stocksQuantityMain: dataproduct[0].stockQuantity,
            stocksQuantity:dataproduct[1].stockQuantity,
            convertedsQuantity: dataproduct[1].convertedQuantity,
            idStocksMain: dataproduct[0].idStock,
            idStocks: dataproduct[1].idStock,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          }
        })
        if (res.data) {
          console.log("RES DATA GETPRODUCTS KONVERSI", res.data);
          SetDataproduct(res.data);
          setShow(!show)
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={"sm"}
        isOpen={props.toggleModal}
        onClose={props.handleCloseModal}
        motionPreset='slideInBottom'
      >
        {/* <OverlayOne /> */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text as={"b"}>Konversi Produk</Text>
          </ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <Divider />
          {dataproduct.length == 0 ? (
            <ModalBody>
              
            </ModalBody>
          ) : (
            <ModalBody pb={1}>
              <Text class="h5" style={{ marginTop: "5px", marginLeft: "20px" }}>
                {dataproduct[0].productName}
              </Text>
              <TableContainer
                width={"200px"}
                boxShadow="md"
                style={{ marginLeft: "20px" }}
              >
                <Table size="sm">
                  <Thead>
                    <Tr bgColor={"#DE1B51"}>
                      <Th color={"#FFFFFF"}>Type</Th>
                      <Th color={"#FFFFFF"}>Qty</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr bgColor={"#f6f8fc"}>
                      <Td>{dataproduct[0].stockType}</Td>
                      <div class="d-flex justify-content-end">
                        <Td>{dataproduct[0].stockQuantity}</Td>
                      </div>
                    </Tr>
                    <Tr bgColor={"#f6f8fc"}>
                      <Td>{dataproduct[1].stockType}</Td>
                      <div class="d-flex justify-content-end">
                        <Td>{dataproduct[1].stockQuantity}</Td>
                      </div>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <div class="text-muted">
                <Text
                  fontSize="sm"
                  style={{ marginTop: "15px", marginLeft: "20px" }}
                >
                  1 {dataproduct[0].defaultUnit} = {dataproduct[0].convertedQuantity}{" "}
                  {dataproduct[1].stockType}
                </Text>

              </div>
              <div class="col-md-5">
                <Input mt={"15px"} size="sm" placeholder='Qty' boxShadow='md' onChange={(e) => setKonversiQty(e.target.value)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Box me={"3px"}>
              <Button
                isLoading={loadingStat}
                onClick={handleKonversi}
                class="btn-def_second2"
              >
                Konversi Stok
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalConversion;
