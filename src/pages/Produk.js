import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Produk(){
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/produk')
        .then(res => res.data.status && setProduk(res.data.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Data Produk</h2>
                <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID Produk</th>
                        <th>Nama Produk</th>
                        <th>Gambar Produk</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama_produk}</td>
                        <td><img src={`http://localhost:5000/images/${item.gambar_produk}`} height="150" /></td>
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    );
};

export default Produk;