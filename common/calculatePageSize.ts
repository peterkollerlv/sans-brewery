export const calculatePageSize = (itemCount: number, pageSize: number) => {
  const itemCountPerPage = Math.round(itemCount / pageSize);
  const fullPagesCount = Math.round(
    itemCount % pageSize > 0 ? itemCountPerPage + 1 : itemCountPerPage
  );
  console.log(`fullPagesCount: ${fullPagesCount}`);

  const result = fullPagesCount;
  console.log(`$result ${result}`);
  return result;
};
