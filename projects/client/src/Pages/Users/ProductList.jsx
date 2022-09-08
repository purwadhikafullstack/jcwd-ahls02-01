import Axios from "axios";
import React from "react";
import { API_URL, BE_URL } from "../../helper";
import { useDispatch } from "react-redux";
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  Text,
  Box,
  Image,
  Button,
  Flex,
  Divider,
  Spacer,
  MenuButton,
  MenuList,
  Menu,
  MenuDivider,
  MenuItem,
  MenuGroup,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import obat1 from "../../Assets/DevImage/Panadol.jpg";

const ProductList = (props) => {
  const [productData, setProductData] = React.useState([]);

  const navigate = useNavigate();
  const [currentToast, newToast] = useToastHook();
  const [loadingStat, setLoadingStat] = React.useState(false);
  React.useEffect(() => {
    fetchProductList();
  }, []);
  const fetchProductList = () => {
    let token = localStorage.getItem("tokenIdUser");
    Axios.get(`${API_URL}/users/getproducts`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setProductData(res.data.data);
      console.log(res.data);
    });
  };
  const btnCart = async () => {
    try {
      setLoadingStat(true);
      setLoadingStat(false);
      navigate("/cart");
    } catch (err) {
      newToast({
        title: "Error.",
        description: "Coba refresh browser anda",
        status: "error",
      });
      setLoadingStat(false);
    }
  };

  
  const printProduct = (value, index) => {
    // return product.map((value, index) =>{
    return (
      <>
        <div class="d-inline-flex">
          <Box
            borderRadius={"10px"}
            width="165px"
            height="300px"
            boxShadow="lg"
            bg="#FFFFFF"
            mt={"25px"}
            ml={"20px"}
          >
            <div class="row">
              <div class="row d-flex justify-content-center">
                <Image
                  src={BE_URL + value.productPicture}
                  width="150px"
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/productDetail/${value.idProduct}`)}
                />
                <Box noOfLines={1}>
                  <Text class="h6b" style={{ marginLeft: "20px" }}>
                    {value.productName}
                  </Text>
                </Box>
              </div>
              <div class="row">
                <Text
                  class="h6"
                  style={{ marginTop: "40px", marginLeft: "20px" }}
                >
                  Rp.{value.priceSale}/ {value.defaultUnit}
                </Text>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <Button
                isLoading={loadingStat}
                class="btn-rekom"
                onClick={btnCart}
              >
                Add To Cart
              </Button>
            </div>
          </Box>
        </div>
      </>
    );
    // })
  };

  const printCategory = () => {
    // return category.map((value, index) =>{
    return (
      <>
        <Box mt={"15px"} ms={"30px"}>
          <Text style={{ cursor: "pointer" }} class="h6">
            Nama Kategori
          </Text>
        </Box>
      </>
    );
    // })
  };

  return (
    <>
      <Box w="100%" h="100%" bgGradient="linear(#f6f8fc, #FFFFFF)">
        <Box boxShadow="md">
          <NavbarComponent />
        </Box>
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <Box
                borderRadius={"10px"}
                width="100%"
                height="500px"
                boxShadow="lg"
                bg="#FFFFFF"
                mt={"23px"}
              >
                <Box pt={"17px"} ms={"30px"}>
                  <Text class="h6b text-uppercase">KATEGORI</Text>
                </Box>
                <Divider mt={"10px"} />
                {printCategory()}
                {printCategory()}
                {printCategory()}
                {printCategory()}
                {printCategory()}
                {printCategory()}
                {printCategory()}
                {printCategory()}
                <Divider mt={"30px"} />
                <Box pt={"10px"} ms={"30px"}>
                  <Text class="h6b text-uppercase">FILTER</Text>
                </Box>
                <Box pt={"10px"} ms={"30px"} me={"30px"}>
                  <Input
                    bgColor={"#FFFFFF"}
                    boxShadow="md"
                    placeholder="Search by name"
                  />
                  <Box mt={"15px"}>
                    <Button class="btn-def_second2">Search</Button>
                  </Box>
                </Box>
              </Box>
            </div>
            <div class="col-md-9">
              <Flex mt={"40px"} ms={"20px"}>
                <Text class="h6b text-uppercase mt-2">Nama Kategori</Text>
                <Spacer />
                <Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      boxShadow="lg"
                      bg="#FFFFFF"
                      me={"30px"}
                    >
                      Sortir Product
                    </MenuButton>
                    <MenuList boxShadow="lg">
                      <MenuGroup title="Sort By Name">
                        <MenuItem>Product Name : A - Z</MenuItem>
                        <MenuItem>Product Name : Z - A</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="Sort By Price">
                        <MenuItem>Price Asc</MenuItem>
                        <MenuItem>Price Desc</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
              {productData.length > 0 ? (
                <>{productData.map(printProduct)}</>
              ) : null}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductList;
