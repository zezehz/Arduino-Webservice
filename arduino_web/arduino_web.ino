#include <LiquidCrystal.h>
#include <DHT.h>

#define DHTPIN  (A1)
#define DHTTYPE (DHT11)
#define TEMPO   (1000)

#define LED1 (8)
#define LED2 (9)
#define LED3 (10)
#define LED4 (11)

#define ZERO      (0)
#define FORTEIGHT (48)

LiquidCrystal lcd(2,3,4,5,6,7);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  lcd.begin(16,2);
  dht.begin();

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);

  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, LOW);

  lcd.setCursor(0, 0);
  lcd.print("  Arduino  Web  ");

  lcd.setCursor(0, 1);
  lcd.print("     ******     ");
}

void loop() {

  int h = dht.readHumidity();
  int t = dht.readTemperature();
  String conteudo = "";

  Serial.print("-humidit-");
  Serial.print(h);
  Serial.print("-temper-");
  Serial.print(t);
  Serial.print("-");

  Serial.println();

  delay(TEMPO);
}

void serialEvent() {

  if (Serial.available()) {
    delay(100);

    String sub_str      = "";
    char dadosSerial[100];

    int cont = 0;

    while (Serial.available() > 0) {
      dadosSerial[cont] = Serial.read( );
      cont ++;
    }

    for( int i = 0; i < 100; i++)
    {
      sub_str.concat(dadosSerial[i]);
    }

    Serial.println(sub_str);

    digitalWrite(LED1, dadosSerial[0] - FORTEIGHT);
    digitalWrite(LED2, dadosSerial[2] - FORTEIGHT);
    digitalWrite(LED3, dadosSerial[4] - FORTEIGHT);
    digitalWrite(LED4, dadosSerial[6] - FORTEIGHT);


    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("  Arduino  Web  ");
    lcd.setCursor(0, 1);
    lcd.print(sub_str.substring(8));
    
  }
}

