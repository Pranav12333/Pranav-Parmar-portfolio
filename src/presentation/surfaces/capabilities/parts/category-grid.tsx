// src/presentation/surfaces/capabilities/parts/category-grid.tsx
import { skills } from "@domain/content";
import { StaggerGroup, StaggerItem } from "@presentation/motion/atoms/stagger";
import { glyphFor } from "../internals/category-glyphs";

/** The grouped tech-stack cards. */
const CategoryGrid = () => (
  <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {skills.map((group) => {
      const Glyph = glyphFor(group.category);
      return (
        <StaggerItem key={group.category}>
          <div className="group card card-hover h-full p-6">
            <div className="flex items-center gap-3">
              <span className="icon-tile h-11 w-11 text-xl">
                <Glyph />
              </span>
              <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {group.category}
              </h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </StaggerItem>
      );
    })}
  </StaggerGroup>
);

export default CategoryGrid;
