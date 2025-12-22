import { Card, Button } from "flowbite-react";

export function ContactsSection() {
  return (
    <section id="contacts" className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-base-950 border-gray-800">
          <h2 className="text-2xl font-bold text-white">Контакти</h2>
          <p className="text-gray-300 text-sm">
            Замінити контакти можна прямо тут у компоненті <code>ContactsSection.tsx</code>.
          </p>

          <div className="mt-3 space-y-2 text-sm text-gray-200">
            <div className="flex justify-between gap-2">
              <span className="text-gray-400">Телефон</span>
              <a className="hover:underline" href="tel:+380000000000">+38 (000) 000-00-00</a>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-gray-400">Telegram</span>
              <a className="hover:underline" href="https://t.me/yourhandle" target="_blank" rel="noreferrer">
                @yourhandle
              </a>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-gray-400">Email</span>
              <a className="hover:underline" href="mailto:you@mail.com">you@mail.com</a>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-gray-400">Місто</span>
              <span>Київ (або своє)</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button color="blue" href="#equipment">Прайс</Button>
            <Button color="gray" href="https://t.me/yourhandle" target="_blank">Написати</Button>
          </div>
        </Card>

        <Card className="bg-base-950 border-gray-800">
          <h3 className="text-lg font-semibold text-white">Умови</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Ціни — за 1 івент (до 24 год).</li>
            <li>• Наступний день — 50% (за домовленістю).</li>
            <li>• Доставка/монтаж/звукореж — окремо.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
