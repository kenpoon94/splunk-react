import { useState, useEffect } from "react";

type Props = {
  threshold: number;
  children: JSX.Element;
};

export const Hide = ({ threshold, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  const listenToScroll = () => {
    let heightThreshold = threshold;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    console.log(winScroll > heightThreshold);
    winScroll > heightThreshold ? setIsVisible(true) : setIsVisible(false);
  };

  return isVisible ? <>{children}</> : <></>;
};
