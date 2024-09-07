package dev.deerops.bookstoreapi.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tüm URL'ler için CORS'u etkinleştir
                .allowedOrigins("http://localhost:5173") // 5173 portundan gelen istekleri kabul et
                .allowedMethods("GET", "POST", "PUT", "DELETE") // İzin verilen HTTP metodları
                .allowedHeaders("*") // İzin verilen header'lar
                .allowCredentials(true); // Çerezler için izin
    }
}
