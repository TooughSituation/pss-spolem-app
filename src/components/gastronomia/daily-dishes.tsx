import { DishCard } from "@/components/gastronomia/dish-card";
import type { Dish } from "@/lib/types";

export function DailyDishes({
  dishes,
  onAdd,
}: {
  dishes: Dish[];
  onAdd: (dish: Dish) => void;
}) {
  if (!dishes.length) return null;

  return (
    <section>
      <h2 className="mb-3 px-4 text-base font-bold">Dania dnia</h2>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="w-[280px] shrink-0 snap-start">
            <DishCard dish={dish} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </section>
  );
}
