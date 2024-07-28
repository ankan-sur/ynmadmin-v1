import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAction } from "@gadgetinc/react";
import { TextField, Card, CardContent, IconButton, Collapse, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Chip } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnaddedOnly, setShowUnaddedOnly] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(true);
  const [doneOpen, setDoneOpen] = useState(false);
  const [{ data, error, fetching }, update] = useAction(api.submitProducts.update);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.fetchSubProd();
        console.log("API response:", response);
        if (response && response.data) {
          setProducts(response.data);
          console.log("Products:", JSON.stringify(response.data, null, 2));
        } else {
          console.error("No data in response");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductAction = (productId) => {
    // Your custom function to handle product action
    console.log("Action triggered for product:", productId);
  };

  const handleToggleUploadStatus = async (productId) => {
    const product = products.find((p) => p.id === productId);
    const updatedProduct = { ...product, uploaded: !product.uploaded };

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? updatedProduct : p
      )
    );

    handleProductAction(productId);

    try {
      await update({
        id: productId,
        uploaded: updatedProduct.uploaded,
      });
      console.log(`Product ${productId} upload status updated.`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const parseTags = (tags) => {
    return tags.split(',').map((tag, index) => <Chip key={index} label={tag.trim()} className="ynm-chip" />);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    const movedProduct = products[sourceIndex];
    const updatedProducts = Array.from(products);
    updatedProducts.splice(sourceIndex, 1);
    updatedProducts.splice(destinationIndex, 0, movedProduct);

    setProducts(updatedProducts);

    // If moved between pending and done trays, update the uploaded status
    if (sourceDroppableId !== destinationDroppableId) {
      handleToggleUploadStatus(movedProduct.id);
    }
  };

  const pendingProducts = products.filter((product) => !product.uploaded).filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const doneProducts = products.filter((product) => product.uploaded).filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-container vw-70 dash-outer">
      <h2>Submitted Products</h2>
  
      <div className="trays">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pendingProducts">
            {(provided) => (
              <div className="tray not-added" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="tray-header">
                  <h3>Pending ({pendingProducts.length})</h3>
                  <IconButton onClick={() => setPendingOpen(!pendingOpen)}>
                    <ExpandMoreIcon
                      style={{ transform: pendingOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </IconButton>
                </div>
                <Collapse in={pendingOpen}>
                  <div className="cards-container">
                    {pendingProducts.map((product, index) => (
                      <Draggable key={product.id} draggableId={product.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card not-added"
                          >
                            <CardContent>
                              <div className="card-header">
                                <Typography variant="h6">{product.title}</Typography>
                                <IconButton
                                  onClick={() => handleToggleUploadStatus(product.id)}
                                  size="small"
                                >
                                  <DoneIcon color={product.uploaded ? "primary" : "disabled"} />
                                </IconButton>
                              </div>
                              <TableContainer>
                                <Table size="small" aria-label="product details table">
                                  <TableBody>
                                    <TableRow>
                                      <TableCell><strong>Description:</strong></TableCell>
                                      <TableCell>{product.description.markdown}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Measurements:</strong></TableCell>
                                      <TableCell>{product.measurements}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Tags:</strong></TableCell>
                                      <TableCell>{parseTags(product.productTags)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Collection:</strong></TableCell>
                                      <TableCell>{product.collectionTag}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Store:</strong></TableCell>
                                      <TableCell>{product.store}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Submitted by:</strong></TableCell>
                                      <TableCell>{product.submittedBy.firstName} ({product.submittedBy.email})</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </Collapse>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doneProducts">
            {(provided) => (
              <div className="tray added" ref={provided.innerRef} {...provided.droppableProps}>
                <div className="tray-header">
                  <h3>Done ({doneProducts.length})</h3>
                  <IconButton onClick={() => setDoneOpen(!doneOpen)}>
                    <ExpandMoreIcon
                      style={{ transform: doneOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </IconButton>
                </div>
                <Collapse in={doneOpen}>
                  <div className="cards-container">
                    {doneProducts.map((product, index) => (
                      <Draggable key={product.id} draggableId={product.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card added"
                          >
                            <CardContent>
                              <div className="card-header">
                                <Typography variant="h6">{product.title}</Typography>
                                <IconButton
                                  onClick={() => handleToggleUploadStatus(product.id)}
                                  size="small"
                                >
                                  <DoneIcon color={product.uploaded ? "primary" : "disabled"} />
                                </IconButton>
                              </div>
                              <TableContainer>
                                <Table size="small" aria-label="product details table">
                                  <TableBody>
                                    <TableRow>
                                      <TableCell><strong>Description:</strong></TableCell>
                                      <TableCell>{product.description.markdown}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Measurements:</strong></TableCell>
                                      <TableCell>{product.measurements}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Tags:</strong></TableCell>
                                      <TableCell>{parseTags(product.productTags)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Collection:</strong></TableCell>
                                      <TableCell>{product.collectionTag}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Store:</strong></TableCell>
                                      <TableCell>{product.store}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell><strong>Submitted by:</strong></TableCell>
                                      <TableCell>{product.submittedBy.firstName} ({product.submittedBy.email})</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </Collapse>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProductList;
