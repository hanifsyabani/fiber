'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Link, Wifi, Plus} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import HasilUkur from "./hasil-ukur";

type FiberCoefficients = {
  fiber: number;
  splice: number;
  connector: number;
};

type WavelengthCoefficients = {
  [key: string]: FiberCoefficients;
};

type AllCoefficients = {
  singlemode: WavelengthCoefficients;
  multimode: WavelengthCoefficients;
};

const coefficients: AllCoefficients = {
  singlemode: {
    "1310": { fiber: 0.35, splice: 0.15, connector: 0.5 },
    "1550": { fiber: 0.22, splice: 0.15, connector: 0.5 },
  },
  multimode: {
    "850": { fiber: 3.0, splice: 0.15, connector: 0.5 },
    "1300": { fiber: 1.0, splice: 0.15, connector: 0.5 },
  },
};

const measurementSchema = z.object({
  fiberType: z.enum(["singlemode", "multimode"], {
    errorMap: () => ({ message: "Tipe fiber diperlukan." }),
  }),
  wavelength: z.string({
    required_error: "Panjang gelombang diperlukan.",
  }),
  startLocation: z.string().min(1, "Lokasi awal diperlukan."),
  endLocation: z.string().min(1, "Lokasi akhir diperlukan."),
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
});

type MeasurementFields = z.infer<typeof measurementSchema>;

type Measurement = MeasurementFields & {
  results: {
    fiberLoss: number;
    spliceLoss: number;
    connectorLoss: number;
    totalLoss: number;
  };
};

export default function Calculator() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [currentFiberType, setCurrentFiberType] = useState<
    "singlemode" | "multimode"
  >("singlemode");
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MeasurementFields>({
    resolver: zodResolver(measurementSchema),
  });

  const calculateLoss = (data: MeasurementFields) => {
    setIsLoadingForm(true);

    try {
      const fiberTypeCoeff = coefficients[data.fiberType];
      if (!fiberTypeCoeff) {
        toast.error("Invalid Fiber type");
      }

      const wavelengthCoeff = fiberTypeCoeff[data.wavelength];
      if (!wavelengthCoeff) {
        toast.error("Invalid wavelength");
      }

      const lengthInKm = parseFloat(data.cableLength) / 1000;

      const fiberLoss = lengthInKm * wavelengthCoeff.fiber;
      const spliceLoss = parseInt(data.splicesCount) * wavelengthCoeff.splice;
      const connectorLoss =
        parseInt(data.connectorsCount) * wavelengthCoeff.connector;
      const totalLoss = fiberLoss + spliceLoss +connectorLoss;

      const result = {
        ...data,
        results: {
          fiberLoss: parseFloat(fiberLoss.toFixed(2)),
          spliceLoss: parseFloat(spliceLoss.toFixed(2)),
          connectorLoss: parseFloat(connectorLoss.toFixed(2)),
          totalLoss: parseFloat(totalLoss.toFixed(2)),
        },
      };


      setMeasurements([...measurements, result]);
      reset({
        fiberType: currentFiberType,
        wavelength: currentFiberType === "singlemode" ? "1310" : "850",
        startLocation: "",
        endLocation: "",
        cableLength: "",
        splicesCount: "",
        connectorsCount: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-3">
            Kalkulator Loss Fiber Optik
          </h1>
          <p className="text-gray-600">
            Hitung redaman fiber optik dengan cepat dan akurat untuk multiple
            lokasi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-blue-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
                <Wifi className="h-5 w-5" /> Parameter Input
              </h2>

              <form
                onSubmit={handleSubmit(calculateLoss)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-gray-700">Tipe Fiber</Label>
                  <Select
                    onValueChange={(value: "singlemode" | "multimode") => {
                      setCurrentFiberType(value);
                      setValue("fiberType", value);
                      setValue("wavelength", "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe Fiber" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        value="singlemode"
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        Single Mode
                      </SelectItem>
                      <SelectItem
                        value="multimode"
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        Multi Mode
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.fiberType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fiberType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Panjang Gelombang</Label>
                  <Select
                    onValueChange={(value) => setValue("wavelength", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Gelombang" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {currentFiberType === "singlemode" ? (
                        <>
                          <SelectItem
                            value="1310"
                            className="hover:bg-gray-200 cursor-pointer"
                          >
                            1310 nm
                          </SelectItem>
                          <SelectItem
                            value="1550"
                            className="hover:bg-gray-200 cursor-pointer"
                          >
                            1550 nm
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem
                            value="850"
                            className="hover:bg-gray-200 cursor-pointer"
                          >
                            850 nm
                          </SelectItem>
                          <SelectItem
                            value="1300"
                            className="hover:bg-gray-200 cursor-pointer"
                          >
                            1300 nm
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.wavelength && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wavelength.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Lokasi Awal</Label>
                  <Input
                    type="text"
                    placeholder="Contoh: Lokasi A"
                    {...register("startLocation")}
                  />
                  {errors.startLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startLocation.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Lokasi Akhir</Label>
                  <Input
                    type="text"
                    placeholder="Contoh: Lokasi B"
                    {...register("endLocation")}
                  />
                  {errors.endLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endLocation.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 flex items-center gap-2">
                    <Cable className="h-4 w-4" /> Panjang Kabel (m)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 1000"
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
                    type="number"
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
                    type="number"
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
                  disabled={isLoadingForm}
                >
                  {isLoadingForm ? (
                    <span className="spinner" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 mr-2" /> Tambah Pengukuran
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <HasilUkur
            measurements={measurements}
            setMeasurements={setMeasurements}
          />
        </div>
      </div>
    </div>
  );
}
