import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteProduk from './DeleteProduk';

function Produk() {
    const [produk, setProduk] = useState([]);
    const navigate = useNavigate();

    const goTambahData = () => {
        navigate('/produk/add');
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/produk')
            .then(res => {
                if (res.data.status && res.data.data) {
                    setProduk(res.data.data);
                } else {
                    console.warn("Data produk kosong atau format salah");
                }
            })
            .catch(err => console.error("Gagal mengambil data produk:", err));
    }, []);

    return (
        <div>
            <h2>Data Produk</h2>
            <button onClick={goTambahData}>Tambah Data</button>
            <br /><br />
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID Produk</th>
                        <th>Nama Produk</th>
                        <th>Gambar Produk</th>
                        <th>Nama Kategori</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.length > 0 ? (
                        produk.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nama_produk}</td>
                                <td>
                                    <img 
                                        src={`http://localhost:5000/images/${item.gambar_produk}`} 
                                        alt={`Gambar ${item.nama_produk}`} 
                                        height="100" 
                                    />
                                </td>
                                <td>{item.nama_kategori}</td>
                                <td>
                                    <button onClick={() => navigate(`/produk/edit/${item.id}`)}>
                                        Edit
                                    </button>
                                    <DeleteProduk id={item.id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" align="center">Tidak ada data produk</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Produk;
