import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function HasilUkur({ measurements, setMeasurements }: any) {
  const removeMeasurement = (index: number) => {
    setMeasurements(measurements.filter((_: any, i: any) => i !== index));
  };

  const getTotalPathLoss = () => {
    return measurements.reduce(
      (acc: any, curr: any) => acc + curr.results.totalLoss,
      0
    );
  };

  const getTotalDistance = () => {
    return measurements.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr.cableLength),
      0
    );
  };

  return (
    <>
      <Card className="shadow-lg border-blue-100">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">
            Hasil Pengukuran
          </h2>

          {measurements.length > 0 ? (
            <div className="space-y-6">
              {measurements.map((measurement: any, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-white border border-blue-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-blue-900">
                      {measurement.startLocation} → {measurement.endLocation}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMeasurement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipe Fiber:</span>
                      <span className="font-medium">
                        {measurement.fiberType === "singlemode"
                          ? "Single Mode"
                          : "Multi Mode"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panjang Gelombang:</span>
                      <span className="font-medium">
                        {measurement.wavelength} nm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panjang Kabel:</span>
                      <span className="font-medium">
                        {measurement.cableLength} m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Splice:</span>
                      <span className="font-medium">
                        {measurement.splicesCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah Konektor:</span>
                      <span className="font-medium">
                        {measurement.connectorsCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loss Fiber:</span>
                      <span className="font-medium">
                        {measurement.results.fiberLoss} dB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loss Splice:</span>
                      <span className="font-medium">
                        {measurement.results.spliceLoss} dB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loss Konektor:</span>
                      <span className="font-medium">
                        {measurement.results.connectorLoss} dB
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-semibold text-gray-800">
                        Total Loss:
                      </span>
                      <span className="font-semibold text-blue-800">
                        {measurement.results.totalLoss} dB
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {measurements.length > 0 && (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Total Panjang Kabel:
                    </span>
                    <span className="font-semibold">
                      {getTotalDistance()} m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">
                      Total Loss Jalur:
                    </span>
                    <span className="font-semibold text-blue-800">
                      {getTotalPathLoss().toFixed(2)} dB
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>Belum ada pengukuran</div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
