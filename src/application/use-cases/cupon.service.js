


const Cupon = require('../../domain/entities/cupon.entity');



class CuponsService {
    constructor(cuponsRepository) {
        this.cuponsRepository = cuponsRepository;
    }
    
    async getAllCupons() {
        return this.cuponsRepository.getAll();
    }

    async getCuponById(id) {
        return this.cuponsRepository.getById(id);
    }

    async createCupon(cuponData) {
        const cuponEntity = new Cupon(
            null, 
            cuponData.id_user,
            cuponData.init_date,
            cuponData.end_date,
            cuponData.value

        );
        return this.cuponsRepository.create(cuponEntity);
    }

        async updateCupon(id, cuponData) {
                const cuponEntity = new Cupon(
                id,
                cuponData.id_user,
                cuponData.init_date,
                cuponData.end_date ,
                cuponData.value,
                );
            return this.cuponsRepository.update(id, cuponEntity);
        }

    async deleteCupon(id) {
        return this.cuponsRepository.delete(id);
    }
}
module.exports = CuponsService;
