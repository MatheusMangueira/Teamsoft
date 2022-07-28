import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import { Dashboard } from "../pages";

export const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="*" element={<Navigate to="/first-page" />} />
        <Route path="/first-page" element={<Dashboard />} />
      </Switch>

    </BrowserRouter>
  )

}