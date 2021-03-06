const findSeat = (low, high, letters) => {
  letters = [...letters];
  if (letters.length === 0) {
    return low;
  } else {
    const letter = letters.splice(0, 1)[0];
    const midPoint = Math.floor((high + low) / 2);

    if (letter === "F" || letter === "L") {
      return findSeat(low, midPoint, letters);
    } else if (letter === "B" || letter === "R")
      return findSeat(midPoint, high, letters);
  }
};

const getSeatIds = (boardingPasses) => {
  const seatIds = [];

  for (const boardingPass of boardingPasses) {
    const rowLetters = boardingPass.substring(0, 7);
    const columnLetters = boardingPass.substring(7, 10);
    seatIds.push(
      findSeat(0, 128, rowLetters) * 8 + findSeat(0, 8, columnLetters)
    );
  }

  return seatIds;
};

const findHighestSeat = (boardingPasses) => {
  const seatIds = getSeatIds(boardingPasses);

  return Math.max(...seatIds);
};

const range = (size, startAt = 0) => {
  return [...Array(size).keys()].map((i) => i + startAt);
};

const findSeatId = (boardingPasses) => {
  const seatIds = getSeatIds(boardingPasses);
  const completedList = [
    ...range(Math.max(...seatIds) - Math.min(...seatIds), Math.min(...seatIds)),
  ];
  const a = new Set(completedList);
  const b = new Set(seatIds);
  const a_minus_b = new Set([...a].filter((x) => !b.has(x)));

  return Array.from(a_minus_b).pop();
};

module.exports = { findSeat, findHighestSeat, findSeatId };
