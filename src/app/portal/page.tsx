import React from "react";

export default function StatusHotspot() {
  return (
    <div className="container">
      <div className="header">
        <h1>Status Hotspot</h1>
        <div className="company-name">PT PERTAMINA HULU ROKAN ZONA 4</div>
      </div>
      <div className="form">
        <div className="input-field">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value="kp.ict" readOnly />
        </div>
        <div className="input-field">
          <label htmlFor="ip-address">IP address:</label>
          <input type="text" id="ip-address" value="192.168.100.213" readOnly />
        </div>
        <div className="input-field">
          <label htmlFor="bytes-up-down">Bytes up / down:</label>
          <input
            type="text"
            id="bytes-up-down"
            value="11.9 MiB/51.7 MiB"
            readOnly
          />
        </div>
        <div className="input-field">
          <label htmlFor="connected-left">Connected / left:</label>
          <input type="text" id="connected-left" value="46m31s /" readOnly />
        </div>
        <div className="input-field">
          <label htmlFor="connected">Connected:</label>
          <input type="text" id="connected" value="46m31s" readOnly />
        </div>
        <div className="input-field">
          <label htmlFor="status-refresh">Status refresh:</label>
          <input type="text" id="status-refresh" value="1m" readOnly />
        </div>
        <button className="logout-button">LOGOUT</button>
        <div className="password-link">
          <a href="#">Klik DISINI Untuk Ganti Password</a>
        </div>
      </div>
      <div className="images">
        <div className="image-container">
          <img src="/image1.jpg" alt="Image 1" />
        </div>
      </div>
    </div>
  );
}
