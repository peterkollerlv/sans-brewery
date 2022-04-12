export const calculatePageSize = (itemCount: number, pageSize: number) => {
  const fullPagesCount = Math.round(itemCount / pageSize);
  console.log(`fullPagesCount: ${fullPagesCount}`);

  const result = fullPagesCount;
  console.log(`$result ${result}`);
  return result;
};
