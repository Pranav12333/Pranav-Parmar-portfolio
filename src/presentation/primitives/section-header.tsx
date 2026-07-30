// src/presentation/primitives/section-header.tsx

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  center?: boolean;
  /** Matches the section's `aria-labelledby`, so the h2 names the region. */
  id?: string;
};

/** Eyebrow + h2 + gradient rule — the heading treatment every section shares. */
export const SectionHeader = ({
  eyebrow,
  title,
  center = false,
  id,
}: SectionHeaderProps) => (
  <div className={center ? "text-center" : ""}>
    <p className="text-sm font-semibold uppercase tracking-widest brand-text">
      {eyebrow}
    </p>
    <h2 id={id} className="section-title mt-2">
      {title}
    </h2>
    <div
      className={`mt-4 h-1 w-16 rounded-full brand-gradient ${
        center ? "mx-auto" : ""
      }`}
    />
  </div>
);

export default SectionHeader;
