# pet-the-ket

## Game Logic:

```
graph TD
A(Start Game) --> B[Create Board]
B --> C[Initialize Cats]
C --> D[Render Board]
D --> E{Can Press Key?}
E -->|Yes| F[Handle Key Press]
F --> G{Cat In Last Row?}
G -->|Yes| H[Increase Score]
H --> I[Move All Cats Down]
I --> J[Render Board]
J --> E
G -->|No| K[Disable Key Press Temporarily]
K --> E
E -->|No| L[Wait For Key Enable]
L --> E
B --> M[Start Timer]
M --> N{Timer > 0?}
N -->|Yes| M
N -->|No| O[Reset State]
```
