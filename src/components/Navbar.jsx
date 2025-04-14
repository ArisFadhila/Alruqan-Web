import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookOpen, FaInfoCircle, FaKaaba } from "react-icons/fa";

const Navbar = () => {
  const [surat, setSurat] = useState([]);
  const location = useLocation();

  const getDataFromAPI = () => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => setSurat(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div className="bg-dark text-white vh-100 p-4 overflow-auto" style={{ width: "250px" }}>
      <div className="text-center mb-4">
        <FaKaaba size={40} color="#00FFB2" />
        <h4 className="mt-2">Qur'an Web</h4>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className={`nav-link text-white ${location.pathname === "/" ? "fw-bold text-warning" : ""}`}>
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-white" data-bs-toggle="collapse" href="#submenu1"
            role="button" aria-expanded="true" aria-controls="submenu1">
            <FaBookOpen className="me-2" />
            Surat
          </a>
          <div className="collapse show" id="submenu1">
            <ul className="nav flex-column ms-3 mt-2">
              {surat.map((surah) => (
                <li key={surah.nomor} className="nav-item mb-1">
                  <Link
                    to={`/surat/${surah.nomor}`}
                    className={`nav-link text-white small ${location.pathname.includes(`/surat/${surah.nomor}`) ? "text-info" : ""}`}
                  >
                    {surah.nomor}. {surah.namaLatin}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="nav-item mt-3">
          <Link to="/about" className={`nav-link text-white ${location.pathname === "/about" ? "fw-bold text-warning" : ""}`}>
            <FaInfoCircle className="me-2" />
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
