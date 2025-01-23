import { createBrowserRouter } from "react-router-dom";
import homepageRouter from "./homepageRouter";
import authRouter from "./authRouter";
import dashboardRouter from "./dashboardRouter";

const router = createBrowserRouter([
  homepageRouter,
  authRouter,
  dashboardRouter,
]);

export default router;
