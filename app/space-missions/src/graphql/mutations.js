import gql from "graphql-tag";

/* Missions */

export const ADD_MISSION = gql`
  mutation addMission(
    $name: String
    $insignia: String
    $year: String
    $astronauts: [ID]
  ) {
    addMission: addMission(
      name: $name
      insignia: $insignia
      year: $year
      astronauts: $astronauts
    ) {
      id
      name
      insignia
      year
      astronauts
    }
  }
`;

export const DELETE_MISSION = gql`
  mutation($id: ID) {
    deleteMission: deleteMission(id: $id) {
      id
      name
      insignia
      year
    }
  }
`;

/* Astronauts */

export const ADD_ASTRONAUT = gql`
  mutation addAstronaut($name: String, $picture: String, $nationality: String) {
    addAstronaut: addAstronaut(name: $name, picture: $picture, nationality: $nationality) {
      id
      name
      picture
      nationality
    }
  }
`;

export const DELETE_ASTRONAUT = gql`
  mutation($id: ID) {
    deleteAstronaut: deleteAstronaut(id: $id) {
      id
      name
      picture
    }
  }
`;
