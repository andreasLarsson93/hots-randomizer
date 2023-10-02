import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Hero, Player, roles } from "./Models/Interfaces";

const App = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [list, setList] = useState<Player[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetch("HeroesSecond.json")
      .then((response) => response.json())
      .then((data) => setHeroes(data))
      .catch((error) => console.error(error));
  }, []);

  const findHeroes = (player: Player): void => {
    const foundHero = heroes?.filter((x) => x.EnziGrouping === player.Role);

    const randomIndex = Math.floor(Math.random() * foundHero!.length);

    const randomHero = foundHero[randomIndex];

    replacePlayerHero(player, randomHero);
  };

  const replacePlayerHero = (player: Player, randomHero: Hero): void => {
    setList((prevItems) =>
      prevItems.map((item) => {
        if (item.Id === player.Id) {
          return { ...item, Hero: randomHero }; // Replace the matching object with the updated object
        }
        return item; // Return the original object for all other items
      })
    );
  };

  const getRandomRole = () => {
    const randomIndex = Math.floor(Math.random() * roles!.length);

    const foundRole = roles[randomIndex];
    return foundRole;
  };

  const setRandomRole = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button = event.target as HTMLButtonElement;
    const li = button.parentElement as HTMLLIElement;
    const value = li.getAttribute("data-value");

    let randomRole = getRandomRole();
    let isTrue = true;
    while (isTrue) {
      let foundRole = false;
      list.forEach((player) => {
        if (player.Role === randomRole) {
          foundRole = true;
        }
      });
      if (foundRole) {
        randomRole = getRandomRole();
      } else {
        isTrue = false;
      }
    }

    if (value) {
      const decodedValue = JSON.parse(value);
      console.log(decodedValue);
      setList((currentPlayers) =>
        currentPlayers.map((chosenPlayer) => {
          if (chosenPlayer.Id === decodedValue.Id) {
            return {
              ...chosenPlayer,
              Role: randomRole,
              Hero: {},
              RandomBuild: "",
            }; // Replace the matching object with the updated object
          }
          return chosenPlayer; // Return the original object for all other items
        })
      );
    }
  };

  const handleAdd = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      const newList = list?.concat({ Name: name, Id: uuidv4() });
      console.log(newList);
      setList(newList);
      setName("");
    }
  };
  const handleAddButton = (): void => {
    const newList = list?.concat({ Name: name, Id: uuidv4() });
    console.log(newList);
    setList(newList);
    setName("");
  };

  const handleChange = (event: any): void => {
    setName(event.target.value);
  };

  const setRandomBuild = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button = event.target as HTMLButtonElement;
    const li = button.parentElement as HTMLLIElement;
    const value = li.getAttribute("data-value");
    let randomBuild: number[] = [];

    for (let i = 0; i <= 6; i++) {
      let TalentRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      if (i === 3) {
        TalentRandom = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      }
      if (i === 6) {
        TalentRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      }
      randomBuild.push(TalentRandom);
    }
    const buildWtihCommas = randomBuild.map(String).join(", ");

    if (value) {
      const decodedValue = JSON.parse(value);
      console.log(decodedValue);
      setList((currentPlayers) =>
        currentPlayers.map((chosenPlayer) => {
          if (chosenPlayer.Id === decodedValue.Id) {
            return { ...chosenPlayer, RandomBuild: buildWtihCommas }; // Replace the matching object with the updated object
          }
          return chosenPlayer; // Return the original object for all other items
        })
      );
    }
  };

  const reset = (): void => {
    setList((currentPlayers) =>
      currentPlayers.map((chosenPlayer) => {
        return { ...chosenPlayer, RandomBuild: "", Hero: {}, Role: "" }; // Replace the matching object with the updated object
        // Return the original object for all other items
      })
    );
  };
  function setRandomHero(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.target as HTMLButtonElement;
    const li = button.parentElement as HTMLLIElement;
    const value = li.getAttribute("data-value");

    console.log(value);
    if (value) {
      const decodedValue = JSON.parse(value);
      console.log(decodedValue);
      findHeroes(decodedValue);
    }
  }

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={handleAdd}
          />
        </div>
        <div>
          <button onClick={() => reset()}> RESET</button>
        </div>
        <div>
          <ul>
            {list.map((player, index) => {
              return (
                <div>
                  <li data-value={JSON.stringify(player)} key={index}>
                    <button
                      style={{
                        fontSize: "35px",
                        borderRadius: "20%",
                        border: "solid",
                      }}
                      onClick={setRandomRole}
                    >
                      RANDOM ROLE
                    </button>
                    <button
                      style={{ marginLeft: "20px", fontSize: "35px" }}
                      onClick={setRandomHero}
                    >
                      RANDOM HERO
                    </button>
                    <button onClick={setRandomBuild}>RANDOM BUILD</button>
                  </li>
                  {player !== null && (
                    <div>
                      <h2> player name : {player?.Name}</h2>
                      <h2> player role : {player?.Role}</h2>
                      <h2> player hero : {player?.Hero?.PrimaryName}</h2>
                      <div>
                        <ul>
                          {player.Hero?.ProperBuilds?.map((build) => {
                            return (
                              <div>
                                <h3 style={{ fontSize: "23px" }}>
                                  build name:{build?.Name}
                                </h3>
                                <h3 style={{ fontSize: "23px" }}>
                                  build talents:[{build?.Talents}]
                                </h3>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                      <h2>player random build :[ {player?.RandomBuild}]</h2>
                    </div>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default App;
