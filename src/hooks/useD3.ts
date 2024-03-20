import { useRef, useEffect } from "react";
import * as d3 from "d3";

// TODO: fix the types here

export const useD3 = (renderChartFn: any, dependencies: any) => {
  const ref: any = useRef();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);

  return ref;
};
