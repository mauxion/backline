import { Badge, Card, Pagination, Select, TabItem, Tabs, TextInput } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";


import { equipment } from "../types/equipment";

function normalize(s: string) {
  return s.toLowerCase().trim();
}


const orientation: "landscape" | "portrait" = window.innerWidth > window.innerHeight ? "landscape" : "portrait"

export function EquipmentSection() {


  // ✅ змінюється лише в коді
  const PAGE_SIZE = 4;

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);


  const categories = useMemo(() => {
    const set = new Set<string>();
    equipment.forEach((i) => i.category && set.add(i.category));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b, "uk"))];
  }, [equipment]);

  const subCategories = useMemo(() => {
    const set = new Set<string>();

    equipment.forEach((i) => {
      const matchesCat = activeCategory === "all" || i.category === activeCategory;
      if (!matchesCat) return;
      if (i.subCategory) set.add(i.subCategory);
    });

    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b, "uk"))];
  }, [equipment, activeCategory]);

  // Коли змінюється категорія (tab) — скидаємо підкатегорію
  useEffect(() => {
    setActiveSubCategory("all");
  }, [activeCategory]);

  const filtered = useMemo(() => {
    const q = normalize(query);

    return equipment.filter((i) => {
      const matchesCat = activeCategory === "all" || i.category === activeCategory;
      if (!matchesCat) return false;

      const matchesSub =
        activeSubCategory === "all" || i.subCategory === activeSubCategory;

      const label = i.subCategory ?? i.category ?? "";
      const matchesQ =
        !q ||
        normalize(i.name).includes(q) ||
        normalize(i.comment).includes(q) ||
        (i.category ? normalize(i.category).includes(q) : false) ||
        (i.subCategory ? normalize(i.subCategory).includes(q) : false) ||
        (label ? normalize(label).includes(q) : false);

      return matchesSub && matchesQ;
    });
  }, [equipment, activeCategory, activeSubCategory, query]);

  // при зміні фільтрів — на 1-шу сторінку
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // якщо поточна сторінка стала невалідною
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage, PAGE_SIZE]);

  return (

    <section id="equipment" className="max-w-6xl mx-auto px-4 pt-10 pb-6   ">
      <div className="rounded-2xl border border-gray-600 dark:bg-gray-900/60 px-4 pt-10 pb-6  ">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Прайс та обладнання</h2>

          </div>

          <div className="w-full md:w-[420px]">
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пошук (XR18, барабани, maple...)"
            />
          </div>
        </div>

        {/* Tabs (категорії) + Select (підкатегорії) */}
        <div className="mb-4 equipment-tabs">
          <Tabs
            aria-label="Категорії обладнання"
            onActiveTabChange={(idx) => setActiveCategory(categories[idx] ?? "all")}

          >
            {categories.map((c) => (
              <TabItem
                className="bg-red-500"
                key={c}
                title={c === "all" ? "Всі" : c}
                active={c === activeCategory}
              />
            ))}
          </Tabs>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-xs text-gray-400">
              Показано: <span className="text-gray-200">{filtered.length}</span> •{" "}
              Сторінка{" "}
              <span className="text-gray-200">
                {currentPage}/{totalPages}
              </span>
            </div>

            {/* ✅ Select по subCategory */}

            {subCategories.length > 1 &&
              <div className="sm:w-[320px]">

                <Select id="activeSubCategory"
                  value={activeSubCategory}
                  onChange={(e) => setActiveSubCategory(e.target.value)}
                  className=""
                  disabled={subCategories.length <= 1}
                  title={subCategories.length <= 1 ? "Немає підкатегорій для цього фільтра" : ""}
                >
                  {subCategories.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc === "all" ? "Всі підкатегорії" : sc}
                    </option>
                  ))}
                </Select>
              </div>
            }
          </div>
        </div>

        {/* Список */}
        <div className="grid md:grid-cols-2 gap-4">
          {paged.map((i, idx) => {
            const badgeLabel = i.subCategory ?? i.category ?? "інше";

            return (
              <Card key={`${i.name}-${idx}`} className=" dark:bg-gray-900/40 backdrop-blur-sm shadow  border-gray-600">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white">{i.name}</div>

                    {/* ✅ 1) показуємо subCategory якщо є, інакше category */}
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge color="gray">{badgeLabel}</Badge>
                    </div>


                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{'$' + i.price}</div>

                    {(i.amount ?? 1) > 1 &&
                      <>
                        <div className="text-xs text-gray-400">ціна за 1 шт.</div>
                        <div className="text-xs text-gray-400">наявність: {i.amount}</div>
                      </>
                    }

                  </div>
                </div>

                <p className="text-sm text-gray-300 mt-3">{i.comment}</p>
              </Card>
            );
          })}
        </div>

        {totalPages > 1 &&
          <div className="mt-6 flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              previousLabel={orientation == "portrait" ? "" : "Назад"}
              nextLabel={orientation == "portrait" ? "" : "Вперед"}


              showIcons
            />
          </div>
        }
      </div>
    </section>
  );
}
