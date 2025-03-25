package ro.tuc.ds2020.webSockets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebSocketsController {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public String sendMessage(@RequestBody String message) {
        template.convertAndSend("/topic/messages", message);
        return message;
    }



}
