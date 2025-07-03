import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/booking": {};
  "/login": {};
  "/account": {};
  "/admin/dashboard": {};
  "/admin/appointments": {};
  "/contact": {};
};