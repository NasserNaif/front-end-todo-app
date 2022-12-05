import { VStack, Text, useToast, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../Components/TaskCard";

function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const request = await fetch(`http://localhost:5001/api/v1/todo`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      setTodos(data);
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const addTodo = async () => {
    try {
      const request = await fetch(`http://localhost:5001/api/v1/todo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: title }),
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
      fetchData();
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        position: "top",
      });
      setTitle("");
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  const deleteFunc = async (id: string) => {
    try {
      const request = await fetch(`http://localhost:5001/api/v1/todo/` + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();

      if (request.status !== 200) {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        position: "top",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  const CardTask = todos.map((task: any) => {
    return (
      <TaskCard
        key={task.id}
        title={task.name}
        DelFunc={() => deleteFunc(task.id)}
      />
    );
  });

  const LogOutFunc = () => {
    localStorage.removeItem("token");
    navigate(`/login`);
  };

  return (
    <VStack
      fontFamily="verdana"
      bg="gray.700"
      h="100vh"
      justify="center"
      color="whitesmoke"
    >
      <Text fontSize={"1.5em"}>Todo Tasks</Text>

      <VStack justify="space-between" w="30vw" p="2" border="1px solid">
        <VStack>
          {todos.length !== 0 ? (
            CardTask
          ) : (
            <Text fontSize="1.5em">you don't have tasks yet !</Text>
          )}
        </VStack>
        <VStack borderTop="1px solid" p="2" w="25vw">
          <Input
            type="text"
            bg=""
            placeholder="Enter task"
            color="gray.800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title}
          <Button
            _hover={{ bg: "blue.800" }}
            bg="blue.600"
            w="100%"
            onClick={addTodo}
          >
            add Todo
          </Button>
        </VStack>
      </VStack>
      <Button bg="red.500" _hover={{ bg: "red.700" }} onClick={LogOutFunc}>
        {" "}
        Log Out{" "}
      </Button>
    </VStack>
  );
}
export default Home;
