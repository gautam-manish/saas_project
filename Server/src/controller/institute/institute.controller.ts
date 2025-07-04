import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInstituteNumber";

interface IExtendedRequest extends Request {
    name?: string,
    age?: number
}

class InstituteController {
    static async createInstitutes(req: IExtendedRequest, res: Response) {
        const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body
        const instituteVatNo = req.body.instituteVatNo || null
        const institutePanNo = req.body.institutePanNo || null
        // check if all fields are present
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            res.status(400).json({
                message: "All fields are required"
            });
            return;
        }
        // aayo vane institute create garne

        const instituteNumber = generateRandomInstituteNumber()

        await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            instituteVatNo VARCHAR(255),
            institutePanNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)

        await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`,{
            replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanNo]
        })

        res.status(201).json({
            message: "Institute created successfully",
        });
    }
}

export default InstituteController;