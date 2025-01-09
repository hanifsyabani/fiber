'use client'
import React, { useState } from 'react';
import './globals.css';

function App() {
  // State untuk input daya dan jumlah port
  const [inputPower, setInputPower] = useState<number | string>('');
  const [splitterPorts, setSplitterPorts] = useState<number | string>('');
  const [powerLoss, setPowerLoss] = useState<string | null>(null);
  const [powerLossPerPort, setPowerLossPerPort] = useState<string | null>(null);

  // Fungsi untuk menangani perubahan nilai daya input
  const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPower(e.target.value);
  };

  // Fungsi untuk menangani perubahan nilai jumlah port
  const handlePortsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSplitterPorts(e.target.value);
  };

  // Fungsi untuk menangani form submit dan perhitungan daya
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    const power = parseFloat(inputPower.toString());
    const ports = parseInt(splitterPorts.toString());

    if (isNaN(power) || isNaN(ports) || ports <= 1) {
      alert('Harap masukkan nilai daya input yang valid dan jumlah port lebih dari 1.');
      return;
    }

    // Perhitungan loss per port dan total power loss
    const calculatedPowerLossPerPort = 10 * Math.log10(ports);
    const calculatedPowerLoss = power - calculatedPowerLossPerPort;

    // Menyimpan hasil perhitungan ke state
    setPowerLoss(calculatedPowerLoss.toFixed(2));
    setPowerLossPerPort(calculatedPowerLossPerPort.toFixed(2));
  };

  return (
    <div className="container">
      <h1>SiFO</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="input-power">Daya Input (dBm):</label>
          <input
            type="number"
            id="input-power"
            value={inputPower}
            onChange={handlePowerChange}
            placeholder="Masukkan daya input (dBm)"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="splitter-ports">Jumlah Port Splitter:</label>
          <input
            type="number"
            id="splitter-ports"
            value={splitterPorts}
            onChange={handlePortsChange}
            placeholder="Masukkan jumlah port"
            required
          />
        </div>
    <div> 
    <button className ="button"> Hitung</button>

    </div>
      </form>

      <div id="result">
        {powerLoss !== null && (
          <>
            <h3>Hasil Perhitungan:</h3>
            <p>Rasio Pembagian Daya: <strong>{powerLoss}</strong> dB</p>
            <p>Rasio Pembagian Daya per Port: <strong>{powerLossPerPort}</strong> dB</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;