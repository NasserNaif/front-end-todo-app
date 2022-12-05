import {
  Text,
  Button,
  VStack,
  Input,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const toast = useToast();
  const navigate = useNavigate();

  const LogInFunc = async () => {
    try {
      const request = await fetch(`http://localhost:5001/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await request.json();

      if (request.status !== 201) {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          position: "top-left",
        });
        return;
      }

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        position: "top",
      });

      localStorage.setItem(`token`, data.token);
      navigate(`/`);

      console.log(localStorage.getItem(`token`));
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <VStack
      color={"white"}
      h={"100vh"}
      bg={"gray.700"}
      justify={"center"}
      align={"center"}
    >
      <Text fontSize={"1.8em"}>Log In </Text>
      <VStack
        borderRadius={20}
        p={"1em"}
        bg={" "}
        w={"25em"}
        h={"29vh"}
        border={"1px solid "}
        justify={"space-around"}
        boxShadow={"-5px 2px"}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type={"text"}
          bg={""}
          color={"black"}
          placeholder={"username"}
          w={"70%"}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"text"}
          bg={""}
          color={"black"}
          placeholder={"password"}
          w={"70%"}
        />
        <Button bg={"blue.400"} w={"70%"} onClick={LogInFunc}>
          Log In
        </Button>
      </VStack>
      <HStack>
        <Text>You don't have account ? </Text>{" "}
        <Link to={`/register`}>Register</Link>
      </HStack>
    </VStack>
  );
}

export default LogIn;
