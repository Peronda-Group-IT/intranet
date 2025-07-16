import { cmsFetch } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/back-button";

export default async function StockDetailPage({ params }) {
  const { id } = await params;

  const [empresa, grupo_cliente, codigo_producto] = id.split("-") ?? [];

  const item = await cmsFetch(
    `/stock_intranet/${empresa}/${grupo_cliente}/${codigo_producto}`
  );

  if (!item) {
    return <h1 className="text-2xl font-bold">No item found for ID: {id}</h1>;
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">{item.nombre_articulo}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>Series:</strong> {item.nombre_serie}
              </p>
              <p>
                <strong>Family:</strong> {item.nombre_familia}
              </p>
              <p>
                <strong>Format:</strong> {item.nombre_formato}
              </p>
              <p>
                <strong>Tariff Group:</strong> {item.grupo_tarifa}
              </p>
              <p>
                <strong>Quality:</strong> {item.nombre_calidad}
              </p>
              {item.mostrar_tono === "S" && (
                <p>
                  <strong>Tone:</strong> {item.tono}
                </p>
              )}
              {item.mostrar_calibre === "S" && (
                <p>
                  <strong>Caliber:</strong> {item.calibre}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Stock Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>Stock:</strong> {item.existencias} {item.nombre_unidad}
              </p>
              <p>
                <strong>Pieces/Box:</strong> {item.piezas_caja}
              </p>
              <p>
                <strong>Meters/Box:</strong> {item.metros_caja}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Weight Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>Weight/Piece:</strong> {item.peso_pieza} kg
              </p>
              <p>
                <strong>Weight/Box:</strong> {item.peso_caja} kg
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Pallet Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>Pallet Name:</strong> {item.nombre_pallet}
              </p>
              <p>
                <strong>Pallet Class:</strong> {item.clase_palet}
              </p>
              <p>
                <strong>Pallet Measures:</strong> {item.medidas_palet}
              </p>
              <p>
                <strong>Boxes/Pallet:</strong> {item.cajas_palet}
              </p>
              <p>
                <strong>Levels/Pallet:</strong> {item.planos_palet}
              </p>
              <p>
                <strong>Boxes/Level:</strong> {item.cajas_planos}
              </p>
              <p>
                <strong>Pallet Weight:</strong> {item.peso_palet} kg
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="flex justify-end">
        <BackButton />
      </footer>
    </div>
  );
}
