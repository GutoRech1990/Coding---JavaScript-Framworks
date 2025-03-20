import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<h1>Bonjour</h1>}/>)
)

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;
