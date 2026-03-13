package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World! สบายดีไหม?";
    }
    @GetMapping("/hello/{name}")
    public String sayHelloToName(@PathVariable String name) {
        return "สวัสดี!, " + name + " ยินดีที่ได ้รู ้จัก!";
    }
    @GetMapping("/greeting")
    public String greetWithParam(@RequestParam(defaultValue = "Guest") String user) {
        return "Hi!, " + user + "!";
    }
}
