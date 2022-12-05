import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";

function TaskCard(props: any) {
  return (
    <HStack
      justify="space-between"
      m="1"
      border={"0.5px solid "}
      borderRadius="15"
      p="9px 15px "
      w="25vw"
    >
      <Text fontSize={"1.2em"}>{props.title}</Text>
      <Button
        _hover={{ backgroundColor: "red.400" }}
        bg={"red.500"}
        color={"whitesmoke"}
        onClick={props.DelFunc}
      >
        Delete
      </Button>
    </HStack>
  );
}

export default TaskCard;
