const db = require('../../../config/db');
const log = require('../../../lib/catch-error');

const gender = {};


gender.getList = async (req, res) => {

    try {
        
        await db.query('SELECT gender_id, gender_name, gender_active FROM ir_gender ORDER BY gender_id, gender_active ASC', (err, results) =>{
            if(err){
                log('src/controllers/front', 'gender', 'stateList', err.stack, false, req, res);
            }else{
                let genders = results.rows;
                return res.render('gender/gender_home', { genders });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'gender', 'getList', error, false, req, res);
    }

};

gender.viewcreate = async(req, res)=>{

    try {
        
        return res.render('gender/gender_create')
        
    } catch (error) {
        log('src/controllers/front', 'gender', 'viewcreate', error, false, req, res);
    }

};

gender.create = async (req, res) => {
    const { name } = req.body;
    try {

        await db.query('INSERT INTO ir_gender(gender_name) VALUES($1)', [name], (err, results) => {
            if (err) {
                log('src/controllers/front', 'gender', 'create', err.stack, false, req, res);
                req.flash('delete', err.message);

            } else {
                req.flash('success', 'Registro guardado correctamente');
                return res.redirect(`/gender/list`);
            }
        });

    } catch (error) {
        log('src/controllers/front', 'gender', 'create', error, false, req, res);
        req.flash('delete', error);
    }
};

gender.getById = async (req, res) => {
    
    const { gender_id } = req.params;

    try {
            
        await db.query(`SELECT gender_id, gender_name, gender_active FROM ir_gender WHERE gender_id = $1`, 
        [gender_id], (err, results) => {
            if (err) {
                req.flash('error',err.message);
                log('src/controllers/front', 'gender', 'getById', err, false, req, res);
            }else{
                var gender = results.rows[0];
                return res.render('gender/gender_update',{ gender });
            }
        });

    } catch (error) {
        log('src/controllers/front', 'gender', 'getById', error, false, req, res);
    }
};

gender.update = async (req, res) => {

    const { gender_id } = req.params;
    const { name, active } = req.body;

    try {
        
        await db.query('UPDATE ir_gender SET gender_name = $1, gender_active = $2 WHERE gender_id = $3', [name, active, gender_id], (err, results) => {
            if (err) {
                log('src/controllers/front', 'gender', 'update', err.message, false, req, res);
                return res.redirect(`/states/${municipality_id}/municipalities-list`);
            }else{
                req.flash('warning', 'registro Actualizado correctamente')
                return res.redirect(`/gender/list`);
            }    
        });   

    } catch (error) {
        log('src/controllers/front', 'gender', 'update', error, false, req, res);
    }
};


module.exports = gender;