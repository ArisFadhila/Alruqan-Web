import React from "react";

const About = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Informasi Developer</h3>
          <div className="text-center mb-3">
            <h5>Aris Fadhila</h5>
            <p className="text-muted">Mahasiswa UIN SUSKA RIAU</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Jurusan: Teknik Informatika</li>
            <li className="list-group-item">Program Studi: S1 Teknik Informatika</li>
            <li className="list-group-item">Semester: 4</li>
            <li className="list-group-item">
              Ini adalah aplikasi Qur'an Web yang dibuat menggunakan <strong>ReactJS</strong>.
            </li>
            <li className="list-group-item">
              Untuk memenuhi tugas mata kuliah <strong>Pemrograman Web</strong>.
            </li>
            <li className="list-group-item">
              Menggunakan API dari <code>equran.id</code> untuk menampilkan data surat dan ayat.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
