// Data
import { missions } from "./data.js";
import { astronauts } from "./data.js";

// Resolvers

var getMissions = () => {
  missions.map((mission) => {
    mission.astronauts.forEach(function (missionAstronaut, index) {
      astronauts.forEach(function (astronaut) {
        if (astronaut.id == missionAstronaut) {
          mission.astronauts[index] = astronaut.name;
        }
      });
    });
  });
  return missions;
};

var addMission = ({ name, insignia, date, description, astronauts }) => {
  const new_mission = {
    id: missions.length,
    name: name,
    insignia: insignia,
    date: date,
    description: description,
    astronauts: astronauts,
  };
  missions.push(new_mission);
  return new_mission;
};

var deleteMission = ({ id }) => {
  var pos;
  for (var i = 0; i < missions.length; i++) {
    if (missions[i].id == id) {
      pos = i;
    }
  }
  missions.splice(pos, 1);
  return missions;
};

var getAstronauts = () => {
  return astronauts;
};

var addAstronaut = ({ name, picture, nationality }) => {
    const new_astronaut = {
      id: astronauts.length,
      name: name,
      picture: picture,
      nationality: nationality,
    };
    astronauts.push(new_astronaut);
    return new_astronaut;
  };

var deleteAstronaut = ({ id }) => {
  var pos;
  for (var i = 0; i < astronauts.length; i++) {
    if (astronauts[i].id == id) {
      pos = i;
    }
  }
  astronauts.splice(pos, 1);
  return astronauts;
};

// The root provides a resolver function for each API endpoint
export var root = {
  getMissions: getMissions,
  addMission: addMission,
  deleteMission: deleteMission,
  getAstronauts: getAstronauts,
  addAstronaut: addAstronaut,
  deleteAstronaut: deleteAstronaut,
};
