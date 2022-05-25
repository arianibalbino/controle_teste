import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

import MaterialTable from 'material-table'

import { api } from '../../services/api';

import '../../assets/styles/global.scss';

import './productsPage.scss';
import { DashboardBanner } from '../../components/layout/dashboardBanner';
import { useAuth } from '../../contexts/Auth';
import { useSearch } from '../../contexts/Search';
import { PopUpForm } from '../../components/forms/popupform';

export function ProductsPage() {
  const { authorizationBearer } = useAuth();
  const { searchValue, filterProducts } = useSearch();

  const [products, setProducts] = useState();
  const [saleProduct, setSaleProduct] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  
  const togglePopUp = () => setToggle(!toggle);
  const fetchProductsAgain = () => setUpdateTable(!updateTable);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/Products', { 
            headers: { Authorization: authorizationBearer() } 
          });
          const data = await response.data;
  console.log(data);
          setProducts(data);
          return data

      } catch(error) {
        console.log(error);
        return error.response;
      }
    }

    fetchProducts();
  }, [authorizationBearer, updateTable]);

  async function createProduct(newProduct) {
    if(newProduct.price < 0 || newProduct.amount < 0) {
      swal("Operação inválida", "Preços e estoques não podem ser negativos", "warning");
      return
    }
    try {
      newProduct.price = parseFloat (newProduct.price);
      newProduct.amount = parseInt (newProduct.amount);
      
      console.log(newProduct)
      const response = await api.post("/Products", 
      newProduct, 
      { headers: { Authorization: authorizationBearer() }});

      setProducts([...products, response.data]);
      console.log(response)
    } catch(error) {
      console.log(error);
      swal("Erro", "Campos preenchidos incorretamente.", "error")
      return error.response
    }
  }

  async function updateProduct(newProduct) {
    if(newProduct.price < 0 || newProduct.amount < 0) {
      swal("Operação inválida", "Preços e estoques não podem ser negativos", "warning");
      return
    }
    try {
      newProduct.price = parseFloat (newProduct.price);
      newProduct.amount = parseInt (newProduct.amount);
      
      console.log(newProduct)
      const response = await api.put("/Products", 
      newProduct, 
      { headers: { Authorization: authorizationBearer() }});

      
      console.log(response)
    } catch(error) {
      console.log(error);
      swal("Erro", "Campos preenchidos incorretamente.", "error")
      return error.response
    }
  }
  return (
    <section className="dashboard-page-container">
      { saleProduct && toggle && <PopUpForm product={ saleProduct } toggle={ togglePopUp } refetch={ fetchProductsAgain } /> }
      <DashboardBanner />
      <div className="dashboard-content">
        { !searchValue && <h4 className="dashboard-information">Exibindo os produtos da sua empresa</h4> }
        { searchValue && <h4 className="dashboard-information">Buscando por { `"${searchValue}"` }</h4> }
        <div className="dashboard-table">
          <MaterialTable
            columns={[
              { title: 'Nome', field: 'name', },
              { title: 'Preço', field: 'price', type: 'numeric', editable:"always"  },
              { title: 'Estoque', field: 'amount', type: 'numeric', editable:"always"  },
              { title: 'Vendas', field: 'salesCount', type: 'numeric', editable: "never" }
            ]}
            data={ filterProducts(products) }
            actions={[
              {
                icon: 'shopping_bag',
                tooltip: 'Vender produto',
               
                onClick: (event, rowData) => { 
                  if(rowData.amount <= 0) {
                    swal("Operação inválida", "Produto esgotado.", "warning")
                    return
                  }
                  setSaleProduct({ ...rowData });
                  togglePopUp();
                },
             

              }
            ]}
            options={{
              search: false,
              exportButton: true
            }}
            editable ={{
              onRowAdd: (newProduct) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  createProduct(newProduct);
                }, 600);
              }),
              onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...products];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setProducts([...dataUpdate]);
                  updateProduct(newData);
    
                  resolve();
                }, 1000)
              }),
            }}
            title="Produtos"
          />
        </div>
      </div>
    </section>
  );
}