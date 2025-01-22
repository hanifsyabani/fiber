"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Link, Wifi } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
// import { getFirestore, addDoc, collection } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Define validation schema using Zod
const schema = z.object({
  cableLength: z
    .string()
    .regex(/^[0-9]+(\.[0-9]*)?$/, {
      message: "Panjang kabel harus berupa angka.",
    })
    .nonempty({ message: "Panjang kabel diperlukan." }),
  splicesCount: z
    .string()
    .regex(/^[0-9]+$/, { message: "Jumlah splice harus berupa angka." })
    .nonempty({ message: "Jumlah splice diperlukan." }),
  connectorsCount: z
    .string()
    .regex(/^[0-9]+$/, { message: "Jumlah konektor harus berupa angka." })
    .nonempty({ message: "Jumlah konektor diperlukan." }),
  wavelength: z.enum(["1310", "1550"], {
    errorMap: () => ({ message: "Panjang gelombang diperlukan." }),
  }),
});

type FormFields = z.infer<typeof schema>;

type CalculatorResults = {
  fiberLoss: number;
  spliceLoss: number;
  connectorLoss: number;
  totalLoss: number;
};

export default function Calculator() {
  const [results, setResults] = useState<CalculatorResults | null>(null);

  const coefficients = {
    "1310": { fiber: 0.35, splice: 0.1, connector: 0.5 },
    "1550": { fiber: 0.22, splice: 0.1, connector: 0.5 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const calculateLoss = (data: FormFields) => {
    const coeff = coefficients[data.wavelength];
    const fiberLoss = parseFloat(data.cableLength) * coeff.fiber;
    const spliceLoss = parseInt(data.splicesCount) * coeff.splice;
    const connectorLoss = parseInt(data.connectorsCount) * coeff.connector;
    const totalLoss = fiberLoss + spliceLoss + connectorLoss;

    const result = {
      fiberLoss: parseFloat(fiberLoss.toFixed(2)),
      spliceLoss: parseFloat(spliceLoss.toFixed(2)),
      connectorLoss: parseFloat(connectorLoss.toFixed(2)),
      totalLoss: parseFloat(totalLoss.toFixed(2)),
    };

    setResults(result);

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

        <form
          onSubmit={handleSubmit(calculateLoss)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Input Card */}
          <Card className="shadow-lg border-blue-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
                <Wifi className="h-5 w-5" /> Parameter Input
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">Panjang Gelombang</Label>
                  <Select
                    onValueChange={(value: "1310" | "1550") =>
                      setValue("wavelength", value)
                    }
                    defaultValue=""
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Gelombang" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1310">1310 nm</SelectItem>
                      <SelectItem value="1550">1550 nm</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.wavelength && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wavelength.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <Cable className="h-4 w-4" /> Panjang Kabel (km)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Contoh: 10"
                    {...register("cableLength")}
                  />
                  {errors.cableLength && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cableLength.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <Link className="h-4 w-4" /> Jumlah Splice
                  </Label>
                  <Input
                    type="text"
                    placeholder="Contoh: 5"
                    {...register("splicesCount")}
                  />
                  {errors.splicesCount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.splicesCount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Jumlah Konektor
                  </Label>
                  <Input
                    type="text"
                    placeholder="Contoh: 2"
                    {...register("connectorsCount")}
                  />
                  {errors.connectorsCount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.connectorsCount.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
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
                    <h3 className="text-lg font-medium text-blue-900 mb-4">
                      Detail Loss:
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Loss Fiber:</span>
                        <span className="font-semibold text-blue-800">
                          {results?.fiberLoss} dB
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Loss Splice:</span>
                        <span className="font-semibold text-blue-800">
                          {results?.spliceLoss} dB
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Loss Konektor:</span>
                        <span className="font-semibold text-blue-800">
                          {results?.connectorLoss} dB
                        </span>
                      </div>

                      <div className="h-px bg-blue-100 my-4" />

                      <div className="flex justify-between items-center text-lg">
                        <span className="font-medium text-blue-900">
                          Total Loss:
                        </span>
                        <span className="font-bold text-blue-900">
                          {results?.totalLoss} dB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </form>
      </div>
    </div>
  );
}
