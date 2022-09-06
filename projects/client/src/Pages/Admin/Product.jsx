import * as test from "react";
import axios from "axios";
import { API_URL, BE_URL } from "../../helper";
import {
  Text,
  useMediaQuery,
  Image,
  IconButton,
  Flex,
  Box,
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  TableCaption,
  Thead,
  Tbody,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import "../../Styles/Admin/Product.css";
import Sidebar from "../../Components/Admin/Sidebar";

const ModalCreate = (props) => {
  const [formState, setFormState] = test.useState({
    name: "",
    price: 0,
    category: "",
    gambar: "",
    description: "",
    defaultUnit: "",
    convertedQuantity: 0,
    warning: "",
    composition: "",
    dosage: "",
    stockQuantity: 0,
  });
  const onValueChange = (name, value, target) => {
    if (name === "gambar") value = target.files[0];
    setFormState({ ...formState, [name]: value });
  };
  const [categoryList, setCategoryList] = test.useState([]);
  test.useEffect(() => {
    categoryFetch();
  }, []);
  function categoryFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/getcategory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategoryList(res.data.data);
        console.log(res.data);
      });
  }
  const Selectcategory = (props) => {
    const [selectedCategory, setSelectedCategory] = test.useState("");
    return (
      <Select
        value={props.formState.category}
        placeholder="Pilih kategori"
        onChange={(event) => {
          props.onValueChange("category", event.target.value);
        }}
      >
        {props.categoryList.map((value) => (
          <option value={value.idCategory}>{value.categoryName}</option>
        ))}
      </Select>
    );
  };
  return (
    <ModalContent>
      <ModalHeader>Tambah Produk</ModalHeader>
      <ModalBody>
        <FormControl>
          <FormLabel>Nama Produk</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("name", event.target.value);
            }}
          />
          <FormLabel>Harga</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("price", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Netto</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("convertedQuantity", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Kategori</FormLabel>
          <Selectcategory
            onValueChange={onValueChange}
            categoryList={categoryList}
            formState={formState}
          />
          <FormLabel>Gambar</FormLabel>
          <Input
            type={"file"}
            onChange={(event) => {
              onValueChange("gambar", event.target.value, event.target);
            }}
          />
          <FormLabel>Deskripsi</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("description", event.target.value);
            }}
          />
          <FormLabel>Unit</FormLabel>
          <Input
            placeholder="saset,botol,etc"
            onChange={(event) => {
              onValueChange("defaultUnit", event.target.value);
            }}
          />
          <FormLabel>Komposisi</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("composition", event.target.value);
            }}
          />
          <FormLabel>Warning</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("warning", event.target.value);
            }}
          />
          <FormLabel>Dosis</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("dosage", event.target.value);
            }}
          />
          <FormLabel>Stok</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("stock", event.target.value);
            }}
            type="number"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
        style={{ backgroundColor: "#DE1B51" }}
          colorScheme="red"
          variant="solid"
          onClick={() => {
            // props.onClose()
            props.add(formState);
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
///////////////EDIT/////////////////////
const ModalEdit = (props) => {
  const [formState, setFormState] = test.useState({ ...props.selectedEdit });
  const onValueChange = (name, value, target) => {
    if (name === "gambar") value = target.files[0];
    setFormState({ ...formState, [name]: value });
  };
  const [categoryList, setCategoryList] = test.useState([]);
  test.useEffect(() => {
    productFetch();
    setFormState({ ...props.selectedEdit });
  }, []);
  function productFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/getcategory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategoryList(res.data.data);
        console.log(res.data);
      });
  }
  const Selectcategory = (props) => {
    const [selectedCategory, setSelectedCategory] = test.useState("");
    return (
      <Select
        value={props.formState.category}
        placeholder="Select option"
        onChange={(event) => {
          props.onValueChange("category", event.target.value);
        }}
      >
        {props.categoryList.map((value) => (
          <option value={value.idCategory}>{value.categoryName}</option>
        ))}
      </Select>
    );
  };
  return (
    <ModalContent>
      <ModalHeader>Product Page</ModalHeader>
      <ModalBody>
        <FormControl>
          <FormLabel>Nama Produk</FormLabel>
          <Input
            value={formState.name}
            onChange={(event) => {
              onValueChange("name", event.target.value);
            }}
          />
          <FormLabel>Harga</FormLabel>
          <Input
            value={formState.price}
            onChange={(event) => {
              onValueChange("price", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Netto</FormLabel>
          <Input
            value={formState.convertedQuantity}
            onChange={(event) => {
              onValueChange("convertedQuantity", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Kategori</FormLabel>
          <Selectcategory
            onValueChange={onValueChange}
            categoryList={categoryList}
            formState={formState}
          />
          <FormLabel>Gambar</FormLabel>
          <Input
            type={"file"}
            onChange={(event) => {
              onValueChange("gambar", event.target.value, event.target);
            }}
          />
          <FormLabel>Deskripsi</FormLabel>
          <Textarea
            value={formState.description}
            onChange={(event) => {
              onValueChange("description", event.target.value);
            }}
          />
          <FormLabel>Unit</FormLabel>
          <Input
            placeholder="saset,botol,etc"
            value={formState.defaultUnit}
            onChange={(event) => {
              onValueChange("defaultUnit", event.target.value);
            }}
          />
          <FormLabel>Komposisi</FormLabel>
          <Textarea
            value={formState.composition}
            onChange={(event) => {
              onValueChange("composition", event.target.value);
            }}
          />
          <FormLabel>Warning</FormLabel>
          <Textarea
            value={formState.warning}
            onChange={(event) => {
              onValueChange("warning", event.target.value);
            }}
          />
          <FormLabel>Dosis</FormLabel>
          <Textarea
            value={formState.dosage}
            onChange={(event) => {
              onValueChange("dosage", event.target.value);
            }}
          />
          <FormLabel>Stok</FormLabel>
          <Input
            value={formState.stockQuantity}
            onChange={(event) => {
              onValueChange("stock", event.target.value);
            }}
            type="number"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
          style={{ backgroundColor: "#DE1B51" }}
          colorScheme="red"
          onClick={() => {
            props.edit(formState);
            // props.onClose();
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const Productpage = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [productData, setproductData] = test.useState([]);
  const [modalState, setModalState] = test.useState("none");
  const [selectedEdit, setSelectedEdit] = test.useState([]);
  test.useEffect(() => {
    productFetch();
  }, []);
  const ProductList = (props) => {
    return (
      <TableContainer overflowX={"scroll"} whiteSpace={"wrap"}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Produk</Th>
              <Th>Harga</Th>
              <Th>Kategori</Th>
              {/* <Th>Description</Th> */}
              <Th>Gambar</Th>
              <Th>Unit</Th>
              <Th>Netto</Th>
              <Th>Stok</Th>
              <Th>Actions</Th>
              {/* <Th>Composition</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {props.Data.map((value, index) => {
              return (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{value.productName}</Td>
                  <Td>{value.priceSale}</Td>
                  <Td>{value.categoryName}</Td>
                  {/* <Td style={{ width: "50px" }}>{value.description}</Td> */}
                  <Td>
                    <img src={BE_URL + value.productPicture}></img>
                  </Td>
                  <Td>{value.defaultUnit}</Td>
                  {/* <Td>{value.composition}</Td> */}
                  <Td>{value.convertedQuantity}</Td>
                  <Td>{value.stockQuantity}</Td>
                  <Td>
                    <Button
                      style={{ margin: "10px" }}
                      onClick={() => {
                        if (
                          window.confirm("Anda Yakin Ingin Hapus?")
                        ) {
                          props.deleteProducts(value.idProduct);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ margin: "10px" }}
                      onClick={() => {
                        props.setSelectedEdit({
                          id: value.idProduct,
                          name: value.productName,
                          price: value.priceSale,
                          category: value.idCategory,
                          gambar: value.productPicture,
                          description: value.description,
                          defaultUnit: value.defaultUnit,
                          convertedQuantity: value.convertedQuantity,
                          composition: value.composition,
                          dosage: value.dosage,
                          warning: value.warning,
                          stock: value.stockQuantity
                        });
                        props.setModalState("edit");
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  function productFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/dataproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setproductData(res.data.data);
        console.log(res.data);
      });
  }

  const addProduct = (productForm) => {
    let form = new FormData();
    form.append("file", productForm.gambar);
    form.append("data", JSON.stringify(productForm));
    let token = localStorage.getItem("tokenIdUser");
    axios
      .post(`${API_URL}/admin/addproduct`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => productFetch());
  };
  const editProducts = (productForm) => {
    let token = localStorage.getItem("tokenIdUser");
    let form = new FormData();
    form.append("file", productForm.gambar);
    form.append("data", JSON.stringify(productForm));
    axios
      .patch(`${API_URL}/admin/editproduct`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => productFetch());
  };
  const deleteProducts = (selected) => {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .delete(
        `${API_URL}/admin/deleteproduct/${selected}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => productFetch());
  };

  return (
    <>
      <Modal
        isOpen={modalState !== "none"}
        onClose={() => setModalState("none")}
      >
        {modalState === "Create" ? (
          <ModalCreate
            state={modalState}
            onClose={() => setModalState("none")}
            add={addProduct}
          />
        ) : (
          <ModalEdit
            state={modalState}
            onClose={() => setModalState("none")}
            edit={editProducts}
            selectedEdit={selectedEdit}
          />
        )}
      </Modal>
      <div class="container-fluid">
        <div class="row">
          {isLargerThan1280 ? (
            <>
              <div class="col-md-3 col-sm-5">
                <Sidebar />
              </div>
              <div class="col-md-9 col-sm-8">
                <div class="row">
                  <div class="mt-3">
                    <Text class="h1b">Dashboard Inventory Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Produk
                    </Button>
                    <ProductList
                      deleteProducts={deleteProducts}
                      Data={productData}
                      setSelectedEdit={setSelectedEdit}
                      setModalState={setModalState}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div class="col-4">
                <Sidebar />
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="mt-3">
                    <Text class="h1b">Dashboard Inventory Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Produk
                    </Button>
                    <ProductList
                      deleteProducts={deleteProducts}
                      Data={productData}
                      setSelectedEdit={setSelectedEdit}
                      setModalState={setModalState}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Productpage;
