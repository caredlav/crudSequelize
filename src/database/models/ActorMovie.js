module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        actor_id: dataTypes.BIGINT(10),
        movie_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ActorMovie = sequelize.define(alias,cols,config);

    ActorMovie.associate=function(models){
        ActorMovie.belongsTo(models.Actor,{
         as:"actores",
         foreignKey: "actor_id"
        });

        ActorMovie.belongsTo(models.Movie,{
         as:"peliculas",
         foreignKey: "movie_id"
        });
    }

    return ActorMovie

}