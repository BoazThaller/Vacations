let connection = require("./connection-wrapper")

async function addVacation(vacationData) {
    let sql = `INSERT INTO vacations (vacation_destination, vacation_price, vacation_start_date, vacation_end_date, vacation_description)
    VALUES (?,?,?,?,?)`;
    let parameters = [vacationData.destination, vacationData.price, vacationData.startDate, vacationData.endDate, vacationData.description];

    await connection.executeWithParameters(sql, parameters);

}

async function getVacations(userId) {
    let sql =
        `SELECT 
        v.vacation_id as id,
        v.vacation_destination as destination,
        v.vacation_description as description,
        v.vacation_start_date AS startDate,
        v.vacation_end_date AS endDate,
        v.vacation_price as price,
        v.vacation_image as image,
        
        CASE
            WHEN followed.vacation_id IS NOT NULL THEN "TRUE"
            ELSE "FALSE"
        END AS 'isFollowed'

        FROM vacations v
                LEFT JOIN
            (SELECT vacation_id FROM followed_vacations WHERE user_id = ?) followed 
            ON v.vacation_id = followed.vacation_id`;

    let parameters = [userId];
    let response = await connection.executeWithParameters(sql, parameters);

    return response

}

async function getVacationsAdmin() {
    let sql =
        `SELECT 
        vacation_id as id,
        vacation_destination as destination,
        vacation_description as description,
        vacation_start_date AS startDate,
        vacation_end_date AS endDate,
        vacation_price as price
        FROM vacations`;

    let response = await connection.execute(sql);
    return response
}

async function getOneVacation(id) {
    let sql =
        `SELECT 
        vacation_id as id,
        vacation_destination AS destination,
        vacation_description AS description,
        vacation_end_date AS endDate,
        vacation_start_date AS startDate,
        vacation_price as price
    FROM
    vacations
    WHERE vacation_id = ${id}`;
    return await connection.execute(sql);;
}

async function deleteVacation(id) {
    let sql = `delete from vacations where vacation_id = ?`;
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

async function editVacation(vacation, id) {
    console.log(vacation, id)
    const sql = `update vacations set vacation_destination = ?, vacation_description = ?, vacation_start_date = ?, vacation_end_date = ?, vacation_price = ? where vacation_id = ?`;
    let parameters = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, id];

    return await connection.executeWithParameters(sql, parameters);
}


module.exports = { addVacation, getVacations, deleteVacation, editVacation, getOneVacation, getVacationsAdmin }