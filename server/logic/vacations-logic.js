const vacationsDao = require("../dao/vacations-dao");


async function addVacation(vacationData) {
    // validateVacationDetails(vacationData);
    await vacationsDao.addVacation(vacationData);
}

async function getVacations(userId) {
    let response = await vacationsDao.getVacations(userId);
    return response
}

async function getVacationsAdmin() {
    let response = await vacationsDao.getVacationsAdmin();
    return response
}

async function deleteVacation(id) {
    await vacationsDao.deleteVacation(id);
}

async function getOneVacation(id) {
    let response = await vacationsDao.getOneVacation(id);
    console.log(response)
    return response
}

async function editVacation(vacation, id) {
    await vacationsDao.editVacation(vacation, id);
}



module.exports = { addVacation, getVacations, deleteVacation, editVacation, getOneVacation, getVacationsAdmin }