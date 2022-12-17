import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export default ({ src, placeholderImg, alt, setLoading, ...props }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
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
    if (imgSrc !== src) {
      setLoading && setLoading(false);
    }
  }, [imgSrc, src]);
  return (
    <img
      {...props}
      alt={alt}
      className={imgSrc !== src && "thumb"}
      src={imgSrc}
    />
  );
};
