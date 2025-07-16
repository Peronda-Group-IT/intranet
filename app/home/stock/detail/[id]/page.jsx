import { cmsFetch } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/back-button";
import { loadTranslations } from "@/lib/server-utils";

export default async function StockDetailPage({ params }) {
  const { id } = await params;
  const translations = await loadTranslations();

  const [empresa, grupo_cliente, codigo_producto] = id.split("-") ?? [];

  const item = await cmsFetch(
    `/stock_intranet/${empresa}/${grupo_cliente}/${codigo_producto}`
  );

  if (!item) {
    return <h1 className="text-2xl font-bold">{translations['no-item-found']}: {id}</h1>;
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.nombre_articulo}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{translations['product-details-title']}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{translations['general-information-title']}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>{translations['series-label']}:</strong> {item.nombre_serie}
              </p>
              <p>
                <strong>{translations['family-label']}:</strong> {item.nombre_familia}
              </p>
              <p>
                <strong>{translations['format-label']}:</strong> {item.nombre_formato}
              </p>
              <p>
                <strong>{translations['tariff-group-label']}:</strong> {item.grupo_tarifa}
              </p>
              <p>
                <strong>{translations['quality-label']}:</strong> {item.nombre_calidad}
              </p>
              {item.mostrar_tono === "S" && (
                <p>
                  <strong>{translations['tone-label']}:</strong> {item.tono}
                </p>
              )}
              {item.mostrar_calibre === "S" && (
                <p>
                  <strong>{translations['caliber-label']}:</strong> {item.calibre}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">{translations['stock-details-title']}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>{translations['stock-label']}:</strong> {item.existencias} {item.nombre_unidad}
              </p>
              <p>
                <strong>{translations['pieces-box-label']}:</strong> {item.piezas_caja}
              </p>
              <p>
                <strong>{translations['meters-box-label']}:</strong> {item.metros_caja}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">{translations['weight-information-title']}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>{translations['weight-piece-label']}:</strong> {item.peso_pieza} kg
              </p>
              <p>
                <strong>{translations['weight-box-label']}:</strong> {item.peso_caja} kg
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">{translations['pallet-information-title']}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>{translations['pallet-name-label']}:</strong> {item.nombre_pallet}
              </p>
              <p>
                <strong>{translations['pallet-class-label']}:</strong> {item.clase_palet}
              </p>
              <p>
                <strong>{translations['pallet-measures-label']}:</strong> {item.medidas_palet}
              </p>
              <p>
                <strong>{translations['boxes-pallet-label']}:</strong> {item.cajas_palet}
              </p>
              <p>
                <strong>{translations['levels-pallet-label']}:</strong> {item.planos_palet}
              </p>
              <p>
                <strong>{translations['boxes-level-label']}:</strong> {item.cajas_planos}
              </p>
              <p>
                <strong>{translations['pallet-weight-label']}:</strong> {item.peso_palet} kg
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="flex justify-end">
        <BackButton buttonText={translations['back-button-text']}/>
      </footer>
    </div>
  );
}
