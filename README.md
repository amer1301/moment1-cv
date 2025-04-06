# Moment1-CV

Detta projekt är en webbaserad applikation för att hantera kurser i en databas. Applikationen är byggd med Node.js, Express, MySQL och använder EJS för att rendera dynamiska sidor. Användare kan lägga till, radera och visa kurser via ett användargränssnitt.

## Funktioner

- **Visa alla kurser**: En lista med kurser som lagras i databasen.
- **Lägg till kurs**: Möjlighet att lägga till nya kurser via ett formulär.
- **Radera kurs**: Möjlighet att ta bort en kurs från databasen.
  
## Teknologier

- **Node.js**: Backend-plattformen för att bygga servern.
- **Express**: Webbserverramverk för att hantera HTTP-förfrågningar.
- **MySQL2**: MySQL-databasklient för Node.js.
- **EJS**: Motor för att rendera dynamiska sidor med data från servern.
- **dotenv**: För att hantera miljövariabler för känslig information som databasanvändare, lösenord och databasnamn.
- **Nodemon**: För att automatiskt starta om servern vid ändringar i koden under utveckling.

## Installation

För att köra projektet lokalt på din dator, följ stegen nedan:
### Förutsättningar

- **Node.js** och **npm** måste vara installerade på din dator.
- - **MySQL** måste vara installerat och konfigurerat

### Steg för att installera

1. **Kloning av repository**

   Klona projektet till din lokala dator:

   ```bash
   git clone https://github.com/amer1301/moment1-cv.git
   cd moment1-cv
