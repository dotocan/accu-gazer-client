import { screen } from './screen';

export const SetupCanvas = () => {
  Canvas().width = screen.width;
  Canvas().height = screen.height;
  Canvas().style.position = "fixed";
};

export const ClearCanvas = () => {
  Context().clearRect(0, 0, Canvas().width, Canvas().height);
};

export const Canvas = () => document.getElementById("plotting_canvas");
export const Context = () => Canvas().getContext("2d");
