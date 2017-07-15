/* Functions to define and initialise the weebgames database*/
const dbDefinition = {
    USERS : {
        id:{ type: 'INTEGER', primaryKey: true, autoIncrement: true },
        name: {type: 'TEXT', notNull: true},
        points:{ type: 'INTEGER', notNull: false}
    },
    STRINGS: {
        id:{ type: 'INTEGER', primaryKey: true, autoIncrement: true },
        uid:{ type: 'INTEGER', foreignKey: {table: 'USERS', field: 'id'}},
        text:{ type: 'TEXT', notNull: true},
        points:{ type: 'INTEGER', notNull: true},
        time:{ type: 'REAL'}
    }
};
