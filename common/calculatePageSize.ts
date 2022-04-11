export const calculatePageSize = (itemCount: number, pageSize: number) => {
  const fullPagesCount = itemCount / pageSize;
  console.log(`fullPagesCount: ${fullPagesCount}`);

  const result = itemCount % pageSize > 0 ? fullPagesCount + 1 : fullPagesCount;
  console.log(`$result ${result}`);
  return result;
};
