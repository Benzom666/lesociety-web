import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef();

  const url = "https://staging-api.secrettime.com/";

  useEffect(() => {
    socketRef.current = io(url, {
      autoConnect: true,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [url]);

  return socketRef.current;
};

export default useSocket;
