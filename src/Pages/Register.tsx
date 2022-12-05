import {
  Button,
  HStack,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const toast = useToast();
  const navigate = useNavigate();

  const RegisterFunc = async () => {
    try {
      if (password !== confirmPassword) {
        toast({
          title: "confirm password does't match with password !",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      const request = await fetch(
        `http://localhost:5001/api/v1/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

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
      navigate(`/login`);
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
        h={"39vh"}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"text"}
          bg={""}
          color={"black"}
          placeholder={"email"}
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
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={"text"}
          bg={""}
          color={"black"}
          placeholder={"confirm password"}
          w={"70%"}
        />
        <Button bg={"blue.400"} w={"70%"} onClick={RegisterFunc}>
          Register
        </Button>
      </VStack>
      <HStack>
        <Text>Already have accunt ? </Text> <Link to={`/login`}>Log In</Link>
      </HStack>
    </VStack>
  );
}

export default Register;
