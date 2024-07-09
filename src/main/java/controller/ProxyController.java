package controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController
@RequestMapping("api/proxy/todos")
public class ProxyController {
    private final RestTemplate restTemplate;

    public ProxyController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private ResponseEntity<String> fetchGetResponse(String externalApiUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(externalApiUrl, HttpMethod.GET, entity, String.class);
    }

    @GetMapping
    public ResponseEntity<String> proxyTodos() {
        String externalApiUrl = "https://todo.doczilla.pro/api/todos";

        ResponseEntity<String> response = fetchGetResponse(externalApiUrl);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("date")
    public ResponseEntity<String> proxyTodosDate(@RequestParam long from,
                                                 @RequestParam long to,
                                                 @RequestParam boolean status) {
        String externalApiUrl = "https://todo.doczilla.pro/api/todos/date?";

        @SuppressWarnings("StringBufferReplaceableByString")
        StringBuilder sb = new StringBuilder(externalApiUrl);

        sb.append("from=").append(from);
        sb.append("&to=").append(to);
        sb.append("&status=").append(status);

        ResponseEntity<String> response = fetchGetResponse(sb.toString());

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("find")
    public ResponseEntity<String> proxyTodosFind(@RequestParam String q) {
        String externalApiUrl = "https://todo.doczilla.pro/api/todos/find?";

        @SuppressWarnings("StringBufferReplaceableByString")
        StringBuilder sb = new StringBuilder(externalApiUrl);

        sb.append("q=").append(q);

        ResponseEntity<String> response = fetchGetResponse(sb.toString());

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
