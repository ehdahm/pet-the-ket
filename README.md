# Pet The Ket

Welcome to **Pet The Ket** - a delightful game where your reflexes are tested as you try to pet as many cats as possible before the time runs out. It's a race against the clock and a challenge of precision as you try to earn the highest score by petting the right cats as they come down the board.

## Technologies Used

- **JavaScript**: For game logic and interactivity
- **HTML**: To structure game content
- **CSS**: For styling the game
- **Web Audio API**: To handle sound effects when petting or missing the cats

## Getting Started

Game Link:[Pet The Ket](https://ehdahm.github.io/pet-the-ket/)

Here's how to play:

1. When the game starts, cats will begin to appear in different columns.
2. Use the `Z`, `X`, and `C` keys to pet the cats in the corresponding columns.
3. Petting a cat earns you points, but be quick! If you miss, you'll hear a hiss, and there will be a short penalty period.
4. As you pet more cats, the points for each cat increase.
5. Try to beat the high score before the timer runs out!

## Development Experience

### Biggest Challenge

One of the most significant challenges encountered during the development of **Pet The Ket** was conceptualizing and breaking down the game's logic. Despite thorough planning, translating the game's concept into actual, workable code proved to be a complex task. It was crucial to take the development process step by step, starting with the simplest possible version of the game and progressively building up the complexity. This approach helped in managing the intricacies of the game logic in more digestible segments.

### Key Challenges, Learnings, and Takeaways

- **CSS Styling:** Styling the game posed was especially difficult, particularly in using the CSS properties related to alignment and layout. Due to the vast array of styling options and their sometimes counterintuitive behavior, a lot of time was spent on research and experimentation. The process of trial and error, along with frequent Googling, was slow but educational. Although there is still much to learn, the constant exposure to CSS and hands-on practice has been the most effective way to improve.

## Next Steps

Potential future enhancements:

- **Leaderboards**: Store a player name to a run
- **Customization**: Customise keybindings, reset logic.
- **Game modes**: Longer duration and additional key.
- **Media query**: Adaptive to mobile/other screen sizes

Stay tuned for more updates and thank you for playing!

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
O --> A
```
<img width="353" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/424cdc13-1ab5-4224-858e-a180ece4362d">

## Game Preview:

<img width="1111" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/2642f60e-b9ac-49bf-bf09-62edb2eeeb9b">
<img width="1111" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/4155d702-10f6-4414-981e-f2af161284f8">
<img width="1111" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/477b17c7-6d78-4f0d-bff4-a4b82ef34e2c">
<img width="1111" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/488a50dc-f003-4c0a-be6b-acd46a755f56">
<img width="1109" alt="image" src="https://github.com/ehdahm/pet-the-ket/assets/45594732/596e8ea0-12b6-4455-bd1a-c5febdc9fae5">





