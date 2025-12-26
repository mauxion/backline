import { Button, Badge } from "flowbite-react";

export function Hero() {
  const heroBg =
    "card_bg.jpg";

  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
      <div className="relative overflow-hidden rounded-2xl border border-gray-600 bg-base-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-gray-900/60 backdrop-blur-sm shadow"

        //style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/70 to-transparent" />

        <div className="relative p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge color="info">Backline</Badge>
            <Badge color="purple">Live sound</Badge>
            <Badge color="success">IEM</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            backline.com.ua — оренда беклайну та звуку для концертів
          </h1>
          <p className="text-gray-300 mt-3 max-w-2xl">
            Барабани (включно з кастомними), мікшери XR18 / X32 Rack, мікрофони,
            комплект барабанних мікрофонів та дротовий IEM до 6 музикантів.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button color="blue" href="#equipment">Дивитись прайс</Button>
            <Button color="gray" href="#contacts">Забронювати дату</Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            * Ціни — за 1 івент (до 24 год). Доставка/монтаж/звукореж — за домовленістю.
          </div>
        </div>
      </div>
    </section>
  );
}
