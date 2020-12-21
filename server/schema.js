var { buildSchema } = require('graphql');

export var schema = buildSchema(`
  type Query {
    hello: String,
    getAstronauts: [Astronaut],
    getMissions: [Mission]
    getMissionById(id: Int): Mission
  }
  type Mutation {
    addMission(name: String, insignia: String, year: String, astronauts: [ID]): Mission,
    deleteMission(id: ID): [Mission],
    addAstronaut(name: String, picture: String): Astronaut
    deleteAstronaut(id:ID): [Astronaut]
  }
  type Mission {
    id: ID,
    name: String,
    insignia: String,
    year: Int
    astronauts: [ID]
  }
  type Astronaut {
    id: ID,
    name: String,
    picture: String
  }
`);