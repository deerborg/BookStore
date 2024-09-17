# Kütüphane Yönetim Sistemi

Kütüphaneler tarafından kullanılabilecek kayıt yönetimlerini, kitap ödünç verme ve alma işlemlerini yapabilecekleri Rest API projesidir.
## Kullanılan Teknolojiler

<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117201156-9a724800-adec-11eb-9a9d-3cd0f67da4bc.png" alt="Java" title="Java"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183891303-41f257f8-6b3d-487c-aa56-c497b880d0fb.png" alt="Spring Boot" title="Spring Boot"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117207242-07d5a700-adf4-11eb-975e-be04e62b984b.png" alt="Maven" title="Maven"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" title="MySQL"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST" title="REST"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="Swagger" title="Swagger"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108890-200809d1-439c-4e23-90d3-b090cf9a4eea.png" alt="IntelliJ" title="IntelliJ"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></code>

## Özellikler

- Yazar, kategori, yayınevi ekleme, güncelleme, silme işlemleri yapılır.
- Kitapların stok bilgileri tutulur.
- Kitapların ödünç verme ve geri alma kayıtları tutulur.

## Ekran Görüntüleri
- UML diyagram
  <img src="src/main/resources/images/uml.png" alt="Diagram_1" width="" />

## API Kullanımı
Aşağıda, API'nin sunduğu temel endpoint'lerin bir listesi bulunmaktadır:


| Endpoint                   | HTTP Metodu | Açıklama                                            |
|----------------------------|:------------|-----------------------------------------------------|
| **author**                 |             |                                                     |
| `/api/v1/authors/{id}`     | GET         | Belirtilen ID'ye sahip yazarı getirir               |
| `/api/v1/authors/{id}`     | PUT         | Belirtilen ID'ye sahip yazarı günceller             |
| `/api/v1/authors/{id}`     | DELETE      | Belirtilen ID'ye sahip yazarı siler                 |
| `/api/v1/authors`          | GET         | Tüm yazarları getirir                               |
| `/api/v1/authors`          | POST        | Yazar ekler                                         |
|                            |             |                                                     |
| **publisher**              |             |                                                     |
| `/api/v1/publishers/{id}`  | GET         | Belirtilen ID'ye sahip yayınevini getirir           |
| `/api/v1/publisher/{id}`   | PUT         | Belirtilen ID'ye sahip yayınevini günceller         |
| `/api/v1/publisher/{id}`   | DELETE      | Belirtilen ID'ye sahip yayınevini siler             |
| `/api/v1/publisher`        | GET         | Tüm yayınevlerini getirir                           |
| `/api/v1/publisher`        | POST        | Yayınevi ekler                                      |
|                            |             |                                                     |
| **category**               |             |                                                     |
| `/api/v1/categories/{id}`  | GET         | Belirtilen ID'ye sahip kategoriyi getirir           |
| `/api/v1/categories/{id}`  | PUT         | Belirtilen ID'ye sahip kategoriyi günceller         |
| `/api/v1/categories/{id}`  | DELETE      | Belirtilen ID'ye sahip kategoriyi siler             |
| `/api/v1/categories`       | GET         | Tüm kategorileri getirir                            |
| `/api/v1/categories`       | POST        | Kategori ekler                                      |
|                            |             |                                                     |
| **book**                   |             |                                                     |
| `/api/v1/books/{id}`       | GET         | Belirtilen ID'ye sahip kitabı getirir               |
| `/api/v1/books/{id}`       | PUT         | Belirtilen ID'ye sahip kitabı günceller             |
| `/api/v1/books/{id}`       | DELETE      | Belirtilen ID'ye sahip kitabı siler                 |
| `/api/v1/books`            | GET         | Tüm kitapları getirir                               |
| `/api/v1/books`            | POST        | Kitap ekler                                         |
|                            |             |                                                     |
| **book borrowing**         |             |                                                     |
| `/api/v1/borrows/{id}`     | GET         | Belirtilen ID'ye sahip kitap ödünç almayı getirir   |
| `/api/v1/borrows/{id}`     | PUT         | Belirtilen ID'ye sahip kitap ödünç almayı günceller |
| `/api/v1/borrows/{id}`     | DELETE      | Belirtilen ID'ye sahip kitap ödünç almayı siler     |
| `/api/v1/borrows`          | GET         | Tüm kitap ödünç almaları getirir                    |
| `/api/v1/borrows`          | POST        | kitap ödünç alma ekler                              |


## Kurulum
1. Projeyi klonlayın.
    - git clone https://github.com/alisimsekk/LibraryApp.git
2.1. Docker yüklü ise,
    - docker-compose up 
2.2. `src/main/resources/application.properties` dosyasında veri tabanı konfigürasyonunu yapın.
3. Projeyi ayağa kaldırmak için idenizden start edin.
4. Swagger üzerinden api kullanılabilir. Tarayıcınızdan http://localhost:8080/swagger-ui/index.html#/ url'ine gidin.
5. End pointlere istek atabilirsiniz.

## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini application.properties dosyasından değiştirmelisiniz.

spring.datasource.url  
spring.datasource.username  
spring.datasource.password

## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

