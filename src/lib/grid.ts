export interface TrailingCardLayout {
  fillsRowInTwoColumns: boolean;
  fillsRowInThreeColumns: boolean;
  spansTwoOfThreeColumns: boolean;
}

export function trailingCardLayout(index: number, count: number): TrailingCardLayout {
  const isLast = index === count - 1;
  return {
    fillsRowInTwoColumns: isLast && count % 2 === 1,
    fillsRowInThreeColumns: isLast && count % 3 === 1,
    spansTwoOfThreeColumns: isLast && count % 3 === 2,
  };
}
