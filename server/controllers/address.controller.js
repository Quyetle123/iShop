import { Address } from "../models";

class AdressController {
    static async addAdress(req, res) {
        const data = req.body;
        try {
            const adress = await Address.create(data);
            res.status(200).json({ adress });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async AllAdresses(req, res) {
        try {
            const addresses = await Address.findAll();
            res.status(200).json({ addresses });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async AdressById(req, res) {
        const { id } = req.paramsl;
        try{
            const adress = await Address.findByPk(id);
            if (adress) {
                res.status(200).json({ adress });
            } else {
                res.status(404).json({ message: " Adress not found"});
            }
        } catch (error) {
            res.status(400).json({ message: error.message});
        }
    }

    static async updateAdress(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const adress = await Address.findByPk(id);
            if (adress) {
                await adress.update(data);
                res.status(200).json({ adress });
            } else {
                res.status(404).json({ message: "Adress not found"});
            } 
        } catch (error) {
            res.status(400).json({ message: error.message});
        }
    }

    static async deleteAdress(req, res) {
        const { id } = req.params;
        try {
            const adress  = await Address.findByPk(id);
            if (adress) {
                await adress.destroy();
                res.status(200).json({ message: "Adress deleted susccessfully"});
            } else {
                res.status(404).json({ message: "Adress not found"});
            } 
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AdressController