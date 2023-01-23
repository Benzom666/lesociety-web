import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export default ({
  src,
  placeholderImg,
  alt,
  setLoading,
  className,
  ...props
}) => {
  const placeHolderImage =
    placeholderImg || "https://i.ibb.co/y8RhMrL/Untitled-design.png";
  // "https://secrettime-cdn.s3.eu-west-2.amazonaws.com/secret-time/uploads/Untitled%20design.png";

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
  return (
    <img
      {...props}
      alt={alt}
      // className={imgSrc !== src && "thumb"}
      src={imgSrc}
    />
  );
};
