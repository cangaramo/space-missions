import gql from "graphql-tag";

/* Missions */

export const GET_MISSIONS = gql`
  query {
    missions: getMissions {
      id
      name
      insignia
      date
      description
      astronauts
    }
  }
`;

/* Astronauts */

export const GET_ASTRONAUTS = gql`
  query {
    astronauts: getAstronauts {
      id
      name
      picture
      nationality
    }
  }
`;

export const GET_ASTRONAUT_BY_ID = gql`
  query($id: Int) {
    astronaut: getAstronautById(id: $id) {
      id
      name
      picture
      nationality
    }
  }
`;
