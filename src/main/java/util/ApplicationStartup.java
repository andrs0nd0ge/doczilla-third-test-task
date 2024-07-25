package util;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.net.URI;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {
    @SuppressWarnings("FieldCanBeLocal")
    private final String url = "http://localhost:8080";

    @Override
    public void onApplicationEvent(@NonNull ApplicationReadyEvent event) {
        openHomePage();
    }

    private void openHomePage() {
        try {
            if (Desktop.isDesktopSupported()) {
                Desktop.getDesktop().browse(new URI(url));
            } else {
                Runtime runtime = Runtime.getRuntime();
                runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
