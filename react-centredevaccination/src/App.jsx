import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router}/>
}

export default App
