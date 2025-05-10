import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduk() {
    const [kategori, setKategori] = useState([]);
    const [nama, setNamaProduk] = useState("");
    const [kategoriId, setKategoriId] = useState("");
    const [gambarLama, setGambarLama] = useState("");
    const [gambar, setGambar] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/kategori')
            .then(res => {
                if (res.data.status && res.data.data) {
                    setKategori(res.data.data); 
                }
            })
            .catch(err => console.error("Gagal mengambil kategori:", err));

        axios.get(`http://localhost:5000/api/produk/${id}`)
            .then(res => {
                if (res.data.status && res.data.data && res.data.data.length > 0) {
                    const data = res.data.data[0];
                    setNamaProduk(data.nama_produk);
                    setKategoriId(data.id_kategori);
                    setGambarLama(data.gambar_produk);
                } else {
                    alert("Produk tidak ditemukan");
                }
            })
            .catch(err => console.error("Gagal mengambil produk:", err));
    }, [id]);

    const Submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_produk", nama);
        formData.append("id_kategori", kategoriId);
        if (gambar) {
            formData.append("gambar_produk", gambar);
        }

        axios.patch(`http://localhost:5000/api/produk/update/${id}`, formData)
            .then(res => {
                if (res.data.status) {
                    alert("Produk berhasil diperbarui");
                    navigate("/produk");
                } else {
                    alert("Gagal memperbarui produk");
                }
            })
            .catch(err => {
                console.error("Error saat update:", err);
                alert("Terjadi kesalahan saat memperbarui");
            });
    };

    return (
        <div>
            <h1>Edit Produk</h1>
            <form onSubmit={Submit}>
                <label>Nama Produk</label><br />
                <input 
                    type="text" 
                    value={nama} 
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

                <label>Gambar Baru (Opsional)</label><br />
                <input 
                    type="file" 
                    onChange={e => setGambar(e.target.files[0])} 
                    accept="image/*"
                /><br /><br />

                {gambarLama && (
                    <div>
                        <p>Gambar Saat Ini:</p>
                        <img 
                            src={`http://localhost:5000/images/${gambarLama}`} 
                            height="100" 
                            alt="Gambar Lama" 
                        />
                    </div>
                )}

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditProduk;
