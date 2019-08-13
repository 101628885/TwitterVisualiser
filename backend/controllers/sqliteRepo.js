class sqliteRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll() {
        return this.dao.all(`SELECT * FROM images`)
    }
}

module.exports = sqliteRepository;