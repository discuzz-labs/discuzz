// Interfaces and Types
interface PointsSystem {
  newPost: number;
  newComment: number;
  likeOnPost: number;
  likeOnComment: number;
}

interface Level {
  name: string;
  minPoints: number;
}

// Constants
export const pointsSystem: PointsSystem = {
  newPost: 100,
  newComment: 10,
  likeOnPost: 200,
  likeOnComment: 50,
};

export const minPointsToBeVerified = 500;
export const minPointsToCreateCategory = minPointsToBeVerified;
export const minPointsToCreateKeywords = minPointsToBeVerified;

const levels: Level[] = [
  { name: "BRONZE", minPoints: 0 },
  { name: "SILVER", minPoints: 1000 },
  { name: "GOLD", minPoints: 5000 },
  { name: "PLATINUM", minPoints: 10000 },
  { name: "DIAMOND", minPoints: 20000 },
  { name: "LEGENDARY", minPoints: 50000 },
];

/**
 * Determines the user level based on the provided points.
 *
 * @param points - The total points of the user.
 * @returns The corresponding user level.
 */
export default function getUserLevel(points: number): Level {
  return (
    levels
      .slice()
      .reverse()
      .find((level) => points >= level.minPoints) || levels[0]
  );
}
