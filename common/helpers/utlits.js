export const pathNameFInder = (path, routes) => {
  //   const pathFInd = routes.map((item) => item === path.routes);
  console.log({ path, routes });
  const pathFInd = routes.find((item) => item.route === path);
  return pathFInd;
};
