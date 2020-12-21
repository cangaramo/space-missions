var { buildSchema } = require('graphql');

export var schema = buildSchema(`
  type Query {
    getAstronauts: [Astronaut],
    getMissions: [Mission]
    getMissionById(id: Int): Mission
  }
  type Mutation {
    addMission(name: String, insignia: String, date: String, description: String, astronauts: [ID]): Mission,
    deleteMission(id: ID): [Mission],
    addAstronaut(name: String, picture: String, nationality: String): Astronaut
    deleteAstronaut(id:ID): [Astronaut]
  }
  type Mission {
    id: ID,
    name: String,
    insignia: String,
    date: String,
    description: String,
    astronauts: [ID]
  }
  type Astronaut {
    id: ID,
    name: String,
    picture: String,
    nationality: String,
  }
`);