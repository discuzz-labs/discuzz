interface PointsSystem {
  newPost: number;
  newComment: number;
  likeOnPost: number;
  likeOnComment: number;
  follower: number;
}

const pointsSystem: PointsSystem = {
  newPost: 100,
  newComment: 10,
  likeOnPost: 200,
  likeOnComment: 50,
  follower: 500,
};

interface Level {
  name: string;
  minPoints: number;
}

const levels: Level[] = [
  { name: "BRONZE", minPoints: 0 },
  { name: "SILVER", minPoints: 1000 },
  { name: "GOLD", minPoints: 5000 },
  { name: "PLATINUM", minPoints: 10000 },
  { name: "DIAMOND", minPoints: 20000 },
  { name: "LEGENDARY", minPoints: 50000 },
];

// Function to determine user level based on points
export default function getUserLevel(points: number): Level {
  return (
    levels
      .slice()
      .reverse()
      .find((level) => points >= level.minPoints) || levels[0]
  );
}
