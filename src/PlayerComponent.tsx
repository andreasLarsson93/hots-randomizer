import React from "react";
import { Player } from "./Models/Interfaces";

interface PlayerProps {
  player: Player;
}
const PlayerComponent: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div>
      <ul>
        {list.map((Player, index) => {
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
  );
};
