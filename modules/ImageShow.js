import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export default ({ src, placeholderImg, alt, setLoading, ...props }) => {
  const placeHolderImage =
    placeholderImg ||
    "https://img.freepik.com/premium-photo/black-stone-texture-dark-slate-background-top-view_88281-1206.jpg?w=2000";

  const [imgSrc, setSrc] = useState(placeHolderImage || src);
  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);

    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, [src, onLoad]);

  useEffect(() => {
    if (imgSrc === src) {
      setLoading && setLoading(false);
    }
  }, [imgSrc, src]);
  console.log("imgSrc", imgSrc);
  console.log("src", src);
  return (
    <img
      {...props}
      alt={alt}
      className={imgSrc !== src && "thumb"}
      src={imgSrc}
    />
  );
};
