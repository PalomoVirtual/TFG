package com.ugr.monitorconsumo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/topic/update")
    @SendTo("/topic/update")
    public String handleWebsocketMessage(String message) {
        return message;
    }
}