const dashboardRouter = {
  path: "/dashboard",
  element: <div>Dashboard Layout</div>,
  children: [
    {
      index: true,
      element: <div>Dashboard Page</div>,
    },
    {
      path: "province",
      element: <div>Province Page</div>,
    },
    {
      path: "regency",
      element: <div>Regency Page</div>,
    },
  ],
};

export default dashboardRouter;
