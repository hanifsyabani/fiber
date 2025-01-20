'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Link, Wifi } from "lucide-react";

// Define types for our wavelength options
type WavelengthOption = '1310' | '1550';

// Define interface for our coefficients
interface Coefficients {
  fiber: number;
  splice: number;
  connector: number;
}

// Define interface for our inputs
interface CalculatorInputs {
  cableLength: string;
  splicesCount: string;
  connectorsCount: string;
  wavelength: WavelengthOption;
}

// Define interface for our results
interface CalculatorResults {
  fiberLoss: number;
  spliceLoss: number;
  connectorLoss: number;
  totalLoss: number;
}

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    cableLength: '',
    splicesCount: '',
    connectorsCount: '',
    wavelength: '1310',
  });

  const [results, setResults] = useState<CalculatorResults>({
    fiberLoss: 0,
    spliceLoss: 0,
    connectorLoss: 0,
    totalLoss: 0,
  });

  const coefficients: Record<WavelengthOption, Coefficients> = {
    '1310': {
      fiber: 0.35,
      splice: 0.1,
      connector: 0.5,
    },
    '1550': {
      fiber: 0.22,
      splice: 0.1,
      connector: 0.5,
    }
  };

  const calculateLoss = () => {
    const coeff = coefficients[inputs.wavelength];
    
    const fiberLoss = (parseFloat(inputs.cableLength) || 0) * coeff.fiber;
    const spliceLoss = (parseFloat(inputs.splicesCount) || 0) * coeff.splice;
    const connectorLoss = (parseFloat(inputs.connectorsCount) || 0) * coeff.connector;
    
    const totalLoss = fiberLoss + spliceLoss + connectorLoss;

    setResults({
      fiberLoss: parseFloat(fiberLoss.toFixed(2)),
      spliceLoss: parseFloat(spliceLoss.toFixed(2)),
      connectorLoss: parseFloat(connectorLoss.toFixed(2)),
      totalLoss: parseFloat(totalLoss.toFixed(2)),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-3">
            Kalkulator Loss Fiber Optik
          </h1>
          <p className="text-gray-600">
            Hitung redaman fiber optik dengan cepat dan akurat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="shadow-lg border-blue-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Parameter Input
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">Panjang Gelombang</Label>
                  <select 
                    name="wavelength"
                    value={inputs.wavelength}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="1310">1310 nm</option>
                    <option value="1550">1550 nm</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <Cable className="h-4 w-4" />
                    Panjang Kabel (km)
                  </Label>
                  <Input
                    type="number"
                    name="cableLength"
                    value={inputs.cableLength}
                    onChange={handleInputChange}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Jumlah Splice
                  </Label>
                  <Input
                    type="number"
                    name="splicesCount"
                    value={inputs.splicesCount}
                    onChange={handleInputChange}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 5"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Jumlah Konektor
                  </Label>
                  <Input
                    type="number"
                    name="connectorsCount"
                    value={inputs.connectorsCount}
                    onChange={handleInputChange}
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Contoh: 2"
                  />
                </div>

                <Button 
                  onClick={calculateLoss}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                  Hitung Loss
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg border-blue-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-6">
                Hasil Perhitungan
              </h2>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">Detail Loss:</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Loss Fiber:</span>
                      <span className="font-semibold text-blue-800">{results.fiberLoss} dB</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Loss Splice:</span>
                      <span className="font-semibold text-blue-800">{results.spliceLoss} dB</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Loss Konektor:</span>
                      <span className="font-semibold text-blue-800">{results.connectorLoss} dB</span>
                    </div>
                    
                    <div className="h-px bg-blue-100 my-4" />
                    
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium text-blue-900">Total Loss:</span>
                      <span className="font-bold text-blue-900">{results.totalLoss} dB</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Informasi Koefisien:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Fiber Loss ({inputs.wavelength}nm): {coefficients[inputs.wavelength].fiber} dB/km</li>
                    <li>• Splice Loss: {coefficients[inputs.wavelength].splice} dB/splice</li>
                    <li>• Connector Loss: {coefficients[inputs.wavelength].connector} dB/connector</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}