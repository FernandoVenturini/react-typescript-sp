import { Container } from "../../components/container";

export function Home() {
    return (
        <Container>
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
                Carros novos e usados em todo o Brasil
            </h1>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202608/20260812/bmw-x5-3.0-i6-turbo-hibrido-xdrive45e-m-sport-automatico-wmimagem11440365046.jpg?s=fill&w=242&h=190&q=70&type=webp" 
                        alt="Carro" 
                    />
                    <p className="font-bold mt-1 mb-2 px-2">BMW X5</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
                        <strong className="text-black font-medium text-xl">R$ 320.000</strong>
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-black">
                            Sao Paulo - SP
                        </span>
                    </div>
                </section>

                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://m.atcdn.co.uk/a/media/w340/dc23a87b61d6407a9fd0836337fd6b0a.jpg" 
                        alt="Carro" 
                    />
                    <p className="font-bold mt-1 mb-2 px-2">Volvo V90</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">Ano 2020/2021 | 23.000 km</span>
                        <strong className="text-black font-medium text-xl">R$ 520.000</strong>
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-black">
                            Sao Paulo - SP
                        </span>
                    </div>
                </section>

                <section className="w-full bg-white rounded-lg">
                    <img
                        className="w-full rounded-lg mb-2 max-h-100 hover:scale-105 transition-all"
                        src="https://m.atcdn.co.uk/a/media/w260/95e3b493fe63420783ea16ff1bf06b00.jpg" 
                        alt="Carro" 
                    />
                    <p className="font-bold mt-1 mb-2 px-2">Porsche Taycan</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">Ano 2023/2023 | 23.000 km</span>
                        <strong className="text-black font-medium text-xl">R$370.000</strong>
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-black">
                            Sao Paulo - SP
                        </span>
                    </div>
                </section>

            </main>
        </Container>
    )
}