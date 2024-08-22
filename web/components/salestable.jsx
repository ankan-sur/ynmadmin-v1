import { React, useState, useEffect } from 'react';
import reactLogo from "../assets/Logo - site.png";
import CachedIcon from '@mui/icons-material/Cached';
import { useUser, useAction } from "@gadgetinc/react";
import {api} from "../api";


const SalesTable = ({ collection }) => {
  const isSmartCollection = collection.collectionType === 'smart';
  const [products, setProducts] = useState([]);
  const [collectionSales, setSales] = useState([]);
  const [{ data, error, fetching }, smartCollector] = useAction(api.shopifyCollection.smartCollector);

  useEffect(() => {

    let products = isSmartCollection ? collection.smartProducts.edges : collection.products.edges;
    
    const sales1 = isSmartCollection ? collection.smartSales : collection.customSales;
    setSales(sales1);

    // Check if collection or productsData is undefined
    if (!collection || !products) {
      return <div className="collection-table">No products data available.</div>;
    }
    products = products.filter(({ node: product }) => product.sales > 0);

    // Sort by sales (descending), then by status ('active' first)
    products.sort((a, b) => {
      // Sort by status first ('active' comes before others)
      if (a.node.status === 'active' && b.node.status !== 'active') {
        return -1;
      } else if (b.node.status === 'active' && a.node.status !== 'active') {
        return 1;
      }

      // Then sort by sales (if statuses are the same or neither are 'active')
      return b.node.sales - a.node.sales;
    });

    setProducts(products);
  },[])

    const onReload = async () => {
      try {
        // Call the smartCollector action with the collection ID
        const response = await smartCollector({ id: collection.id });
        // Handle the response as needed
        console.log(response);
      } catch (e) {
        // Handle any errors
        console.error(e);

      }

    };

  return (
    <div className="collection-table table-responsive">

        {fetching ? (
        <div className =" d-flex align-content-center">
          <img src={reactLogo} className="spinner app-logo my-4"/>
        </div>
      ) : (
        <>
      <p>Total Products in Collection: {products.length}</p> 
      {products.length > 0 ? (
        <div className="data-container table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="status-column"><h4>#</h4></th>
                <th><h4>Product Title</h4></th>
                <th><h4>Sold</h4></th>
                <th><h4>Sales</h4></th>
                <th className="status-column"><h4>Status</h4></th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ node: product }, index) => (
                <tr key={index} className={product.status === 'active' ? 'active-product' : ''}>
                  <td className="status-column">{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.sold}</td>
                  <td>${product.sales.toFixed(2)}</td>
                  <td className="status-column">{product.status}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
            <tr>
            <td className="status-column"> </td>
            <td> <h4> Total Sales: </h4> </td> 
            <td> </td>
            <td> <h4> ${collectionSales} </h4> </td>
            </tr>
            <tr>
            <td className="status-column"> </td>
            <td> <h4> Total Profit: </h4> </td> 
            <td> </td>
            <td> <h4> ${(collectionSales * .6).toFixed(2)} </h4> </td>
            </tr>
            </tfoot>            
          </table>
        </div>
      ) : (
         <div className="data-container table-responsive d-flex justify-content-center">
              <h4>No products meet the criteria or haven't been loaded yet.</h4>
              <button className="s-button icon2" onClick={onReload}>
                <CachedIcon /> Fetch & Reload
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesTable;