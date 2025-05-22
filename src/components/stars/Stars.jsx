import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stars({ ratingNum }) {
  const starsRate = Math.min(ratingNum, 5);

  const showGoldStar = Array.from({ length: starsRate }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={solid} style={{ color: "gold" }} />
  ));

  const showEmptyStar = Array.from({ length: 5 - starsRate }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={regularStar} />
  ));

  return (
    <>
      {showGoldStar}
      {showEmptyStar}
    </>
  );
}

export default Stars;
