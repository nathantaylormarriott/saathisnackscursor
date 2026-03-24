interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Unused - kept so existing call sites stay valid */
  spotlightColor?: string;
  /** Warmer paper fill when the section background is soft sand (or similar) */
  onSand?: boolean;
}

/** Static card surface (no cursor spotlight / hover glow) */
const SpotlightCard = ({ children, className = "", onSand }: SpotlightCardProps) => {
  const surface = onSand ? "spotlight-card--on-sand" : "spotlight-card";
  return <div className={`${surface} ${className}`}>{children}</div>;
};

export default SpotlightCard;
