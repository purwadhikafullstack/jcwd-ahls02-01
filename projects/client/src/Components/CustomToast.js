import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function useToastHook() {
  const [state, setState] = useState(undefined);
  const toast = useToast();
  
  useEffect(() => {
    if (state) {
      const { title, description, status } = state;
      //status ada = success, error, warning, info

      toast({
        title: title,
        description: description,
        status: status,
        duration: 3500,
        position: "top-right",
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}