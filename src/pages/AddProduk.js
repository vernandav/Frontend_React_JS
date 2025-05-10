import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/kategori')
            .then(res => {
                if (res.data.status && res.data.data) {
                    setKategori(res.data.data);
                }
            })
            .catch(err => console.error("Gagal mengambil kategori:", err));
    }, []);

    const [namaProduk, setNamaProduk] = useState("");
    const [kategoriId, setKategoriId] = useState("");
    const [gambar, setGambar] = useState(null);

    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_produk", namaProduk);
        formData.append("id_kategori", kategoriId);
        formData.append("gambar_produk", gambar);

        axios.post("http://localhost:5000/api/produk/store", formData)
            .then(res => {
                if (res.data.status) {
                    alert("Berhasil menambahkan produk.");
                    navigate("/produk");
                } else {
                    alert("Gagal menambahkan produk.");
                }
            })
            .catch(err => {
                console.error("Error saat menambah produk:", err);
                alert("Terjadi kesalahan saat menyimpan.");
            });
    };

    return (
        <div>
            <h2>Tambah Data Produk</h2>
            <form onSubmit={Submit}>
                <label>Nama Produk</label><br />
                <input
                    type="text"
                    value={namaProduk}
                    onChange={e => setNamaProduk(e.target.value)}
                    required
                /><br /><br />

                <label>Kategori</label><br />
                <select
                    value={kategoriId}
                    onChange={e => setKategoriId(e.target.value)}
                    required
                >
                    <option value="">-- Pilih Kategori --</option>
                    {kategori.map(item => (
                        <option key={item.id_kategori} value={item.id_kategori}>
                            {item.nama_kategori}
                        </option>
                    ))}
                </select><br /><br />

                <label>Gambar Produk</label><br />
                <input
                    type="file"
                    onChange={e => setGambar(e.target.files[0])}
                    accept="image/*"
                    required
                /><br /><br />

                <button type="submit">Simpan</button>
            </form>
        </div>
    );
}

export default AddProduct;
