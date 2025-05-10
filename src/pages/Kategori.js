import React, { useEffect, useState } from 'react';
import axios from 'axios';
import decryptData from '../components/Decrypted';

function Kategori() {
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/kategori')
        .then(res => res.data.status && setKategori(res.data.data))
        // .then(res => {
        //     if (res.data.status) {
        //         const decrypted = decryptData(res.data.data);
        //         setKategori(decrypted);
        //     }
        // })
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
        <h2>Data Kategori</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
            <tr>
                <th>ID Kategori</th>
                <th>Nama Kategori</th>
            </tr>
            </thead>
            <tbody>
            {kategori.map(item => (
                <tr key={item.id_kategori}>
                <td>{item.id_kategori}</td>
                <td>{item.nama_kategori}</td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

export default Kategori;