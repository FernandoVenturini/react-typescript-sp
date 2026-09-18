import { Container } from "../../components/container";

export function Home() {
    return (
        <Container>
            {/* HEADER */}
            <section className="bg-gray-200 p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                <input
                    className="w-full border-2 rounded-lg h-9 px-3 outline-none"
                    placeholder="Digite o nome do carro..."
                />
                <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
                    Buscar
                </button>
            </section>

            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Carros novos e usados em todo o UK
            </h1>

            {/* MAIN */}
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* FIRST CARD */}
                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://m.atcdn.co.uk/a/media/w340/170831b23a9143468744b1cd1e0fd7cb.jpg"
                        alt="Carro"
                    />
                    <p className="font-bold mt-1 mb-2 px-2">Porsche Cayenne</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">3.0h V6 S TiptronicS 4WD Euro 5 (s/s) 5dr</span>
                        <span className="text-zinc-700 mb-6">MEGA SPEC | MERDAB BODYKIT | ULEZ</span>
                        <div className="flex flex-row items-center gap-4 px-2/">
                            <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">67.000 miles</span>
                            <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">2011(60reg)</span>
                        </div>
                        <strong className="text-black font-medium text-xl">£320.000</strong>
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-zinc-700">
                            Keighley (72 miles)
                        </span>
                    </div>
                </section>

                {/* SECOND CARD */}
                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://m.atcdn.co.uk/a/media/w340/630f3c19df1a4da288018931e627c361.jpg"
                        alt="Carro"
                    />
                    <p className="font-bold mt-1 mb-2 px-2">Porsche Taycan</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">Performance 79.2kWh 4S Auto 4WD 4dr (11kW Charger)</span>
                        <span className="text-zinc-700 mb-6">APPLECARPLAY | REAR CAMERA</span>
                    </div>
                    <div className="flex flex-row items-center gap-4 px-2/">
                        <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">Lower Price</span>
                        <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">17,471 miles</span>
                        <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">2021(71reg)</span>
                    </div>
                    <strong className="text-black font-medium text-xl">£36.000</strong>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-zinc-700">
                            Spalding (43 miles)
                        </span>
                    </div>
                </section>

                {/* THIRD CARD */}
                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://m.atcdn.co.uk/a/media/w340/1b4e357ac3274821a1e8004798f27aa9.jpg"
                        alt="Carro"
                    />
                    <p className="font-bold mt-1 mb-2 px-2">Porsche Boxster</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">2.7 987 2dr</span>
                        <span className="text-zinc-700 mb-6">Stunning Lava Orange 2.7Manual</span>
                        <div className="flex flex-row items-center gap-4 px-2/">
                            <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">99.600 miles</span>
                            <span className="text-zinc-700 mb-6 rounded-lg bg-gray-200 p-1">2007(07reg)</span>
                        </div>
                        <strong className="text-black font-medium text-xl">£9.950</strong>
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-zinc-700">
                            Ashford (108 miles)
                        </span>
                    </div>
                </section>

            </main>
        </Container>
    )
}