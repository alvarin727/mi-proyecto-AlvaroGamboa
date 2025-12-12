class Cupon {
    constructor(id, id_user, init_date, end_date, value) {
        this.id = id;
        this.id_user = id_user;
        this.init_date = init_date;
        this.end_date = end_date;
        this.value = value;
    }
}

module.exports = Cupon;