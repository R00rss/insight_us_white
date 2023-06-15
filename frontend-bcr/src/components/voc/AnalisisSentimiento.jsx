import { TacoMetro3 } from "../Graphs/tacometro/TacoMetro";

export default function AnalisisSentimiento() {
    return (
        <div>
            <h1 className="text-center text-3xl font-semibold  mb-8">Análisis de Sentimiento</h1>
            <section className="flex flex-row gap-7">

                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-lg font-normal">Medición 3 (octubre-diciembre)</h1>
                    <TacoMetro3 sizeContainer={{ width: 280 }} data={{
                        data: {
                            bajo: 1.4,
                            medio: 10.2,
                            alto: 88.4,
                            promedio: 91.8,
                        },
                        info: {
                            label: "INS",
                            name: "Indice Neto de satisfacción",
                        },
                    }} />

                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-lg font-normal">Medición 2 (mayo-agosto)</h1>
                    <TacoMetro3 sizeContainer={{ width: 280 }} data={{
                        data: {
                            bajo: 0.63,
                            medio: 12.1,
                            alto: 87.27,
                            promedio: 92.13,
                        },
                        info: {
                            label: "INS",
                            name: "Indice Neto de satisfacción",
                        },
                    }} />

                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-lg font-normal">Medición 1 (enero-abril)</h1>
                    <TacoMetro3 sizeContainer={{ width: 280 }} data={{
                        data: {
                            bajo: 0.12,
                            medio: 5.1,
                            alto: 94.78,
                            promedio: 95.78,
                        },
                        info: {
                            label: "INS",
                            name: "Indice Neto de satisfacción",
                        },
                    }}
                    />
                </div>

            </section>
        </div>
    )
}
