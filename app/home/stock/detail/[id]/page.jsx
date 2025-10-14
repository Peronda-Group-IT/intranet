import { cmsFetch } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/back-button";
import { loadTranslations } from "@/lib/server-utils";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Weight,
  Truck,
  Ruler,
  Box,
  Package,
  Layers,
  Archive,
} from "lucide-react";
import ImagesCard from "@/components/images/images-card";

const StockStatus = ({ stock, translations }) => {
  const stockValue = parseFloat(stock);
  if (stockValue > 500) {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 border-green-200"
      >
        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
        {translations["stock-status-high"]}
      </Badge>
    );
  } else if (stockValue >= 100 && stockValue <= 500) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-100 text-yellow-800 border-yellow-200"
      >
        <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
        {translations["stock-status-medium"]}
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 border-red-200"
      >
        <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
        {translations["stock-status-low"]}
      </Badge>
    );
  }
};

const MARCAS = {
  "1": "PERONDA",
  "2": "MUSEUM",
  "4": "HARMONY"
}

export default async function StockDetailPage({ params }) {
  const { id } = await params;
  const translations = await loadTranslations();

  const [empresa, grupo_cliente, codigo_producto] = id.split("-") ?? [];

  // codigo_prodcuto its contained in the las 5 digits of the string
  const id_producto = codigo_producto.slice(-5)

  const newItem = await cmsFetch(
    `/stock_intranet/${empresa}/${grupo_cliente}/${codigo_producto}`
  );

  const item = newItem[0];

  if (!item) {
    return (
      <h1 className="text-2xl font-bold">
        {translations["no-item-found"]}: {id}
      </h1>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50/50 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            {item.nombre_articulo}
          </h1>
          <p className="text-gray-500">
            {translations["product-details-title"]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {translations["stock-label"]}:
          </span>
          <StockStatus stock={item.existencias} translations={translations} />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Information Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
              <Info className="w-5 h-5 text-blue-500" />
              {translations["general-information-title"]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">{translations["series-label"]}</p>
                <p className="font-medium text-gray-800">{item.nombre_serie}</p>
              </div>
              <div>
                <p className="text-gray-500">{translations["family-label"]}</p>
                {item.nombre_familia && (
                  <Badge variant="secondary">{item.nombre_familia}</Badge>
                )}
              </div>
              <div>
                <p className="text-gray-500">{translations["format-label"]}</p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  {item.nombre_formato}
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  {translations["tariff-group-label"]}
                </p>
                {item.grupo_tarifa && (
                  <Badge variant="outline">{item.grupo_tarifa}</Badge>
                )}
              </div>
            </div>
            <div className="flex justify-around md:h-4/6 items-center pt-4 border-t">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.nombre_calidad}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {translations["quality-label"]}
                </p>
              </div>
              {item.mostrar_tono === "S" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {item.tono}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {translations["tone-label"]}
                  </p>
                </div>
              )}
              {item.mostrar_calibre === "S" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {item.calibre}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {translations["caliber-label"]}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stock Details Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
              <Package className="w-5 h-5 text-green-600" />
              {translations["stock-details-title"]}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-100/80 rounded-lg p-6">
              <p className="text-5xl font-bold text-gray-800">
                {item.existencias}
              </p>
              <p className="text-gray-500 mt-1">
                {translations["available-meters"]}
              </p>
              <div className="inline-block mt-3">
                <StockStatus
                  stock={item.existencias}
                  translations={translations}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">
                  {item.metros_caja}
                </p>
                <p className="text-sm text-gray-500">
                  {translations["meters-box-label"]}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">
                  {item.piezas_caja}
                </p>
                <p className="text-sm text-gray-500">
                  {translations["pieces-box-label"]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weight Information Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
              <Weight className="w-5 h-5 text-orange-500" />
              {translations["weight-information-title"]}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 text-center h-full items-center">
            <div>
              <div className="w-20 h-20 md:w-30 md:h-30 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Box className="w-10 h-10 md:w-18 md:h-18" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-4">
                {item.peso_pieza} kg
              </p>
              <p className="text-sm text-gray-500">
                {translations["weight-piece-label"]}
              </p>
            </div>
            <div>
              <div className="w-20 h-20 md:w-30 md:h-30 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-10 h-10 md:w-18 md:h-18" />
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-4">
                {item.peso_caja} kg
              </p>
              <p className="text-sm text-gray-500">
                {translations["weight-box-label"]}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pallet Information Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
              <Truck className="w-5 h-5 text-indigo-600" />
              {translations["pallet-information-title"]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">
                  {translations["pallet-name-label"]}
                </p>
                <p className="font-medium text-gray-800">
                  {item.nombre_pallet}
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  {translations["pallet-class-label"]}
                </p>
                {item.clase_palet && (
                  <Badge variant="secondary">{item.clase_palet}</Badge>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">
                  {translations["pallet-measures-label"]}
                </p>
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  {item.medidas_palet}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 w-fit bg-indigo-100 p-2 rounded-full">
                  <Archive className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-indigo-600">
                  {item.cajas_palet}
                </p>
                <p className="text-sm text-gray-500">
                  {translations["boxes-pallet-label"]}
                </p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="mx-auto mb-2 w-fit bg-indigo-100 p-2 rounded-full">
                  <Layers className="w-8 h-8 text-indigo-600" />
                </div>

                <p className="text-2xl font-bold text-indigo-600">
                  {item.planos_palet}
                </p>
                <p className="text-sm text-gray-500">
                  {translations["levels-pallet-label"]}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 text-sm">
              <div>
                <p className="text-gray-500">
                  {translations["boxes-level-label"]}
                </p>
                <p className="font-medium text-gray-800 text-lg">
                  {item.cajas_planos}
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  {translations["pallet-weight-label"]}
                </p>
                <p className="font-medium text-gray-800 text-lg">
                  {item.peso_palet} kg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {<div>
      <ImagesCard
        id={id_producto}
        route={`${MARCAS[item.marca_comercial]}/DESPIECES/${
          item.nombre_serie
        }`}
        
      />
      </div>
      }
    </div>
  );
}
