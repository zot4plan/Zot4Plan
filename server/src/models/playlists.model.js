module.exports = (sequelize, DataType) => {
    const Playlists = sequelize.define("playlists", {
        playlist_id: {
            type: DataType.STRING(64),
            primaryKey: true,
        },
        thumbnail: {
            type: DataType.STRING(64),
            allowNull: true,
        },
        name: {
            type: DataType.STRING(128),
            allowNull: false,
        },
        author: {
            type: DataType.STRING(128),
            allowNull: true,
        },
        share_by: {
            type: DataType.STRING(128),
            allowNull: true,
        },
        original_url: {
            type: DataType.STRING(1024),
            allowNull: false,
        },
        embed_url: {
            type: DataType.STRING(1024),
            allowNull: false,
        },
        language: {
            type: DataType.STRING(64),
            allowNull: true,
        },
        genre: {
            type: DataType.ARRAY(DataType.TEXT),
            allowNull: true,
        },
        like: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        view: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        is_verified: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
  
    return Playlists;
  };
