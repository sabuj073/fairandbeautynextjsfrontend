import { StartActiveIcon, StartIcon } from "@/app/ui/Icons/Icons";
import clsx from "clsx";
type StarRatingProps = {
  rating: number;
  className?: string;
  width?: number
  height?: number
};
const StarRating: React.FC<StarRatingProps> = ({ rating, className, width, height }) => {
  const totalStars = 5;
  const activeStars = Math.min(Math.max(rating, 0), totalStars);
  const inactiveStars = totalStars - activeStars;

  return (
    <div className={clsx("flex justify-center items-center ", className)}>
      {Array.from({ length: activeStars }).map((_, index) => (
        <StartActiveIcon width={width} height={height} key={`active-${index}`} />
      ))}
      {Array.from({ length: inactiveStars }).map((_, index) => (
        <StartIcon width={width} height={height} key={`inactive-${index}`} />
      ))}
    </div>
  );
}

export default StarRating;
