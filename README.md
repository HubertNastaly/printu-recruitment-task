# Zadanie rekrutacyjne

## Uwagi do autora API
- ID projektu w końcówce `/project/:id` jest zwracane dwukrotnie 
- zduplikowane ID kształtów w niektórych projektach
- kolory w niepełnym formacie `#RRGGBB` w niektórych kształtach
- brakujące pola `type` w niektórych kształtach

## Propozycje testów

### Jednostkowe
* testy funkcji `toRadians`
* testy funkcji obliczających minimalny prostokąt ograniczający dla podanego kształtu
* testy schematu odpowiedzi z API na:
  * zdefiniowanie wszystkich pól
  * prawidłowość postawowego typu (`string`, `number`) każdego pola
  * dopuszczalną wartość pola `type` jako `rectangle` lub `ellipse`
  * unikalność identyfikatorów kształtów w ramach projektu
  * pozytywną wartość wysokości i szerokości płótna oraz kształtów
  * poprawny format wartości koloru
  * wartość rotacji z zakresu [0, 360]

### Komponenty
* testy komponentu `Shape`:
  * czy renderowany jest odpowiedni element HTML w zależności od typu
  * czy jest poprawne położenie, wymiary i rotacja elementu poprzez sczytanie atrybutów elementu
* testy komponentu `Canva`:
  * czy jest renderowana prawidłowa, taka sama liczba kształtów, prostokątów ograniczających i środków figur
  * czy etykiety przy środkach figur mają odpowiednie wartości
  * czy prostokąty ograniczające mają atrybuty położenia i wymiarów zgodne z tym, co zwracają funkcje `calculate...BoundingBox`?

### Hook useProject
* zwracanie błędów dla różnych rodzajów błędów w zamockowanych odpowiedziach z API
* załadowanie projektu do stanu przy podanym ID projektu
* załadowanie projektu do stanu bez podanego ID projektu

### E2E
* czy po kliknięciu przycisku **Load project** zostanie wyświetlony komponent `Canva` z różnymi elementami svg wewnątrz
* czy po wpisaniu ID projektu niezawierającego błędu i kliknięciu przycisku **Load project** zostanie wyświetlony komponent `Canva` z różnymi elementami svg wewnątrz
* czy po wpisaniu ID projektu zawierającego błąd i kliknięciu przycisku **Load project** zostanie wyświetlona właściwa informacja o błędzie  
