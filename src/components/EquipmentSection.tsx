import equipment from "../data/equipment.json";
import type { EquipmentItem } from "../types/equipment";
import { Card, Badge, TextInput } from "flowbite-react";
import { useMemo, useState } from "react";

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export function EquipmentSection() {
  const items = equipment as EquipmentItem[];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b, "uk"))];
  }, [items]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return items.filter((i) => {
      const matchesQ =
        !q ||
        normalize(i.name).includes(q) ||
        normalize(i.comment).includes(q) ||
        (i.category ? normalize(i.category).includes(q) : false);

      const matchesCat = category === "all" || i.category === category;
      return matchesQ && matchesCat;
    });
  }, [items, query, category]);

  return (
    <section id="equipment" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Прайс та обладнання</h2>
          <p className="text-sm text-gray-400">Редагуй все в <code>src/data/equipment.json</code></p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук (напр. XR18, барабани, maple...)"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-700 bg-base-950 text-gray-200 px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Всі категорії" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((i, idx) => (
          <Card key={idx} className="bg-base-950 border-gray-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">{i.name}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {i.category ? <Badge color="gray">{i.category}</Badge> : <Badge color="dark">інше</Badge>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">{i.price} грн</div>
                <div className="text-xs text-gray-400">за 1 івент</div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mt-3">{i.comment}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
