import { Badge, Button, Card } from "flowbite-react";
import { useMemo } from "react";

import { equipment } from "../types/equipment";
import packages from "../data/packages.json";

import type { EquipmentItem } from "../types/equipment";
import type { PackageDef } from "../types/packages";

type ResolvedItem = {
  name: string;
  found: boolean;
  price?: number;
  category?: string;
};

export function PackagesSection() {

  const packageDefs = packages as PackageDef[];

  const equipmentByName = useMemo(() => {
    const map = new Map<string, EquipmentItem>();
    for (const it of equipment) map.set(it.name, it);
    return map;
  }, [equipment]);

  const resolvedPackages = useMemo(() => {
    return packageDefs.map((p) => {
      const resolved: ResolvedItem[] = p.items.map((name) => {
        const it = equipmentByName.get(name);
        if (!it) return { name, found: false };
        return {
          name: it.name,
          found: true,
          price: it.price,
          category: it.category,
        };
      });

      const total = resolved
        .filter((x) => x.found && typeof x.price === "number")
        .reduce((sum, x) => sum + (x.price ?? 0), 0);

      const missingCount = resolved.filter((x) => !x.found).length;

      return { ...p, resolved, total, missingCount };
    });
  }, [packageDefs, equipmentByName]);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-6   ">
      <div className="rounded-2xl border border-gray-600 dark:bg-gray-900/60 px-4 pt-10 pb-6  ">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Пакети</h2>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {resolvedPackages.map((p) => {
            const base = " dark:bg-gray-900/40 h-fit backdrop-blur-sm shadow  "
            const cardClass = base + (p.highlight
              ? " border-blue-600/40"
              : " border-gray-600");

            return (
              <Card key={p.id} id= {'card'+p.id} className={cardClass}>
                <div className="flex items-start justify-between gap-3  ">
                  <div>
                    <div className="text-sm text-gray-400">{p.name}</div>
                    {p.highlight ? <Badge color="info" className="mt-2">Рекомендовано</Badge> : null}
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      {"$"+p.total}
                    </div>
                    <div className="text-xs text-gray-400">за 1 івент</div>
                  </div>
                </div>

                {p.comment ? (
                  <p className="text-sm text-gray-300 mt-2">{p.comment}</p>
                ) : null}

                <div className="mt-3 space-y-2 text-sm">
                  {p.resolved.map((it, idx) => (
                    <div
                      key={`${p.id}-${idx}-${it.name}`}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="text-gray-200">
                        {it.found ? "• " : "⚠ "}
                        {it.name.replace(/\([^)]*\)/g, "").trim()}  
                        {it.category ? (
                          <span className="text-xs text-gray-500"> — {it.category}</span>
                        ) : null}
                      </div>
                      <div className="text-gray-300 font-medium">
                        {it.found ? `$${it.price}` : "не знайдено"}
                      </div>
                    </div>
                  ))}
                </div>

                {p.missingCount > 0 ? (
                  <div className="mt-3 text-xs text-amber-300">
                    ⚠ У пакеті є {p.missingCount} позицій, яких немає в equipment.json (перевір назви).
                  </div>
                ) : null}

                <div className="mt-4 flex gap-2">
                  <Button color={p.highlight ? "blue" : "gray"} href="#contacts" className="w-full">
                    Забронювати
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
