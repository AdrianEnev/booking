import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/booking": {};
  "/booking/services/:date/:hour": {
    "date": string;
    "hour": string;
  };
  "/booking/services/:date/:hour/:service": {
    "date": string;
    "hour": string;
    "service": string;
  };
  "/login": {};
  "/account": {};
  "/admin/dashboard": {};
  "/admin/appointments": {};
};