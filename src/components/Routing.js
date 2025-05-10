import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Produk from "../pages/Produk";
import Kategori from "../pages/Kategori";
import AddProduct from "../pages/AddProduk";
import EditProduk from "../pages/EditProduk";

function Routing(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/produk/add" element={<AddProduct/>}/>
            <Route path="/produk/edit/:id" element={<EditProduk/>}/>
        </Routes>
    );
}

export default Routing;