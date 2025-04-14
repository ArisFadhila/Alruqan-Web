import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { FaPlay, FaPause } from "react-icons/fa";


const DetailSurat = () => {
  const { id } = useParams(); // Ambil parameter dari URL
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null); // Referensi untuk audio

  const getDataFromAPI = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const playFullSurat = () => {
    if (surat.ayat?.length > 0) {
      const audioSources = surat.ayat.map(ayat => ayat.audio["01"]);
      playPlaylist(audioSources);
    }
  };

  const playPlaylist = (sources, index = 0) => {
    if (index >= sources.length) return;
    
    audioRef.current.src = sources[index];
    audioRef.current.play();
    
    audioRef.current.onended = () => {
      playPlaylist(sources, index + 1);
    };
  };
  useEffect(() => {
    getDataFromAPI(id);
  }, [id]); // Jalankan useEffect setiap `id` berubah

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <>
      <div className="vh-100 overflow-auto">
        <h2>
          {surat.namaLatin} ({surat.nama})
        </h2>
        <button className="btn btn-primary me-2">
        <FaPlay className="me-1" /> Play Seluruh Surat
        </button> 
        <button className="btn btn-danger">
          <FaPause className="me-1" /> Pause
        </button>
        <audio ref={audioRef} style={{ display: 'none' }} />
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>
        <p>Arti: {surat.arti}</p>
        <p>Deskripsi: {parse(surat.deskripsi)}</p>
        
        {surat.audio?.["01"] && (
          <div className="mt-2">
            <audio controls>
              <source src={surat.audio["01"]} type="audio/mp3" />
              Browser kamu tidak mendukung audio.
            </audio>
          </div>
        )}
        <div>
          <ul className="list-group">
          <ul className="list-group">

      {surat.ayat.map((ayat) => (
        <li key={ayat.nomorAyat} className="list-group-item">
        <div className="d-flex justify-content-between align-items-center arabic-text">
          <span className="fs-4">{ayat.teksArab}</span>
          <span className="badge text-bg-primary rounded-pill">
          {ayat.nomorAyat}
        </span>
      </div>
      <div className="fst-italic text-end">{ayat.teksLatin}</div>
      <div className="text-muted">Artinya: {ayat.teksIndonesia}</div>
      {ayat.tafsir && (
              <div className="tafsir-section bg-light p-3 rounded">
                <h5 className="d-flex align-items-center">
                  <FaBook className="text-primary me-2" />
                  <span>Tafsir Ayat {ayat.nomorAyat}</span>
                </h5>
                <div className="tafsir-content mt-2">
                  {typeof ayat.tafsir === 'object' 
                    ? parse(ayat.tafsir?.id?.kemenag || ayat.tafsir?.id || JSON.stringify(ayat.tafsir))
                    : parse(ayat.tafsir)}
                </div>
              </div>
            )}
                {!ayat.tafsir && (
                  <div className="alert alert-info mt-3">
                    Tafsir tidak tersedia untuk ayat ini
                  </div>
                )}
    </li>
     ))} 
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DetailSurat;
